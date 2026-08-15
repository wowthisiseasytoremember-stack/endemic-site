const fs = require('fs');

const files = [
  'src/components/mdx/EditorialComponents.tsx',
  'src/components/mdx/ServerArticleComponents.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-brand-surface\/50/g, 'glass');
  content = content.replace(/bg-brand-surface\/30/g, 'bg-white/10 backdrop-blur');
  content = content.replace(/bg-brand-surface/g, 'glass border-white/10');
  content = content.replace(/border-brand-raised/g, 'border-white/10');
  content = content.replace(/text-brand-text/g, 'text-white');
  content = content.replace(/text-brand-muted/g, 'text-white/60');
  content = content.replace(/text-brand-accent/g, 'text-aqua glow-text-aqua');
  content = content.replace(/border-brand-accent/g, 'border-aqua');
  content = content.replace(/bg-brand-dark/g, 'bg-[#040908]');
  
  // some cleanups
  content = content.replace(/glass border-white\/10 rounded-r-lg/g, 'glass rounded-r-lg');
  content = content.replace(/glass border-white\/10 border-l-4/g, 'glass border-l-4');
  
  fs.writeFileSync(file, content);
});
console.log('Restored glassmorphism and neon colors.');
