import { SignInButton } from '@clerk/clerk-react';
import './Home.css';

const Home = () => {
  return (
    <div className="app-container">
      <div className="form-container">
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" />
      </div>
    </div>
      
  );
};

export default Home;