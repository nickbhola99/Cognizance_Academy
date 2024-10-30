import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";
export default function Genres({ props }) {
  const filterCardsIntoGenres = (genre) => {
    console.log(props);
    console.log(genre);

    return props.filter((guide) => {
      console.log(guide.topic);
      return guide.topic.includes(genre);
    });
  };
  return (
    <div className="genres">
      <div className="literature">
        <h2>Literature</h2>
        {filterCardsIntoGenres("Literature").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="math">
        <h2>Math</h2>
        {filterCardsIntoGenres("Math").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="science">
        <h2>Science</h2>
        {filterCardsIntoGenres("Science").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="computerscience">
        <h2>Computer Science</h2>
        {filterCardsIntoGenres("Computer Science").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="sports">
        <h2>Sports</h2>
        {filterCardsIntoGenres("Sports").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="worldhistory">
        <h2>World History</h2>
        {filterCardsIntoGenres("World History").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
