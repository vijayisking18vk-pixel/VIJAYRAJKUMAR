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
            className="flex items-center space-x-2.5 bg-[#E2ECE7] border border-[#85A296] px-4 py-2 rounded-full font-sans text-xs text-[#1B2F21] hover:border-[#203322] hover:text-[#111815] hover:bg-white transition-all shadow-sm cursor-pointer font-bold"
          >
            {Icon && <Icon className="w-4 h-4 text-neutral-900 shrink-0" />}
            <span className="font-medium tracking-normal">{item.label}</span>
          </Component>
        );
      })}
    </div>
  );
}
