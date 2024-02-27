export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export interface EnvironmentConfig {
  name: string;
  file: string;
}

export const enviroments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    name: 'development',
    file: '.env',
  },
  [Environment.Production]: {
    name: 'production',
    file: '.env.production',
  },
  [Environment.Staging]: {
    name: 'staging',
    file: '.env.staging',
  },
};
