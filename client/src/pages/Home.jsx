// Home.jsx
import React from 'react';
import logo from '../assets/logo.png';
import image1 from '../assets/image1.PNG';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.jpg';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">호윤교에 오신 것을 환영합니다!</h1>
      {/* <img src={logo} alt="로고" className="mx-auto mb-6 w-40" /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <img src={image1} alt="대표사진1" className="rounded shadow w-72 mx-auto" />
        <img src={image2} alt="대표사진2" className="rounded shadow w-72 mx-auto" />
        <img src={image3} alt="대표사진3" className="rounded shadow w-72 mx-auto" />
      </div>
    </div>
  );
};

export default Home;
