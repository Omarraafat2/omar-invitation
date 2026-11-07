
"use client";

import { motion } from "framer-motion";

type Props = {
  language: "en" | "ar";
};

export default function InvitationMessage({ language }: Props) {
  const isArabic = language === "ar";

  return (
    <section className="message-section" dir={isArabic ? "rtl" : "ltr"}>
      <motion.div
        className="message-section__content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
      >
        <span className="section-eyebrow">
          {isArabic ? "دعوة من القلب" : "A SPECIAL INVITATION"}
        </span>

        <div className="section-ornament">✦ ❦ ✦</div>

        <h2>
          {isArabic
            ? "بداية حكاية جديدة"
            : "A New Chapter Begins"}
        </h2>

        <p>
          {isArabic
            ? "بكل الحب والسعادة، يسعدنا دعوتكم لمشاركتنا فرحة خطوبتنا. وجودكم معنا يجعل هذه اللحظة أكثر جمالًا وخصوصية."
            : "With love and happiness, we invite you to celebrate the beginning of our new journey. Your presence will make this special moment even more meaningful."}
        </p>

        <div className="message-section__names">
          Omar <span>&</span> Aya
        </div>

        <span className="message-section__closing">
          {isArabic ? "في انتظاركم بكل حب" : "WITH LOVE, OMAR & AYA"}
        </span>
      </motion.div>
    </section>
  );
}
