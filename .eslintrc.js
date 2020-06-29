module.exports = {
  "extends": [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "node": true,
    "es6": true
  },
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser"
  },
  "rules": {
    "semi": ["error", "always"],
    "indent": ["error", 2],
    "vue/html-indent": ["error", 2]
  }
}
