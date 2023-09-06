import {useState,useEffect} from 'react'
import Trips from "./Trips";

interface Trip {
    id: number;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
  }

export default function Start():JSX.Element{
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch("http://localhost:3000/api/trips");
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            const result = await response.json();
            setTrips(result);
            console.log(result)
            console.log(trips)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchItems();
      },[] );
      console.log(trips)

      return(
        <div>
            <Trips trips={trips}></Trips>
        </div>
      )
}