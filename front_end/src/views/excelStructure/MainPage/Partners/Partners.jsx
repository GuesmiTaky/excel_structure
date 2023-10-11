import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./partners.css";
import { apiUrl, api_url_pic } from "../../../../store/const";
import axios from "axios";

const Partners = ({ toggleLoading }) => {
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    toggleLoading(true);
    axios
      .get(apiUrl + "/partner")
      .then((response) => {
        const urls = response.data.data.map(
          (item) => item.image_relation.image_url
        );
        setImageUrls(urls);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des partenaires:", error);
        toggleLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // jusqu'à 1024px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // jusqu'à 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480, // jusqu'à 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="main-partner">
      <div className="title">Nos partenaires</div>
      <div
        className="horizontal-bar"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <Slider {...settings}>
        {imageUrls.map((image, index) => (
          <div key={index}>
            <img src={`${api_url_pic}/${image}`} alt={`partner ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partners;
