"use client";

import Link from "next/link";

interface Product {
  slug: string;
  name: string;
  color: string;
}

interface Props {
  products: Product[];
}

export default function ExploreProductsStrip({ products }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[44px] flex items-center"
          style={{ borderColor: "var(--line)", color: "var(--ink2)" }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = p.color;
            e.currentTarget.style.color = p.color;
            e.currentTarget.style.background = `${p.color}12`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--line)";
            e.currentTarget.style.color = "var(--ink2)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          {p.name}
        </Link>
      ))}
    </div>
  );
}
