import React from 'react';
import styled from 'styled-components';

const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="fire">
        <div className="fire-left">
          <div className="main-fire" />
          <div className="particle-fire" />
        </div>
        <div className="fire-center">
          <div className="main-fire" />
          <div className="particle-fire" />
        </div>
        <div className="fire-right">
          <div className="main-fire" />
          <div className="particle-fire" />
        </div>
        <div className="fire-bottom">
          <div className="main-fire" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  body {
    margin: 0;
    padding: 0;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000006;
  }

  .fire {
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    background-color: transparent;
    margin-left: auto;
    margin-right: auto;
  }
  
  @keyframes scaleUpDown {
    0%,
    100% {
      transform: scaleY(1) scaleX(1);
    }

    50%,
    90% {
      transform: scaleY(1.1);
    }

    75% {
      transform: scaleY(0.95);
    }

    80% {
      transform: scaleX(0.95);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: skewX(0) scale(1);
    }

    50% {
      transform: skewX(5deg) scale(0.9);
    }
  }

  @keyframes particleUp {
    0% {
      opacity: 0;
    }

    20% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      top: -100%;
      transform: scale(0.5);
    }
  }

  @keyframes glow {
    0%,
    100% {
      background-color: #3cff1e;
    }

    50% {
      background-color: #3cff1e;
    }
  }

  .fire-center {
    position: absolute;
    height: 100%;
    width: 100%;
    animation: scaleUpDown 3s ease-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-center .main-fire {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      farthest-corner at 10px 0,
      #3cff1e 0%,
      #3cff1e 95%
    );
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
    filter: drop-shadow(0 0 10px #3cff1e);
  }

  .fire-center .particle-fire {
    position: absolute;
    top: 60%;
    left: 45%;
    width: 10px;
    height: 10px;
    background-color: #3cff1e;
    border-radius: 50%;
    filter: drop-shadow(0 0 10px #d43322);
    animation: particleUp 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-right {
    height: 100%;
    width: 100%;
    position: absolute;
    animation: shake 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-right .main-fire {
    position: absolute;
    top: 15%;
    right: -25%;
    width: 80%;
    height: 80%;
    background-color: #3cff1e;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
    filter: drop-shadow(0 0 10px #3cff1e);
  }

  .fire-right .particle-fire {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 15px;
    height: 15px;
    background-color: #3cff1e;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 50%;
    filter: drop-shadow(0 0 10px #3cff1e);
    animation: particleUp 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-left {
    position: absolute;
    height: 100%;
    width: 100%;
    animation: shake 3s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-left .main-fire {
    position: absolute;
    top: 15%;
    left: -20%;
    width: 80%;
    height: 80%;
    background-color: #3cff1e;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
    filter: drop-shadow(0 0 10px #3cff1e);
  }

  .fire-left .particle-fire {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 10%;
    height: 10%;
    background-color: #3cff1e;
    border-radius: 50%;
    filter: drop-shadow(0 0 10px #d43322);
    animation: particleUp 3s infinite ease-out 0;
    animation-fill-mode: both;
  }

  .fire-bottom .main-fire {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 75%;
    height: 75%;
    background-color: #3cff1e;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 100% 40%;
    filter: blur(10px);
    animation: glow 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
`;

export default Loader;
