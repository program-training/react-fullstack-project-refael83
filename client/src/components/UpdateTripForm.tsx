import React,{useState,FormEvent} from 'react'

type Trip= {
    id: number;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
  }
  interface Props{
    trip:Trip
  }

export default function NewTripFrom(props:Props):JSX.Element{
    const [NewTrip,setNewTrip]=useState<Trip>(props.trip)
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    }
    function changeValue(key:string,value:any){
        setNewTrip({...NewTrip,[key]:value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>id:
                <input type='text' value={props.id} onChange={(e)=>changeValue('id',e.target.value)}/>
            </label>
            <label>name:
                <input type='text' value={NewTrip.name} onChange={(e)=>changeValue('name',e.target.value)}/>
            </label>
            <label>destination:
                <input type='text' value={NewTrip.destination} onChange={(e)=>changeValue('destination',e.target.value)}/>
            </label>
            <label>startDate:
                <input type='text' value={NewTrip.startDate} onChange={(e)=>changeValue('startDate',e.target.value)}/>
            </label>
            <label>endDate:
                <input type='text' value={NewTrip.endDate} onChange={(e)=>changeValue('endDate',e.target.value)}/>
            </label>
            <label>image:
                <input type='text' value={NewTrip.image} onChange={(e)=>changeValue('image',e.target.value)}/>
            </label>
            <input type="submit"/>
        </form>
    )
}