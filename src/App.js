import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const fetchHotelData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsLoading(false)
      setTours(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  
  };
  useEffect(() => {
    fetchHotelData();
  }, []);
  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => {
      return tour.id !== id;
    });
    setTours(updatedTours);
  };
  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main> );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours to display</h2>
          <button className="btn" onClick={fetchHotelData}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
