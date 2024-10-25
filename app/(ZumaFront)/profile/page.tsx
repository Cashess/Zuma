// UserProfile.tsx

"use client"; // Ensure this component is treated as a client component

import React from 'react';
import Link from 'next/link'; // Import the Link component
import './UserProfileRoute.css'; // Import your CSS file

function UserProfile() {
  return (
    <div className="container">
      <h2 className='text-3xl text-black font-bold justify-between'>User Profile</h2>
      <div className="button-container gap-6">
        <Link href="/profile/shipping" passHref>
          <button className="profile-button">Go to Shipping Address</button>
        </Link>
        
        <Link href="/profile/transactionDetails" passHref>
          <button className="profile-button">View Transaction Details</button>
        </Link>
        <Link href="/profile/deposit" passHref>
          <button className="profile-button">Deposit Funds</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
