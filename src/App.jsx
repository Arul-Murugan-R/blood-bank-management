import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Bank from './components/Bank'
import Table from './components/Table'
//#d70035
function App() {
  const [page, setPage] = useState(0)

  return (
    <div className="App">
      {page === 0 && 
      <>
      <Navbar />
      <div className="intro">
        <video src='homepagegif.mp4'   autoPlay loop muted style={{position:'absolute',bottom:'0',right:'0'}}/>
        <div className="intro-text">
          <h1><br/>Donate Blood<br></br></h1>
        </div>
      </div>
      <Bank /></>}
      {page === 1 && 
      <>
      <Navbar />
      <Table />
      </>
      }
    </div>
  )
}

export default App
