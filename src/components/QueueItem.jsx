import React, { useState } from 'react';
import axios from 'axios';

const QueueItem = ({completed, name, orderno}) => {
  //Functions to update complete status in database

  const markCompleted = (orderno) => {
    return axios.put('/markCompleted', {OrderNo: orderno});
  }

  const markNotCompleted = (orderno) => {
    return axios.put('/markNotCompleted', {OrderNo: orderno});
  }

  //Function to update strikethrough on displayed queue
  const strikethrough = (e) => {
    if (e.target.style.textDecoration) {
      e.target.style.removeProperty('text-decoration');
      markNotCompleted(orderno);
    } else {
      event.target.style.setProperty('text-decoration', 'line-through');
      markCompleted(orderno);
    }
  }

  return(
    <div>
      <span>
        <h3>
          {completed ? <span style={{textDecoration:'line-through'}} key={orderno} onClick={(e)=>strikethrough(e)}>{name}</span> : <span key={orderno} onClick={(e)=>strikethrough(e)}>{name}</span>}
        </h3>
      </span>
    </div>
  )
}

export default QueueItem;