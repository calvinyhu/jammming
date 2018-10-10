import React from 'react';
import styles from './SearchBar.module.scss';

class SearchBar extends React.Component {
  state = {
    term: ''
  };

  changeInput = event => this.setState({ term: event.target.value });

  searchSpotify = event => {
    if (event) event.preventDefault();
    this.props.searchSpotify(this.state.term);
  };

  render() {
    return (
      <div className={styles.SearchBar}>
        <form onSubmit={this.searchSpotify}>
          <input
            placeholder="Search by song, artist, or album."
            onChange={this.changeInput}
          />
          <button
            disabled={this.state.term.length === 0}
            onClick={this.searchSpotify}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
