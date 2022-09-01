import React, { useEffect, useState } from "react";
import PortfolioList from "../portfolioList/PortfolioList";
import "./portfolio.scss";
import {
  thorPortfolio,
  capPortfolio,
  hulkPortfolio,
  ironmanPortfolio
} from '../../data';

function Portfolio() {

  const [selected, setSelected] = useState("thor");
  const [data, setData] = useState([]);

  const list = [
    {
      id: "thor",
      title: "Ventilatore"
    },
    {
      id: "ironman",
      title: "Condizionatore"
    },
    {
      id: "hulk",
      title: "Sensore X"
    },
    {
      id: "cap",
      title: "Sensore Y"
    },
  ]

  useEffect(() => {
    switch (selected) {
      case "thor":
        setData(thorPortfolio);
        break;
      case "ironman":
        setData(ironmanPortfolio);
        break;
      case "hulk":
        setData(hulkPortfolio);
        break;
      case "cap":
        setData(capPortfolio);
        break;
      default:
        setData(thorPortfolio);
    }
  }, [selected])

  return (
    <div className="portfolio" id="portfolio">
      <h1>IoT Devices</h1>
      <ul>
        {list.map(item => (
          <PortfolioList
            id={item.id}
            title={item.title}
            active={selected === item.id}
            setSelected={setSelected} />
        ))}
      </ul>
      <div className="container">

        {data.map((d) => (
          <div className="item">
            <img src={d.img} alt="" />
            <h3>{d.title}</h3>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Portfolio;