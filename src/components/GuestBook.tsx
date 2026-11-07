"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Heart, Send, CheckCircle2 } from "lucide-react";

type Props = {
  language: "en" | "ar";
};

export default function GuestBook({ language }: Props) {
  const isArabic = language === "ar";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error("Missing Web3Forms access key");
      }

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name.trim(),
            message: message.trim(),
            language,
            subject: `New GuestBook Message from ${name.trim()}`,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitted(true);
      setName("");
      setMessage("");
    } catch (err) {
      console.error("GuestBook submission error:", err);

      setError(
        isArabic
          ? "حصلت مشكلة أثناء إرسال رسالتك. حاول مرة تانية."
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="guestbook-section"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <motion.div
        className="guestbook-section__content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">
          {isArabic
            ? "اتركوا لنا رسالة"
            : "KINDLY LEAVE US A NOTE"}
        </span>

        <div className="guestbook-section__ornament">
          ✦ ❦ ✦
        </div>

        <h2>
          {isArabic ? "رسالة صغيرة لنا" : "Guest Book"}
        </h2>

        <p className="guestbook-section__description">
          {isArabic
            ? "وجودكم هو أجمل هدية لينا. سيبوا لنا كلمة حلوة أو أمنية جميلة نحتفظ بيها."
            : "Your presence is our greatest joy. Leave us your wishes and kind words as we begin this beautiful journey together."}
        </p>

        {submitted ? (
          <motion.div
            className="guestbook-success"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="guestbook-success__icon">
              <Heart size={28} />
            </div>

            <h3>
              {isArabic
                ? "شكرًا على محبتكم!"
                : "Thank You for Your Love!"}
            </h3>

            <p>
              {isArabic
                ? "رسالتكم وصلت وهتفضل ذكرى جميلة لينا ❤️"
                : "Your lovely message means so much to us. We'll treasure it forever. ❤️"}
            </p>

            <button
              type="button"
              className="guestbook-another"
              onClick={() => setSubmitted(false)}
            >
              {isArabic ? "إرسال رسالة أخرى" : "Leave Another Message"}
            </button>
          </motion.div>
        ) : (
          <form
            className="guestbook-form"
            onSubmit={handleSubmit}
          >
            <label className="guestbook-form__field">
              <span>
                {isArabic ? "اسمك" : "YOUR NAME"}
              </span>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder={
                  isArabic ? "اكتب اسمك هنا..." : "Enter your name..."
                }
                maxLength={100}
                autoComplete="name"
                required
                disabled={loading}
              />
            </label>

            <label className="guestbook-form__field">
              <span>
                {isArabic
                  ? "رسالة للعروسين"
                  : "YOUR WISHES FOR THE COUPLE"}
              </span>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder={
                  isArabic
                    ? "اكتب رسالتك أو أمنيتك الجميلة..."
                    : "Write your wishes and kind words..."
                }
                rows={5}
                maxLength={1000}
                required
                disabled={loading}
              />
            </label>

            {error && (
              <motion.p
                className="guestbook-error"
                role="alert"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="guestbook-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="guestbook-spinner" />
              ) : (
                <Send size={16} />
              )}

              <span>
                {loading
                  ? isArabic
                    ? "جاري الإرسال..."
                    : "SENDING..."
                  : isArabic
                    ? "أرسل بمحبة"
                    : "SEND WITH LOVE"}
              </span>
            </button>
          </form>
        )}

        <div className="guestbook-section__footer">
          <Heart size={13} />
          <span>
            {isArabic
              ? "بكل الحب، عمر وآية"
              : "WITH LOVE, OMAR & AYA"}
          </span>
          <Heart size={13} />
        </div>
      </motion.div>
    </section>
  );
}