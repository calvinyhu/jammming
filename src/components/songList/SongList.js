import React from 'react';
import Song from '../song/Song'
import './SongList.css'

class SongList extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="SongList">
                    { 
                        this.props.songList.map(song => { 
                            return <Song song={song} key={song.id}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default SongList;
