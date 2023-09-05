import { useState } from "react"
import Trips from "./Trips"
import UserRegistration from "./UserRegistration"
import UserLogin from "./UserLogin"

export default function Home():JSX.Element{
   const [rerender,setRerender]=useState<number>(0)

//    const flag=():void=>{
//     setRerender(!rerender)
//    }

    return (
        <div>
            
            <button onClick={()=>setRerender(1)}>Trips</button>
            <button onClick={()=>setRerender(2)}>Registration</button>
            <button onClick={()=>setRerender(3)}>connecting</button>
            {rerender===1&&<Trips></Trips>}
            {rerender===2&&<UserRegistration></UserRegistration>}
            {rerender===3&&<UserLogin></UserLogin>}
        </div>
    )
}