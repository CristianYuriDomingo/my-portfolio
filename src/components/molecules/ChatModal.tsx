'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_MESSAGE_LENGTH = 400;

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<
    { id: string; role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  // Honeypot field — real users never see or fill this, bots that
  // auto-fill every input often will.
  const [website, setWebsite] = useState('');

  // Timestamp for when the modal was opened, used for a basic
  // "too fast to be human" check on the server.
  const openedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = Date.now();
    }
  }, [isOpen]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: trimmed,
    };

    setMessages((p) => [...p, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const elapsedMs = openedAtRef.current
        ? Date.now() - openedAtRef.current
        : undefined;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history,
          website, // honeypot — should always be empty for real users
          elapsedMs,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const fallback =
          data?.message ||
          data?.error ||
          'Hmm, something went wrong on my end. Try again in a bit?';
        setMessages((p) => [
          ...p,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallback,
          },
        ]);
        return;
      }

      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "Can't reach the server right now. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sans = { fontFamily: 'var(--font-geist-sans)' };
  const eyebrow = 'text-[10px] tracking-[0.22em] uppercase text-navy/35';
  const remaining = MAX_MESSAGE_LENGTH - input.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-[500px] h-[600px] bg-white border border-navy/10 shadow-[0_24px_60px_-12px_rgba(20,29,56,0.25)] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start px-8 pt-7 pb-6 border-b border-navy/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-[6px] w-[6px]">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy/40" />
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-navy" />
                    </span>
                    <p className={eyebrow} style={{ ...sans, fontWeight: 300 }}>
                      AI Assistant
                    </p>
                  </div>
                  <h2
                    className="text-[28px] leading-none tracking-tight text-navy"
                    style={{ ...sans, fontWeight: 700 }}
                  >
                    Ask{' '}
                    <span
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                      }}
                    >
                      Me
                    </span>
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close chat"
                  className="group -mt-1 -mr-2 w-9 h-9 flex items-center justify-center rounded-full text-navy/40 hover:text-navy hover:bg-navy/[0.06] transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-3">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <p className={eyebrow} style={{ ...sans, fontWeight: 300 }}>
                      (Start)
                    </p>
                    <p
                      className="text-[20px] text-navy/70"
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                      }}
                    >
                      What would you like to know?
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-3 text-[13px] ${
                            msg.role === 'user'
                              ? 'bg-navy text-white'
                              : 'border border-navy/10 text-navy'
                          }`}
                          style={sans}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex gap-1 border border-navy/10 px-4 py-3 w-fit">
                        <span className="w-1.5 h-1.5 bg-navy/40 animate-pulse" />
                        <span
                          className="w-1.5 h-1.5 bg-navy/40 animate-pulse"
                          style={{ animationDelay: '0.2s' }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-navy/40 animate-pulse"
                          style={{ animationDelay: '0.4s' }}
                        />
                      </div>
                    )}
                    <div ref={end} />
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-navy/10 px-8 py-6">
                <div className="flex items-center justify-between mb-2">
                  <p className={eyebrow} style={{ ...sans, fontWeight: 400 }}>
                    Message
                  </p>
                  {input.length > 0 && (
                    <p
                      className={`text-[10px] tabular-nums ${
                        remaining < 0 ? 'text-red-500' : 'text-navy/30'
                      }`}
                      style={sans}
                    >
                      {remaining}
                    </p>
                  )}
                </div>

                {/* Honeypot field — visually and structurally hidden from
                    real users, left here for bots that blindly fill forms. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))
                    }
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Type here..."
                    disabled={loading}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className="flex-1 border border-navy/15 bg-white px-4 py-3 text-[13px] text-navy placeholder:text-navy/40 outline-none focus:border-navy/40 focus:ring-1 focus:ring-navy/15 transition-colors"
                    style={sans}
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="w-11 h-11 bg-navy text-white hover:opacity-90 active:scale-[0.97] disabled:opacity-40 transition-all flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-navy/30"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
