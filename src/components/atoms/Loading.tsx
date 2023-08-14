import React from "react";
import styled from "styled-components";

interface LoadingProps {
  message?: string; // 로딩 메시지를 선택적으로 전달할 수 있게 합니다.
  size?: "small" | "medium" | "large"; // 로딩 아이콘의 크기를 조절할 수 있는 옵션을 추가합니다.
  color?: string; // 로딩 아이콘의 색상을 조절할 수 있는 옵션을 추가합니다.
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...", // 기본 메시지 설정
  size = "medium", // 기본 크기 설정
  color = "#333", // 기본 색상 설정
}) => {
  return (
    <LoadingContainer size={size}>
      <LoadingIcon color={color} />
      {message && <LoadingMessage>{message}</LoadingMessage>}
    </LoadingContainer>
  );
};

export default Loading;

// styled-components를 사용하여 스타일링
const LoadingContainer = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  color: #333;
  margin: 20px;

  ${(props) => {
    switch (props.size) {
      case "small":
        return "font-size: 14px; margin: 10px;";
      case "large":
        return "font-size: 22px; margin: 30px;";
      default:
        return "font-size: 18px;";
    }
  }}

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 15px;
  }
`;

const LoadingIcon = styled.div<{ color: string }>`
  // 로딩 아이콘이 필요한 스타일을 여기에 추가합니다.
  // 예를 들어, 회전하는 원형 로딩 아이콘이 될 수 있습니다.
  width: 30px;
  height: 30px;
  border: 5px solid ${(props) => props.color};
  border-radius: 50%;
  border-top: 5px solid transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingMessage = styled.p`
  margin-top: 10px;
`;
