'use client';

import './Welcome.css';
import { useRouter } from 'next/navigation';

const Welcome = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/public');
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">
        Need help with investing?
      </h1>
      <p className="welcome-description">
        Get current insights on any stock and view recent company expense reports.
      </p>
      <h6 className="welcome-subtitle">
        Press the button below to get started.
      </h6>

      <button className="welcome-button" onClick={handleRedirect}>
        Go to Public Page
      </button>
    </div>
  );
};

export default Welcome;
