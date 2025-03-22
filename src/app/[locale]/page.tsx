"use client";

import React, { useRef } from "react";
import ToolCard from "./components/Tool-Card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("HomePage");
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-base-100 flex flex-col py-10 w-full">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content flex-col text-center">
          <h1 className="text-6xl font-extrabold text-accent mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-info mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <p className="text-lg text-base-content mb-8 max-w-3xl mx-auto">
            {t("heroDescription")}
          </p>
          <p className="text-md text-secondary mb-8 max-w-3xl mx-auto">
            {t("usageInstructions")}
          </p>
          <button onClick={scrollToTarget} className="btn btn-primary">
            {t("ctaButton")}
          </button>
        </div>
      </section>

      {/* Tools Overview Section */}
      <section ref={targetRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-accent mb-8 text-center">
            {t("toolsOverviewTitle")}
          </h2>
          <p className="text-lg text-info mb-8 text-center">
            {t("toolsOverviewSubtitle")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ToolCard
              title={t("toolCard1Title")}
              description={t("toolCard1Description")}
              href={`/unit-converter`}
            />
            <ToolCard
              title={t("toolCard2Title")}
              description={t("toolCard2Description")}
              href={`/file-converter`}
            />
            <ToolCard
              title={t("toolCard3Title")}
              description={t("toolCard3Description")}
              href={`/password-generator`}
            />
            <ToolCard
              title={t("toolCard4Title")}
              description={t("toolCard4Description")}
              href={`/qr-code-generator`}
            />
            <ToolCard
              title={t("toolCard5Title")}
              description={t("toolCard5Description")}
              href={`/tip-calculator`}
            />
            <ToolCard
              title={t("toolCard6Title")}
              description={t("toolCard6Description")}
              href={`/json-validator`}
            />
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-12 px-4 bg-base-100 rounded-md">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-accent mb-4">
            {t("additionalTitle")}
          </h3>
          <p className="text-lg text-info mb-8">{t("additionalDescription")}</p>
          <Link
            className="btn btn-secondary"
            href={"https://github.com/louisgundelwein/toolboxes"}
          >
            {t("learnMoreButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
