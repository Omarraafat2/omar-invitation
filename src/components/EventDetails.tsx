
"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

type Props = {
  language: "en" | "ar";
};

export default function EventDetails({
  language,
}: Props) {
  const isArabic = language === "ar";
  const locationUrl = "https://maps.app.goo.gl/zNBtxn4d1quEU8Gc9";
    const details = [
    {
      icon: CalendarDays,
      label: isArabic ? "التاريخ" : "DATE",
      value: isArabic ? "الخميس، 26 نوفمبر 2026" : "Thursday, November 26, 2026",
    },
    {
      icon: Clock3,
      label: isArabic ? "الميعاد" : "TIME",
      value: isArabic ? "الساعة 6 مساءً" : "6:00 PM",
    },
    {
      icon: MapPin,
      label: isArabic ? "المكان" : "VENUE",
      value: isArabic ? "في منزلنا" : "At Our Home",
    },
  ];

  return (
    <section
      className="event-section"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <motion.div
        className="event-section__content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">
          {isArabic ? "تفاصيل المناسبة" : "THE CELEBRATION"}
        </span>

        <h2>
          {isArabic ? "نتمنى وجودكم معنا" : "Join Our Celebration"}
        </h2>

        <div className="event-section__card">
          {details.map(({ icon: Icon, label, value }) => (
            <div className="event-detail" key={label}>
              <div className="event-detail__icon">
                <Icon size={23} strokeWidth={1.4} />
              </div>

              <div className="event-detail__text">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </div>

        {locationUrl ? (
   <a
   href={locationUrl}
   target="_blank"
   rel="noopener noreferrer"
   className="event-section__map-button"
 >
   {isArabic ? "افتح الموقع على الخريطة" : "GET DIRECTIONS"}
 </a>
        ) : (
          <p className="event-section__map-note">
            {isArabic
              ? "رابط الموقع سيتم إضافته قريبًا"
              : "Location link will be available soon"}
          </p>
        )}
      </motion.div>
    </section>
  );
}
