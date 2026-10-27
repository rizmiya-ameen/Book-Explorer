import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { Typography, Box, Paper, Button, Card, CardMedia } from '@mui/material'

const BookDetailsHeader = ({ handleMyShelf, book, title, authors, publishedDate, publisher, pageCount, saleInfo, isEbook, industryIdentifiers, favorite, handleFavorite, toReadBooks, imageUrl }) => {
  return (

    <div>

      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          padding: { xs: '20px', md: '30px' },
          position: 'relative'
        }}
      >

        <Box
          sx={{
            flex: '2',
            paddingRight: { xs: 0, md: '80px' }
          }}
        >

          <Typography
            sx={{
              fontSize: { xs: '24px', md: '30px' },
              fontWeight: 'bold',
              marginBottom: { xs: '15px', md: '30px' }
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '1px',
              color: 'rgb(1, 121, 202)'
            }}
          >
            {authors}
          </Typography>

          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '20px',
              color: 'grey'
            }}
          >
            {publishedDate && new Date(publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {publisher}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: { xs: '15px', md: '30px' },
              rowGap: '15px',
              marginY: { xs: '30px', md: '50px' }
            }}
          >

            {pageCount &&
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingRight: { xs: '15px', md: '30px' },
                  borderRight: '1px solid grey'
                }}
              >

                <Typography sx={{ fontWeight: '700' }}>
                  Pages
                </Typography>

                <Typography>
                  {pageCount}
                </Typography>

              </Box>
            }

            {saleInfo &&
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingRight: { xs: '15px', md: '30px' },
                  borderRight: '1px solid grey'
                }}
              >

                <Typography sx={{ fontWeight: '700' }}>
                  Type
                </Typography>

                <Typography>
                  {isEbook ? 'eBook' : 'Book'}
                </Typography>

              </Box>
            }

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: { xs: '15px', md: '30px' }
              }}
            >
              {industryIdentifiers && industryIdentifiers.length > 0 && (
                industryIdentifiers[0].type === 'ISBN_13' || (industryIdentifiers.length > 1 && industryIdentifiers[1].type === 'ISBN_13')
              )
                ? (
                  <>
                    <Typography sx={{ fontWeight: '700' }}>ISBN</Typography>
                    <Typography>{industryIdentifiers[0].type === 'ISBN_13' ? industryIdentifiers[0].identifier : industryIdentifiers[1].identifier}</Typography>
                  </>
                )
                : null}
            </Box>

          </Box>

          <Box
            sx={{
              marginTop: { xs: 0, md: '50px' },
              position: { xs: 'static', md: 'absolute' },
              bottom: '30px',
              display: 'flex',
              flexWrap: 'wrap',
              rowGap: '10px'
            }}
          >

            {!favorite.some(item => item.id === book.id)
              ? <Button
                color="secondary"
                variant="contained"
                onClick={() => handleFavorite(book)}
                startIcon={<FavoriteIcon />}
                sx={{
                  marginRight: '10px',
                  bgcolor: '#d82679',
                  '&:hover': { bgcolor: '#ad0352' },
                  letterSpacing: '1px'
                }}
              >
                Favorite
              </Button>
              : <Button
                color="secondary"
                variant="contained"
                disabled
                startIcon={<FavoriteIcon />}
                sx={{
                  marginRight: '10px',
                  letterSpacing: '1px'
                }}
              >
                Favorite
              </Button>
            }

            {!toReadBooks.some(item => item.id === book.id)
              ? <Button
                color="success"
                variant="contained"
                startIcon={<LibraryBooksIcon />}
                onClick={() => handleMyShelf(book)}
                sx={{
                  letterSpacing: '1px'
                }}
              >
                Add to My Shelf
              </Button>
              : <Button
                color="success"
                variant="contained"
                disabled
                startIcon={<LibraryBooksIcon />}
                sx={{
                  letterSpacing: '1px'
                }}
              >
                Add to My Shelf
              </Button>
            }

          </Box>

        </Box>

        <Box
          sx={{
            flex: '1',
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
            marginBottom: { xs: '20px', md: 0 }
          }}
        >

          <Card
            sx={{
              height: { xs: '300px', md: '400px' },
              boxShadow: '5'
            }}
          >
            {imageUrl &&
              <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            }
          </Card>

        </Box>

      </Paper>

    </div>

  )
}

export default BookDetailsHeader
