module.exports = {
    coveragePathIgnorePatterns: [
        '<rootDir>/testing'
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 60000,
    testPathIgnorePatterns: [
        '<rootDir>/lib',
        '/node_modules'
    ],
    verbose: true
}
