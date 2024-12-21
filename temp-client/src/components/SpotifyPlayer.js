import React, { useState } from 'react';

const SpotifyPlayer = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const openInSpotify = () => {
    window.open('https://open.spotify.com/track/6Qb7YsAqH4wWFUMbGsCpap', '_blank');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (isMinimized) {
    return (
      <div className="spotify-player-minimized" onClick={toggleMinimize} title="Open Spotify Player">
        <img 
          src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png" 
          alt="Spotify Icon" 
          className="spotify-icon"
        />
      </div>
    );
  }

  return (
    <div className="spotify-player">
      <div className="spotify-header">
        <span className="spotify-title">Spotify Player</span>
        <button 
          className="minimize-button"
          onClick={toggleMinimize}
          aria-label="Minimize player"
          title="Minimize player"
        >
          ×
        </button>
      </div>
      <iframe 
        title="Spotify Player"
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
        aria-label="Listen to full track on Spotify"
      >
        Listen Full Track on Spotify
      </button>
    </div>
  );
};

export default SpotifyPlayer;
