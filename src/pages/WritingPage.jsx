import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 'catering-workers-in-chennai',
    title: 'Catering Workers in Chennai: Where to Hire Verified Workers and Get Catering Jobs in Chennai',
    category: 'Local Gig Economy & Event Staffing',
    date: 'September 2026',
    readTime: '9 min read',
    author: 'Vijayrajkumar',
    authorRole: 'COO & Co-Founder, Ziggers',
    summary: 'Looking for catering workers in Chennai or catering jobs in Chennai? Learn where freshers, daily-wage workers and experienced staff can find verified shifts, and where event hosts can hire reliable catering workers.',
    takeaways: [
      'Informal WhatsApp hiring lacks verification and payment transparency, leading to sudden cancellations, 40%+ worker no-show rates, and wage withholding.',
      'Event organizers can hire verified catering staff—including banquet servers, prep cooks, food packers, bussers, and supervisors—with clear shift parameters.',
      'Job seekers (freshers, students, and experienced supervisors) should verify reporting gates, shift hours, meal/travel provisions, and payment settlement terms before traveling.',
      'Platform-backed escrow and supervisor attendance logging protect daily-wage earnings and eliminate the friction of chasing event hosts after work is completed.'
    ],
    sections: [
      {
        heading: 'The Search for Dependable Catering Work in Chennai',
        paragraphs: [
          'If you search online for catering workers in Chennai, you will find a confusing mix of WhatsApp forwards, old Facebook posts, agency contacts and job advertisements with incomplete details. Some posts promise immediate work. Others advertise daily payment. A few mention wedding catering, industrial catering or hotel work. But many do not clearly explain the employer, venue, shift timing or payment date.',
          'I have spent years working around operations, local businesses and the gig economy in Chennai. Through Ziggers, I have seen both sides of this problem: event organisers who urgently need dependable catering staff, and workers who are ready to work but want a fair opportunity, clear instructions and timely payment.',
          'That is why this guide is personal to me. It is not only about finding a job. It is about building a more dependable way for Chennai’s catering workers and event hosts to meet.'
        ]
      },
      {
        heading: 'The Real Problem with Catering Work in Chennai',
        paragraphs: [
          'Chennai has constant demand for catering staff. Weddings, receptions, corporate meetings, birthday parties, temple functions, apartment events, restaurants, cloud kitchens and industrial cafeterias all require people who can prepare, serve, pack, clean and coordinate food service.',
          'The work is available in many forms. Someone may be searching for a full-time catering job in Chennai. Another person may want a part-time catering job in Chennai after college. A fresher may need a first opportunity. An experienced supervisor may be looking for a longer contract. A family preparing for a marriage may simply need ten servers for one evening.',
          'The difficulty is not always a lack of demand. The difficulty is trust and coordination. Workers often receive a forwarded message without a proper venue address. They travel across the city and discover that the shift has been cancelled. Sometimes the promised amount changes after the work is complete. In other cases, payment is delayed for days or weeks because attendance was not recorded properly or because the person who hired them stops responding.',
          'Event hosts face a different problem. They may need catering workers in Chennai at short notice, but they do not know whether a person is experienced, punctual or available for the complete shift. Calling several unknown contacts during an event emergency is not a reliable staffing system.'
        ]
      },
      {
        heading: 'My Reason for Building a Better Connection Through Ziggers',
        paragraphs: [
          'I believe local work should be simple to understand before a worker accepts it. The worker should know the role, location, shift timing, payment terms and reporting contact. The organiser should know who is arriving and what work that person can do.',
          'This is the thinking behind Ziggers. It connects people looking for flexible work with businesses and event organisers that need local staff. For catering, that can include servers, bussers, kitchen helpers, prep cooks, food-packing workers, cleaners and event support staff.',
          'The goal is not to make unrealistic promises. Job availability changes by date, area, season and employer requirement. Instead, the goal is to make each opportunity clearer and more accountable than a random message in a group.',
          'For employers, Ziggers is a way to hire catering staff in Chennai for weddings, corporate events and private functions. For workers, it can be a place to discover current catering and daily-gig opportunities, complete the required verification and review the assignment before accepting it.'
        ]
      },
      {
        heading: 'Where to Hire Verified Catering Workers in Chennai',
        paragraphs: [
          'If you are organising a wedding, reception, corporate event or private party, you can use the Ziggers catering staffing page for Chennai to explore temporary event staffing. The platform describes access to verified staff, including service professionals and kitchen support, along with identity and background-verification processes.',
          'A practical hiring process should begin with the event details. Share the date, venue area, reporting time, expected shift duration, number of workers, type of work, dress requirements and payment terms. A server for a wedding reception is not the same as a prep cook for a large kitchen. Clear information helps the right people accept the right assignment.'
        ],
        bullets: [
          'Catering servers and banquet staff for guest service and table support.',
          'Kitchen helpers and prep cooks for preparation, packing and basic kitchen assistance.',
          'Food handlers and packing workers for portioning, parcel preparation and distribution.',
          'Bussers and cleaners for clearing tables and maintaining service areas.',
          'Catering supervisors for attendance, team coordination and event execution.',
          'Event support staff for setup, service movement and closing work.'
        ]
      },
      {
        heading: 'How to Get Catering Jobs in Chennai',
        paragraphs: [
          'If you are searching for catering jobs in Chennai, begin by deciding what kind of work suits your current situation. The most suitable role depends on your experience, travel distance, physical capacity, language skills and available hours.'
        ],
        subsections: [
          {
            heading: 'Full-time catering jobs in Chennai',
            paragraphs: [
              'Full-time roles may be available with catering companies, hotels, restaurants, institutional kitchens, marriage halls and industrial food-service providers. Possible positions include cook, kitchen assistant, steward, waiter, catering supervisor, store assistant and catering manager.',
              'Before joining, confirm whether the job includes food, accommodation, uniforms, weekly leave, overtime and any deductions. Do not rely only on a salary number mentioned in an informal post. Ask for the work location, shift schedule, duties and payment date in writing.'
            ]
          },
          {
            heading: 'Part-time and weekend catering jobs in Chennai',
            paragraphs: [
              'A part-time catering job in Chennai may suit students, homemakers, people between jobs or workers who want additional income. Wedding and event work is often concentrated on evenings, weekends and auspicious dates. Some assignments last only one day, while others repeat every week.',
              'For weekend part-time catering jobs in Chennai, check the exact reporting time. A wedding shift may begin several hours before guests arrive and finish after dinner service. Include travel time when deciding whether the payment is worthwhile.'
            ]
          },
          {
            heading: 'Daily payment catering jobs in Chennai',
            paragraphs: [
              'Many workers search for daily payment catering jobs in Chennai because they need fast access to income. Daily payment can mean different things, however. It may mean payment after the shift, payment after attendance approval, payment at the end of a defined cycle or payment through a platform after the assignment is marked complete.',
              'Ask these questions before accepting daily payment work:'
            ],
            bullets: [
              '1. What is the exact amount or calculation for the shift?',
              '2. When will the payment be released?',
              '3. Is supervisor approval required?',
              '4. Are meals, transport or uniform provided?',
              '5. Are there deductions for late arrival, cancellation or equipment?',
              '6. What happens if the event is cancelled after travel?'
            ]
          },
          {
            heading: 'Marriage catering jobs in Chennai',
            paragraphs: [
              'Marriage catering jobs in Chennai are among the most visible sources of short-term work. A single wedding may require servers, kitchen helpers, cleaners, parcel-packing workers and supervisors. The work can be physically demanding, and the shift may start early or end late.',
              'If you are applying for marriage catering work, confirm the venue, reporting gate, dress code, food arrangements and expected end time. If you are hiring workers, communicate whether you need service staff, kitchen staff or a complete event team. Clear role descriptions reduce confusion on the day of the function.'
            ]
          },
          {
            heading: 'Industrial catering jobs in Chennai',
            paragraphs: [
              'Industrial catering jobs in Chennai are different from one-day wedding shifts. They may involve factory canteens, offices, hospitals, hostels or other institutional kitchens. These roles can require regular attendance, food-safety discipline, shift work and coordination with a facility manager.',
              'Workers should ask whether the position is permanent, temporary or contract-based. Employers should explain the roster, weekly rest day, meal arrangements, safety requirements and payment cycle before onboarding.'
            ]
          },
          {
            heading: 'Contract and internship opportunities',
            paragraphs: [
              'Some workers search for contract catering jobs in Chennai, while students and hospitality learners search for catering internships in Chennai. Contract work should include a clear duration and scope. An internship should explain the learning role, hours, supervision and whether any stipend is offered.',
              'Do not assume that "internship" means unpaid work with unlimited hours. Do not assume that "contract" means the same thing as full-time employment. Read the terms and ask questions before committing.'
            ]
          }
        ]
      },
      {
        heading: 'Catering Jobs for Freshers, Supervisors & Managers',
        subsections: [
          {
            heading: 'Catering jobs in Chennai for freshers',
            paragraphs: [
              'There are opportunities for catering workers in Chennai for freshers, particularly in helper, serving, packing, cleaning and event-support roles. Previous experience may be preferred for some positions, but beginners can still be considered when the employer provides instructions and the worker is punctual and willing to learn.',
              'Freshers should focus on listings that clearly state the duties and requirements. A genuine beginner-friendly job should not hide the venue, ask for a large upfront payment or make a salary promise that is impossible to verify.',
              'If you are applying without experience, highlight practical strengths such as punctuality, willingness to work weekends, ability to stand for long periods, basic communication skills and familiarity with your part of Chennai. These details can matter for event work.'
            ]
          },
          {
            heading: 'Catering manager and supervisor jobs in Chennai',
            paragraphs: [
              'Experienced professionals may be searching for catering manager jobs in Chennai or catering supervisor jobs in Chennai. These roles usually involve more than serving food. They may include staff allocation, vendor coordination, kitchen-to-service communication, stock checks, guest-service standards, attendance and issue resolution.',
              'A supervisor can make a major difference to an event because workers need one clear point of contact. The employer should define decision-making authority and escalation procedures. The supervisor should know the approved headcount, shift plan and payment-record process.'
            ]
          }
        ]
      },
      {
        heading: 'The Payment Lesson I Do Not Want Workers to Learn the Hard Way',
        paragraphs: [
          'Denied and delayed payments are not minor inconveniences for a daily-wage worker. If a worker completes an eight-hour event shift and payment is withheld, the loss can affect rent, food, travel and family expenses.',
          'I have seen how quickly trust disappears when a worker is told, "I will pay you tomorrow," and tomorrow becomes next week. I have also seen organisers become frustrated when a team member leaves because the payment expectation was never written down.',
          'The solution is simple in principle: agree before the shift, record attendance, confirm completion and make the payment process visible. Technology cannot remove every dispute, but a structured workflow can reduce misunderstandings and create a record of what was accepted.',
          'Workers should keep the job details, reporting instructions, supervisor name and payment terms. Employers should confirm the number of workers, approved rate and completion status. Neither side should depend only on a verbal promise.'
        ]
      },
      {
        heading: 'Checklist Before Accepting Any Catering Job & Chennai Locations',
        subsections: [
          {
            heading: 'What to check before accepting any catering job',
            paragraphs: [
              'Before travelling, verify the employer or platform, exact venue, reporting time, shift duration, role, payment calculation and contact person. Ask whether the work involves lifting, outdoor heat, late-night travel or special clothing.',
              'Do not share Aadhaar, bank details, passwords or private documents in a public WhatsApp group. Use the official application process or a verified employer channel. Be especially careful with messages that demand money before revealing the job location.',
              'If the work is cancelled, ask how travel expenses and cancellation terms are handled. If you are an employer, cancel as early as possible and do not leave workers waiting at a venue without an update.'
            ]
          },
          {
            heading: 'Chennai areas where catering work frequently appears',
            paragraphs: [
              'Catering and event work can appear across Chennai and nearby suburbs, including Anna Nagar, Velachery, Taramani, Guindy, OMR, Tambaram, Chromepet, Porur, Ambattur, ECR and other growing residential and commercial areas. Availability changes continuously, so an old post should not be treated as a current vacancy.',
              'Search by the area you can realistically reach. A job that looks attractive on paper may not be suitable if the travel cost and time consume most of the payment. Confirm the exact venue before accepting the shift.'
            ]
          },
          {
            heading: 'A better future for Chennai’s catering workers',
            paragraphs: [
              'Chennai’s catering industry depends on people whose work is often invisible until they are absent. Servers, cooks, helpers, packers, cleaners and supervisors are what make an event run smoothly. They deserve clear work information and timely payment.',
              'Event hosts also deserve a dependable way to find staff when demand changes quickly. This is the gap Ziggers is trying to address: bringing workers and organisers together through a more organised local marketplace.',
              'The best catering job is not always the one with the biggest advertised amount. It is the one with clear duties, realistic travel, respectful treatment and a payment process that both sides understand.'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions About Catering Jobs in Chennai',
        faqs: [
          {
            question: 'Where can I find catering workers in Chennai?',
            answer: 'You can search through verified staffing marketplaces, established catering companies, hotels, marriage halls and trusted local employers. Ziggers offers a Chennai catering staffing route for employers who need temporary event workers and for workers looking for local gig opportunities.'
          },
          {
            question: 'Are there catering jobs in Chennai for freshers?',
            answer: 'Yes, some employers consider freshers for serving, kitchen-helper, packing, cleaning and event-support roles. Requirements vary, so read the current listing and confirm the duties before applying.'
          },
          {
            question: 'Are daily payment catering jobs in Chennai genuine?',
            answer: 'Some are genuine, but "daily payment" does not always mean instant cash after the shift. Confirm the amount, approval process, payment date and deductions. Never pay an unexplained upfront fee to obtain a job.'
          },
          {
            question: 'How can I find marriage catering jobs in Chennai?',
            answer: 'Look for current listings from catering companies, event staffing platforms and wedding venues. Confirm the venue, shift timing, role, dress code and payment terms before travelling.'
          },
          {
            question: 'Can I hire catering workers for one day in Chennai?',
            answer: 'Yes. One-day staffing is common for weddings, receptions, corporate events and private parties. Share the event date, location, headcount, roles and shift timing when requesting staff.'
          },
          {
            question: 'How can I contact catering workers in Chennai?',
            answer: 'Use a verified staffing platform or a recognised employer channel instead of relying on random contact numbers forwarded through social media. Protect personal documents and confirm the job before sharing sensitive information.'
          }
        ]
      },
      {
        heading: 'Final Word & References',
        paragraphs: [
          'The search for catering services in Chennai, catering service jobs in Chennai, catering boy jobs in Chennai, catering services part-time jobs in Chennai and catering workers in Chennai contact numbers all points to the same underlying need: a trustworthy connection between local work and local people.',
          'As someone building Ziggers from Chennai, I want that connection to be clearer. Workers should not have to chase payment after completing honest work. Event organisers should not have to depend on unknown contacts when their function is approaching.',
          'Verified identity, clear shift information and a transparent payment process are practical steps toward solving that problem. That is the standard I believe Chennai’s catering and gig-work ecosystem should move toward.',
          'Are you looking for catering workers in Chennai, or are you a worker looking for your next catering shift? Start with a verified listing, confirm the terms and choose work where both sides know what to expect.'
        ],
        references: [
          {
            title: 'Hire Catering Staff in Chennai — Ziggers',
            url: 'https://www.ziggers.in/',
            note: 'Official Ziggers Catering Staffing Portal'
          },
          {
            title: '10th and 12th Pass Part-Time Jobs in Chennai for Freshers — Ziggers',
            url: 'https://www.ziggers.in/',
            note: 'Ziggers Student & Fresher Shift Opportunities'
          },
          {
            title: 'Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai',
            url: '/about/',
            note: 'About the Author & Background'
          },
          {
            title: 'Ziggers Staffing App on Google Play',
            url: 'https://play.google.com/',
            note: 'Mobile Application for Shift Check-In & Escrow Payouts'
          }
        ]
      }
    ]
  },
  {
    id: 'gig-marketplace-chennai',
    title: 'Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups',
    category: 'Marketplace Mechanics & Labor Ops',
    date: 'February 2026',
    readTime: '6 min read',
    author: 'Vijayrajkumar',
    authorRole: 'COO & Co-Founder, Ziggers',
    summary: 'Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for building two-sided liquidity without cash burn.',
    takeaways: [
      'WhatsApp lacks escrow, resulting in 40%+ worker no-show rates and employer wage withholding.',
      'Trust in Indian blue/gray-collar hiring is not reputational; it is liquidity-guaranteed via automated shift escrows.',
      'Offline hyper-local campus blitzes outperform paid digital ads for high-frequency shift supply.'
    ],
    sections: [
      {
        heading: 'The Fragmented Reality of Urban Gig Hiring',
        body: 'Walk into any event venue, logistics warehouse, or catering setup in Chennai, and the labor force was almost certainly coordinated through an unmonitored WhatsApp group. While WhatsApp is zero-friction to start, it possesses zero accountability. Employers post shift timings and rates; workers RSVP with thumbs-up emojis; on the day of the event, up to 45% fail to show up.'
      },
      {
        heading: 'The Mechanics of Verified Escrow',
        body: 'When building Ziggers, our first realization was that neither party trusted the other. Employers feared paying for workers who would leave midway; workers feared not getting paid after completing their shift. We structured the platform around geo-fenced check-ins and escrow locks: the employer deposits the shift wage into escrow upfront, and the worker receives payout upon verified supervisor sign-off.'
      },
      {
        heading: 'Bootstrapping Liquidity in Chennai',
        body: 'Rather than spending capital on Facebook or Google ads, we went directly on-site to university campuses and vocational centers across Chennai. By engaging high-intent students seeking flexible weekend earnings and guaranteeing same-day payout settlements, we generated organic marketplace density.'
      }
    ]
  },
  {
    id: 'ai-persistent-context-architecture',
    title: 'Designing Persistent Context & Memory Architecture for AI Agents',
    category: 'AI Infrastructure & Cognitive Systems',
    date: 'January 2026',
    readTime: '8 min read',
    author: 'Vijayrajkumar',
    authorRole: 'COO & Co-Founder, LoopMemory',
    summary: 'The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories into large prompt windows causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.',
    takeaways: [
      'Large context windows do not equal comprehension; attention decay degrades reasoning over lengthy prompts.',
      'Episodic memory must be parsed into declarative facts and stored in knowledge graph triples.',
      'Temporal decay functions ensure obsolete session variables do not pollute current agent decision-making.'
    ],
    sections: [
      {
        heading: 'The Fallacy of the 1-Million Token Prompt',
        body: 'With model providers expanding context windows, many developers assumed the memory problem was solved: just feed the entire chat history back into the LLM on every turn. In practice, this creates severe latency, massive cost penalties, and attention degradation ("lost in the middle"). Agents get confused by outdated user instructions from three days prior.'
      },
      {
        heading: 'Hierarchical Memory Decomposition',
        body: 'At LoopMemory, we architected a tripartite memory model: Working Memory (active prompt context), Episodic Memory (raw chronological turn logs), and Semantic Graph Memory (extracted entities, preferences, and verified beliefs). Raw conversational turns pass through an extraction pipeline that updates a developer-queried knowledge graph.'
      },
      {
        heading: 'Decay, Pruning, and Relevance Scoring',
        body: 'Human brains forget for a reason. AI agents similarly require deterministic forgetting curves. By scoring memories based on recency, retrieval frequency, and semantic relevance, LoopMemory surfaces only the high-signal context an agent needs to execute its next tool call.'
      }
    ]
  },
  {
    id: 'geopolitics-defence-venture-building',
    title: 'From Geopolitics and Defence Strategy to Startup Venture Studios',
    category: 'Strategy, Game Theory & Operations',
    date: 'December 2025',
    readTime: '7 min read',
    author: 'Vijayrajkumar',
    authorRole: 'COO & Co-Founder, Unfounded',
    summary: 'How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution, competitive defensibility, and rapid vibe coding.',
    takeaways: [
      'Startup competition is asymmetric warfare; small nimble teams must exploit incumbents\' rigid coordination costs.',
      'Information asymmetry is both a liability and an opportunity in marketplace creation.',
      'Studying linguistic nuances (Hindi literature) alongside defence strategy reveals how narratives shape real-world incentives.'
    ],
    sections: [
      {
        heading: 'Asymmetric Advantage in Early-Stage Building',
        body: 'During my studies in Defence and Strategic Studies at SRMIST, one principle stood out repeatedly: smaller actors never defeat established powers by matching their conventional armor. They win through asymmetric speed, decentralized operational autonomy, and unconventional maneuvering. In startup terms, this is why a 2-person studio using vibe coding tools can out-iterate an enterprise engineering department with 50 managers.'
      },
      {
        heading: 'OODA Loops in Venture Studios',
        body: 'John Boyd\'s OODA Loop (Observe, Orient, Decide, Act) is the ultimate operating framework for venture building. At Unfounded, we run rapid cycles: observe user friction in the market, orient using historical patterns and system mechanics, decide on a minimal prototype, and act by deploying working code within 48 hours.'
      },
      {
        heading: 'Language, Narrative, and Cultural Cohesion',
        body: 'Pairing defence strategy with an MA in Hindi Literature taught me that systems are governed by the stories people believe. Whether convincing an investor at a pitchfest, onboarding the first 100 gig workers, or aligning a co-founding team, strategic narrative is the catalyst that transforms raw code into a living institution.'
      }
    ]
  }
];

export default function WritingPage({ initialArticleId = null }) {
  const [selectedArticle, setSelectedArticle] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      if (path === '/catering-workers-in-chennai') {
        return articles.find((a) => a.id === 'catering-workers-in-chennai') || null;
      }
      const match = window.location.pathname.match(/\/writing\/([a-z0-9-]+)\/?/i);
      const targetId = initialArticleId || (match ? match[1] : null);
      if (targetId) {
        return articles.find((a) => a.id === targetId) || null;
      }
    }
    return initialArticleId ? articles.find((a) => a.id === initialArticleId) || null : null;
  });

  // Sync state with browser back/forward buttons
  React.useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      if (path === '/catering-workers-in-chennai') {
        setSelectedArticle(articles.find((a) => a.id === 'catering-workers-in-chennai') || null);
        return;
      }
      const match = window.location.pathname.match(/\/writing\/([a-z0-9-]+)\/?/i);
      if (match && match[1]) {
        const found = articles.find((a) => a.id === match[1]);
        setSelectedArticle(found || null);
      } else {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const openArticle = (art, e) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return; // Allow new tab
    if (e) e.preventDefault();
    setSelectedArticle(art);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/writing/${art.id}/`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeArticle = (e) => {
    if (e) e.preventDefault();
    setSelectedArticle(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/writing/');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          {selectedArticle ? (
            <>
              <a href="/writing/" onClick={closeArticle} className="hover:text-[var(--color-accent-primary)]">Writing</a>
              <span>/</span>
              <span className="text-[var(--color-text-primary)] font-semibold truncate max-w-[280px]">{selectedArticle.title}</span>
            </>
          ) : (
            <span className="text-[var(--color-text-primary)] font-semibold">Writing &amp; Research</span>
          )}
        </nav>

        {/* Article Reader (Article-First View) */}
        {selectedArticle ? (
          <article className="space-y-10 border-2 border-[#7A968B] bg-white p-8 sm:p-12 rounded-3xl shadow-md animate-in fade-in duration-200">
            <a
              href="/writing/"
              onClick={closeArticle}
              className="text-xs font-bold text-[#203322] hover:underline inline-flex items-center space-x-1"
            >
              <span>← Back to all essays</span>
            </a>

            <div className="space-y-4 border-b border-[#7A968B]/30 pb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#111815] leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#2A3E34] font-medium">
                <a href="/about/" className="font-bold text-[#203322] hover:underline flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedArticle.author}</span>
                </a>
                <span>•</span>
                <span className="font-semibold text-[#354E45]">{selectedArticle.authorRole}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-[#E2ECE7] border-2 border-[#85A296] rounded-2xl p-6 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#111815]">Key Takeaways</h2>
              <ul className="space-y-2 text-sm text-[#1D2B24]">
                {selectedArticle.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-[#203322] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-10 text-[#1D2B24] leading-relaxed text-base">
              {selectedArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl font-bold text-[#111815]">{section.heading}</h2>
                  )}
                  {section.body && (
                    <p className="text-[#1D2B24] leading-relaxed font-normal">{section.body}</p>
                  )}
                  {section.paragraphs && section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[#1D2B24] leading-relaxed font-normal">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-2">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start space-x-2 text-sm sm:text-base text-[#1D2B24]">
                          <span className="text-[#203322] font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.numberedList && (
                    <ol className="space-y-2 pl-2">
                      {section.numberedList.map((n, nIdx) => (
                        <li key={nIdx} className="flex items-start space-x-3 text-sm sm:text-base text-[#1D2B24]">
                          <span className="font-bold text-[#203322] shrink-0">{nIdx + 1}.</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {section.subsections && (
                    <div className="space-y-6 pt-2">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-3 p-5 sm:p-6 bg-[#F4F8F5] border border-[#A6BFB3] rounded-2xl">
                          <h3 className="text-lg font-bold text-[#111815]">{sub.heading}</h3>
                          {sub.paragraphs && sub.paragraphs.map((p, spIdx) => (
                            <p key={spIdx} className="text-[#1D2B24] leading-relaxed text-sm sm:text-base">{p}</p>
                          ))}
                          {sub.bullets && (
                            <ul className="space-y-1.5 pl-2 pt-1">
                              {sub.bullets.map((b, sbIdx) => (
                                <li key={sbIdx} className="flex items-start space-x-2 text-sm text-[#1D2B24]">
                                  <span className="text-[#203322] font-bold mt-0.5">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {section.faqs && (
                    <div className="space-y-4 pt-2">
                      {section.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-5 sm:p-6 bg-[#F4F8F5] border border-[#A6BFB3] rounded-2xl space-y-2">
                          <h3 className="text-base sm:text-lg font-bold text-[#111815] flex items-start space-x-2">
                            <span className="text-[#203322] font-bold">Q:</span>
                            <span>{faq.question}</span>
                          </h3>
                          <p className="text-sm sm:text-base text-[#1D2B24] pl-6 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.references && (
                    <div className="space-y-3 pt-2">
                      <ul className="space-y-2 list-none pl-0">
                        {section.references.map((ref, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm text-[#2A3E34] flex flex-wrap items-center gap-x-2">
                            <span className="font-mono text-[#203322] font-semibold">[{rIdx + 1}]</span>
                            {ref.url ? (
                              <a
                                href={ref.url}
                                target={ref.url.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="font-semibold underline hover:text-[#111815]"
                              >
                                {ref.title}
                              </a>
                            ) : (
                              <span className="font-medium text-[#111815]">{ref.title}</span>
                            )}
                            {ref.note && <span className="text-xs text-[#4A6458]">({ref.note})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Single Compact Author Bio (~45 words) */}
            <div className="p-6 bg-[#E2ECE7] border-2 border-[#85A296] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#354E45]">About the Author</span>
                <h3 className="text-base font-bold text-[#111815]">Vijayrajkumar</h3>
                <p className="text-xs text-[#1D2B24] max-w-xl font-normal leading-relaxed">
                  Vijayrajkumar is a Chennai-based Chief Operating Officer &amp; Co-Founder at Unfounded, Ziggers, and LoopMemory, operating across gig-economy marketplace mechanics and persistent AI context infrastructure.
                </p>
              </div>
              <a
                href="/about/"
                className="shrink-0 px-4 py-2 bg-[#203322] text-white text-xs font-bold rounded-full hover:bg-[#111815] transition-colors shadow-sm"
              >
                About Vijayrajkumar →
              </a>
            </div>

            <div className="pt-6 border-t border-[#7A968B]/30 flex justify-between items-center">
              <button
                onClick={closeArticle}
                className="px-5 py-2.5 bg-[#203322] text-white text-xs font-semibold rounded-full hover:bg-[#111815] transition-colors shadow-sm"
              >
                Close Article
              </button>
              <a
                href="/contact/"
                className="text-xs font-bold text-[#203322] hover:underline"
              >
                Discuss this essay with me →
              </a>
            </div>
          </article>
        ) : (
          /* Writing Index View */
          <div className="space-y-12">
            <div className="space-y-4 border-b border-[#7A968B]/40 pb-10">
              <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bold shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-[#1B2F21]" />
                <span>Articles &amp; Strategic Insights</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111815] leading-tight">
                Vijayrajkumar — Writing &amp; Strategic Research
              </h1>

              <p className="text-lg text-[#1D2B24] leading-relaxed max-w-3xl font-medium">
                First-party essays on building urban gig marketplaces in India, architecting cognitive AI memory layers, and applying strategic defence doctrines to startup venture incubation.
              </p>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
            {articles.map((art) => (
              <a
                key={art.id}
                href={`/writing/${art.id}/`}
                onClick={(e) => openArticle(art, e)}
                className="block p-8 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-md transition-all cursor-pointer group space-y-4 no-underline text-inherit"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
                    {art.category}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-[#2A3E34] font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#203322]" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#203322]" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#111815] group-hover:text-[#203322] leading-snug transition-colors">
                  {art.title}
                </h2>

                <p className="text-sm text-[#1D2B24] leading-relaxed">
                  {art.summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#203322]">
                    {art.author} · {art.authorRole}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-[#203322] group-hover:translate-x-1 transition-transform">
                    <span>Read complete essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      </main>

      <Footer />
    </div>
  );
}
