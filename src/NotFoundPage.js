import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box, Container, AppBar, Toolbar } from '@mui/material'

const NotFoundPage = () => {
  return (

    <Container>

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#44318D',
          height: '70px'
        }}
      >

        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >

          <Link to={'/'}>
            <Box
              sx={{
                marginTop: '50px',
                marginLeft: '15px'
              }}
            >
              <img src='/bookworm2.png' alt='Book Worm' height='85px' />
            </Box>
          </Link>

          <Typography
            sx={{
              color: 'white',
              letterSpacing: '5px',
              fontSize: '30px',
              fontWeight: '800'
            }}
          >
            404
          </Typography>

        </Toolbar>

      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontWeight: '800',
            fontSize: '20px'
          }}
        >
          Uh Oh... The page you&apos;re looking for doesn&apos;t exist!
        </Typography>

        <img
          src='/PageNotFound.gif'
          alt=''
          style={{ width: '100%', height: '350px', objectFit: 'contain' }}
        />

      </Box>

    </Container>

  )
}

export default NotFoundPage
