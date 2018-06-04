import React from 'react';

const VideoItem = ({video, onVideoSelect}) => {
    const imgUrl = video.snippet.thumbnails.default.url;

    return (
        <li
            onClick={() => onVideoSelect(video)}
            className='video-item'
        >
            <div className='video'>
                <div className='video-img'>
                    <img className='vimg' src={imgUrl} />
                </div>
                <div className='video-body'>
                    <div className='video-heading'>
                        {video.snippet.title}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default VideoItem;