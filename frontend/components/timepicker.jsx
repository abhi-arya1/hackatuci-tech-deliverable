import * as Slider from '@radix-ui/react-slider';
import React, { useEffect, useState } from 'react';
import './styles/timepicker.css'

const INVALID = 'Invalid Date'

const DateSlider = ({ dates, setSelectedDate }) => {
  const [tempVal, setTempVal] = useState([0]);
  const [viewDate, setViewDate] = useState(new Date(dates[0]));
  const handleSlideChange = () => {
    setSelectedDate(new Date(dates[tempVal[0]]));
  };

  return (
    <div style={{
      paddingTop: '15px',
      paddingBottom: '15px'
    }}>
      { viewDate.toLocaleString() === INVALID ? (
        <span 
        className="less-shadowed-text"
        >
          Showing all posts
        </span>
      ) : (
        <span 
        className="less-shadowed-text"
        >
          Showing posts on and after: 
        </span>
      )}
      <Slider.Root 
        className="SliderRoot" 
        defaultValue={[0]}
        max={dates.length - 1} 
        onValueChange={(val) => {
          setTempVal(val);
          setViewDate(new Date(dates[val[0]]));
        }}
        onPointerUp={handleSlideChange}
        aria-label="Date slider"
      >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="DatePicker" />
    </Slider.Root>
      { viewDate.toLocaleString() !== INVALID && (
        <span 
        className="less-shadowed-text"
        >
          {viewDate.toLocaleString()}
        </span>
        )
      }
    </div>
  );
};

export default DateSlider;
