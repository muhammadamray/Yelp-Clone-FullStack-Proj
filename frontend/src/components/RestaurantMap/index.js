import React, { useEffect, useState } from "react";

function RestaurantMap({ latitude, longitude }) {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("restaurant-map"),
        {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          disableDefaultUI: true, // Disable default map buttons
        }
      );

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: mapInstance,
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener("click", () => {
        if (selectedMarker) {
          selectedMarker.setAnimation(null);
        }

        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setSelectedMarker(marker);
      });

      setMap(mapInstance);

      return () => {
        if (selectedMarker) {
          selectedMarker.setAnimation(null);
        }
      };
    }
  }, [map, latitude, longitude, selectedMarker]);

  return (
    <div id="restaurant-map" style={{ width: "300px", height: "200px" }}></div>
  );
}

export default RestaurantMap;
