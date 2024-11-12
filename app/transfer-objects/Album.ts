export interface Album {
    id: string;
    artist: string;
    title: string;
    thumb: string;
    country: string;
    year: string;
    priceSuggestion?: number;
}