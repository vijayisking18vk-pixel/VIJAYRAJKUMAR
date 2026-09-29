import React from 'react';
export default function Footer() {
 return <footer className="district-footer">
   <div className="footer-topline"><span>MISSION FILE COMPLETE</span><span>THERE’S ALWAYS ANOTHER STREET.</span></div>
   <div className="footer-main"><div><a href="/" className="footer-brand">Vijayrajkumar</a><p>Operator. Builder. Explorer.<br/>Chennai, Tamil Nadu, India.</p></div>
   <nav aria-label="Footer navigation"><a href="/about/">About</a><a href="/ventures/">Ventures</a><a href="/events/">Events</a><a href="/writing/">Writing</a><a href="/contact/">Contact</a></nav>
   <div className="footer-contact"><span>START SOMETHING GOOD.</span><a href="mailto:vijaykumarunfounded@gmail.com">Let's talk ↗</a><a href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} VIJAYRAJKUMAR</span><a href="/">← RETURN TO THE DISTRICT</a><button onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>BACK TO TOP ↑</button></div>
 </footer>;
}
