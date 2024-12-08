'use client'

import  React,  { useState } from "react";
import AlbumTile from "@/app/search/components/AlbumTile";
import LookUpForm from "@/app/search/components/RecordSearchForm";
import { ReleaseData } from "./search-service";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Currency, currencyOptions } from "@/types/currency";


export default function Search() {

  const [findRecordResponse, setRecordResponse] = useState<ReleaseData>();
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.USD);


  const handleRecordSearch = (findRecordResponse: ReleaseData) => {
      setRecordResponse(findRecordResponse);
      setSearchAttempted(true);
  };

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8 flex justify-end"> 
        <CurrencySelector onCurrencyChange={handleCurrencyChange} />
      </section>
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Crate Mole</h1>
        Crate mole is a companion for record collectors. Intended to be a tool to use when you&#39;re out in real record stores, fairs, car boots or charity shops.
        Designed to give you an insight into those intriguing records you come across on your search.
        <LookUpForm onRecordSearch={handleRecordSearch} />
        {searchAttempted && (
          <AlbumTile 
            findRecordResponse={findRecordResponse} 
            selectedCurrency={selectedCurrency}/>
        )}
      </section>
    </main>
  );
}