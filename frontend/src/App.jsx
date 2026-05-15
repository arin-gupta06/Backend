import { useState, useEffect} from 'react'
import axios from "axios";


function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get("/api/userData")
    .then((response) => {
      setUser(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  })

  return (
    <>
      <h1>
        User data display
        <br />
        <br />
        <p>User Length: {user.length}</p>
        <br />
        {
          user.map((user, index) => (
            <div key={user.id}>
              <p>{user.name} : {user.occupation}</p>
              <br />
            </div>
          ))
        }
      </h1>
    </>
  )
}

export default App
