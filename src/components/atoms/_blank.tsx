import styled from 'styled-components';

const _blank = styled.div`
  height: ${({ height }) => `${height}px`};
  background-color: ${({ color }) => color};
`;

_blank.defaultProps = {
  height: 20,
  color: ''
};

export default _blank;
