import React from "react";
import "./ImageGallery.css";

const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.length === 0 ? (
        <p>No images available. Please try a different breed or number.</p>
      ) : (
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Dog ${index}`}
            className="gallery-image"
          />
        ))
      )}
    </div>
  );
};

export default ImageGallery;
