import { Suspense } from 'react'

import Header from "@/components/Header";

import Hero from "@/components/Hero";

import SpotifyEmbed from '@/components/SpotifyEmbed';

import Footer from "@/components/Footer";

import RecordSearchForm from '@/components/RecordSearchForm';


export default function Home() {

  return (

    <>

      <Suspense>

        <Header />

      </Suspense>

      <main>

        <Hero />

        <RecordSearchForm />

        <SpotifyEmbed />

      </main>

      <Footer />

    </>

  );

}
