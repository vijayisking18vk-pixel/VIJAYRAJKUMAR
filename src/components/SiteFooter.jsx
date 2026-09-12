import React from 'react';

export default function SiteFooter({ text }) {
  return (
    <footer className="w-full border-t border-[#E5E2DC] bg-[#F7F6F3] py-8 px-6 sm:px-8 mt-auto">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm text-[#525B56] leading-relaxed m-0">
          {text}
        </p>
      </div>
    </footer>
  );
}
