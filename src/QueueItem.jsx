import React, { useState } from 'react';
import axios from 'axios';

const QueueItem = ({name, orderno}) => {
  const strikethrough = (e) => {
    console.log('e', e);
    if (e.target.style.textDecoration) {
      e.target.style.removeProperty('text-decoration');
      //set Completed to false
    } else {
      event.target.style.setProperty('text-decoration', 'line-through');
      //set Completed to true
    }
  }

  return(
    <h3><span key={orderno} onClick={(e) => strikethrough(e)}>{name}</span></h3>
  )
}

export default QueueItem;