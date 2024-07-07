
import { createContext, useState } from 'react'

export const ApiContext = createContext(null);

export default function ApiContextProvider (props:any) {
const token = localStorage.getItem('token')
const [authorization,setAuthorization]=useState(token)
let baseUrl = 'http://localhost:3000/v1'

return (
<ApiContext.Provider value = {{ baseUrl , authorization,setAuthorization }}>
{props.children}
</ApiContext.Provider>
) 
}