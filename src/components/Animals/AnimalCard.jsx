import { Link } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
  return (
    <div className="card">
      <img src={animal.image} alt={animal.name} />
      <div className="card-content">
        <h3>{animal.name}</h3>
        <p>{animal.type} | {animal.breed}</p>
        <p>📍 {animal.location}</p>
        <p>⚖️ {animal.weight} kg | 📅 {animal.age} years</p>
        <p style={{fontSize: '24px', fontWeight: 'bold', color: '#0B3B2A'}}>৳{animal.price.toLocaleString()}</p>
        <Link to={`/animal/${animal.id}`} className="btn btn-primary" style={{display: 'inline-block', marginTop: '10px'}}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard;