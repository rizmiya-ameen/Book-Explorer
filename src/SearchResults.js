import './styles/SearchResults.css'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { BOOKS_API_KEY } from "./config/Key"
import { Pagination, Stack, Grid, Typography, Box, Paper, Container, Rating } from '@mui/material'

const SearchResults = () => {

  const params = useParams()

  const [searchedBooks, setSearchedBooks] = useState([])

  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 20;
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

  const handleSearchedBooks = () => {
    setSearchedBooks([]);

    (params.queryText ?
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.queryText}+intitle:${params.queryText}&key=${BOOKS_API_KEY}&langRestrict=en&orderBy=newest&startIndex=${startIndex}&maxResults=20&printType=books`)
      :
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${params.Text}&orderBy=newest&startIndex=${startIndex}&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
    )

      .then(res => res.json())

      .then(res => {
        const uniqueISBNs = new Set();

        const nonDuplicate = res && res.items && res.items.filter(item => {

          const industryIdentifiers = item.volumeInfo.industryIdentifiers

          const isbn13 = item && item.volumeInfo && industryIdentifiers && industryIdentifiers.length > 0 && industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier;
          if (isbn13 && !uniqueISBNs.has(isbn13)) {
            uniqueISBNs.add(isbn13);
            return true;
          }
          return false
        });

        setSearchedBooks(nonDuplicate);
        console.log(nonDuplicate)
      })

  }


  useEffect(() => {
    setStartIndex(1);
  }, [params.queryText, params.Text]);

  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * itemsPerPage;
    setStartIndex(newStartIndex);
  };


  useEffect(handleSearchedBooks, [params.queryText, params.Text, startIndex])


  return (

    <Container sx={{ marginY: '200px' }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >

        {!searchedBooks || searchedBooks.length === 0 ? (
          <Box>
            <Typography>
              Your search - <strong>{params.queryText || params.Text}</strong> - did not match any books
            </Typography>
            <img src='/PageNotFound.gif' alt='' height='350px' />
          </Box>
        ) : (
          <Typography>
            Search results here for <strong>{params.queryText || params.Text}</strong>
          </Typography>
        )}

      </Box>


      <Grid container spacing={5} sx={{ marginY: '10px' }}>

        {searchedBooks && searchedBooks.map(item => {

          const { id, volumeInfo } = item;
          const { title, authors, averageRating, ratingsCount, imageLinks } = volumeInfo;

          if (imageLinks && title && authors && authors.length > 0) {

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
                    '&:hover': {
                      transform: 'translateY(10px)'
                    }
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
                        <img src={imageLinks.thumbnail} alt={title} className='book-thumbnail' />
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
                        fontWeight: '800'
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
                          ({ratingsCount} reviews)
                        </Typography>

                      </Box>
                    }


                  </Box>

                </Paper>

              </Grid>


            )

          } else {
            return null
          }

        })}

      </Grid>

      {searchedBooks && searchedBooks.length > 0 &&
        <Stack spacing={5} sx={{ marginTop: '50px' }}>
          <Pagination
            count={5}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </Stack>
      }

    </Container>

  )
}
export default SearchResults