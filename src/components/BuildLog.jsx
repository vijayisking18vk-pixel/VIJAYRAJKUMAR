import React, { useState } from 'react';
import { Terminal, Search, Calendar, Clock, Code, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { buildLogsData, buildCategories } from '../data/buildLogsData';

export default function BuildLog() {
  const [selectedTag, setSelectedTag] = useState('ALL_LOGS');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLogId, setExpandedLogId] = useState('LOG-84');

  const filteredLogs = buildLogsData.filter((log) => {
    const matchesTag = selectedTag === 'ALL_LOGS' || log.tags.includes(selectedTag);
    const matchesSearch = 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.takeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <section id="build-log" className="py-20 md:py-32 bg-black text-white border-b border-white/20 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enormous Section Headline */}
        <div className="mb-12 border-b border-white/20 pb-6">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
            <span>SECTION // 03</span>
            <span>WORK-IN-PROGRESS LEDGER</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-poster font-bold text-white tracking-tighter leading-none">
            BUILD LOG
          </h2>
        </div>

        {/* Controls Bar */}
        <div className="poster-card p-4 mb-8 space-y-4 font-poster">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH LOGS (#GOLANG, WEBHOOK, PITCH)..."
                className="w-full pl-10 pr-4 py-2.5 bg-black border border-white/40 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white uppercase"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Tag Pills */}
            <div className="md:col-span-6 flex flex-wrap gap-1.5 font-poster text-xs uppercase tracking-wider">
              {buildCategories.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 border transition-all ${
                    selectedTag === tag
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-black text-neutral-400 border-neutral-800 hover:text-white hover:border-white/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Build Logs Stream */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="poster-card p-12 text-center font-mono text-xs text-neutral-400 uppercase">
              No build log entries match search query "{searchQuery}". Select "ALL_LOGS".
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;

              return (
                <div
                  key={log.id}
                  className={`poster-card transition-all duration-200 ${
                    isExpanded ? 'border-white bg-neutral-950' : 'hover:border-neutral-500'
                  }`}
                >
                  {/* Log Card Header */}
                  <div
                    onClick={() => toggleExpand(log.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <button className="mt-1 p-1 bg-white text-black font-bold shrink-0">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-1">
                          <span className="font-bold text-black bg-white px-2.5 py-0.5 font-poster">
                            {log.id}
                          </span>
                          <span className="text-neutral-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {log.date}
                          </span>
                          <span className="text-neutral-600">|</span>
                          <span className="text-neutral-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {log.timestamp}
                          </span>
                        </div>

                        <h3 className="text-xl font-poster font-bold text-white hover:underline uppercase">
                          {log.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase sm:self-center">
                      {log.tags.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 bg-black text-neutral-300 border border-neutral-800 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Body View */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-neutral-800 space-y-5 animate-fade-in font-display">
                      
                      {/* Summary Box */}
                      <div className="bg-black p-4 border border-white/30 text-xs sm:text-sm text-neutral-200 leading-relaxed font-display">
                        <strong className="font-mono text-xs text-white block mb-1 uppercase font-bold">
                          SUMMARY OF WORK & HURDLE:
                        </strong>
                        {log.summary}
                      </div>

                      {/* Code Snippet Viewport */}
                      {log.codeSnippet && (
                        <div className="bg-neutral-950 border border-white/30 font-mono text-xs">
                          <div className="bg-black px-4 py-2 flex items-center justify-between border-b border-neutral-800 text-[10px]">
                            <span className="text-white font-bold uppercase">{log.snippetLanguage.toUpperCase()} SPEC VIEWPORT</span>
                            <span className="text-neutral-500">READ_ONLY</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-neutral-200 font-mono text-xs leading-relaxed">
                            <code>{log.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {/* Key Takeaway Banner */}
                      <div className="bg-neutral-900 p-4 border border-white text-xs sm:text-sm text-white flex items-start space-x-3">
                        <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-mono text-xs text-white block uppercase font-bold">
                            KEY BUILDER TAKEAWAY:
                          </strong>
                          <span className="font-display">{log.takeaway}</span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
