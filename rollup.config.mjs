import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import { string } from 'rollup-plugin-string';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  string({
    include: '**/*.svg',
  }),
  resolve(),
  commonjs(),
  typescript({
    declaration: false,
  }),
  json(),
  !dev && terser({
    format: {
      comments: false,
    },
  }),
  dev && serve(serveopts),
].filter(Boolean);

export default {
  input: 'src/weatherpulse-card.ts',
  output: {
    file: 'dist/weatherpulse-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins,
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
