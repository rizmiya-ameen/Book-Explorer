import './styles/SearchResults.css'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { BOOKS_API_KEY } from "./config/Key"
import { Pagination, Stack, Grid, Typography, Box, Paper, Container, Rating, CircularProgress } from '@mui/material'

const SearchResults = () => {

  const params = useParams()

  const [searchedBooks, setSearchedBooks] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)

  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 20;
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const pageCount = Math.min(5, Math.ceil(totalItems / itemsPerPage));

  const handleSearchedBooks = () => {
    // set when a newer search starts, so a slow older response can't overwrite its results
    let ignore = false;
    setSearchedBooks([]);
    setLoading(true);

    const searchText = encodeURIComponent(params.queryText || params.Text);

    (params.queryText ?
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchText}+intitle:${searchText}&key=${BOOKS_API_KEY}&langRestrict=en&startIndex=${startIndex}&maxResults=20&printType=books`)
      :
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchText}+book&orderBy=newest&startIndex=${startIndex}&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
    )

      .then(res => res.json())

      .then(res => {
        if (ignore) return;
        const uniqueISBNs = new Set();

        const nonDuplicate = res && res.items && res.items.filter(item => {

          const industryIdentifiers = item.volumeInfo.industryIdentifiers

          const isbn13 = item && item.volumeInfo && industryIdentifiers && industryIdentifiers.length > 0 && industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier;
          // many books have no ISBN-13, so fall back to the Google Books id
          const uniqueKey = isbn13 || item.id;
          // the same book often comes back several times under different ISBNs, so check the title too
          const title = item.volumeInfo.title?.toLowerCase();
          if (!uniqueISBNs.has(uniqueKey) && !uniqueISBNs.has(title)) {
            uniqueISBNs.add(uniqueKey);
            uniqueISBNs.add(title);
            return true;
          }
          return false
        });

        setSearchedBooks(nonDuplicate);
        setTotalItems(res.totalItems || 0);
      })
      .catch(error => console.error(error))
      .finally(() => {
        if (!ignore) setLoading(false);
      })

    return () => { ignore = true };
  }


  useEffect(() => {
    setStartIndex(0);
  }, [params.queryText, params.Text]);

  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * itemsPerPage;
    setStartIndex(newStartIndex);
  };


  useEffect(handleSearchedBooks, [params.queryText, params.Text, startIndex])


  return (

    <Container sx={{ marginY: '200px', paddingX: { xs: 0, sm: '24px' } }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >

        {loading ? (
          <CircularProgress />
        ) : !searchedBooks || searchedBooks.length === 0 ? (
          <Box>
            <Typography>
              Your search - <strong>{params.queryText || params.Text}</strong> - did not match any books
            </Typography>
            <img src='/PageNotFound.gif' alt='' height='350px' style={{ maxWidth: '100%', objectFit: 'contain' }} />
          </Box>
        ) : (
          <Typography>
            Search results here for <strong>{params.queryText || params.Text}</strong>
          </Typography>
        )}

      </Box>


      <Grid container spacing={{ xs: 2, sm: 3, lg: 5 }} sx={{ marginY: '10px' }}>

        {searchedBooks && searchedBooks.map(item => {

          const { id, volumeInfo } = item;
          const { title, authors, averageRating, ratingsCount, imageLinks } = volumeInfo;

          if (imageLinks && title && authors && authors.length > 0) {

            return (

              <Grid key={id} item xs={6} sm={4} md={3} lg={2.4}>

                <Paper
                  key={id}
                  elevation={3}
                  sx={{
                    height: { xs: '420px', lg: '400px' },
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
                            bottom: { xs: '30px', lg: '8px' },
                            right: { xs: 'auto', lg: '9px' },
                            left: { xs: '9px', lg: 'auto' }
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
            count={pageCount}
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