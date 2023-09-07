// useEffect(() => {

//   setTrips(props.trips)
// }, [props.trips])
var myHeaders = new Headers();
myHeaders.append("Authorization", "test-token");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: "",
  redirect: "follow",
};

import { useState, useEffect } from "react";
import NewTripForm from "./NewTripForm";
import TripDetail from "./TripDetail";
import UpdateTripForm from "./UpdateTripForm";

interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
}
interface Props {
  trips: Trip[];
}

export default function Trips(): JSX.Element {
  const [rerender, setRerender] = useState<number>(0);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [detail, setDetail] = useState<number>(0);
  const [update,setUpdate]=useState<number>(0)

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/trips");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setTrips(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteButton = (id: number) => {
    fetch(`http://localhost:3000/api/trips/${id}`, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify([]),
      redirect: "follow",
    }).then(() => {
      fetchItems();
    });
  };

  return (
    <div>
      <button onClick={() =>{
        setRerender(1)
      } }>New Trip</button>
      {rerender === 1 && <NewTripForm trips={trips} />}
      {trips.map((trip, index) => (
        <div key={trip.id}>
          <img src={trip.image} alt={`Image for ${trip.name}`} />
          <p>{trip.id}</p>
          <p>{trip.name}</p>
          <p>{trip.destination}</p>
          <p>{trip.startDate}</p>
          <p>{trip.endDate}</p>
          <button onClick={() => setDetail(trip.id)}>more details</button>
          {detail === trip.id && <TripDetail tripID={detail}></TripDetail>}
          <button
            onClick={() => {
              deleteButton(trip.id);
            }}
          >
            delete
          </button>
          <button onClick={()=>setUpdate(trip.id)} >update</button>
          {update===trip.id &&<UpdateTripForm trip={trip}></UpdateTripForm>}
        </div>
        
      ))}
    </div>
  );
}
