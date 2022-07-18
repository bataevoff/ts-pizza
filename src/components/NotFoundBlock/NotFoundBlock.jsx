import React from 'react';

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
      <div className={styles.root}>
        <h1 >
          <span>😕</span>
          <br/>
          Not Found
        </h1>
        <p className={styles.description}>Unfortunately we could not find such a page </p>
      </div>
  );
};

export default NotFoundBlock;