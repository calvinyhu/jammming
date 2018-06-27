import React from 'react'
import './Song.css'

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction() {
        this.props.action(this.props.song.id);
    }

    render() {
        return(
            <div className="Song">
                <div className="Song-information">
                    <h3>{this.props.song.name}</h3>
                    <p>{this.props.song.artist} | {this.props.song.album}</p>
                </div>
                <a className="Song-action" onClick={this.handleAction} >{this.props.button}</a>
            </div>
        );
    }
}

export default Song;
