import React, { useEffect, useRef, useState } from "react";
import "./gallery.css";
import { api_url_pic } from "../../../../store/const";

const Gallery = ({ imagesProject }) => {
  const [mainImage, setMainImage] = useState(0);
  const [fadeEffect, setFadeEffect] = useState(false);
  const [projects, setProjects] = useState([]);
  const mainImageRef = useRef(null);

  const handleImageClick = (index) => {
    setFadeEffect(true);
    setTimeout(() => {
      setMainImage(index);
      setFadeEffect(false);
    }, 500);
    mainImageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (
      imagesProject &&
      imagesProject.image_relations &&
      imagesProject.image_relations.length > 0
    ) {
      const imgProjects = imagesProject.image_relations.map(
        (imageRelation) => ({
          id: imageRelation.id,
          src: api_url_pic + imageRelation.image_url,
          alt: imageRelation.image_url || "",
        })
      );
      setProjects(imgProjects);
    }
  }, [imagesProject]);

  return (
    <div className="gallery-detail-project">
      <div className="row-image-detail-project">
        {projects.length > mainImage && (
          <div
            ref={mainImageRef}
            className={`main-image-detail-project ${
              fadeEffect ? "fade-out" : ""
            }`}
          >
            <img src={projects[mainImage].src} alt={`main ${mainImage + 1}`} />
          </div>
        )}
        {projects.length > 1 && (
          <div className="left-images-detail-project">
            {projects.slice(0, 2).map((image, index) => (
              <div
                key={index}
                className="image-container-gallery-detail-project"
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {projects.length > 1 && (
        <div className="golbal-thumbnail-images">
          <div className="thumbnail-images">
            {projects.slice(2).map((image, index) => (
              <div
                key={index + 2}
                className="image-container-gallery-detail-project"
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 3}`}
                  onClick={() => handleImageClick(index + 2)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
