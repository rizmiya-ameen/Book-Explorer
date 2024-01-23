import React from 'react'
import './styles/GenreBooks.css'
import { Link } from 'react-router-dom'
import { Grid, Paper, Box, Typography, Container, Rating } from '@mui/material'

const GenreBooks = ({ fetchedBooks }) => {
  // to get the first 5 elements of the array
  const firstFiveBooks = fetchedBooks.slice(0, 5)

  return (

    <Container
      sx={{
        marginTop: '15px',
        marginBottom: '60px'
      }}
    >

      <Grid container spacing={3} >

        {firstFiveBooks.map(item => {
          const { id, volumeInfo } = item
          const { title, imageLinks, authors, averageRating, ratingsCount } = volumeInfo

          if (imageLinks && title && volumeInfo && authors && authors.length > 0) {
            return (

              <Grid key={id} item xs={2.4}>

                <Paper
                  key={id}
                  elevation={3}
                  sx={{
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: '0.4s ease-out',
                    '&:hover': { transform: 'translateY(10px)' }
                  }}
                >

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '10px'
                    }}
                  >
                    {imageLinks && imageLinks.thumbnail &&
                      <Link to={`/${id}`}>
                        <img
                          className='book-thumbnail'
                          src={imageLinks.thumbnail}
                          alt={title}
                        />
                      </Link>
                    }
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
                        fontWeight: '800',
                        color: 'black'
                      }}
                    >
                      {title}
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
                      {authors.length > 1 ? `${authors[0]} and more` : authors[0]}
                    </Typography>

                    {averageRating && ratingsCount &&
                      <Box sx={{ display: 'flex' }}>

                        <Rating
                          name="read-only"
                          value={averageRating}
                          readOnly
                          precision={0.5}
                          size='small'
                          sx={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '9px'
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: '12px',
                            position: 'absolute',
                            bottom: '8px',
                            right: '9px'
                          }}
                        >
                          ({ratingsCount} {ratingsCount === 1 ? 'review' : 'reviews'})
                        </Typography>

                      </Box>
                    }

                  </Box>

                </Paper>

              </Grid>

            )
          } return null
        })}

      </Grid>

    </Container>
  )
}
export default GenreBooks
