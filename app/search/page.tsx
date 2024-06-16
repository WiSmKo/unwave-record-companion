import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import RecordSearchForm from "@/components/RecordSearchForm";

export const metadata = getSEOTags({
    title: `Search Tool | ${config.appName}`,
    canonicalUrlRelative: "/search-tool",
  });

export default async function Search() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search Page</h1>
        <RecordSearchForm />
      </section>
    </main>
  );
}