import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Paper, useTheme } from '@mui/material';

export default function MarkdownRenderer({ content, frontmatter = true }) {
  const [parsedContent, setParsedContent] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (content) {
      // If frontmatter is true, remove the frontmatter from the content
      if (frontmatter) {
        const contentWithoutFrontmatter = content.replace(/^---\n([\s\S]*?)\n---/, '');
        setParsedContent(contentWithoutFrontmatter);
      } else {
        setParsedContent(content);
      }
    }
  }, [content, frontmatter]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Box className="markdown-body" sx={{ 
        '& img': { 
          maxWidth: '100%', 
          height: 'auto',
          borderRadius: 1,
          my: 2
        },
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 2,
          py: 1,
          my: 2,
          backgroundColor: 'action.hover',
          borderRadius: 1
        },
        '& table': {
          borderCollapse: 'collapse',
          width: '100%',
          my: 2
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'divider',
          p: 1
        },
        '& th': {
          backgroundColor: 'action.hover'
        }
      }}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <Typography variant="h1" gutterBottom {...props} sx={{ mt: 3, mb: 2 }} />
            ),
            h2: ({ node, ...props }) => (
              <Typography variant="h2" gutterBottom {...props} sx={{ mt: 3, mb: 2 }} />
            ),
            h3: ({ node, ...props }) => (
              <Typography variant="h3" gutterBottom {...props} sx={{ mt: 3, mb: 2 }} />
            ),
            h4: ({ node, ...props }) => (
              <Typography variant="h4" gutterBottom {...props} sx={{ mt: 2, mb: 1 }} />
            ),
            h5: ({ node, ...props }) => (
              <Typography variant="h5" gutterBottom {...props} sx={{ mt: 2, mb: 1 }} />
            ),
            h6: ({ node, ...props }) => (
              <Typography variant="h6" gutterBottom {...props} sx={{ mt: 2, mb: 1 }} />
            ),
            p: ({ node, ...props }) => (
              <Typography variant="body1" paragraph {...props} sx={{ mb: 2 }} />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={isDarkMode ? vscDarkPlus : prism}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {parsedContent}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}
