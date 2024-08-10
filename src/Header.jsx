import React from "react";
import "./Header.css"; // Import the CSS file for styling
import { UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <div className="app-container">
      {/* New small yellow button */}
      <div className="yellow-button">
        <UserButton />
      </div>

      {/* Bottom Image with Icons and Labels */}
      <div className="bottom-image-container">
        <img
          src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220921-ae594-86cb3"
          alt="Inspection Equipment"
          className="bottom-image"
        />
        <div className="icons-container">
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/ios/50/000000/tire.png"
              alt="Tires"
            />
            <span>Tires</span>
          </div>
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/ios/50/000000/battery.png"
              alt="Battery"
            />
            <span>Battery</span>
          </div>
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/ios/50/000000/exterior.png"
              alt="Exterior"
            />
            <span>Exterior</span>
          </div>
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/?size=100&id=0s5tdFYK8wN3&format=png&color=000000"
              alt="Brakes"
            />
            <span>Brakes</span>
          </div>
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/ios/50/000000/engine.png"
              alt="Engine"
            />
            <span>Engine</span>
          </div>
          <div className="icon">
            <div className="button-background"></div>
            <img
              src="https://img.icons8.com/?size=100&id=42448&format=png&color=000000"
              alt="Voice of Customer"
            />
            <span>Voice of Customer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;