import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { TenantDataForm } from './TenantDataForm';
import { PropertyDeedForm } from './PropertyDeedForm';
import { AdditionalPropertyDataForm } from './AdditionalPropertyDataForm';
import { SubmitButton } from './SubmitButton';
import MyHouses from './MyHouses';
import AvailableHouses from './AvailableHouses';
const Private = ({ onSignOut }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={handleSignOut}>Sign Out</button>
        <Link to="/dashboard/my-houses">My houses</Link>
        <Link to="/dashboard/available-houses">Available houses</Link>
        <Link to="/dashboard/add-property">Add Property</Link>
      </nav>

      <Routes>
        <Route path="my-houses" element={<MyHouses />} />
        <Route path="available-houses" element={<AvailableHouses />} />
        <Route path="add-property" element={
          <div>
            <TenantDataForm />
            <PropertyDeedForm />
            <AdditionalPropertyDataForm />
            <SubmitButton />
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Private;
