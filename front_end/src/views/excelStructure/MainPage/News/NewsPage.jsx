import React, { useEffect, useState } from "react";
import "./newsPage.css";
import { apiUrl } from "../../../../store/const";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

const NewsPage = ({ toggleLoading }) => {
  const [dataNews, setDataNews] = useState(null);
  const [formattedData, setFormattedData] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState(0);
  const [isAnimating] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    toggleLoading(true);
    axios
      .get(apiUrl + "/news")
      .then((response) => {
        setDataNews(response.data);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des nouvelles :", error);
        toggleLoading(false);
      });
  }, []);

  useEffect(() => {
    if (dataNews && dataNews.data) {
      const newData = dataNews.data.map((item) => {
        const { date, updated_at, ...rest } = item;
        return {
          ...rest,
          month: moment(date).format("MMMM"),
          day: moment(date).format("D"),
        };
      });
      setFormattedData(newData);
    }
  }, [dataNews]);

  const handleClick = () => {
    if (formattedData.length > 3) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      } else {
        const id = setInterval(() => {
          setCurrentDisplay(
            (prevDisplay) => (prevDisplay + 1) % (formattedData.length - 2)
          );
        }, 3000);
        setIntervalId(id);
      }
    }
  };

  useEffect(() => {
    handleClick();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const isMobile = window.innerWidth <= 899;
  const itemsToDisplay = isMobile ? 1 : 3;

  return (
    <div className="news">
      <div className="title">Actualités</div>
      <div className="horizontal-bar"></div>

      <div className={`news-group ${isAnimating ? "transition" : ""}`}>
        {formattedData
          .concat(formattedData)
          .slice(currentDisplay, currentDisplay + itemsToDisplay)
          .map((item, index) => (
            <div
              className={`news-item news-item-${(index % itemsToDisplay) + 1}`}
              key={item.id}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <div className="vertical-bar-news" />
              <div className="rectangle-news">
                <div className="date-news-num">{item.day}</div>
                <div className="date-news-text">{item.month}</div>
              </div>
              <div className="text-news">
                <div className="title-news">{item.title}</div>
                <div className="desc-news">{item.description}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsPage;
