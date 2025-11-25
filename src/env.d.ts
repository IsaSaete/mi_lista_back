declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    CONNECTION_TO_DATABASE?: string;
    ALLOWED_ORIGIN_PATTERNS?: string;
    JWT_SECRET: string;
  }
}
