import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavigationBar from './components/NavigationBar'
import CustomCursor from './components/cursor'
import Home from './pages/Home'
import Events from './pages/Events'
import Team from './pages/Team'
import Contacts from './pages/Contacts'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  }, []);



  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <Router>
          <CustomCursor />
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App;
