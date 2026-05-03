import { Link } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
  return (
    <div className="card">
      <img 
        src={animal.image || "https://via.placeholder.com/400x250?text=No+Image"} 
        alt={animal.name}
        className="card-img"
      />
      <div className="card-content">
        <h3 className="card-title">{animal.name}</h3>
        <p>{animal.breed} | {animal.type}</p>
        <p>{animal.location}</p>
        <p> {animal.weight} kg |  {animal.age} years</p>
        <div className="card-price">{animal.price.toLocaleString()}</div>
        <Link to={`/animal/${animal.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard;