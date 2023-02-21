import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

//Individual queue items
import QueueItem from './components/QueueItem.jsx';

//Functions for buttons
import showQueue from './components/showQueue.jsx';
import showAll from './components/showAll.jsx';
import reset from './components/reset.jsx';

//Styling & media
import './index.css';
import banner from './media/banner.png';
import video from './media/umbreon-night.mp4';

const App = () => {
  //States to keep track of queue, queue total, and if currently refreshing
  const [queue, setQueue] = useState([]);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(true);


  //Refresh queue every 5 seconds
  useEffect(() => {
    if (refresh) {
      const interval = setInterval(() => {
        showQueue(refresh, setRefresh, setQueue, setCount);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [refresh]);

  return (
    <div id='main'>
      <div id='header'>
        <img id='banner' src={banner} />
      </div>
      <div id='count'><h1>QUEUE: {count}</h1></div>
      <div id='video'>
        <div id='scrollable'>
          {queue.length === 0 ? <h3>Queue is empty</h3> : queue.map((customer, index) => <QueueItem key={index} completed={customer[2]} name={customer[1]} orderno={customer[0]}/>)}
        </div>
        <div id='buttons'>
          <button onClick={(e) => showQueue(refresh, setRefresh, setQueue, setCount)}>Show Queue</button>
          <button onClick={(e) => showAll(refresh, setRefresh, setQueue)}>Show All</button>
          <button onClick={(e) => reset(refresh, setRefresh, setQueue, setCount)}>Reset</button>
        </div>
        <video autoPlay loop muted playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);