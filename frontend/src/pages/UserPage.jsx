import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Quotes from "../components/Quotes";
import Genres from "../components/Genres";
//page for users, renders all their study guides into their defined topics/genres
export default function UserPage() {
  const navigate = useNavigate();
  const params = useParams();

  const token = localStorage.getItem("token");
  const [myguides, setGuides] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const topicEnum = [ //topics
    "Literature",
    "Math",
    "Science",
    "Computer Science",
    "Sports",
    "World History",
  ];
  const [topics, setTopics] = useState([]);
  //handlers
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  //appends topic users checks to topics array
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTopics((prev) => [...prev, value]);
    } else {
      setTopics((prev) => prev.filter((topic) => topic !== value));
    }
    console.log(topics);
    console.log("l");
  };

  //Axios call to backend for user's information
  const getGuides = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/guide/byusername/${params.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGuides(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //post route for new guide
  const newGuide = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/guide/byusername/${params.username}`,
        { title, description, topics },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGuides((prevGuides) => [...prevGuides, res.data]);
      setTitle("");
      setDesc("");
      setTopics([]);
    } catch (error) {
      console.log(error);
    }
  };

  //loads guides initally
  useEffect(() => {
    getGuides();
  }, []);

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const loaded = () => {
    return (
      <div className="list">
        {/* separates cards on each Study Guide into different groups based on their topic with this Genres component*/}
        <Genres props={myguides} />
      </div>
    );
  };

  return (
    <main>
      <h1>User Page</h1>
      <div>
        <h2>Create New Guide</h2>

        <form onSubmit={newGuide}>
          <input
            type="text"
            name="Title"
            onChange={handleTitle}
            value={title}
            placeholder="Title: "
          />
          <input
            type="text"
            name="Description"
            onChange={handleDesc}
            value={description}
            placeholder="Description: "
          />
          {topicEnum.map((topic) => (
            <div key={topic}>
              <label>
                {topic}:{" "}
                <input
                  type="checkbox"
                  value={topic}
                  onChange={handleCheckbox}
                />
                {/* {option.label} */}
              </label>
            </div>
          ))}
          <button onClick={newGuide}>Submit</button>
        </form>
      </div>
      {myguides ? loaded() : loading()}
      <Quotes />
    </main>
  );
}
