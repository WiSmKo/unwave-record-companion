"use server"

import { revalidatePath } from "next/cache";
import { searchDiscogs, getDiscogsMasterRelease, getPriceSuggestion } from "@/libs/discogs";

export interface ReleaseData {
    image: string;
    title: string;
    artists: string[];
    year: number; 
    noOfTracks: number;
    noForSale: number;
    originalPriceSuggestion: number;
    latestPriceSuggestion: number;
    genres: string[];
}

export async function findRelease(title: string, artist: string): Promise<ReleaseData> {

    console.log(`Finding release with query - title: ${title}, artist: ${artist}`);
    
    const type = "release";
    const format = "vinyl,album";

    const searchResponse = await searchDiscogs(artist, title, type, format);
    const discogsMaster = await getDiscogsMasterRelease(searchResponse.results[0].master_id);
    const originalPriceSuggestion = await getPriceSuggestion(discogsMaster.main_release); // mainReleasePriceSuggestion,
    const latestPriceSuggestion = await getPriceSuggestion(discogsMaster.most_recent_release);

    const findRecordResponse:ReleaseData = {
        image: discogsMaster.images[0].uri,
        title: discogsMaster.title,
        artists: discogsMaster.artists.map(artist => artist.name),
        year: discogsMaster.year,
        noOfTracks: discogsMaster.tracklist.length,
        noForSale: discogsMaster.num_for_sale,
        originalPriceSuggestion: originalPriceSuggestion, // mainReleasePriceSuggestion,
        latestPriceSuggestion:latestPriceSuggestion, // latestReleasePriceSuggestion,
        genres: discogsMaster.genres.concat(discogsMaster.styles)
    };

    revalidatePath("/");
    return findRecordResponse;
}