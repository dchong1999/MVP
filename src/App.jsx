import React, { useState } from 'react';
import axios from 'axios';
import QueueItem from './QueueItem.jsx';
import video from './umbreon-night.mp4';

const App = () => {
  const [queue, setQueue] = useState([]);
  const [count, setCount] = useState(0);

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
            names.push([item.OrderNo, item.Name, false]);
          });
        }
        setQueue(names);
        setCount(names.length);
      })
      .catch((error) => console.log('getQueue C to S > ERROR: ', error));
  };

  const update = () => {
    return getUpdates()
      .then((response) => getQueue());
  };

  const getAll = () => {
    var names = [];
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
  };

  const showAll = () => {
    update()
      .then((response) => getAll());
  };

  // setInterval(() => {update()}, 10000); set time back to 30s

  return (
    <section id="main">
      <div className="overlay">
        <div id="header"></div>
        <div id="title"><h1>Queue: {count}</h1></div>
        <div id="scrollable">
          {queue.length === 0 ? <h3 className="content">Queue is empty</h3> : queue.map((customer, index) => <QueueItem key={index} completed={customer[2]} name={customer[1]} orderno={customer[0]}/>)}
        </div>
        <div id="footer">
          <button onClick={(e) => update(e)}>Show Queue</button> {/* eventually get rid of button and just use setInterval */}
          <button onClick={(e) => showAll(e)}>Show All</button>
        </div>
      </div>
      <video autoPlay loop muted>
        <source src={video} type='video/mp4'/>
      </video>
    </section>
  );
}

export default App;