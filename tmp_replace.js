const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/rgba\(233,\s*69,\s*96,/g, 'rgba(var(--accent-rgb),');
fs.writeFileSync('src/index.css', css);
