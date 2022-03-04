module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': () => [
      1,
      'always',
      [
        'config',
        'feature',
        'fix',
        'docs',
        'refactor',
        'test',
        'revert',
        'merge',
        'style',
        'build',
      ],
    ],
    'scope-case': () => [0, 'never'],
    'subject-case': () => [0, 'never'],
  },
};
