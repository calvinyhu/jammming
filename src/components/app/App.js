import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import SongList from '../songList/SongList';
import Spotify from '../../utils/Spotify'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: []
        };
        this.searchSpotify = this.searchSpotify.bind(this);
    }

    searchSpotify() {
        Spotify.search().then(songList => {
            this.setState({
                songList: songList
            });
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <SearchBar searchSpotify={this.searchSpotify}/>

                <div className="App-songlist">
                    <SongList songList={this.state.songList} />
                </div>
                <div className="App-playlist">

                </div>
            </div>
        );
    }
}

export default App;

