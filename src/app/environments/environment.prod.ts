import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  baseUrl: 'https://mpb-api.timothe-bequet.fr',
  apiVersion: 'v1',
  appName: 'Mon Petit Badiste'
};

// Compatibilité avec l'ancien format
export const globalProperties = {
  baseUrl: environment.baseUrl
}; 