import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TimePickerProps {
  color?: string;
  name?: string;
  onTimeChange?: (value: string) => void;
  value: string;
  hFlag?: boolean;
}

const _timePicker: React.FC<TimePickerProps> = ({
  color,
  name,
  onTimeChange,
  value,
  hFlag,
}) => {
  const [hour, setHour] = useState<any>(-1);
  const [minute, setMinute] = useState<any>(-1);

  useEffect(() => {
    if (value) {
      const time = value
        .split("_")[1]
        .split(":")
        .map((e) => Number(e));
      setHour(time[0]);
      if (Number.isNaN(time[1])) {
        setMinute(-1);
      } else {
        setMinute(time[1]);
      }
    }
  }, [value]);

  const createOptions = (start: number, end: number, step = 1) => {
    const options = [];
    options.push(
      <option key={-1} value={-1}>
        __
      </option>
    );
    for (let i = start; i <= end; i += step) {
      options.push(
        <option key={i} value={i}>
          {i < 10 ? "0" + i : i}
        </option>
      );
    }
    return options;
  };
  const onHourChangeHandler = (value: string) => {
    setHour(value);
    if (name) {
      onTimeChange && onTimeChange(`${name}:${value}:${minute}`);
    } else {
      onTimeChange && onTimeChange(`${value}:${minute}`);
    }
  };
  const onMinuteChangeHandler = (value: string) => {
    setMinute(value);
    if (name) {
      onTimeChange && onTimeChange(`${name}:${hour}:${value}`);
    } else {
      onTimeChange && onTimeChange(`${hour}:${value}`);
    }
  };

  return (
    <CenterWrapper name={name}>
      <TimePickerWrapper color={color}>
        <SelectWrapper
          color={color}
          value={hour}
          onChange={(e) => onHourChangeHandler(e.target.value)}
        >
          {createOptions(0, 23)}
        </SelectWrapper>
        {hFlag ? (
          <TimeSeparator>시간</TimeSeparator>
        ) : (
          <TimeSeparator>시</TimeSeparator>
        )}
        <SelectWrapper
          color={color}
          value={minute}
          onChange={(e) => onMinuteChangeHandler(e.target.value)}
        >
          {createOptions(0, 59, 5)}
        </SelectWrapper>
        <TimeSeparator>분</TimeSeparator>
      </TimePickerWrapper>
    </CenterWrapper>
  );
};

const CenterWrapper = styled.div<{ name?: string }>`
  justify-content: center;
  display: flex;
`;
const TimePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ color }) => color + 26 || "#95959526"};
  border-radius: 10px;
  padding-left: 33px;
  padding-right: 38px;
`;
const SelectWrapper = styled.select<{ color?: string }>`
  font-size: 23px;
  font-weight: 400;
  border: 0px solid ${({ color }) => color + 26 || "#95959526"};
  background-color: #ffffff00;
  color: ${({ color }) => color || "#black"};
  border-radius: 4px;
  appearance: none;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const TimeSeparator = styled.span`
  margin: 0 0 0 0;
  font-size: 20px;
  font-weight: 400;
`;

export default _timePicker;
