import styled from 'styled-components';
import { Card, Row, Col, Typography } from 'antd';

// Các styled-components để định kiểu

export const DashboardRow = styled(Row)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DashboardCol = styled(Col)`
  margin-bottom: 16px;
`;

export const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow: hidden;
  .ant-card-body {
    padding: 20px;
  }
`;

export const MetricTitle = styled(Typography.Title)`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

export const MetricValue = styled(Typography.Title)`
  font-size: 24px;
  font-weight: 700;
  color: #1890ff;
  margin-top: 10px;
`;

export const ChartWrapper = styled.div`
  margin-top: 20px;
`;

