import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  yaml: false,
  ignores: [''],
  lessOpinionated: true,
  typescript: true,

  rules: {
    'prefer-arrow-callback': ['error'],
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'style/arrow-parens': ['error', 'as-needed'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    'style/operator-linebreak': 'off',
    'style/brace-style': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'off',
  },
})
