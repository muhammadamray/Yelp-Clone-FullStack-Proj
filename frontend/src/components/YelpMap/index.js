import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import "./YelpMap.css";

function YelpMap({
  businesses,
  highlightedBusiness,
  mapOptions = {},
  mapEventHandlers = {},
  markerEventHandlers = {},
}) {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});
  const history = useHistory();

  // Create the map
  useEffect(() => {
    if (!map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: {
            lat: 40.705076, // App Academy NY latitude
            lng: -74.00916, // App Academy NY longitude
          },
          zoom: 15,
          clickableIcons: false,
          ...mapOptions,
          disableDefaultUI: true,
        })
      );
    }
  }, [mapRef, map, mapOptions]);

  // Add event handlers to map
  useEffect(() => {
    if (map) {
      const listeners = Object.entries(mapEventHandlers).map(
        ([event, handler]) =>
          window.google.maps.event.addListener(map, event, (...args) =>
            handler(...args, map)
          )
      );

      return () => listeners.forEach(window.google.maps.event.removeListener);
    }
  }, [map, mapEventHandlers]);

  // Update map markers whenever `benches` changes
  useEffect(() => {
    if (map) {
      // Add markers for new businesses
      businesses.forEach((business) => {
        if (markers.current[business.id]) return;

        const marker = new window.google.maps.Marker({
          map,
          position: new window.google.maps.LatLng(
            business.latitude,
            business.longitude
          ),
          label: {
            text: business.id.toString(), // Use the business rating as the label text
            fontWeight: "bold",
          },
          icon: {
            url: "https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/pin2.png", // External URL to your custom pin icon
            scaledSize: new window.google.maps.Size(20, 30), // Adjust the size of the custom pin icon
          },
        });

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(business));
        });
        markers.current[business.id] = marker;
      });

      // Remove markers for old benches
      Object.entries(markers.current).forEach(([businessId, marker]) => {
        if (businesses.some((business) => business.id.toString() === businessId)) return;

        marker.setMap(null);
        delete markers.current[businessId];
      });
    }
  }, [businesses, history, map, markerEventHandlers]);

  // Change the style for bench marker on hover
  useEffect(() => {
    Object.entries(markers.current).forEach(([businessId, marker]) => {
      const label = marker.getLabel();
      const icon = marker.getIcon();

      if (parseInt(businessId) === highlightedBusiness) {
        marker.setLabel({ ...label, color: "white" });
        marker.setIcon({ ...icon, fillColor: "black" });
      } else {
        marker.setLabel({ ...label, color: "black" });
        marker.setIcon({ ...icon, fillColor: "white" });
      }
    });
  }, [markers, highlightedBusiness]);

  return (
    <div ref={mapRef} className="yelp-map">
      Map
    </div>
  );
}

function YelpMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <YelpMap {...props} />
    </Wrapper>
  );
}

export default YelpMapWrapper;
