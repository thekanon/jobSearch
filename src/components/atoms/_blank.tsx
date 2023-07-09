import styled from "styled-components";

interface _blankProps {
  height?: number;
  color?: string;
}

const _blank = styled.div<_blankProps>`
  height: ${({ height = 20 }) => `${height}px`};
  background-color: ${({ color = "" }) => color};
`;

export default _blank;
