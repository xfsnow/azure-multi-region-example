const copy = require('rollup-plugin-copy')

export default {
  input: 'main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  plugins: [
    copy({
      targets: [
        { src: 'views/', dest: 'dist/' },
      ]
    })
  ]
}