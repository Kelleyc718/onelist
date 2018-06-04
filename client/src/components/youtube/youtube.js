import React, { Component } from "react";
import SearchBar from "../search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./video_list";
import VideoDetail from "./video_detail";
import _ from "lodash";
import YouTubeAPI from "../../constants/api";

export default class Youtube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("sti");
  }

  // Method used to search
  videoSearch(userInput) {
    YTSearch({ key: YouTubeAPI.API_KEY, term: userInput }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: null
      });
    });
  }

  render() {
    // Throttle refresh rate of search bar to prevent too many calls too fast
    const videoSearch = _.debounce(userInput => {
      this.videoSearch(userInput);
    }, 300);
    return (
      <div className="youtube">
        <SearchBar onSearchChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}
