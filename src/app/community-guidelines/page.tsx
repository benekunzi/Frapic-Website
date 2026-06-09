import type { Metadata } from "next";
import CommunityGuidelines from "@/components/CommunityGuidelines";

export const metadata: Metadata = {
  title: "Community Guidelines | Frapic",
  description:
    "Learn what content is allowed and forbidden on Frapic. Available in multiple languages.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
      <CommunityGuidelines />
    </main>
  );
}
