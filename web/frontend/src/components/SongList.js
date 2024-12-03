import React, { useState, useEffect } from 'react';
import config from "../Config.json"
function SongList({ endpoint, title }) {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            fetch(config.python_url+`/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setSongs(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching songs from ${title}:`, err);
                setIsLoading(false);
            });
        } else {
            console.log('User not logged in.');
            setIsLoading(false);
        }
    }, [endpoint, title]);

    const openYoutubeLink = (url) => {
        window.open(url, '_blank');
    };
    if (isLoading) {
        return <div className="container mt-5 text-center"><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>;
    }

    return (
        
        <div className="container mt-5">
            <div className="row justify-content-center">
                {songs.map(song => (
                    <div key={song.id} className="col-lg-4 mb-4" onClick={() => openYoutubeLink(song.youtube_link)}>
                        <div className="card feature-card h-100" style={{ cursor: "pointer" }}>
                            <div className="card-body">
                            <h3 className="card-title">{song.title}</h3>
                            <h4 className="text-muted">{song.artist}</h4>
                            <p className="small">{song.album}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongList;
