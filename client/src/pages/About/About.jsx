import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: '50px 0 0 0 ',background:'#f5f5f5' }}>
    <div style={{ padding: '50px', background:'#f5f5f5' }}>
      <Row justify="center">
        <Col span={16}>
          <Card style={{boxShadow: '0 1px 2px 4px rgba(0, 0, 0, 0.01)' }}>
            <Title level={1} style={{ textAlign: 'center' }}>
              About Hoang System Education
            </Title>

            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Welcome to <strong>Hoang System Education</strong>, your one-stop destination for innovative educational tools! 
              Our mission is to empower students, educators, and lifelong learners by offering smart products designed to 
              make learning more effective, engaging, and enjoyable.
            </Paragraph>

            <Title level={3}>Our Story</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              At <strong>Hoang System Education</strong>, we believe that technology can transform the way we learn. 
              Founded with a passion for education and innovation, our goal is to bridge the gap between traditional 
              learning and the latest advancements in educational technology. From smart notebooks and AI-powered study 
              aids to interactive learning devices, we are committed to providing tools that help learners of all ages 
              succeed in today’s fast-paced world.
            </Paragraph>

            <Title level={3}>Our Products</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              We carefully curate and offer a wide range of smart educational products, including:
              <ul>
                <li>Smart Notebooks: Write, erase, and save your notes digitally with ease.</li>
                <li>AI Tutors: Personalized learning assistants that adapt to your study style.</li>
                <li>Interactive Learning Devices: Engage with learning through hands-on, tech-driven experiences.</li>
                <li>Productivity Gadgets: Stay focused and organized with our collection of smart planners, timers, and more.</li>
              </ul>
            </Paragraph>

            <Title level={3}>Why Choose Us?</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              <ul>
                <li><strong>Quality & Innovation:</strong> We bring you the latest in educational technology from trusted global brands.</li>
                <li><strong>Supportive Learning:</strong> Our products are designed to enhance focus, improve memory retention, and foster creativity.</li>
                <li><strong>Customer Focused:</strong> We are here to support your learning journey with top-notch customer service and personalized recommendations.</li>
              </ul>
            </Paragraph>

            <Title level={3}>Our Vision</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Our vision is to create an environment where every learner has access to the tools they need to succeed. 
              Whether you're a student, teacher, or professional, our products are designed to help you unlock your full potential.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default About;
