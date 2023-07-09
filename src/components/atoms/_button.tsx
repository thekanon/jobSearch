import React, { useEffect, useState } from "react";
import { ReactComponent as IcButtonCheck } from "assets/img/ic_button_check.svg";
import styled from "styled-components";

interface ButtonProps {
  name?: string;
  text?: string;
  color?: string;
  backgroundColor?: string;
  currentFlag?: boolean;
  checkIcon?: boolean;
  clickHandler?: (e) => void;
  disabled?: boolean;
  hoverTextColor?: string;
  disabledFlag?: boolean;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  selectFlag?: boolean;
  currentTextFlag?: boolean;
  hoverColor?: Object;
  isTouchDevice?: boolean;
}

const _Button: React.FC<ButtonProps> = ({
  name,
  text,
  color,
  currentTextFlag,
  backgroundColor,
  currentFlag,
  clickHandler,
  checkIcon,
  disabled,
  selectFlag,
  hoverColor,
}) => {
  const [currentFlagState, setCurrentFlagState] = useState(currentFlag);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouchDevice(isTouchDevice);
  }, []);

  useEffect(() => {
    setCurrentFlagState(currentFlag);
  }, [currentFlag]);

  const onClickHandler = (e) => {
    if (clickHandler) {
      clickHandler(e);
    }
    if (currentFlagState) {
      setCurrentFlagState(true);
    }
  };

  // HoverColor가 있으면, 모바일이 아닐때 hoverColor를 적용한다. 없으면 빈값으로 넣음.
  const hoverTextColor =
    !isTouchDevice && hoverColor && hoverColor["textColor"]
      ? hoverColor["textColor"]
      : "";
  const hoverBackgroundColor =
    !isTouchDevice && hoverColor && hoverColor["backgroundColor"]
      ? hoverColor["backgroundColor"]
      : "";
  const hoverBorderColor =
    !isTouchDevice && hoverColor && hoverColor["borderColor"]
      ? hoverColor["borderColor"]
      : "";

  return (
    <ButtonWrapper
      color={color}
      backgroundColor={backgroundColor}
      isTouchDevice={isTouchDevice}
      checkIcon={checkIcon}
      disabledFlag={disabled}
      selectFlag={selectFlag}
      currentTextFlag={currentTextFlag}
      hoverTextColor={hoverTextColor}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverBorderColor={hoverBorderColor}
    >
      <button
        name={name ? name : ""}
        onClick={onClickHandler}
        className={!disabled && currentFlag ? "selected" : "unselected"}
      >
        {text}
        {checkIcon && !disabled && currentFlagState && <IcButtonCheck />}
      </button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<ButtonProps>`
  width: 100%;
  svg path {
    fill: ${({ color }) => color || "#000"};
  }
  button {
    user-select: none;
    ${({ checkIcon }) =>
      checkIcon &&
      `
    display: flex;
    justify-content: space-between;
    `}

    padding: 0.5em;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
    font-size: 1em;
    color: ${({ color, currentTextFlag }) =>
      currentTextFlag ? color : "#000"};
    transition: all 0.2s ease-in-out;
    background-color: #efefef;
    ${({ backgroundColor, color }) => `
      color: ${backgroundColor ? color : "#000"}
      border: 1.5px solid ${backgroundColor ? color : "#efefef"};
      background-color: ${backgroundColor ? backgroundColor : "#efefef"};
    `}

    &.selected {
      border: 1.5px solid ${({ color }) => `${color}60` || "#000"};
      background-color: ${({ color }) => `${color}26` || "#000"};
      color: ${({ color, currentTextFlag }) =>
        currentTextFlag ? color : "#000"};
      font-weight: 600;
    }

    &:hover {
      border: ${({ hoverBorderColor }) =>
        hoverBorderColor ? `1.5px solid ${hoverBorderColor}` : ""};
      background-color: ${({ hoverBackgroundColor }) =>
        hoverBackgroundColor ? hoverBackgroundColor : ""};
      color: ${({ hoverTextColor }) => (hoverTextColor ? hoverTextColor : "")};
      cursor: ${({ isTouchDevice }) => (isTouchDevice ? "default" : "pointer")};
    }
    ${({ disabledFlag }) =>
      disabledFlag &&
      `
        background-color:#EFEFEF;
        color:#222222
        border: 1.5px solid #EFEFEF;
      `}
    ${({ disabledFlag }) =>
      disabledFlag &&
      `
        &:hover:not(.selected) {
          background-color:#EFEFEF;
          color:#222222
          border: 1.5px solid #EFEFEF;
          cursor: default;
        }
      `}
    ${({ selectFlag, disabledFlag }) =>
      !selectFlag &&
      disabledFlag &&
      `
      pointer-events: none;
      cursor: default;
      `}

      
    &.animate {
      animation: button-pulse 0.5s ease-in-out;
    }
  }

  @keyframes button-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default _Button;
