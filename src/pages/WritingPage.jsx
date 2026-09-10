import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 'gig-marketplace-chennai',
    title: 'Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups',
    category: 'Marketplace Mechanics & Labor Ops',
    date: 'February 2026',
    readTime: '6 min read',
    author: 'COO & Co-Founder, Ziggers',
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
    author: 'COO & Co-Founder, LoopMemory',
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
    author: 'COO & Co-Founder, Unfounded',
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

export default function WritingPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <a href="/" className="hover:text-neutral-950">Home</a>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Writing & Research</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-neutral-900" />
            <span>Articles & Strategic Insights</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Writing, Engineering & Venture Strategy
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            First-party perspectives on building marketplace infrastructure in India, architecting cognitive AI memory layers, and applying strategic defence doctrines to startup venture incubation.
          </p>
        </div>

        {/* Article Reader Modal / Full View */}
        {selectedArticle ? (
          <article className="space-y-10 border border-neutral-200 bg-neutral-50 p-8 sm:p-12 rounded-3xl animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center space-x-1"
            >
              <span>← Back to all articles</span>
            </button>

            <div className="space-y-4 border-b border-neutral-200 pb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-800">{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Key Takeaways</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                {selectedArticle.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-neutral-800 leading-relaxed text-base">
              {selectedArticle.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl font-bold text-neutral-950">{section.heading}</h3>
                  <p className="text-neutral-600 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-neutral-950 text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
              >
                Close Article
              </button>
              <a
                href="/contact/"
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 underline"
              >
                Discuss this essay with me →
              </a>
            </div>
          </article>
        ) : (
          /* Articles List */
          <div className="space-y-8">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="p-8 bg-neutral-50 border border-neutral-200 rounded-2xl hover:border-neutral-400 transition-all cursor-pointer group space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {art.category}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-neutral-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-neutral-950 group-hover:underline leading-snug">
                  {art.title}
                </h2>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {art.summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-700">
                    {art.author}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-neutral-950 group-hover:translate-x-1 transition-transform">
                    <span>Read complete essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
