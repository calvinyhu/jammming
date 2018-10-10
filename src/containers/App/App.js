import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SongList from '../../components/SongList/SongList';
// import Spotify from '../../utils/Spotify';
import styles from './App.module.scss';
import { updateObject } from '../../utils/utils';

class App extends React.Component {
  state = {
    results: {
      1: {
        id: 1,
        name: 'Order More',
        artist: 'G-Eazy',
        album: "When It's Dark Out"
      },
      2: {
        id: 2,
        name: 'Paranoid',
        artist: 'Post Malone',
        album: 'beerbongs & bentleys'
      },
      3: {
        id: 3,
        name: 'Famous',
        artist: 'Kanye West',
        album: 'The Life of Pablo'
      }
    },
    playlist: {}
  };

  searchSpotify = term => {
    console.log(term);
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
              name={'Results'}
              songList={this.state.results}
              action={this.addSong}
            />
            <SongList
              name={'Playlist'}
              songList={this.state.playlist}
              action={this.removeSong}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
