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
          className="flex items-center justify-between p-4 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-xl transition-all shadow-sm group font-sans text-xs"
        >
          <span className="font-bold text-[#111815] group-hover:text-[#203322]">
            {item.title}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#203322] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </motion.a>
      ))}
    </div>
  );
}
