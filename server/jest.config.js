module.exports = {
  preset: 'ts-jest',
  watchPlugins: ['jest-watch-master'],
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/lib/$1.ts',
    '^@test/(.*)$': '<rootDir>/test/$1.ts'
  }
}
