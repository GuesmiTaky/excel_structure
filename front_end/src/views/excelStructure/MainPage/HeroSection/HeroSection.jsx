import React, { useState, useEffect, useRef } from "react";
import "./heroSection.css";
import image3 from "../../../../images/image3.jpg";
import image4 from "../../../../images/image4.jpg";
import image6 from "../../../../images/image6.jpg";
import Arrow from "../../../../assets/Arrow";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const greenRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);

  const images = [
    {
      src: image4,
      alt: "Image 1",
      title: "Titre de l'image 1",
    },
    {
      src: image3,
      alt: "Image 2",
      title: "Titre de l'image 2",
    },
    {
      src: image6,
      alt: "Image 3",
      title: "Titre de l'image 3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  //function redirect to contact page
  const redirectToContact = () => {
    navigate("/contact-page");
  };

  useEffect(() => {
    const greenRefCurrent = greenRef.current;
    const textRefCurrent = textRef.current;
    const subTextRefCurrent = subTextRef.current;
    const buttonRefCurrent = buttonRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
          } else {
            entry.target.classList.add("hidden");
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    greenRefCurrent && observer.observe(greenRefCurrent);
    textRefCurrent && observer.observe(textRefCurrent);
    subTextRefCurrent && observer.observe(subTextRefCurrent);
    buttonRefCurrent && observer.observe(buttonRefCurrent);

    return () => {
      greenRefCurrent && observer.unobserve(greenRefCurrent);
      textRefCurrent && observer.unobserve(textRefCurrent);
      subTextRefCurrent && observer.unobserve(subTextRefCurrent);
      buttonRefCurrent && observer.unobserve(buttonRefCurrent);
    };
  }, [greenRef, textRef, subTextRef, buttonRef]); // Add the refs to the dependency array

  return (
    <div className="main-hero-section">
      <div className="carousel-container">
        {images.map((img, index) => (
          <img
            className={`img-hero-section ${
              currentImage === index ? "active" : ""
            }`}
            src={img.src}
            alt={img.alt}
            title={img.title}
            key={index}
          />
        ))}

        <div ref={greenRef} className="green-border-hero-section hidden"></div>
        <div ref={textRef} className="text-hero-section hidden">
          Des solutions
          <br />
          structurelles sur mesure
          <br />
          pour chaque projet !
        </div>
        <div ref={subTextRef} className="sub-text-hero-section hidden">
          Nous sommes un bureau d'études de structures basé à Marseille,
          spécialisé dans l'analyse et la conception de
          <br />
          bâtiments en béton armé, métallique et en bois. Notre équipe d'experts
          offre des solutions techniques précises et
          <br />
          innovantes pour vos projets de réhabilitation et de construction
          neuve. Faites confiance à notre expertise pour
          <br />
          des réalisations optimisées, durables et de qualité.
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="button-hero-section hidden"
          onClick={() => redirectToContact()}
        >
          Contacter nous
          <Arrow />
        </button>
      </div>
      <div className="indicator-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${currentImage === index ? "active" : ""}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
