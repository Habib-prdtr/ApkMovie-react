const fs = require('fs');
try {
  let css = fs.readFileSync('src/index.css', 'utf8');
  const count = (css.match(/233/g) || []).length;
  console.log(`Found ${count} instances, replacing...`);
  
  css = css.replace(/rgba\(233,\s*69,\s*96,/g, 'rgba(var(--accent-rgb),');
  
  const countAfter = (css.match(/233/g) || []).length;
  console.log(`After replace, remaining 233s: ${countAfter}`);
  
  fs.writeFileSync('src/index.css', css);
  console.log('Success writng index.css');
} catch(e) {
  console.error('Error', e);
}
