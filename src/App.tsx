import * as React from 'react';
import Content from './Content';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="font-['Source_Serif_4']">

      <div className="max-w-6xl mx-auto">
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
