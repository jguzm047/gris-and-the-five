"use client";

import { useEffect, useState } from "react";

const birthday = new Date(2026, 5, 18);

type Language = "en" | "es";

function currentAge(language: Language) {
  const today = new Date();
  const days = Math.max(0, Math.floor((today.getTime() - birthday.getTime()) / 86_400_000));

  if (days < 14) return language === "en"
    ? `${days} day${days === 1 ? "" : "s"} old`
    : `${days} día${days === 1 ? "" : "s"} de edad`;
  if (days < 84) {
    const weeks = Math.floor(days / 7);
    return language === "en" ? `${weeks} weeks old` : `${weeks} semanas de edad`;
  }

  let months = (today.getFullYear() - birthday.getFullYear()) * 12 + today.getMonth() - birthday.getMonth();
  if (today.getDate() < birthday.getDate()) months -= 1;
  if (months < 24) return language === "en" ? `${months} months old` : `${months} meses de edad`;

  const years = Math.floor(months / 12);
  return language === "en"
    ? `${years} year${years === 1 ? "" : "s"} old`
    : `${years} año${years === 1 ? "" : "s"} de edad`;
}

export default function AgeBadge({ language }: { language: Language }) {
  const [age, setAge] = useState(language === "en" ? "Age updates automatically" : "La edad se actualiza automáticamente");
  useEffect(() => setAge(currentAge(language)), [language]);
  return <small>{age}</small>;
}
