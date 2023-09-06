import { useState ,FormEvent} from "react"

interface User {
    email:string,
    password:string
}

var myHeaders = new Headers();
myHeaders.append("Authorization", "test-token");
myHeaders.append("Content-Type", "application/json");


export default function UserRegistration():JSX.Element{
    const [newUser,setNewUser]=useState<User>({email:"",password:""})
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/auth/register`,{method:'POST',headers: myHeaders,body:JSON.stringify(newUser),redirect: 'follow' })
    }

    function changeValue(key:string,value:any){
        setNewUser({...newUser,[key]:value})
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>email:
                <input type='text' value={newUser.email} onChange={(e)=>changeValue('email',e.target.value)}/>
            </label>
            <label>password:
                <input type='text' value={newUser.password} onChange={(e)=>changeValue('password',e.target.value)}/>
            </label>
            <input type="submit"></input>
        </form>
    )
}