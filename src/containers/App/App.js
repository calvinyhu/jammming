import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SongList from '../../components/SongList/SongList';
import {
  accessToken,
  getAccessToken,
  search,
  setAuth,
  createPlaylist
} from '../../utils/spotify';
import styles from './App.module.scss';
import { updateObject } from '../../utils/utils';

export const LIST_NAMES = {
  RESULTS: 'Search Results',
  PLAYLIST: 'New Playlist'
};

class App extends React.Component {
  state = {
    playlistName: '',
    results: {},
    playlist: {}
  };

  componentDidMount() {
    setAuth(window.location.href);
  }

  searchSpotify = term => {
    if (!accessToken) getAccessToken();
    else {
      search(term).then(response => {
        this.replaceResults(response.tracks);
      });
    }
  };

  replaceResults = tracks => {
    const results = {};

    if (tracks && tracks.items) {
      tracks.items.forEach(item => {
        results[item.id] = {
          id: item.id,
          name: item.name,
          artist: item.artists && item.artists[0] ? item.artists[0].name : '',
          album: item.album ? item.album.name : ''
        };
      });
    }

    this.setState({ results });
  };

  addSong = songId => {
    if (this.state.playlist[songId]) return;
    const newSongs = { [songId]: this.state.results[songId] };
    const newPlaylist = updateObject(this.state.playlist, newSongs);
    this.setState({ playlist: newPlaylist });
  };

  removeSong = songId => {
    if (!this.state.playlist[songId]) return;
    const newPlaylist = { ...this.state.playlist };
    delete newPlaylist[songId];
    this.setState({ playlist: newPlaylist });
  };

  handleCreatePlaylist = () => {
    createPlaylist(this.state.playlistName, Object.keys(this.state.playlist));
  };

  changePlaylistName = event => {
    this.setState({ playlistName: event.target.value });
  };

  render() {
    return (
      <div className={styles.AppContainer}>
        <div className={styles.App}>
          <h1 className={styles.Title}>
            Ja
            <span className={styles.Highlight}>mmm</span>
            ing
          </h1>
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className={styles.Lists}>
            <SongList
              name={LIST_NAMES.RESULTS}
              songList={this.state.results}
              action={this.addSong}
            />
            <SongList
              name={LIST_NAMES.PLAYLIST}
              songList={this.state.playlist}
              action={this.removeSong}
              listAction={this.handleCreatePlaylist}
              changeInput={this.changePlaylistName}
              value={this.state.playlistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
