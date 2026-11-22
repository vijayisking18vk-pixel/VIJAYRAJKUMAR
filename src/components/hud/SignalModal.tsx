import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Check } from 'lucide-react';

interface SignalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignalModal: React.FC<SignalModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:contact@daas.media?subject=Transmission%20from%20${encodeURIComponent(
      name || 'Explorer'
    )}&body=${encodeURIComponent(message + '\n\nSender: ' + email)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020005]/85 backdrop-blur-xl select-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-lg w-full bg-[#0B011A] border-2 border-[#9D00FF]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(157,0,255,0.3)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#A89BB9] hover:text-[#F8ECFF] bg-[#020005] border border-[#9D00FF]/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-mono text-[#D147FF] mb-2">
              <Terminal className="w-4 h-4 text-[#D147FF]" />
              <span>DIRECT DISPATCH // R. VIJAYRAJKUMAR</span>
            </div>

            <h3 className="font-monumental text-2xl font-bold text-[#F8ECFF] mb-1">
              SEND SIGNAL
            </h3>
            <p className="font-editorial text-xs text-[#A89BB9] mb-6">
              Transmissions route directly to founder frequency (<span className="text-[#F8ECFF]">contact@daas.media</span>).
            </p>

            {sent ? (
              <div className="p-6 rounded-xl bg-[#020005] border border-[#D147FF] text-center font-mono text-xs text-[#D147FF] flex flex-col items-center space-y-2">
                <Check className="w-6 h-6 text-[#D147FF]" />
                <span className="font-bold">SIGNAL TRANSMITTED // FREQUENCY OPEN</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#A89BB9]/80 uppercase text-[10px] mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name or organization"
                    className="w-full bg-[#020005] border border-[#9D00FF]/40 rounded-lg px-3.5 py-2.5 text-[#F8ECFF] focus:border-[#D147FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A89BB9]/80 uppercase text-[10px] mb-1">
                    CONTACT EMAIL / HANDLE
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#020005] border border-[#9D00FF]/40 rounded-lg px-3.5 py-2.5 text-[#F8ECFF] focus:border-[#D147FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A89BB9]/80 uppercase text-[10px] mb-1">
                    TRANSMISSION
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="State your venture inquiry, collaboration, or dispatch..."
                    className="w-full bg-[#020005] border border-[#9D00FF]/40 rounded-lg px-3.5 py-2.5 text-[#F8ECFF] focus:border-[#D147FF] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9D00FF] to-[#D147FF] text-[#020005] font-bold tracking-widest hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
