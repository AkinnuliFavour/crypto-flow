import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  NEWS_API_KEY: string;
  PORT: number;
  NODE_ENV: string;
  CORS_ORIGIN: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }

  return value;
};

export const config: EnvConfig = {
  NEWS_API_KEY: getEnvVariable("NEWS_API_KEY"),
  PORT: parseInt(getEnvVariable("PORT", "3001"), 10),
  NODE_ENV: getEnvVariable("NODE_ENV", "development"),
  CORS_ORIGIN: getEnvVariable("CORS_ORIGIN", "http://localhost:3000"),
};
