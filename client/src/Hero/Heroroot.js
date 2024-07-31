import React, { useEffect } from 'react'
import Hero from './Hero'
import Footer from './Footer'
import Navroot from './Navroot'
import { useNavigate } from 'react-router-dom'

function Heroroot() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("book-auth")){
      navigate("/dash");
    }
  })
  return (
    <div>
      <Navroot />
      <Hero />
      <Footer />
    </div>
  );
}

export default Heroroot