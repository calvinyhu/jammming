import React from 'react';
import styles from './Song.module.scss';

const song = props => {
  const click = () => {
    props.click(props.song.id);
  };

  return (
    <div className={styles.Song}>
      <div className={styles.Info}>
        <h3>{props.song.name}</h3>
        <p>
          {props.song.artist} | {props.song.album}
        </p>
      </div>
      <button className={styles.Action} onClick={click}>
        <div className={'material-icons'}>{props.btnName}</div>
      </button>
    </div>
  );
};

export default song;
