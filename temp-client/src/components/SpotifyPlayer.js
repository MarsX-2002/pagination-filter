import React from 'react';

const SpotifyPlayer = () => {
  const openInSpotify = () => {
    window.open('https://open.spotify.com/track/6Qb7YsAqH4wWFUMbGsCpap', '_blank');
  };

  return (
    <div className="spotify-player">
      <iframe 
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/6Qb7YsAqH4wWFUMbGsCpap?utm_source=generator&theme=0" 
        width="100%" 
        height="352" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      />
      <button 
        className="open-spotify-btn"
        onClick={openInSpotify}
      >
        Listen Full Track on Spotify
      </button>
    </div>
  );
};

export default SpotifyPlayer;
