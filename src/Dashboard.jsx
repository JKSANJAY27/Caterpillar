import { UserButton, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  app: {
    textAlign: "center",
  },
  header: {
    width: "100%",
    height: "auto",
    position: "relative", // Ensure positioning for the small button
  },
  headerButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ffcc00", // Yellow color
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  headerButtonHover: {
    backgroundColor: "#e6b800", // Slightly darker yellow for hover
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    flexWrap: "wrap", // Allow buttons to wrap if there is not enough space
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px",
  },
  icon: {
    width: "100px", // Set a fixed width
    height: "50px", // Set a fixed height
    lineHeight: "50px", // Center text vertically
    fontSize: "1.5rem",
    backgroundColor: "#ffcc00", // Yellow color
    borderRadius: "5px", // Rectangular shape
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow to the icons
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Add transition for the shadow and pop-out effect
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold", // Bold text
    color: "#333", // Text color
    border: "none", // Remove default border
  },
  iconLabel: {
    marginTop: "8px",
    fontSize: "1rem",
    color: "#333",
    fontWeight: "bold", // Make labels bold
    fontFamily: "'Roboto', sans-serif", // Use a custom font family
  },
  iconContainerActive: {
    transform: "scale(1.1)", // Pop-out effect when active
  },
};

const icons = [
  { symbol: "🆕", label: "New Services"},
  { symbol: "🔍", label: "View Previous Services" },
  { symbol: "🔧", label: "Know more info about Machine parts" },
];

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (index === 0) {
      onCreate();
    }
  };
  const { user } = useUser();
  const [loading,setLoading] = useState(false);
  const navigation = useNavigate();

  const employeeID = {
    employeeID: "string",
  };

  const onCreate = async()=>{
    setLoading(true);
    const data = {
      data: {
        employeeID: employeeID,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
      }
    }
    navigation('/headers');
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <button style={styles.headerButton}>
          <UserButton />
        </button>
        <img
          src="https://www.texasrockgym.com/wp/wp-content/uploads/2019/01/Caterpillar-logo-logotype-18824_1080x316.png" // Corrected direct URL
          alt="Header"
          style={{ width: "100%", height: "auto" }}
        />
      </header>
      <div style={styles.iconsContainer}>
        {icons.map((icon, index) => (
          <div
            key={index}
            style={{
              ...styles.iconContainer,
              ...(activeIndex === index ? styles.iconContainerActive : {}),
            }}
            onClick={() => handleClick(index)}
          >
            <div
              style={{
                ...styles.icon,
                ...(activeIndex === index
                  ? {
                      transform: "scale(1.2)",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    }
                  : {}),
              }}
            >
              {icon.symbol}
            </div>
            <div style={styles.iconLabel}>{icon.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;