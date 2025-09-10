const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
            exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.ts', '**/*.stories.tsx']
        }),
        postcss({
            extensions: ['.css', '.scss', '.sass'],
            use: [
                ['sass', {
                    includePaths: ['./src/styles', './node_modules'],
                    outputStyle: 'compressed',
                    silenceDeprecations: ['legacy-js-api']
                }]
            ],
            minimize: true,
            sourceMap: true,
            inject: true
        })
    ],
    external: ['react', 'react-dom']
};