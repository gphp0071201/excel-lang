
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'

import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
// import {terser} from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts', // 入口文件路径
  output: [
    {
      name: 'ExcelLang',
      file: 'dist/index.js', // Node.js 环境输出文件路径
      format: 'umd', 
    },
  ],
  plugins: [
    typescript(),
    resolve({preferBuiltins: true}),
    commonjs(),
    // replace({})
  ],
}
