import { useState, useEffect } from "react";

interface ChildProps{
    tripID:number
}
interface detail{
    price:number
    description:string
    activities:string[]
}

export default function TripDetail(props:ChildProps):JSX.Element{
    const [details, setDetails] = useState<detail>();
        
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/trips/${props.tripID}`);
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            const result = await response.json();
            setDetails(result);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchItems();
  }, []);

return(
    <div>
        <p>description: {details?.description}</p>
        <p>activities: {details?.activities}</p>{details?.activities}
        <p>price: {details?.price}</p>
    </div>
)
}