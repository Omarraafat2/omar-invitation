
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  LogOut,
  MessageCircle,
  CalendarDays,
  Sparkles,
  Mail,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  language: string;
  created_at: string;
};

export default function AdminGuestbookPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (cancelled) return;

        if (
          authError ||
          !user ||
          user.email !== "omar.raafat@gg.com"
        ) {
          await supabase.auth.signOut();
          router.replace("/admin/login");
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("guestbook")
          .select("id, name, message, language, created_at")
          .order("created_at", { ascending: false });

        if (cancelled) return;

        if (fetchError) throw fetchError;

        setMessages(data ?? []);
      } catch (err) {
        console.error("Fetching guestbook error:", err);

        if (!cancelled) {
          setError("Failed to load messages. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadMessages();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#190a0e] px-5 py-10 text-[#f5e9d6] sm:px-8 lg:px-12">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#c5a16a]/10" />
        <div className="absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full border border-[#c5a16a]/10" />

        <Sparkles className="absolute left-[10%] top-[20%] h-7 w-7 text-[#c5a16a]/20" />
        <Sparkles className="absolute right-[12%] top-[60%] h-10 w-10 text-[#c5a16a]/20" />
      </div>

      <div className="relative mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-12 flex flex-col justify-between gap-6 border-b border-[#c5a16a]/20 pb-8 sm:flex-row sm:items-center">

          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] tracking-[4px] text-[#c5a16a]">
              <Heart size={12} />
              OMAR & AYA
              <Heart size={12} />
            </p>

            <h1 className="font-serif text-4xl font-medium text-[#f5e9d6] sm:text-5xl">
              Guestbook Messages
            </h1>

            <p className="mt-3 text-sm text-[#f5e9d6]/50">
              All the lovely wishes shared by your guests.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 self-start border border-[#c5a16a]/30 px-5 py-3 text-xs tracking-widest text-[#d6b47c] transition hover:border-[#c5a16a] hover:bg-[#c5a16a]/10 sm:self-auto"
          >
            <LogOut size={15} />
            LOG OUT
          </button>
        </header>

        {/* Stats */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-5 border border-[#c5a16a]/20 bg-[#3a2228]/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center bg-[#c5a16a]/10 text-[#d6b47c]">
              <MessageCircle size={22} />
            </div>

            <div>
              <p className="text-xs tracking-widest text-[#f5e9d6]/50">
                TOTAL MESSAGES
              </p>

              <p className="mt-1 text-3xl font-medium text-[#f5e9d6]">
                {loading ? "—" : messages.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border border-[#c5a16a]/20 bg-[#3a2228]/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center bg-[#c5a16a]/10 text-[#d6b47c]">
              <Heart size={22} />
            </div>

            <div>
              <p className="text-xs tracking-widest text-[#f5e9d6]/50">
                SHARED WITH LOVE
              </p>

              <p className="mt-1 text-lg text-[#f5e9d6]">
                Every wish matters ❤️
              </p>
            </div>
          </div>

        </section>

        {/* Messages Section */}
        <section>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#f5e9d6]">
                Your Guest Messages
              </h2>

              <p className="mt-1 text-xs text-[#f5e9d6]/40">
                Messages appear from newest to oldest.
              </p>
            </div>

            <span className="text-xs tracking-widest text-[#c5a16a]">
              {messages.length} MESSAGES
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center border border-[#c5a16a]/20 bg-[#3a2228]/30 py-24">
              <div className="mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#c5a16a]/20 border-t-[#c5a16a]" />

              <p className="text-xs tracking-widest text-[#d6b47c]">
                LOADING YOUR MESSAGES...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="border border-red-400/20 bg-red-400/5 px-6 py-10 text-center"
            >
              <p className="text-sm text-red-300">{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-[#c5a16a]/20 bg-[#3a2228]/30 px-6 py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a16a]/30 text-[#d6b47c]">
                <Mail size={27} />
              </div>

              <h3 className="font-serif text-2xl text-[#f5e9d6]">
                No Messages Yet
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-[#f5e9d6]/50">
                Your guests&apos; lovely wishes will appear here as soon as they
                send their messages.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((item, index) => (
                <article
                  key={item.id}
                  className="group border border-[#c5a16a]/20 bg-gradient-to-br from-[#3a2228]/70 to-[#26151b]/80 p-5 transition duration-300 hover:border-[#c5a16a]/50 sm:p-7"
                  style={{
                    animation: "guestbook-fade-in 0.5s ease both",
                    animationDelay: `${Math.min(index, 10) * 60}ms`,
                  }}
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c5a16a]/30 bg-[#c5a16a]/10 font-serif text-lg text-[#d6b47c]">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-medium text-[#f5e9d6]">
                          {item.name}
                        </h3>

                        <span className="text-[10px] tracking-widest text-[#c5a16a]">
                          GUEST MESSAGE
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#f5e9d6]/40">
                      <CalendarDays size={13} />
                      <time dateTime={item.created_at}>
                        {formatDate(item.created_at)}
                      </time>
                    </div>

                  </div>

                  <div className="border-t border-[#c5a16a]/10 pt-5">
                    <p
                      dir={item.language === "ar" ? "rtl" : "ltr"}
                      className={`whitespace-pre-wrap text-sm leading-8 text-[#f5e9d6]/80 ${
                        item.language === "ar"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {item.message}
                    </p>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Heart
                      size={14}
                      className="text-[#c5a16a]/50 transition group-hover:fill-[#c5a16a]/20 group-hover:text-[#d6b47c]"
                    />
                  </div>
                </article>
              ))}
            </div>
          )}

        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-[#c5a16a]/20 pt-8 text-center">
          <p className="font-serif text-3xl italic text-[#d6b47c]">
            Omar & Aya
          </p>

          <p className="mt-3 text-[9px] tracking-[4px] text-[#c5a16a]/60">
            WITH LOVE, ALWAYS
          </p>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes guestbook-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
