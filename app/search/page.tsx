'use client'

import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import  React,  { useState } from "react";
import AlbumTile from "@/app/search/components/AlbumTile";
import LookUpForm from "@/app/search/components/RecordSearchForm";
import { set } from "mongoose";
import { ReleaseData } from "./search-service";


export default function Search() {


  const [findRecordResponse, setRecordResponse] = useState<ReleaseData>();
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  const handleRecordSearch = (findRecordResponse: ReleaseData) => {
      setRecordResponse(findRecordResponse);
      setSearchAttempted(true);
  };

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search Page</h1>
        <LookUpForm onRecordSearch={handleRecordSearch} />
        {searchAttempted && <AlbumTile findRecordResponse={findRecordResponse} />}
      </section>
    </main>
  );
}