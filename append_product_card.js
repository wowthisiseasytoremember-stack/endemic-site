const fs = require('fs');
const file = 'src/components/mdx/ServerArticleComponents.tsx';
let content = fs.readFileSync(file, 'utf8');
content += `\nexport interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    price: string;
    thumbnail: string;
    route: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <a href={product.route} target="_blank" rel="noopener nofollow sponsored" className="glass rounded-xl p-4 border border-white/10 group hover:border-emerald/50 transition-colors flex flex-col h-full">
      <div className="aspect-square w-full rounded-lg bg-black/40 mb-4 overflow-hidden relative">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white/20">No Image</div>
        )}
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-medium text-white group-hover:text-emerald transition-colors line-clamp-2">
          {product.name}
        </span>
        <div className="mt-auto pt-3">
          <span className="text-sm font-bold text-emerald">{product.price}</span>
        </div>
      </div>
    </a>
  );
}\n`;
fs.writeFileSync(file, content);
