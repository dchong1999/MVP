import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QueueItem from './QueueItem.jsx';
import video from './umbreon-night.mp4';
import sound from './sound.mp3';

const App = () => {
  const [queue, setQueue] = useState([]);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const showQueue = (e) => {
    if (!refresh) {
      setRefresh(true);
    }
    return axios.get('/getUpdates')
      .then((response) => {
        var difference = response.data;
        var names = [];
        return axios.get('/getQueue')
          .then((response) => {
            if (response.data) {
              response.data.forEach((item) => {
                names.push([item.OrderNo, item.Name, false]);
              });
            }
            var audioclip = new Audio(sound);
            audioclip.autoplay = true;
            setQueue(names);
            setCount(names.length);
            if (difference > 0) {
              audioclip.play();
            }
          })
          .catch((error) => console.log('getQueue C to S > ERROR: ', error));
          })
      .catch((error) => console.log('getUpdates C to S > ERROR: ', error));
  };

  const showAll = (e) => {
    if (refresh) {
      setRefresh(false);
    }
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

  const reset = (e) => {
    if (!refresh) {
      setRefresh(true);
    }
    return axios.get('/reset')
      .then((response) => {
        setQueue([]);
        setCount(0);
      })
      .catch((error) => console.log('reset C to S > ERROR: ', error));
  };

  useEffect(() => {
    console.log(refresh);
    if (refresh) {
      const interval = setInterval(() => {
        showQueue();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [refresh]);

  return (
    <section id="main">
      <div className="overlay">
        <div id="header"></div>
        <div id="title"><h1>QUEUE: {count}</h1></div>
        <div id="scrollable">
          {queue.length === 0 ? <h3 className="content">Queue is empty</h3> : queue.map((customer, index) => <QueueItem key={index} completed={customer[2]} name={customer[1]} orderno={customer[0]}/>)}
        </div>
        <div id="footer">
          <button onClick={(e) => showQueue(e)}>Show Queue</button> {/* eventually get rid of button and just use setInterval */}
          <button onClick={(e) => showAll(e)}>Show All</button>
          <button onClick={(e) => reset(e)}>Reset</button>
        </div>
      </div>
      <video autoPlay loop muted playsInline>
        <source src={video} type='video/mp4'/>
      </video>
    </section>
  );
}

export default App;