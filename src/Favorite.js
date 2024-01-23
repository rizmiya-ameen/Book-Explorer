import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Favorite.css'
import { AppBar, Grid, Typography, Box, Paper, Container, Button, IconButton, Toolbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Favorite = () => {
  const [favorite, setFavorite] = useState([])

  const handleRemoval = () => {
    localStorage.removeItem('favoriteBooks')
    setFavorite([])
  }

  const handleRemovalofOne = (clickedObject) => {
    const removeBook = favorite.filter(item => item !== clickedObject)
    setFavorite(removeBook)
    localStorage.setItem('favoriteBooks', JSON.stringify(removeBook)) // Update the local storage after removing the book
  }

  // to get favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteBooks')
    // if storedFavorites is empty on component mount it results an error
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites))
    }
  }, [])

  // console.log(favorite)

  return (

    <Container sx={{ marginY: '50px' }}>

      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#44318D', height: '70px' }}
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
              <img src='/bookworm3.png' alt='Book Worm' height='95px' />
            </Box>
          </Link>

          <Typography sx={{ color: 'white', letterSpacing: '3px' }}>
            Favorite Books ({favorite.length})
          </Typography>

        </Toolbar>

      </AppBar>

      <Grid container spacing={5} sx={{ marginY: '10px' }}>

        {favorite && favorite.map(item => (

          <Grid key={item.id} item xs={2.4}>

            <Paper
              elevation={3}
              sx={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px'
                }}
              >
                <img className='book-thumbnail' src={item.image} alt={item.title} />
              </Box>

              <Box sx={{ paddingX: '15px' }}>

                <Typography
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '16px',
                    fontWeight: '800'
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '13px',
                    color: 'grey',
                    fontWeight: '600',
                    marginTop: '5px'
                  }}
                >
                  {item.authors.length > 1 ? `${item.authors[0]} and more` : item.authors[0]}
                </Typography>

              </Box>

              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px'
                }}
              >
                <IconButton
                  onClick={() => handleRemovalofOne(item)}
                  aria-label="delete"
                  size="small"
                  color="primary"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>

            </Paper>

          </Grid>

        ))}

      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px'
        }}
      >

        {favorite.length !== 0

          ? <Button
            onClick={handleRemoval}
            size="small"
            variant="contained"
            sx={{
              bgcolor: '#d82679',
              '&:hover': { bgcolor: '#ad0352' },
              letterSpacing: '1px'
            }}
          >
            Clear All
          </Button>
          : <Typography sx={{ fontWeight: '800', letterSpacing: '1px' }}>
            No Favorite Books to Display!
          </Typography>

        }
      </Box>

    </Container>
  )
}

export default Favorite
