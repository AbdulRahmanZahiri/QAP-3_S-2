import React, { useState } from "react";
import BreedSelector from "./components/BreedSelector";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

const App = () => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);

  const fetchImages = async (breed, count) => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/${count}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images. Try again later.");
      }
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert(
        "Failed to fetch images. Please try again later or check your internet connection."
      );
    }
  };

  const handleFormSubmit = (breed, count) => {
    setSelectedBreed(breed);
    setImageCount(count);
    fetchImages(breed, count);
  };

  return (
    <div>
      <h1>Dog Image Gallery</h1>
      <BreedSelector onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
    </div>
  );
};

export default App;
