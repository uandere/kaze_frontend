import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';
import './MyHouses.css';

const AvailableHouses = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableProperties = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, 'properties'),
          where('userId', '!=', auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProperties(propertiesList);
      } catch (err) {
        console.error('Error fetching available properties:', err);
        setError('Failed to load available properties');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No available properties found</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <h3>{property.Name}</h3>
              <p style={{ color: 'black' }}>Address: {property.Address}</p>
              <p style={{ color: 'black' }}>Details: {property.Details}</p>
              <p style={{ color: 'black' }}>Added: {property.createdAt.toDate().toLocaleDateString()}</p>
``            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableHouses; 