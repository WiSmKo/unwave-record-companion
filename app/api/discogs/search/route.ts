export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get("artist");
    const title = searchParams.get("title");
    const type = "release";
    const format = "vinyl,album";

    const response = await fetch(`https://api.discogs.com/database/search?type=${type}&format=${format}&artist=${artist}&title=${title}`, {
        headers: {
            Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
        }
    });
    const data = await response.json();

    return Response.json(data);

}