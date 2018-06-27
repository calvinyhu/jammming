import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import SongList from '../songList/SongList';
import Playlist from '../playlist/Playlist';
// Note: remove this Song import later on
import Song from '../song/Song';
import Spotify from '../../utils/Spotify'
import './App.css'

let sl = [
    <Song id='1' name='Order More' artist='G-Eazy' album="When It's Dark Out" />,
    <Song id='2' name='Paranoid' artist='Post Malone' album='beerbongs & bentleys' />,
    <Song id='3' name='Famous' artist='Kanye West' album='The Life of Pablo' />,
];

let pl = [
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: [],
            playlist: [],
        };
        this.searchSpotify = this.searchSpotify.bind(this);
        this.onAddSong = this.onAddSong.bind(this);
        this.onRemoveSong = this.onRemoveSong.bind(this);
    }

    searchSpotify(searchTerm) {
        Spotify.search(searchTerm);
        // Spotify.search(searchTerm).then(songList => {
        //     this.setState({
        //         // songList: songList
        //     });
        // });
    }

    onAddSong(songId) {
        for (let i = sl.length - 1; i >= 0; --i) {
            if (sl[i].props.id === songId) {
                pl.push(sl[i]);
            }
        }
        this.setState({
        });
    }

    onRemoveSong(songId) {
        for (let i = pl.length - 1; i >= 0; --i) {
            if (pl[i].props.id === songId) {
                pl.splice(i,1);
            }
        }
        this.setState({
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <SearchBar searchSpotify={this.searchSpotify}/>
                <div className="App-lists">
                    <SongList songList={this.state.songList} action={this.onAddSong} />
                    <Playlist playlist={pl} action={this.onRemoveSong} />
                </div>
            </div>
        );
    }
}

export default App;

