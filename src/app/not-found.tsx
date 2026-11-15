
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#190a0e] px-5 py-12 text-[#f5e9d6]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#c5a16a]/10" />
        <div className="absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full border border-[#c5a16a]/10" />

        <Sparkles className="absolute left-[12%] top-[20%] h-7 w-7 text-[#c5a16a]/30" />
        <Sparkles className="absolute right-[15%] top-[65%] h-9 w-9 text-[#c5a16a]/20" />

        <span className="absolute left-[25%] top-[70%] text-2xl text-[#c5a16a]/20">
          ✦
        </span>
        <span className="absolute right-[25%] top-[18%] text-3xl text-[#c5a16a]/20">
          ✧
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-xl border border-[#c5a16a]/35 bg-gradient-to-br from-[#382127]/90 to-[#241319]/95 px-7 py-14 text-center shadow-2xl shadow-black/30 sm:px-14"
      >
        {/* Ornament */}
        <div className="mb-8 text-lg tracking-[10px] text-[#c5a16a]">
          ✦ ❦ ✦
        </div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-serif text-[110px] font-light leading-none text-[#c5a16a] sm:text-[145px]"
        >
          404
        </motion.div>

        <div className="my-7 flex items-center justify-center gap-4 text-[#c5a16a]">
          <span className="h-px w-14 bg-[#c5a16a]/40" />
          <Heart size={17} />
          <span className="h-px w-14 bg-[#c5a16a]/40" />
        </div>

        {/* Message */}
        <p className="mb-3 text-[10px] tracking-[5px] text-[#c5a16a]">
          LOST IN THE MOMENT?
        </p>

        <h1 className="mb-4 font-serif text-3xl font-medium text-[#f5e9d6] sm:text-4xl">
          Oops! This Page Is Missing
        </h1>

        <p className="mx-auto max-w-sm text-sm leading-8 text-[#f5e9d6]/60">
          Looks like this page wandered away.
          <br />
          Don&apos;t worry, our beautiful celebration is still waiting for you.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mx-auto mt-9 inline-flex min-h-[52px] items-center justify-center gap-3 bg-gradient-to-r from-[#b18b52] to-[#d0ad72] px-8 text-[10px] font-semibold tracking-[2px] text-[#211014] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#c5a16a]/20"
        >
          <ArrowLeft size={16} />
          BACK TO HOME
        </Link>

        {/* Couple Names */}
        <div className="mt-12 border-t border-[#c5a16a]/15 pt-8">
          <p className="font-serif text-4xl italic text-[#d6b47c]">
            Omar & Aya
          </p>

          <p className="mt-3 text-[9px] tracking-[4px] text-[#c5a16a]/60">
            26 NOVEMBER 2026
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 text-[9px] tracking-[3px] text-[#c5a16a]/40">
        <Heart size={11} />
        WITH LOVE, OMAR & AYA
        <Heart size={11} />
      </div>
    </main>
  );
}
