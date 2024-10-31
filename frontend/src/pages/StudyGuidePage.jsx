import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { Carousel } from "react-bootstrap";
import { FlashCard } from "../components/FlashCardComponent";
import "../components/Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Quotes from "../components/Quotes";
import axios from "axios";
//this is where users see their flashcards in a carousel, they can make more, delete, or update them.
export default function StudyGuidePage({}) {
  const token = localStorage.getItem("token");
  const [cardTitle, setCardTitle] = useState("");
  const [cardBackInfo, setCardBackInfo] = useState("");
  const [addClicked, setAddClicked] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const { guidePage } = location.state || {};
  const [localGuidePage, setLocalGuidePage] = useState(guidePage);
  const [cardID, setcardID] = useState("");

  //handlers for creating, updating, and deleting
  const handleTitle = (e) => {
    setCardTitle(e.target.value);
  };

  const handleBackInfo = (e) => {
    setCardBackInfo(e.target.value);
  };

  const handleDelete = async (cardId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/guide/byid/${guidePage._id}/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setLocalGuidePage((prevGuide) => ({
        ...prevGuide,
        cards: prevGuide.cards.filter((card) => card._id !== cardId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNew = async (e) => {
    e.preventDefault();
    setError(false);
    if (cardTitle === "" || cardBackInfo === "") {
      setError(true);
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/guide/byid/${guidePage._id}/cards`,
        { title: cardTitle, backInfo: cardBackInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.status);
      setLocalGuidePage((prevGuide) => ({
        ...prevGuide,
        cards: [...prevGuide.cards, res.data.flashcard], // Add the new card
      }));
      setCardTitle("");
      setCardBackInfo("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/guide/byid/${guidePage._id}/${cardID}`,
        { title: cardTitle, backInfo: cardBackInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setLocalGuidePage((prevGuide) => ({
        ...prevGuide,
        cards: prevGuide.cards.map((card) =>
          card._id === cardID
            ? { ...card, title: cardTitle, backInfo: cardBackInfo }
            : card
        ),
      }));
      // Reset input fields
      setCardTitle("");
      setCardBackInfo("");
      setcardID("");
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <h1>Please fill out every field before submitting</h1>
      </div>
    );
  };

  //one form adds cards while the other updates already existing cards
  const addForm = () => {
    return (
      <div style={{ display: addClicked ? "" : "none" }}>
        <form>
          <div>
            <input
              type="text"
              name="Title"
              onChange={handleTitle}
              value={cardTitle}
              placeholder="Title: "
            />
          </div>
          <div>
            <input
              type="text"
              name="Back_Info"
              onChange={handleBackInfo}
              value={cardBackInfo}
              placeholder="Back Info: "
            />
          </div>
          <div>
            <button onClick={handleNew}>Submit</button>
          </div>
        </form>
      </div>
    );
  };

  const updateForm = () => {
    return (
      <div style={{ display: updateClicked ? "" : "none" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            type="text"
            onChange={handleTitle}
            value={cardTitle}
            placeholder="Title"
          />
          <input
            type="text"
            onChange={handleBackInfo}
            value={cardBackInfo}
            placeholder="Back Info"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    console.log(localGuidePage);
    console.log(localGuidePage.cards);
  }, [localGuidePage]);
  const handleSelect = (Index) => {
    setIndex(Index);
  };
  return (
    <main>
      <h1>Study Guide Page</h1>
      <div style={{width: '100px'}}>
        <Carousel activeIndex={index} interval={null} onSelect={handleSelect}>
          {localGuidePage.cards.map((card, index) => (
            <Carousel.Item key={index}>
              <div className="flipcard">
                <button
                  onClick={() => {
                    setcardID(card._id);
                    setCardTitle(card.title);
                    setCardBackInfo(card.backInfo);
                    setUpdateClicked(!updateClicked);
                  }}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <FlashCard props={card} />
                <button onClick={() => handleDelete(card._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div>{updateForm()}</div>
      </div>
      <button
        onClick={() => setAddClicked(!addClicked)}
        style={{ justifyContent: "center", marginTop: "40px" }}
      >
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
        Create New Flashcard
      </button>
      <div>{addForm()}</div>
      <div className="quotes">
        <Quotes />
      </div>
    </main>
  );
}
