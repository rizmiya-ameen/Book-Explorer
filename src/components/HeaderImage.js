import React from 'react'
import { Container } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import '../styles/HeaderImage.css'

const HeaderImage = () => {
  const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (

    <Container>

      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1500}
        transitionDuration={50}
      >

        <img className='image-header' src='/1.png' alt='' />

        <img className='image-header' src='/3.png' alt='' />

        <img className='image-header' src='/2.png' alt='' />

      </Carousel>

    </Container>
  )
}

export default HeaderImage
