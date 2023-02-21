import React, { useState } from 'react';
import axios from 'axios';

const reset = (refresh, setRefresh, setQueue, setCount) => {
  //Turn on auto-refresh
  if (!refresh) {
    setRefresh(true);
  }
  //Empty queue and database
  return axios.get('/reset')
    .then((response) => {
      setQueue([]);
      setCount(0);
    })
    .catch((error) => console.log('reset C to S > ERROR: ', error));
}

export default reset;