import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Thêm logic xử lý liên hệ như gửi email hoặc lưu vào database
  };

  return (
    <div style={{ padding: '50px', background:'#f5f5f5' }}>
      <Row justify="center">
        <Col span={16}>
          <Card>
            <Title level={1} style={{ textAlign: 'center' }}>
              Contact Us
            </Title>

            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              We’re here to help! If you have any questions, feedback, or inquiries, feel free to get in touch with us. 
              Our team at <strong>Hoang System Education</strong> is always ready to assist you with anything you need.
            </Paragraph>

            <Title level={3}>Our Contact Information</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              <strong>Email:</strong> hoanglmgch210529@fpt.edu.vn<br />
              <strong>Phone:</strong> 0914 449 023<br />
              <strong>Address:</strong> 1 Minh Hoang Street, Huong Son, Ha Tinh, Vietnam
            </Paragraph>

            <Title level={3}>Business Hours</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              <ul>
                <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                <li><strong>Sunday:</strong> Closed</li>
              </ul>
            </Paragraph>

            <Title level={3}>Send Us a Message</Title>
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
                rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email address' }]}
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
                <Button type="primary" htmlType="submit" block>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
