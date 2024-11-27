
/**
 * Fetches the master release from the Discogs API, given a master ID.
 * @param masterId The master ID of the release to fetch.
 * @returns A promise that resolves with the fetched DiscogsMaster object.
 */
export async function getDiscogsMasterRelease(masterId: number): Promise<DiscogsMaster> {
    
    const response = await fetch(`https://api.discogs.com/masters/${masterId.toString()}`, {
        headers: {
            Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
        }
    });
    const result = await response.json();
    return result;

}

/**
 * Performs a search on the Discogs database for records matching the specified criteria.
 * @param artist The name of the artist to search for.
 * @param title The title of the record to search for.
 * @param type The type of release to search for (e.g., "release").
 * @param format The format of the release to search for (e.g., "vinyl,album").
 * @returns A promise that resolves with a DiscogsPaginatedSearchResult containing the search results.
 */
export async function searchDiscogs(artist: String, title: String, type: String, format: String): Promise<DiscogsPaginatedSearchResult> {
    try{
        const queryParams = {
            type: "release",
            format: "vinyl",
            title: title,
            artist: artist,
        }

        const queryString = buildQuery(queryParams);

        const searchResponse = await fetch(`https://api.discogs.com/database/search?${queryString}`, {
            headers: {
                Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
            }
        });
        const results = await searchResponse.json();
        return results;
    } catch (error) {
        console.error(error);
        throw new Error("Error searching Discogs");
    }
}

export async function getPriceSuggestion(discogsId: number): Promise<number> {
    if(!discogsId) throw new Error("No Discogs ID provided");

    try{
        console.log(`Getting price suggestion for Discogs ID: ${discogsId}`);
        const priceResponse = await fetch(`https://api.discogs.com/marketplace/price_suggestions/${discogsId.toString()}`, {
            headers: {
                Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
            }
        });
        const result = await priceResponse.json();
        console.log(result);
        const vgPlusCondition = result["Very Good Plus (VG+)"]; // Directly accessing the VG+ condition, we can modify this later to accept a parameter here and filter condition by the input
        return vgPlusCondition ? vgPlusCondition.value : null;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting price suggestion");
    }
}

export async function getRating(discogsId: number): Promise<DiscogsRatingResponse> {

    if(!discogsId) throw new Error("No Discogs ID provided");

    try{
        console.log(`Getting rating for Discogs ID: ${discogsId}`);
        const ratingResponse = await fetch(`https://api.discogs.com/releases/${discogsId.toString()}/rating`, {
            headers: {
                Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
            }
        });
        const result = await ratingResponse.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting rating");
    }
}

//This helper method is used to build the search query takng a map of parameters as input.
function buildQuery(parameters: Record<string, any>): string{

    const urlSearchParams = new URLSearchParams();
    for(const [key, value] of Object.entries(parameters)){
        if (value !== undefined){
            urlSearchParams.append(key, value);
        }
    }

    return urlSearchParams.toString();
}

export interface DiscogsRatingResponse{
    rating: {
        count: number;
        average: number;
    }
}

interface DiscogsPaginatedSearchResult {
    pagination: {
      page: number;
      pages: number;
      per_page: number;
      items: number;
      urls: Record<string, string>;
    };
    results: DiscogsItem[];
  }

interface DiscogsItem {
    country: string;
    year: string;
    format: string[];
    label: string[];
    type: string;
    genre: string[];
    style: string[];
    id: number;
    barcode: string[];
    user_data: {
      in_wantlist: boolean;
      in_collection: boolean;
    };
    master_id: number;
    master_url: string;
    uri: string;
    catno: string;
    title: string;
    thumb: string;
    cover_image: string;
    resource_url: string;
    community: {
      want: number;
      have: number;
    };
    format_quantity: number;
    formats: DiscogsFormat[];
}
  
interface DiscogsFormat {
    name: string;
    qty: string;
    descriptions: string[];
}

interface Image {
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
}
  
interface Track {
    position: string;
    type_: string;
    title: string;
    extraartists: any[]; // Adjust this if more details on `extraartists` are needed
    duration: string;
}
  
interface Artist {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
}
  
interface Video {
    uri: string;
    title: string;
    description: string | null;
    duration: number;
    embed: boolean;
}
  
export interface DiscogsMaster {
    id: number;
    main_release: number;
    most_recent_release: number;
    resource_url: string;
    uri: string;
    versions_url: string;
    main_release_url: string;
    most_recent_release_url: string;
    num_for_sale: number;
    lowest_price: number;
    images: Image[];
    genres: string[];
    styles: string[];
    year: number;
    tracklist: Track[];
    artists: Artist[];
    title: string;
    data_quality: string;
    videos: Video[];
}