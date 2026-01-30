import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    ignores: [
      'playground',
      '**/vendor/**',
      '**/sources/**',
      '**/skills/**',
      '**/vectorStore/**',
    ],
    rules: {
      'ts/explicit-function-return-type': 'off',
      'antfu/consistent-list-newline': 'off',
    },
  },
)
