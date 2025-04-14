import './Dash.css';
import Items from '@/components/Items';

export default function PublicDash() {
  return (
    <main className="publicdash-main">
      <div className="publicdash-container">
        <h1 className="publicdash-title">Welcome to the Stock Dashboard</h1>
        <p className="publicdash-p">Welcome, UserName.</p>
        <Items />
      </div>
    </main>
  );
}
