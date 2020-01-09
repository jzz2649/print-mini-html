import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'printHTML.js',
  output: {
    name: 'printHTML',
    file: './dist/index.js',
    format: 'umd',
  },
  plugins: [uglify()]
}