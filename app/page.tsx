import type { Metadata } from "next";
import { MarketingHomePage } from "@/components/marketing/MarketingHomePage";

export const metadata: Metadata = {
  title: "o78 - AI reflection ritual",
  description:
    "The official website for o78, a calm AI ritual experience for symbolic emotional reflection.",
};

export default function HomePage() {
  return <MarketingHomePage />;
}
