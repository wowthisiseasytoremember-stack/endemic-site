"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ArticleLink({ href, title, delay }: { href: string, title: string, delay: number }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    
    // Dispatch a custom event to tell the parent page to animate out
    window.dispatchEvent(new CustomEvent('navigating-out'));

    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="group relative block overflow-hidden rounded-[2rem] bg-[#080d0b] p-8 ring-1 ring-white/10 transition-colors hover:bg-[#0c1411] cursor-pointer"
    >
      <h2 className="font-display text-2xl font-medium text-white">{title}</h2>
      <div className="mt-6 flex items-center gap-3 text-sm font-medium text-white/40 group-hover:text-white transition-colors">
        <span className="h-px w-6 bg-white/40 group-hover:bg-white transition-colors" />
        Read dispatch
      </div>
    </a>
  );
}
