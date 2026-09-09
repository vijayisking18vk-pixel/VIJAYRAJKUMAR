import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function BounceCards({
  links = [],
  className = ''
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
      {links.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="flex items-center justify-between p-4 bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl transition-all shadow-card-clean hover:shadow-card-hover group font-sans text-xs"
        >
          <span className="font-medium text-neutral-900 group-hover:text-black">
            {item.title}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </motion.a>
      ))}
    </div>
  );
}
