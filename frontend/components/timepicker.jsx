import * as Slider from '@radix-ui/react-slider';
import React from 'react';
import './styles/timepicker.css'

const DateSlider = ({ dates, selectedDate, setSelectedDate }) => {
  const handleSlideChange = (val) => {
    setSelectedDate(new Date(dates[val[0]]));
  };

  return (
    <div>
      <Slider.Root 
        className="SliderRoot" 
        defaultValue={[0]}
        max={dates.length - 1} 
        onValueChange={handleSlideChange}
        aria-label="Date slider"
      >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="DatePicker" />
    </Slider.Root>
    <span className="less-shadowed-text">{selectedDate.toLocaleString()}</span>
    </div>
  );
};

export default DateSlider;
