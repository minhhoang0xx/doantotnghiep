import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const ContactContainer = styled.div`
  padding: 50px 0;
  background: #f5f5f5;
`;

const ContactCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ContactTitle = styled(Title)`
  text-align: center;
  color: #333;
`;

const SectionTitle = styled(Title)`
  color: #666;
`;

const ContactParagraph = styled(Paragraph)`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
`;

const ContactButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  font-weight: bold;
  height: 45px;
  &:hover {
    background-color: #40a9ff;
  }
`;
const ContactPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Thêm logic xử lý liên hệ như gửi email hoặc lưu vào database
  };

  return (
    <div style={{ padding: '50px 0 0 0 ',background:'#f5f5f5' }}>
    <ContactContainer>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <ContactCard>
            <ContactTitle level={1}>Contact Us</ContactTitle>

            <ContactParagraph>
              We’re here to help! If you have any questions, feedback, or inquiries, feel free to get in touch with us. 
              Our team at <strong>Hoang System Education</strong> is always ready to assist you with anything you need.
            </ContactParagraph>

            <SectionTitle level={3}>Our Contact Information</SectionTitle>
            <ContactParagraph>
              <strong>Email:</strong> hoanglmgch210529@fpt.edu.vn<br />
              <strong>Phone:</strong> 0914 449 023<br />
              <strong>Address:</strong> 1 Minh Hoang Street, Huong Son, Ha Tinh, Vietnam
            </ContactParagraph>

            <SectionTitle level={3}>Business Hours</SectionTitle>
            <ContactParagraph>
              <ul>
                <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                <li><strong>Sunday:</strong> Closed</li>
              </ul>
            </ContactParagraph>

            <SectionTitle level={3}>Send Us a Message</SectionTitle>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Your Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Your Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>

              <Form.Item>
                <ContactButton type="primary" htmlType="submit" block>
                  Send Message
                </ContactButton>
              </Form.Item>
            </Form>
          </ContactCard>
        </Col>
      </Row>
    </ContactContainer>
    </div>
  );
};

export default ContactPage;
