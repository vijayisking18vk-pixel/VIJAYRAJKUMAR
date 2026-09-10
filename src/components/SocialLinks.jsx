import React from 'react';

export const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.21a1.64 1.64 0 1 0 0 3.27 1.64 1.64 0 0 0 0-3.27z"/>
  </svg>
);

export const socialLinks = [
  {
    name: 'X (Twitter)',
    handle: '@bigboy00106926',
    url: 'https://x.com/bigboy00106926',
    icon: XIcon
  },
  {
    name: 'Instagram',
    handle: '@vijayrajkumar_5405',
    url: 'https://www.instagram.com/vijayrajkumar_5405/',
    icon: InstagramIcon
  },
  {
    name: 'Facebook',
    handle: 'Vijayrajkumar',
    url: 'https://www.facebook.com/profile.php?id=61580836342430',
    icon: FacebookIcon
  },
  {
    name: 'LinkedIn',
    handle: 'Vijayraj Kumar',
    url: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/',
    icon: LinkedInIcon
  }
];

export default function SocialLinks({ className = "", compact = false }) {
  if (compact) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {socialLinks.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#E2ECE7] hover:bg-[#203322] text-[#203322] hover:text-white border border-[#85A296] flex items-center justify-center transition-colors shadow-sm"
              title={`${s.name} (${s.handle})`}
              aria-label={s.name}
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
      {socialLinks.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white hover:bg-[#F2F7F4] border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl flex items-center justify-between group transition-all shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#E2ECE7] border border-[#85A296] flex items-center justify-center text-[#203322] group-hover:bg-[#203322] group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111815] block">{s.name}</span>
                <span className="text-[11px] text-[#354E45] font-semibold block">{s.handle}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#203322] group-hover:translate-x-1 transition-all">
              ↗
            </span>
          </a>
        );
      })}
    </div>
  );
}
