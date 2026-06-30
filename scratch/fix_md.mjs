import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      let content = fs.readFileSync(path.join(dir, file), 'utf8');
      
      // Reduce headings inside inventory to bold
      if (dir.includes('inventory')) {
        content = content.replace(/^### (.*)$/gm, '**$1**');
        content = content.replace(/^#### (.*)$/gm, '**$1**');
      }
      
      // Improve spacing
      content = content.replace(/\n{3,}/g, '\n\n');
      
      fs.writeFileSync(path.join(dir, file), content);
    }
  }
}

processDir('c:/Users/pjste/OneDrive/Escritorio/Project-CreatingThings/src/assets/documents/inventory');
processDir('c:/Users/pjste/OneDrive/Escritorio/Project-CreatingThings/src/assets/documents/system');
console.log('Markdown formatted successfully.');
