import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
export default function StudyGuidePage({}) {
  const location = useLocation();
  const {guidePage} = location.state || {};
  useEffect(() => {
    console.log(guidePage);
    
  }, [])
    return (
      <main>
        <h1>Study Guide Page</h1>
      </main>
    );
  }