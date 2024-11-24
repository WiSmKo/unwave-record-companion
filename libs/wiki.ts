import wiki, { wikiSearchResult, wikiSummary } from "wikipedia";

const BASE_URL = "https://api.wikimedia.org/core/v1/";
const WIKIPEDIA_SEARCH = "wikipedia/en/search/page"
const WIKIPEDIA_PAGE = "wikipedia/en/page/"

export async function getWikiSummary(title: string): Promise<wikiSummary> {
    try {  
        const summary = await wiki.summary(title);
        return summary;
    } catch (error) {
        console.error(error);
        throw new Error("Error searching Wikipedia");
    }
}

export async function searchWiki(query: string): Promise<wikiSearchResult> {
    try {
        const results = await wiki.search(query);
        return results;
    } catch (error) {
        console.error(error);
        throw new Error("Error searching Wikipedia");
    }
} 


export async function findWikiTitle(title: string, artist: string) {
    
    const params = new URLSearchParams({
        q: `${artist}, ${title}`, 
        limit: "5"
    });

    try {

        const response = await fetch(`${BASE_URL}${WIKIPEDIA_SEARCH}?${params}`, {
            headers: {
                "User-Agent": "Unwave Network/1.0 (william@unwave.net)", 
                "Accept": "application/json"
            },
        })

        const data = await response.json();
        console.log(data);
        return data.pages[0].title

    } catch (error) {
        console.error(error);
        throw new Error("Error searching Wikipedia");
    }
}

export async function getWikiPage(title: string) {
    
    try {

        const response = await fetch(`${BASE_URL}${WIKIPEDIA_PAGE}${title}`, {
            headers: {
                "User-Agent": "Unwave Network/1.0 (william@unwave.net)", 
                "Accept": "application/json"
            },
        })

        const data = await response.json();
        console.log(data);
        return data.source

    } catch (error) {
        console.error(error);
        throw new Error("Error searching Wikipedia");
    }
    
} 