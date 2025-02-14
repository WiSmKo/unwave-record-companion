const SpotifyEmbed = () => {
    return (
      <section className="bg-neutral text-neutral-content" id="podcast">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">
        <h2 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">Latest Episode</h2>
        <iframe 
        style={{borderRadius: '12px'}} 
        src="https://open.spotify.com/embed/show/2Dz35XyiHlehlQujgyiO1K?utm_source=generator&theme=0" 
        width="100%" 
        height="352" 
        frameBorder="0" 
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"></iframe>
        </div>
      </section>
    );
  };
  
  export default SpotifyEmbed;