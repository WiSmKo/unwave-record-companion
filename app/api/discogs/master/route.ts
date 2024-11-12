export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const response = await fetch(`https://api.discogs.com/masters/${id}`, {
        headers: {
            Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
        }
    });
    const data = await response.json();
    return Response.json(data);

    
}