import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: './src/shared/api/openapi/specification/openapi.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/shared/api/openapi/client',
  },
  services: {
    asClass: true, 
  },
  types: {
    dates: 'types+transform',
    enums: 'javascript',
  },
});