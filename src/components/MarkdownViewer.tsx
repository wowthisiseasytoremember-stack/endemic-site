"use client";

import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';

export function MarkdownViewer({ content }: { content: string }) {
  // We use whileInView so elements animate up as you scroll to them, 
  // and viewport once: true so they only do it once.
  const commonMotionProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <ReactMarkdown
      components={{
        h1: ({node, ref, ...props}: any) => <motion.h1 {...commonMotionProps} {...props} />,
        h2: ({node, ref, ...props}: any) => <motion.h2 {...commonMotionProps} {...props} />,
        h3: ({node, ref, ...props}: any) => <motion.h3 {...commonMotionProps} {...props} />,
        p: ({node, ref, ...props}: any) => <motion.p {...commonMotionProps} {...props} />,
        blockquote: ({node, ref, ...props}: any) => <motion.blockquote {...commonMotionProps} {...props} />,
        ul: ({node, ref, ...props}: any) => <motion.ul {...commonMotionProps} {...props} />,
        ol: ({node, ref, ...props}: any) => <motion.ol {...commonMotionProps} {...props} />,
        li: ({node, ref, ...props}: any) => <motion.li {...commonMotionProps} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
