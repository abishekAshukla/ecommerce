import React from "react";

const Home = () => {
  return (
    <div className="mt-[52px]">
      <div className="bg-gray-100 p-11 m-[100px]">
        <div>
          <h1>Mobile Covers And Cases</h1>
        </div>
        <div className="flex">
          <div className="w-[60%] flex flex-col justify-center items-center bg-green-500">
              <input type="text" className="w-[70%]" />
              <input type="text" className="w-[70%] mt-3" />
              <button className="w-[70%] mt-3">SHOW MOBILE COVER</button>
          </div>
          <div className="w-[40%] bg-purple-500">
            <img
              src="https://images.bewakoof.com/web/ic-web-mc-land-covers-random.jpg"
              alt="back covers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
