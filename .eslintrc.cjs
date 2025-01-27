/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['src/views/**/*.vue', 'src/components/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
        'vue/html-closing-bracket-newline': [2, { multiline: 'never' }]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
