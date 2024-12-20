import styled from "styled-components";
import { Upload, Button } from "antd";
export const WrapperHeader = styled.div`
  padding-right: 30px;
  font-size: 25px;
  font-weight: 400;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list {
    display: none;
  }
  & .ant-upload-list-text {
    display: none;
  }
  display: flex;
  flex-direction: column;
`;
export const ResponsiveButton = styled(Button)`
  width: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;