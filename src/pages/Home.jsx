import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo à Homepage</h1>
      <nav className="home-nav">
        <div className="home-buttons">
          <Link to="/PageDriver" className="home-button">Página Motoristas</Link>
          <Link to="/PageVehicle" className="home-button">Página Veículos</Link>
          <Link to="/PageTravel" className="home-button">Página Viagens</Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
