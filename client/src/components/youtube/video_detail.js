import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Search here</div>;
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className='video-detail'>
            <div className='embed-responsive-16by9'>
                <iframe className='embed-responsive-item' src={url} />
            </div>
            <div className='details'>
                <div>{video.snippet.title}</div>
            </div>
        </div>
    );
};

export default VideoDetail;