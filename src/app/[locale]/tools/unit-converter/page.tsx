// app/[locale]/tools/unit-converter/page.tsx
"use client";

import React from "react";
import Converter from "./components/Converter";
import { useTranslations } from "next-intl";

export default function UnitConverterPage() {
  const t = useTranslations("UnitConverterPage");

  return (
    <div className="w-full bg-base-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-accent mb-6">
        {t("description") || "Unit Converter"}
      </h1>
      <Converter />
    </div>
  );
}
