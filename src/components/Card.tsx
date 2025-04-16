import { useRouter } from 'next/navigation';
import { useState } from "react";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  logoURL: string;
  notes: string;
  reportId: string; // 👈 new
  onUpdate: (data: { logoURL: string; notes: string }) => void;
}

const Card = ({ children, className = "", logoURL, notes, reportId, onUpdate }: CardProps) => {
  const [editMode, setEditMode] = useState(false);
  const [tempLogoURL, setTempLogoURL] = useState(logoURL);
  const [tempNotes, setTempNotes] = useState(notes);
  const router = useRouter(); // 👈 init router

  const handleSave = () => {
    onUpdate({ logoURL: tempLogoURL, notes: tempNotes });
    setEditMode(false);
  };

  const handleViewReport = () => {
    router.push(`/dashboard/${reportId}`);
  };

  return (
    <div className={`card ${className}`}>
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
