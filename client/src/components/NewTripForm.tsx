import React,{useState,FormEvent} from 'react'

var myHeaders = new Headers();
myHeaders.append("Authorization", "test-token");
myHeaders.append("Content-Type", "application/json");

type Trip= {
    id: number;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
  }
  interface Props{
    trips:Trip[]
  }

export default function NewTripFrom(props:Props):JSX.Element{
    const [NewTrip,setNewTrip]=useState<Trip>({
        id:0,
        name:"",
        destination:"",
        startDate:"",
        endDate:"",
        image:""
    })
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/trips`,{method:'POST',headers: myHeaders,body:JSON.stringify(NewTrip),redirect: 'follow' })
        
    }
    
    function changeValue(key:string,value:any){
        setNewTrip({...NewTrip,[key]:value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>id:
                <input type='text' value={NewTrip.id} onChange={(e)=>changeValue('id',e.target.value)}/>
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
            <input type="submit" />
        </form>
    )
}