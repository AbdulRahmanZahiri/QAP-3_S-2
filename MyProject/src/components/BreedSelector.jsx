import React, { useEffect, useState } from "react";

const BreedSelector = ({ onSubmit }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [imageCount, setImageCount] = useState("1"); 

  useEffect(() => {
    console.log("Fetching breeds...");
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        console.log("API Response:", data);
        setBreeds(Object.keys(data.message));
      } catch (error) {
        console.error("Error fetching breeds:", error);
        alert("Failed to load breed list. Please try again later.");
      }
    };
    fetchBreeds();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(imageCount, 10);
    if (selectedBreed && count >= 1 && count <= 100) {
      console.log("Form Submitted:", { selectedBreed, count });
      onSubmit(selectedBreed, count);
    } else {
      alert(
        "Please select a breed and specify a valid number of images (1 to 100)."
      );
    }
  };

  const handleImageCountChange = (e) => {
    const value = e.target.value;
    
    if (value === "" || /^[0-9]*$/.test(value)) {
      setImageCount(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="breed">Select Breed:</label>
      <select
        id="breed"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">--Select a Breed--</option>
        {breeds.length > 0 ? (
          breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))
        ) : (
          <option disabled>Loading breeds...</option>
        )}
      </select>

      <label htmlFor="count">Number of Images:</label>
      <input
        type="number"
        id="count"
        min="1"
        max="100"
        value={imageCount}
        onChange={handleImageCountChange}
      />

      <button type="submit">Fetch Images</button>
    </form>
  );
};

export default BreedSelector;
