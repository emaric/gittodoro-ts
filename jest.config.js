const { pathsToModuleNameMapper } = require('ts-jest/dist/config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: ['<rootDir>/**/*?(*.)+(spec|test).[jt]s?(x)'],
}
