// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 0,
    'semi': 0,
    "quotes": 0,
    'no-trailing-spaces': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'eol-last': 0,
    'key-spacing': 0,
    'space-before-function-paren': 0,
    'no-new': 0,
    'spaced-comment': 0,
    'one-var': 0,
    'no-unused-vars': 0,
    'one-var': 0,
    'new-cap': 0,
    'no-multiple-empty-lines': 0
  },
  globals: {
    "$": true,
    "Vue": true,
    "VueRouter": true,
    "iview": true,
    "Vuex": true,
    "UM": true,
    "Utils": true,
    'GetData': true
  }
}
