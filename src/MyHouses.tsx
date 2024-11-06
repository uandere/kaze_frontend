import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import './MyHouses.css';

const MyHouses = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyDetails, setPropertyDetails] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, 'properties'),
        where('userId', '==', auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const propertiesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProperties(propertiesList);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!auth.currentUser) {
      alert('You must be logged in to add a property');
      setIsSubmitting(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'properties'), {
        Name: propertyName,
        Address: propertyAddress,
        Details: propertyDetails,
        userId: auth.currentUser.uid,
        createdAt: new Date()
      });

      console.log('Property added with ID:', docRef.id);
      
      setPropertyName('');
      setPropertyAddress('');
      setPropertyDetails('');
      
      fetchProperties();
      
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label>Property Name:</label>
          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Details:</label>
          <textarea
            value={propertyDetails}
            onChange={(e) => setPropertyDetails(e.target.value)}
            rows={4}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Property'}
        </button>
      </form>

      <h2>My Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <h3>{property.Name}</h3>
              <p style={{ color: 'black' }}>Address: {property.Address}</p>
              <p style={{ color: 'black' }}>Details: {property.Details}</p>
              <p style={{ color: 'black' }}>Added: {property.createdAt.toDate().toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHouses;
