import React from 'react'
import './Song.css'

class Song extends React.Component {
    render() {
        return(
            <div className="Song">
                <div className="Song-information">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                <a className="Song-action">+</a>
            </div>
        );
    }
}

export default Song;
