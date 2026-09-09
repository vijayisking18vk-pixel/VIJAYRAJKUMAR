import React from 'react';
import SpotlightCard from './SpotlightCard';
import DecryptedText from './DecryptedText';

export default function MagicBento({ cards = [] }) {
  const defaultCards = [
    {
      title: "VENTURE ENGINE",
      desc: "Parallel venture creation, student digital ID, and asynchronous event streams.",
      tag: "CORE MATRIX",
      colSpan: "col-span-1 lg:col-span-2"
    },
    {
      title: "HARDWARE SECURE ENCLAVE",
      desc: "OS-level biometric keys, encrypted keystores, and anti-tamper runtime checks.",
      tag: "SECURITY",
      colSpan: "col-span-1"
    },
    {
      title: "EVENT-DRIVEN UPI PAY",
      desc: "Asynchronous backend validation, low-latency PostgreSQL transactions.",
      tag: "FINTECH",
      colSpan: "col-span-1"
    },
    {
      title: "STUDENT AI MEMORY",
      desc: "Controlled backend orchestration and student context graph augmentation.",
      tag: "AI ORCHESTRATION",
      colSpan: "col-span-1 lg:col-span-2"
    }
  ];

  const items = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {items.map((item, idx) => (
        <SpotlightCard
          key={idx}
          className={`${item.colSpan || 'col-span-1'} border border-white/30 bg-neutral-950 p-6 flex flex-col justify-between hover:border-white transition-all`}
        >
          <div className="space-y-3">
            <div className="inline-block font-mono text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-widest">
              {item.tag}
            </div>
            <h3 className="text-2xl font-bold font-poster uppercase tracking-tight text-white">
              <DecryptedText text={item.title} speed={40} />
            </h3>
            <p className="text-sm font-display text-neutral-300 leading-relaxed">
              {item.desc}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>[SYS-ITEM 0{idx + 1}]</span>
            <span className="text-white hover:underline cursor-pointer">INSPECT →</span>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
