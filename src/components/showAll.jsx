import React, { useState } from 'react';
import axios from 'axios';

//Return all items in queue (fulfilled/unfulfilled)
const showAll = (refresh, setRefresh, setQueue) => {
  //Turn off auto-refresh
  if (refresh) {
    setRefresh(false);
  }
  var names = [];
  //Return all orders from database
  return axios.get('/getAll')
    .then((response) => {
      if (response.data) {
        response.data.forEach((item) => {
          names.push([item.OrderNo, item.Name, item.Completed]);
        });
      }
      setQueue(names);
    })
    .catch((error) => console.log('getAll C to S > ERROR: ', error));
}

export default showAll;