import React, { useEffect, useState } from "react";
import "./Splash.css"; // Import your CSS file for styling

const Splash = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://www.wsetglobal.com/media/8219/1086x672_antipasti-wine.jpg",
    "https://media.istockphoto.com/id/1177099950/photo/high-end-plated-food-dish.jpg?s=612x612&w=0&k=20&c=_iLmOoNYbjO8k2Qg6GNaz1DxPAWLQhuatBOU16yaQfU=",
    "https://media.newyorker.com/photos/5cfecb5f23770dd0460bfaac/16:9/w_2560,h_1440,c_limit/Budin-LuxuryFood.jpg",
    "https://npr.brightspotcdn.com/dims4/default/2f0a4dd/2147483647/strip/true/crop/1440x810+0+0/resize/880x495!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F2a%2F54%2F6cb281e84758a85b33594b432d73%2Fbirch-restaurant.jpg",
  ];

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-container">
      <div className="carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Food Image ${index + 1}`}
            className={`fade ${index === currentImage ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;
