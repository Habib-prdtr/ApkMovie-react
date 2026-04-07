const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content.replace(/#e94560/g, 'var(--accent)');
      newContent = newContent.replace(/e94560/g, '2563eb');
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Replaced in ' + fullPath);
      }
    }
  }
}

try {
  replaceInDir('src');
  console.log('Done replacement');
} catch (e) {
  console.error(e);
}
