import React from 'react';
import styled from 'styled-components';

interface MobileTextProps {
  text?: string;
  color?: string;
  size?: string;
  bold?: boolean;
  backgroundFlag?: boolean;
  backgroundColor?: string;
  styleProp?: string;
  className?: string;
}

const _textTitle: React.FC<MobileTextProps> = ({
  text,
  color,
  size,
  bold,
  backgroundFlag,
  backgroundColor,
  styleProp,
  className,
}) => {
  const textArr = text?.split('\n');

  return (
    <TextWrapper
      color={color}
      size={size}
      bold={bold}
      backgroundFlag={backgroundFlag}
      backgroundColor={backgroundColor}
      styleProp={styleProp}
    >
      {textArr?.map((text, index) => (
        <div key={index} className={className}>
          {text}
          <br />
        </div>
      ))}
    </TextWrapper>
  );
};

const TextWrapper = styled.div<MobileTextProps>`
  word-break: keep-all;
  font-size: ${({ size }) => size || '18px'};
  color: ${({ color }) => color || 'black'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  background-color: ${({ backgroundFlag, color, backgroundColor }) =>
    backgroundColor ? `${backgroundColor}` : backgroundFlag ? `${color}16` : 'transparent'};
  width: ${({ backgroundFlag }) => (backgroundFlag ? '100%' : 'fit-content')};
  ${({ backgroundFlag }) => backgroundFlag && 'padding: 1em;'}
  ${({ styleProp }) => styleProp}
`;

export default _textTitle;
