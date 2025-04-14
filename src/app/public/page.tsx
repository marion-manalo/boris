import './PublicDash.css';
import Items from '@/components/Items';

export default function PublicDash() {
  return (
    <main className="publicdash-main">
      <div className="publicdash-container">
        <h1 className="publicdash-title">Welcome to the Stock Dashboard</h1>
        <p className="publicdash-p">Login/Signup to save changes made to this page.</p>
        <Items />
      </div>
    </main>
  );
}
