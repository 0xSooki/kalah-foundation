import React from 'react'
import { useState, useEffect} from 'react'
import Countdown from 'react-countdown';
import { from } from '@apollo/client';


function Clock (props){
    const renderer = ({ hours, minutes, seconds }) => {
          return <span>{hours}:{minutes}:{seconds}</span>;
      };
    return (
        <div className='m-2 p-3 dark:bg-light bg-dark rounded-2xl max-w-max'>
            <span className={'m-2 p-2 rounded-2xl '+ (props.p1 ? 'border-4 border-brand ' : '') + 'dark:text-light text-dark dark:bg-dark bg-light'}>
            <Countdown date={Date.now() + props.rem1} autoStart={props.p1} renderer={renderer} />
            </span>
            <span className={'m-2 p-2 rounded-2xl '+ (!props.p1 ? 'border-4 border-brand ' : '') + ' dark:text-light text-dark dark:bg-dark bg-light'}>
            <Countdown date={Date.now() + props.rem2} autoStart={!props.p1} renderer={renderer} />
            </span>
        </div>
    );
  }

export default Clock