import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";
export default function Genres({ props }) {

    //filters guides into genres, guides can have multiple genres and will appear in them
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
      <div className="literature" style={{'backgroundColor': "beige", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
        <h2>Literature</h2>
        {filterCardsIntoGenres("Literature").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="math" style={{'backgroundColor': "lightblue", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
        <h2>Math</h2>
        {filterCardsIntoGenres("Math").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="science" style={{'backgroundColor': "lightgreen", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
        <h2>Science</h2>
        {filterCardsIntoGenres("Science").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="computerscience" style={{'backgroundColor': "lightgrey", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
        <h2>Computer Science</h2>
        {filterCardsIntoGenres("Computer Science").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="sports" style={{'backgroundColor': "royalblue", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
        <h2>Sports</h2>
        {filterCardsIntoGenres("Sports").map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{ guidePage: guide }}>
              <CardComponent props={guide} />
            </Link>
          </div>
        ))}
      </div>
      <div className="worldhistory" style={{'backgroundColor': "rebeccapurple", 'margin-bottom': '40px', 'padding-bottom': '40px'}}>
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
