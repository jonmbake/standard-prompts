const fs = require('fs');
const path = require('path');

describe('Prompts', () => {
  let promptsFiles;
  let packageJson;
  let readmeContent;

  beforeAll(() => {
    promptsFiles = fs.readdirSync(path.join(__dirname, '..', 'prompts'));
    packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    readmeContent = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
  });

  test('should have a bin entry in package.json for each prompt', () => {
    promptsFiles.forEach(file => {
      const binEntry = packageJson.bin && packageJson.bin[file];
      expect(binEntry).toBeDefined();
    });
  });

  test('should be documented in the README.md for each prompt', () => {
    promptsFiles.forEach(file => {
      const isDocumented = readmeContent.includes(file);
      expect(isDocumented).toBe(true);
    });
  });
});