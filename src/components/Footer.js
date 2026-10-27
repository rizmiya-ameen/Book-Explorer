import { Container, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import '../styles/Footer.css'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (

    <Container className='Footer'>
      <hr />
      <Box className={`back-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
        Back to Top
      </Box>

      <Box className="contact-info">
        Built by <a href="https://github.com/rizmiya-ameen">Fathima Rizmiya</a> | Book data from the <a href="https://developers.google.com/books">Google Books API</a>
      </Box>

      <Box className="copyright">
        &copy; {new Date().getFullYear()} BookWorm. All rights reserved.
      </Box>

    </Container>

  )
}

export default Footer