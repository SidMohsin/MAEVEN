import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [...nextVitals, { ignores: ['.next/**', '.next-test/**', 'node_modules/**', 'references/**'] }];

export default config;
