'use client'

import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import RecordSearchForm from "@/components/RecordSearchForm";
import  React,  { useState } from "react";
import { Album } from "../transfer-objects/Album";
import { Pagination } from "../transfer-objects/Pagination";
import AlbumTile from "@/components/AlbumTile";
import LookUpForm from "@/components/LookUpForm";


export default function Search() {

  const server = process.env.NEXT_PUBLIC_SERVER;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [collection, setCollection] = useState<Album[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  const handleRecordSearch = (newAlbums: Album[], newPagination: Pagination) => {
      setAlbums(newAlbums);
      setPagination(newPagination);
      setSearchAttempted(true);
  };

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search Page</h1>
        <LookUpForm onRecordSearch={handleRecordSearch} />
        {albums.length > 0 && <AlbumTile album={albums[0]} />}
      </section>
    </main>
  );
}