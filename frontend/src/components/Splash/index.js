import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Splash.css"; // Import your CSS file for styling
import Logo from "./Logo.png"; // Import your logo image
import { fetchReservations } from "../../store/reservation";

const Splash = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const currUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const images = [
    "https://www.wsetglobal.com/media/8219/1086x672_antipasti-wine.jpg",
    "https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg",
    "https://media.newyorker.com/photos/5cfecb5f23770dd0460bfaac/16:9/w_2560,h_1440,c_limit/Budin-LuxuryFood.jpg",
    "https://media.istockphoto.com/id/626000834/photo/luxury-delicious-appetizer-serving.webp?b=1&s=170667a&w=0&k=20&c=ProhN_umNvee8cVrzQAuDvLP01NOmKcsOb_5kRIF6_c=",
  ];

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (currUser) {
      dispatch(fetchReservations());
    }
  }, [currUser, dispatch]);

  // useEffect(() => {
  //   const url =
  //     "https://api.yelp.com/v3/businesses/search?location=nyc&term=pizza&sort_by=best_match&limit=20";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "fyKsAYn-fOsN3OIi_vekzWD2Wx37YurS3rsRm0YzVudZy_DhC6p6Csrtr9AtzKYGfLdld1fnQC6YI3D_OKSOqiHTIbhhYmqNBKdCsnUdtweMra3ud3-CLkMuz3zwZXYx",
  //     },
  //     // mode: "no-cors",
  //   };

  //   fetch(url, options)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.error("error:" + err));
  // }, []);

  return (
    // <div className="splash-container">
    <div className="carousel">
      <div className="centext">
        <div className="splash-text">Welcome to Not Yelp</div>
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Food ${index + 1}`}
          className={`fade ${index === currentImage ? "active" : ""}`}
        />
      ))}
    </div>
    // </div>
  );
};

export default Splash;
