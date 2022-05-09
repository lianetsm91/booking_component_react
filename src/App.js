import React from 'react';
import { Layout } from 'antd';
import Booking from './components/Booking';
import HeaderContent from './components/HeaderContent';
import FooterContent from './components/FooterContent';
import './App.css';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <HeaderContent />
      </Header>
      <Content>
        <Booking />
      </Content>
      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
}

export default App;
