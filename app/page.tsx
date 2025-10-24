"use client";

import { useMemo, useState } from 'react';
import { sampleReviews, ReviewItem } from '@/components/sample-data';
import { analyzeSentiment, sentimentToColor, sentimentToLabel } from '@/lib/sentiment';
import { PlatformIcon } from '@/components/platform-icon';
import { clsx } from 'clsx';

export default function Page() {
  const [selectedId, setSelectedId] = useState<string | null>(sampleReviews[0]?.id ?? null);

  const selectedReview = useMemo(() => sampleReviews.find(r => r.id === selectedId) ?? null, [selectedId]);
  const selectedSentiment = useMemo(() => selectedReview ? analyzeSentiment(selectedReview.text) : null, [selectedReview]);

  return (
    <main className="min-h-screen p-6 sm:p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ritam Reviews Dashboard</h1>
          <p className="text-slate-400 text-sm">Unify reviews from Google, MakeMyTrip, Booking.com, and TripAdvisor</p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">Beta</span>
          <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Export CSV</button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - feed */}
        <div className="lg:col-span-5 xl:col-span-4 card-surface rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Recent Reviews</h2>
              <span className="text-xs text-slate-400">({sampleReviews.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <FilterPill label="All" active />
              <FilterPill label=">= 4★" />
              <FilterPill label="Neutral" />
              <FilterPill label="Negative" />
            </div>
          </div>
          <div className="overflow-auto divide-y divide-white/5">
            {sampleReviews.map((review) => {
              const s = analyzeSentiment(review.text);
              const isActive = selectedId === review.id;
              return (
                <button
                  key={review.id}
                  onClick={() => setSelectedId(review.id)}
                  className={clsx(
                    'w-full text-left p-4 hover:bg-white/5 focus:outline-none',
                    isActive && 'bg-white/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <SentimentDot sentiment={s.score} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={review.platform} />
                        <span className="text-sm text-slate-300 truncate max-w-[10rem] sm:max-w-[14rem]">{review.guest}</span>
                        <Stars rating={review.rating} />
                        <span className="text-xs text-slate-500">{review.date}</span>
                      </div>
                      <p className="mt-1 text-slate-300 line-clamp-2">{review.text}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column - details */}
        <div className="lg:col-span-7 xl:col-span-8 card-surface rounded-2xl p-6">
          {selectedReview ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={selectedReview.platform} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{selectedReview.guest}</span>
                      <Stars rating={selectedReview.rating} />
                      <span className="text-xs text-slate-500">{selectedReview.date}</span>
                    </div>
                    <div className="text-xs text-slate-400">Room: {selectedReview.roomType} · Stay: {selectedReview.stayLength} nights</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Reply</button>
                  <button className="rounded-lg bg-brand-500 text-white px-3 py-2 text-sm hover:bg-brand-600">Mark Resolved</button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{selectedReview.text}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card-surface rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">AI Sentiment</h3>
                    {selectedSentiment && (
                      <span className={clsx('badge border', sentimentToColor(selectedSentiment.score).bg, sentimentToColor(selectedSentiment.score).text)}>
                        {sentimentToLabel(selectedSentiment.score)} · {Math.round(selectedSentiment.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  {selectedSentiment && (
                    <div className="mt-3 text-sm text-slate-300">
                      <p className="mb-2">{selectedSentiment.summary}</p>
                      <ul className="list-disc list-inside text-slate-400">
                        {selectedSentiment.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="card-surface rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Suggested Actions</h3>
                    <span className="badge border bg-white/5 text-slate-300">Auto</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedSentiment?.actions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-400"></span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400">Select a review to view details.</div>
          )}
        </div>
      </section>
    </main>
  );
}

function Stars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div className="flex items-center text-yellow-400 text-xs">
      {stars.map((filled, i) => (
        <span key={i}>{filled ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

function FilterPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={clsx('text-xs rounded-full px-2 py-1 border', active ? 'bg-white/10 border-white/20' : 'border-white/10 text-slate-400')}>{label}</span>
  );
}

function SentimentDot({ sentiment }: { sentiment: number }) {
  const color = sentimentToColor(sentiment);
  return <span className={clsx('mt-1 h-2.5 w-2.5 rounded-full inline-block', color.bg, color.ring)} />;
}
