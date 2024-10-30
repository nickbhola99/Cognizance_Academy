import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import Quotes from "../components/Quotes";
import Genres from "../components/Genres";
//make separate lists for each guide based on genre
export default function UserPage() {
  const navigate = useNavigate();
  const params = useParams();

  const token = localStorage.getItem("token");
  const [myguides, setGuides] = useState([]);
  const getGuides = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/guide/byusername/${params.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setGuides(res.data);
      console.log(myguides);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGuides();
  }, []);

  useEffect(() => {
    console.log(myguides); 
}, [myguides]);

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const loaded = () => {
    return (
      
      <div className="list">
        <Genres props={myguides} />
        {/* {myguides.map((guide) => (
          <div>
            <Link to={`/guide/${guide._id}`} state={{guidePage: guide}} >
              <CardComponent props={guide} />
            </Link>
          </div>
        ))} */}
      </div>
    );
  };

  return (
    <main>
      <h1>User Page</h1>
      {myguides ? loaded() : loading()}
      <Quotes />
    </main>
  );
}
