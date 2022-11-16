import React, { useState } from 'react';
import axios from 'axios';
import QueueItem from './QueueItem.jsx';

const App = () => {
  const [queue, setQueue] = useState([]);

  const getUpdates = (e) => {
    return axios.get('/getUpdates')
      .catch((error) => console.log('getUpdates C to S > ERROR: ', error));
  };

  const getQueue = () => {
    var names = [];
    return axios.get('/getQueue')
      .then((response) => {
        if (response.data) {
          response.data.forEach((item) => {
            names.push([item.OrderNo, item.Name]);
          });
        }
        setQueue(names);
      })
      .catch((error) => console.log('getQueue C to S > ERROR: ', error));
  };

  const update = () => {
    getUpdates()
      .then((response) => getQueue());
  }

  // setInterval(() => {update()}, 10000); set time back to 30s

  return (
    <div>
      <h1>Queue</h1>
      <div>
        {queue.length === 0 ? <h3>Queue is empty</h3> : queue.map((customer, index) => <QueueItem key={index} name={customer[1]} orderno={customer[0]}/>)}
      </div>
      <button onClick={(e) => update(e)}>Show Queue</button> {/* eventually get rid of button and just use setInterval */}
    </div>
  );
}

export default App;