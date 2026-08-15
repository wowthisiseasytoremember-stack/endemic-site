import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  
  useEffect(() => {
    // 1. Gather all H2 and H3 elements in the article
    const headingElements = Array.from(document.querySelectorAll('article.article-flow h2, article.article-flow h3'));
    
    setHeadings(
      headingElements.map((h) => ({
        id: h.id,
        text: h.textContent || '',
        level: h.tagName.toLowerCase() === 'h2' ? 2 : 3,
      }))
    );

    // 2. Setup Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          // Update active heading to the one at the top of the viewport
          setActiveHeading(intersecting[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    
    headingElements.forEach(h => observer.observe(h));
    
    // 3. Setup scroll progress tracking
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress(Math.min(Math.max((scrollY / totalHeight) * 100, 0), 100));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return { progress, activeHeading, headings };
}
