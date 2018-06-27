import React from 'react';
import Song from '../song/Song'
import './Playlist.css'

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: ''
        };
        this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    }

    handlePlaylistNameChange(event) {
        this.setState({
            playlistName: event.target.value
        });
    }

    render() {
        return (
            <div className="Playlist">
                <input placeholder="New Playlist" onChange={this.handlePlaylistNameChange}/>
                <div className="Playlist">
                    { 
                        this.props.playlist.map(song => { 
                            return <Song song={song.props} action={this.props.action} button={'-'} key={song.id}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Playlist
