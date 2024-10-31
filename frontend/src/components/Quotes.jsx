import { useState, useEffect } from "react";
import axios from "axios";

//Quote API prints a random quote on Education at bottom of pages
export default function Quotes() {
  const [quote, setQuote] = useState("");
  const getQuote = async () => {
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=education`,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log(res.data);
      setQuote(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuote();
  }, []);
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const loaded = () => {
    return (
      <div>
        {quote.map((q) => (
          <>
            {q.quote} - {q.author}
          </>
        ))}
      </div>
    );
  };

  return <div>{quote ? loaded() : loading()}</div>;
}
