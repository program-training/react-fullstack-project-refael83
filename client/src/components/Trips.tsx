// import { useState,useEffect } from "react"
// import NewTripFrom from "./NewTripForm"

// interface Trip{
//     id:number,
//     name: string,
//      destination: string,
//      startDate: string,
//      endDate: string,
//      image:string

// }

// export default function Trips():JSX.Element{
//     const [rerender,setRerender]=useState<number>(0)
//     const [trips,setTrips]=useState<Trip[]>([])
//     let result:Trip[]=[]
//       useEffect(() => {
//         const fetchItems = async () => {
//           let response=await fetch("http://localhost:3000/api/trips")
//           result = await response.json()
//           console.log(result)
         
//           if(!response.ok){
//             throw new Error(response.statusText)
//           }
//           else{
//           setTrips(result)
        
//           }
//           }
//           fetchItems()
//           },[])
//           console.log(result)
//     return (
//         <div>
//             {result.map((trip)=>{
//                 return <div>
//                     <p>{trip.id}</p>
//                     <p>{trip.name}</p>
//                     <p>{trip.destination}</p>
//                     <p>{trip.startDate}</p>
//                     <p>{trip.endDate}</p>
//                     <img src={trip.image}></img>
//                 </div>
//             })}
//              <button onClick={()=>setRerender(1)}>new trip</button>
//              {rerender===1&&<NewTripFrom></NewTripFrom>}
//         </div>
//     )
// }
import { useState, useEffect } from "react";
import NewTripForm from "./NewTripForm";
import TripDetail from "./TripDetail";

interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
}

export default function Trips(): JSX.Element {
  const [rerender, setRerender] = useState<number>(0);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripId,setTripId]= useState<number>(0)
  const [detail,setDetail]=useState<number>(0)

  useEffect(() => {
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

    fetchItems();
  },[] );




  return (
    <div>
     <button onClick={() => setRerender(1)}>New Trip</button>
      {rerender === 1 && 
      <NewTripForm trips={trips}/> }   
    {trips.map((trip,index) => (
        <div key={trip.id} onClick={()=>setDetail(trip.id)}>
          <img src={trip.image} alt={`Image for ${trip.name}`} />
          <p>{trip.id}</p>
          <p>{trip.name}</p>
          <p>{trip.destination}</p>
          <p>{trip.startDate}</p>
          <p>{trip.endDate}</p>
          {detail===trip.id&&<TripDetail tripID={detail}></TripDetail>}
          <button onClick={()=>{trips.splice(index,1)}}>delete</button>
        </div>
    ))}
      
      
      
    </div>
  );
}
