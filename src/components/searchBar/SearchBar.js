import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearchTermChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSearch(event) {
        this.props.searchSpotify(this.state.searchTerm);
        event.preventDefault();
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Search by song, artist, or album" onChange={this.handleSearchTermChange}/>
                <a onClick={this.handleSearch}>Search</a>
            </div>
        );
    }
}

export default SearchBar;

