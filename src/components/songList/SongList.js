import React from 'react';
import Song from '../Song/Song';
import styles from './SongList.module.scss';

const songList = props => {
  const renderSongs = songList => {
    return Object.keys(songList).map(songId => {
      return (
        <Song
          key={songId}
          song={songList[songId]}
          click={props.action}
          btnName={props.name === 'Results' ? 'add' : 'remove'}
        />
      );
    });
  };

  return (
    <div className={styles.SongList}>
      <h2>{props.name}</h2>
      <div className={styles.Songs}>{renderSongs(props.songList)}</div>
    </div>
  );
};

export default songList;
