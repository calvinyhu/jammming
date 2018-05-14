import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import SongList from '../songList/SongList';
import Playlist from '../playlist/Playlist';
// Note: remove this Song import later on
import Song from '../song/Song';
import Spotify from '../../utils/Spotify'
import './App.css'

let sl = [
    <Song name='Order More' artist='G-Eazy' album="When It's Dark Out" />,
    <Song name='Paranoid' artist='Post Malone' album='beerbongs & bentleys' />,
    <Song name='Famous' artist='Kanye West' album='The Life of Pablo' />,
];

let pl = [
    <Song name='Order More' artist='G-Eazy' album="When It's Dark Out" />,
    <Song name='Paranoid' artist='Post Malone' album='beerbongs & bentleys' />,
    <Song name='Famous' artist='Kanye West' album='The Life of Pablo' />,
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: [],
            playlist: [],
        };
        this.searchSpotify = this.searchSpotify.bind(this);
        this.onRemoveSong = this.onRemoveSong.bind(this);
    }

    searchSpotify(searchTerm) {
        Spotify.search().then(songList => {
            this.setState({
                songList: songList
            });
        });
    }

    onRemoveSong() {
        console.log("Hello");
    }

    render() {
        return (
            <div className="App">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <SearchBar searchSpotify={this.searchSpotify}/>
                <div className="App-lists">
                    <SongList songList={sl} />
                    <Playlist playlist={pl} action={this.onRemoveSong} />
                </div>
            </div>
        );
    }
}

export default App;

