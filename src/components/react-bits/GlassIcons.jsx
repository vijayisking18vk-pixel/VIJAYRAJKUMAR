import React from 'react';
import { motion } from 'framer-motion';

export default function GlassIcons({
  items = [],
  className = ''
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        const Component = item.href ? motion.a : motion.div;
        const props = item.href
          ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
          : {};

        return (
          <Component
            key={idx}
            {...props}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2.5 bg-neutral-50/80 backdrop-blur-md border border-neutral-200 px-4 py-2 rounded-full font-sans text-xs text-neutral-700 hover:border-neutral-400 hover:text-neutral-950 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            {Icon && <Icon className="w-4 h-4 text-neutral-900 shrink-0" />}
            <span className="font-medium tracking-normal">{item.label}</span>
          </Component>
        );
      })}
    </div>
  );
}
