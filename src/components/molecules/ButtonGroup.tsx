import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import _button from '../atoms/_button';

interface buttonGroupProps {
  buttonList: string[];
  currentButtonList?: string[] | undefined;
  color?: string;
  colorList?: string[];
  multipleChoice?: boolean;
  vertical?: boolean;
  clickHandler?: any;
  uniqueKeyList?: string[];
  checkIcon?: boolean;
  disabledButtonList?: string[] | boolean[];
  backgroundColorList?: string[];
  selectFlag?: boolean;
  currentTextFlag?: boolean;
  hoverColorList?: HoverColorProps[];
}
interface HoverColorProps {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
}

const ButtonGroup: React.FC<buttonGroupProps> = ({
  buttonList,
  currentButtonList,
  color,
  currentTextFlag,
  colorList,
  backgroundColorList,
  multipleChoice,
  vertical,
  clickHandler,
  uniqueKeyList,
  checkIcon,
  disabledButtonList,
  selectFlag,
  hoverColorList,
}) => {
  if (buttonList.length === 2) {
    // debugger;
  }
  const [currentMultipleChoiceState, setCurrentMultipleChoiceState] = useState([]);

  const nameList = uniqueKeyList
    ? uniqueKeyList
    : buttonList.map((button, index) => button + '_' + index);

  useEffect(() => {
    setCurrentMultipleChoiceState(currentButtonList ? currentButtonList : []);
  }, [currentButtonList]);
  useEffect(() => {
    // console.log('currentMultipleChoiceState', currentMultipleChoiceState);
  }, [currentMultipleChoiceState]);
  const onClickHandler = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    if (!multipleChoice) {
      setCurrentMultipleChoiceState([e.target.name]);
    } else {
      if (currentMultipleChoiceState.includes(e.target.name)) {
        const index = currentMultipleChoiceState.indexOf(e.target.name);
        currentMultipleChoiceState.splice(index, 1);
        setCurrentMultipleChoiceState([...currentMultipleChoiceState]);
      } else {
        setCurrentMultipleChoiceState([...currentMultipleChoiceState, e.target.name]);
      }
    }
  };

  return (
    <>
      <ButtonGroupWrapper
        vertical={vertical}
        onClick={(e) => {
          onClickHandler(e);
        }}
      >
        {buttonList.map((button, index) => (
          <_button
            key={index}
            name={nameList[index]}
            text={button}
            color={colorList ? colorList[index] : color}
            currentTextFlag={currentTextFlag}
            checkIcon={checkIcon}
            clickHandler={clickHandler}
            currentFlag={currentMultipleChoiceState.includes(nameList[index]) ? true : false}
            disabled={disabledButtonList && disabledButtonList[index] ? true : false}
            backgroundColor={backgroundColorList && backgroundColorList[index]}
            hoverColor={hoverColorList && hoverColorList[index]}
            selectFlag={selectFlag}
          />
        ))}
      </ButtonGroupWrapper>
    </>
  );
};
const ButtonGroupWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5em;
  ${({ vertical }) =>
    vertical &&
    css`
      flex-direction: column;
      button {
        text-align: left;
        padding-left: 1em;
      }
    `}
`;
export default ButtonGroup;
