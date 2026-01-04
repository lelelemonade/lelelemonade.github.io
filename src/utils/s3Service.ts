import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface S3Credentials {
  access_key_id: string;
  secret_access_key: string;
  session_token: string;
  expiration: string;
}

export interface S3Sticker {
  id: string;
  name: string;
  url: string;
  format: string;
  lastModified?: Date;
  size?: number;
}

const BUCKET_NAME = 'storage-zhongli-dev';
const STICKERS_PREFIX = 'stickers/';
const CREDENTIALS_API = 'https://jrs3q5jxq5.execute-api.eu-north-1.amazonaws.com/Prod/api-zhongli';

let s3Client: S3Client | null = null;
let credentialsCache: S3Credentials | null = null;

export async function getS3Credentials(): Promise<S3Credentials> {
  if (credentialsCache && new Date(credentialsCache.expiration) > new Date()) {
    return credentialsCache;
  }

  const response = await fetch(CREDENTIALS_API, { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to get S3 credentials');
  }

  credentialsCache = await response.json();
  return credentialsCache!;
}

async function getS3Client(): Promise<S3Client> {
  if (!s3Client || (credentialsCache && new Date(credentialsCache.expiration) <= new Date())) {
    const credentials = await getS3Credentials();
    
    s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: credentials.access_key_id,
        secretAccessKey: credentials.secret_access_key,
        sessionToken: credentials.session_token,
      },
      requestChecksumCalculation: "WHEN_REQUIRED",
    });
  }

  return s3Client;
}

export async function listS3Stickers(continuationToken?: string): Promise<{
  stickers: S3Sticker[];
  nextToken?: string;
}> {
  const client = await getS3Client();

  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: STICKERS_PREFIX,
    MaxKeys: 50,
    ContinuationToken: continuationToken,
  });

  const response = await client.send(command);
  
  const stickers: S3Sticker[] = await Promise.all(
    (response.Contents || [])
      .filter(obj => obj.Key && obj.Key !== STICKERS_PREFIX)
      .map(async obj => {
        const key = obj.Key!;
        const fileName = key.replace(STICKERS_PREFIX, '');
        const name = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        const format = fileName.split('.').pop() || '';
        
        // Generate signed URL for download
        const getCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        });
        const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
        
        return {
          id: key,
          name,
          url: signedUrl,
          format,
          lastModified: obj.LastModified,
          size: obj.Size,
        };
      })
  );

  return {
    stickers,
    nextToken: response.NextContinuationToken,
  };
}

export async function uploadStickerToS3(file: File): Promise<S3Sticker> {
  const client = await getS3Client();
  const key = `${STICKERS_PREFIX}${file.name}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
    ContentLength: file.size
  });

  await client.send(command);

  // Generate signed URL for the uploaded file
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });

  const name = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  const format = file.name.split('.').pop() || '';

  return {
    id: key,
    name,
    url: signedUrl,
    format,
    size: file.size,
  };
}
