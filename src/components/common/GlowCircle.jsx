import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlowingCircle />
    </div>
  );
}

const GlowingCircle = () => {
  return (
    <>
      <style>
        {`
        .glow-effect {
          box-shadow: 0 0 705px 50px rgba(250, 247, 243, 0.9), /* Primary blue glow */
                      0 0 500px 170px rgba(250, 247, 243, 0.8), /* Wider blue glow */
                      0 0 450px 150px rgba(250, 247, 243, 0.3); /* Even wider, lighter blue glow */
          transition: box-shadow 0.3s ease-in-out;
        }

        .glow-effect:hover {
          box-shadow: 0 0 20px 8px rgba(59, 130, 246, 0.9),
                      0 0 40px 15px rgba(59, 130, 246, 0.7),
                      0 0 60px 20px rgba(59, 130, 246, 0.5);
        }
        `}
      </style>

      <div className="
        relative
        flex items-center justify-center
        bg-white  rounded-full
        text-white text-lg font-bold
        glow-effect
        transform hover:scale-105 transition-transform duration-300 ease-in-out
      ">
      </div>
    </>
  );
};