'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useSession } from 'next-auth/react';
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  logoURL: string;
  notes: string;
  reportId: string; 
  onUpdate: (data: { logoURL: string; notes: string }) => void;
  onDelete: () => void; 
}

const Card = ({ children, className = "", logoURL, notes, reportId, onUpdate, onDelete }: CardProps) => {
  const [editMode, setEditMode] = useState(false);
  const [tempLogoURL, setTempLogoURL] = useState(logoURL);
  const [tempNotes, setTempNotes] = useState(notes);
  const router = useRouter();
  const { status } = useSession();

  const handleSave = () => {
    if (status !== 'authenticated') {
      setEditMode(false);
      alert('You must be logged in to save changes.');
      return;
    }
    onUpdate({ logoURL: tempLogoURL, notes: tempNotes });
    setEditMode(false);
  };

  const handleDelete = () => {
    if (status !== 'authenticated') {
      alert('You must be logged in to delete reports.');
      return;
    }
    onDelete();
  };

  const handleViewReport = () => {
    if (status !== 'authenticated') {
      alert('You must be logged in to view reports.');
      return;
    }
    router.push(`/dashboard/${reportId}`);
  };

  return (
    <div className={`card ${className}`} style={{ position: 'relative' }}>
      {/* Delete Button */}
      <button className="delete-button" onClick={handleDelete}>
        X
      </button>

      {children}

      {editMode && (
        <div className="edit-section">
          <div>
            <label>Logo URL:</label>
            <input
              type="text"
              value={tempLogoURL}
              onChange={(e) => setTempLogoURL(e.target.value)}
            />
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="button-div">
        {!editMode ? (
          <button className='card-button' onClick={() => setEditMode(true)}>Edit Card</button>
        ) : (
          <button className='card-button' onClick={handleSave}>Save Changes</button>
        )}
        <button className='card-button' onClick={handleViewReport}>View Report</button>
      </div>
    </div>
  );
};

export default Card;
