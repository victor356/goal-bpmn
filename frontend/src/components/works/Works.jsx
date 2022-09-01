import React, { useState } from "react";
import "./works.scss";
import Fade from 'react-reveal/Fade';
import image from "../../assets/foto.png";
import logo from "../../assets/logo.png";

function Works() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      id: 1,
      title: 'Bpmn-js',
      descr: 'Libreria utilizzata per creare e modificare i diagrammi BPMN.',
      img: 'https://avatars.githubusercontent.com/u/6481734?s=280&v=4'
    },
    {
      id: 2,
      title: 'Camunda Engine',
      descr: 'Motore utilizzato per eseguire i BPMN e testarne la validità.',
      img: 'https://camunda.com/wp-content/uploads/camunda/blog-images/4-icon.png'
    },
    {
      id: 3,
      title: 'Iot-Devices',
      descr: 'I diagrammi BPMN creati vengono tradotti e iniettati dentro gli Iot-Devices selezionati.',
      img: 'https://eclubprague.com/wp-content/uploads/2016/03/iot.png'
    },
  ]

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : data.length - 1)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0)
  }

  return (
    <div className="works" id="works">
      <h1>Technologies</h1>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {data.map(d => (
          <Fade>
            <div className="container">
              <div className="item">
                <div className="left">
                  <div className="leftContainer">
                    <h2>{d.title}</h2>
                    <p>
                      {d.descr}
                    </p>
                  </div>
                </div>
                <div className="right">
                  <img src={d.img} alt="" />
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
      <img
        src="https://www.shareicon.net/data/2015/10/06/113447_right_512x512.png"
        className="arrow left"
        alt=""
        onClick={() => handleClick("left")} />
      <img
        src="https://www.shareicon.net/data/2015/10/06/113447_right_512x512.png"
        className="arrow right"
        alt=""
        onClick={() => handleClick()} />
    </div>
  );
}

export default Works;
