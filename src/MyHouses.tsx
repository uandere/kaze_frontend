import React, { useState, useEffect } from "react";
import { Carousel, Pagination } from "antd";
import "./MyHouse.css";
import properties from "./data.json";

interface Property {
  name: string;
  price: number;
  description: string;
  address: string;
  images: string[];
}

const MyHouses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(4);

  // Get current properties based on pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>My Properties</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {currentProperties.map((property, index) => (
          <div
            key={index}
            style={{
              display: "flex", // Use flexbox to layout the content and images side by side
              border: "1px solid #f8e002",
              borderRadius: "8px",
              padding: "15px",
              width: "90vw",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              alignItems: "center", // Vertically align content
            }}
          >
            <div style={{ flex: 1, marginRight: "20px" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                {property.name}
              </h2>
              <p
                style={{
                  color: '#f8e002',
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                ${property.price.toLocaleString()}
              </p>
              <p style={{ marginBottom: "10px" }}>{property.description}</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#f8e002",
                  marginBottom: "10px",
                }}
              >
                📍 {property.address}
              </p>
            </div>
            <div style={{ flexShrink: 0, width: "600px" }}>
              <Carousel dots={true} arrows={true}>
                {property.images.map((image, i) => (
                  <div key={i}>
                    <img
                      src={image} // image path relative to the public folder
                      alt={`${property.name} ${i + 1}`}
                      style={{
                        width: "600px",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", display: "flex" , justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={properties.length}
          pageSize={propertiesPerPage}
          onChange={handleChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MyHouses;