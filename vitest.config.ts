import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        'src/types', 'postcss.config.js', 'tailwind.config.js', 'eslintrc.cjs', './src/types.ts', './src/vite-env.d.ts'
      ]
    },
  },
})