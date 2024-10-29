import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function UserPage() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const token = localStorage.getItem('token');
  const [myguides, setGuides] = useState(null);
  useEffect(() => {
    const getGuides = async () => {
      
      try {
      const res = await axios.get(`http://localhost:4000/guide/byusername/${params.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
    }
    getGuides();
  }, [])
    return (
      <main>
        <h1>User Page</h1>
      </main>
    );
  }