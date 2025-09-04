// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//     plugins: [
//         svgr({ exportAsDefault: true }),
//         react(),
//     ],
//     resolve: {
//         alias: [
//             { find: '@', replacement: '/src' },
//         ],
//     },
//     define: {
//         __IS_DEV__: JSON.stringify(true),
//         // __API__: JSON.stringify('http://localhost:5000/api'),
//         __API__: JSON.stringify(process.env.VITE_API_URL), // <-- тут подхватится из env
//         __PROJECT__: JSON.stringify('frontend'),
//     },
//     esbuild: {
//         target: 'es2018', // Современная версия для работы с const
//     },
// });



import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// export default ({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   const viteApi = env.VITE_API_URL; // из .env или .env.production
//   const fallback = 'http://localhost:5000/api';


//   console.log('VITE_API_URL env:', viteApi);
//   console.log('__API__ will be:', process.env.API_URL || viteApi || fallback);


//   return defineConfig({
//     plugins: [svgr({ exportAsDefault: true }), react()],
//     resolve: { alias: [{ find: '@', replacement: '/src' }] },
//     define: {
//       __IS_DEV__: JSON.stringify(mode !== 'production'),
//       // При сборке Vite подставит process.env.API_URL (если есть у Vercel),
//       // иначе VITE_API_URL, иначе localhost.
//       __API__: JSON.stringify(process.env.API_URL || viteApi || fallback),
//       __PROJECT__: JSON.stringify('frontend'),
//     },
//     esbuild: { target: 'es2018' },
//   });
// };

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiURL = env.VITE_API_URL;

  return defineConfig({
    define: {
      __API__: JSON.stringify(apiURL),
    },
    plugins: [react(), svgr()],
    resolve: { alias: [{ find: '@', replacement: '/src' }] },
    esbuild: { target: 'es2018' },
  });
};
