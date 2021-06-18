import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const getBabelOptions = ({ useESModules, plugins = [] }) => ({
  exclude: /node_modules/,
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { useESModules }]].concat(plugins),
  comments: false
})

const input = './src/index.js'
// check relative and absolute paths for windows and unix
const external = id => !id.startsWith('.') && !id.startsWith('/') && !id.includes(':')

export default [
  {
    input,
    output: {
      dir: 'dist/cjs',
      preserveModules: true,
      // file: pkg.main,
      format: 'cjs'
    },
    external,
    // external: [
    //   ...Object.keys(pkg.dependencies || {})
    // ],
    plugins: [babel(getBabelOptions({
      useESModules: false,
      plugins: [['add-module-exports']]
    }))]
  },
  {
    input,
    output: {
      dir: 'dist/esm',
      preserveModules: true,
      // file: pkg.module,
      format: 'esm' // the preferred format
    },
    external,
    // external: [
    //   ...Object.keys(pkg.dependencies || {})
    // ],
    plugins: [babel(getBabelOptions({ useESModules: true }))]
  },
  // this is not used, if we make sure every js file is imported with .js ending
  // {
  //   input,
  //   output: {
  //     dir: 'dist/deno',
  //     preserveModules: true,
  //     // file: pkg.module,
  //     format: 'esm' // the preferred format
  //   },
  //   external
  //   // external: [
  //   //   ...Object.keys(pkg.dependencies || {})
  //   // ]
  // },
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'translationCheck' // the global which can be used in a browser
    },
    plugins: [commonjs(), babel(getBabelOptions({ useESModules: true })), nodeResolve()]
  },
  {
    input,
    output: {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      name: 'translationCheck' // the global which can be used in a browser
    },
    plugins: [commonjs(), babel(getBabelOptions({ useESModules: true })), nodeResolve(), terser()]
  }
]
