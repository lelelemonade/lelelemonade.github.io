// env.d.ts or vite-env.d.ts
interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob: (pattern: string, options?: {
        import?: string;
        query?: string;
    }) => Record<string, () => Promise<unknown>>;
}
