import Routes_ from './routes/Routes'
import Navbar from './navbar/Navbar'
import { useContext, useState } from 'react'
import { UserContext, UserProvider } from './store/auth'
import './App.css';

function App() {

  const [tokenValue , setTokenValue] = useState<string>('')

  // const {user , setUser} = useContext(UserContext);
  return (
    <>
      <UserProvider>
            <Navbar />
            <Routes_ />
      </UserProvider>
    </>
  )
}

export default App
