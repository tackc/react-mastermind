import React from 'react';
import styles from './GuessPeg.module.css';

const GuessPeg = (props, idx, color) => (
  <div
    className={styles.peg}
    style={{
      // backgroundColor: props.color,
      border: props.color ? `1px solid ${props.color}`: '1px dashed grey',
      cursor: props.currentGuess && 'pointer',
      backgroundColor: props.selColorIdx,
      // borderColor: color
    }}
    onClick={() => props.handlePegClick(props.color)}
    // onClick={() => alert(`color index ${props.idx} selected!`)}
  />
);

export default GuessPeg;
