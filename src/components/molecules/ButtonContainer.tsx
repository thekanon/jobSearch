// ButtonContainer.tsx
import styled from "styled-components";

type ButtonContainerProps = {
  alignment?: "left" | "center" | "right"; // 버튼 정렬
  gap?: number; // 버튼 간의 간격 (px)
  children: React.ReactNode;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  alignment = "center",
  gap = 10,
}) => {
  return (
    <StyledContainer alignment={alignment} gap={gap}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: ${(props) =>
    props.alignment === "left"
      ? "flex-start"
      : props.alignment === "right"
      ? "flex-end"
      : "center"};
  margin-bottom: 20px;

  & > *:not(:last-child) {
    margin-right: ${(props) => `${props.gap}px`}; // 오른쪽 간격 적용
  }
`;

export default ButtonContainer;
