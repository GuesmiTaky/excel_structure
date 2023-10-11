import React from 'react';
import YouTube from 'react-youtube';
import './videoPlayer.css'

const VideoPlayerYoutube = ({ lienVideo }) => {

    const url = new URL(lienVideo);
    const videoId = url.searchParams.get('v');

    const handleVideoReady = (event) => {
        event.target.pauseVideo();
    };

    return (
        <div>
            <div className='title'>
                Regarder la video
            </div>
            <div className="conteneur-video">
                <YouTube videoId={videoId} opts={{ playerVars: { autoplay: 1 } }} onReady={handleVideoReady} />
            </div>
        </div>

    );

};

export default VideoPlayerYoutube;
