import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import RecordSearch from "@/components/RecordSearch";

export const metadata = getSEOTags({
    title: `Privacy Policy | ${config.appName}`,
    canonicalUrlRelative: "/privacy-policy",
  });

export default async function Search() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search Page</h1>
        <RecordSearch />
      </section>
    </main>
  );
};