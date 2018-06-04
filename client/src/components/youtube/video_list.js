import React from 'react';
import VideoItem from './video_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoItem
                onVideoSelect={props.onVideoSelect}
                key={video.etag}
                video={video}
            />
        );
    });

    return (
        <ul className='video-list'>
            {videoItems}
        </ul>
    );
};

export default VideoList;
