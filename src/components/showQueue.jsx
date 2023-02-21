import React, { useState } from 'react';
import axios from 'axios';
import sound from '../media/sound.mp3';

//Only return items in queue that are unfulfilled
const showQueue = (refresh, setRefresh, setQueue, setCount) => {
  //Turn on auto-refresh
  if (!refresh) {
    setRefresh(true);
  }
  //Make call to API then update database and return queue
  return axios.get('/getUpdates')
    .then((response) => {
      var difference = response.data;
      console.log('difference', difference);
      var names = [];
      return axios.get('/getQueue')
        .then((response) => {
          if (response.data) {
            response.data.forEach((item) => {
              names.push([item.OrderNo, item.Name, false]);
            });
          }
          setQueue(names);
          setCount(names.length);
          //if new orders, play sound
          if (difference > 0) {
            console.log('play');
            var audioclip = new Audio(sound);
            audioclip.autoplay = true;
            audioclip.play();
          }
        })
        .catch((error) => console.log('getQueue C to S > ERROR: ', error));
        })
    .catch((error) => console.log('getUpdates C to S > ERROR: ', error));
}

export default showQueue;