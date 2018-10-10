import React from 'react';

import styles from './SongList.module.scss';
import Song from '../Song/Song';
import { LIST_NAMES } from '../../containers/App/App';

const songList = props => {
  const renderSongs = songList => {
    return Object.keys(songList).map(songId => {
      return (
        <Song
          key={songId}
          song={songList[songId]}
          click={props.action}
          btnName={props.name === LIST_NAMES.RESULTS ? 'add' : 'remove'}
        />
      );
    });
  };

  let listName = <h2>{props.name}</h2>;
  let listAction = null;

  if (props.name === LIST_NAMES.PLAYLIST) {
    listName = <input placeholder={props.name} onChange={props.changeInput} />;

    listAction = (
      <button
        className={styles.CreatePlaylist}
        disabled={
          props.songList &&
          Object.keys(props.songList).length > 0 &&
          props.value
            ? false
            : true
        }
        onClick={props.listAction}
      >
        Create
      </button>
    );
  }

  return (
    <div className={styles.SongList}>
      <div className={styles.Header}>
        {listName}
        {listAction}
      </div>
      <div className={styles.Songs}>{renderSongs(props.songList)}</div>
    </div>
  );
};

export default songList;
