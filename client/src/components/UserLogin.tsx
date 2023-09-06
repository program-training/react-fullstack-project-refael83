import { useState ,FormEvent} from "react"

interface User {
    email:string,
    password:string
}

var myHeaders = new Headers();
myHeaders.append("Authorization", "test-token");
myHeaders.append("Content-Type", "application/json");

function storeToken(token:string){
    localStorage.setItem('token',token)
}

export default function UserLogin():JSX.Element{
    const [user,setUser]=useState<User>({email:"",password:""})
    let token=""
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/auth/login`,{method:'POST',headers: myHeaders,body:JSON.stringify(user),redirect: 'follow' })
        .then((response)=>{if (!response) 
            throw new Error('error')
            return response.json()
        })
        .then((data)=>{
            token=data.responseObj.token
            storeToken(token)
        })

    }

    function changeValue(key:string,value:any){
        setUser({...user,[key]:value})
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>email:
                <input type='text' value={user.email} onChange={(e)=>changeValue('email',e.target.value)}/>
            </label>
            <label>password:
                <input type='text' value={user.password} onChange={(e)=>changeValue('password',e.target.value)}/>
            </label>
            <input type="submit"></input>
        </form>
    )
}