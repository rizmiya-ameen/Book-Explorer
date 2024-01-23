import { useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { BOOKS_API_KEY } from "./config/Key"
import { Typography, Box, Paper, Container, Button, AppBar, Toolbar, } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import NotFoundPage from './NotFoundPage'
import BookDetailsHeader from './components/BookDetailsHeader';


const BookDetail = () => {

  const params = useParams()

  const [book, setBook] = useState({})


  const handleBooks = () => {

    fetch(`https://www.googleapis.com/books/v1/volumes/${params.bookID}?key=${BOOKS_API_KEY}`)
      .then(res => res.json())
      .then(res => setBook(res))
    //.then(res => console.log(res))

  };

  const [favorite, setFavorite] = useState([])
  //console.log(favorite.length)
  //console.log(favorite)

  const [toReadBooks, setToReadBooks] = useState([])


  const handleFavorite = (clickedObject) => {
    const newFavorite = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.large || clickedObject?.volumeInfo?.imageLinks?.smallThumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in favorites
    if (!favorite.some(item => item.id === newFavorite.id)) {
      setFavorite([newFavorite, ...favorite]);
      localStorage.setItem('favoriteBooks', JSON.stringify([newFavorite, ...favorite]));
      // Update the local storage after adding the book
    }

    //console.log([newFavorite, ...favorite ]);
  };

  const handleMyShelf = (clickedObject) => {
    const newShelfBook = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.large || clickedObject?.volumeInfo?.imageLinks?.smallThumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in myshelf
    if (!toReadBooks.some(item => item.id === newShelfBook.id)) {
      setToReadBooks([newShelfBook, ...toReadBooks]);
      localStorage.setItem('toReadBooks', JSON.stringify([newShelfBook, ...toReadBooks]));
      // Update the local storage after adding the book
    }
    //console.log([newShelfBook, ...toReadBooks])
  };


  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks');
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }

    const storedMyShelfBooks = localStorage.getItem('toReadBooks');
    if (storedMyShelfBooks) {
      setToReadBooks(JSON.parse(storedMyShelfBooks));
    }
  }, []);


  // Update localStorage whenever the favorite state changes
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorite));
    localStorage.setItem('toReadBooks', JSON.stringify(toReadBooks));
  }, [favorite, toReadBooks]);


  useEffect(handleBooks, [params.bookID])

  if (!params.bookID) {
    return <p>Please select a book to view</p>;
  }

  if (!book) {
    return <p>Failed to fetch book details. Please try again later</p>;
  }


  const { volumeInfo = {}, saleInfo = {}, id } = book;
  const { title, authors, categories, description, imageLinks = {}, industryIdentifiers, publisher, publishedDate, pageCount, previewLink, } = volumeInfo;
  const { isEbook } = saleInfo;
  //if volumeInfo is not present or undefined, assigned to an empty object as its default value


  const getHttpsLink = (httpLink) => httpLink.replace(/^http:\/\//i, 'https://');
  //regular expression - replace the beginning of the URL with "https://"

  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  //to remove all HTML tags in the description

  const imageUrl = imageLinks && imageLinks.extraLarge
    ? getHttpsLink(imageLinks.extraLarge)
    : (imageLinks && imageLinks.smallThumbnail)
      ? getHttpsLink(imageLinks.smallThumbnail)
      : null;


  return (

    <Container
      sx={{
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {params.bookID === id ?

        <Box>


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
                  <img src='/bookworm3.png' alt='Book Worm' height='95px' />
                </Box>

              </Link>

              <Typography
                sx={{
                  color: 'white',
                  letterSpacing: '3px'
                }}
              >
                {title}
              </Typography>

            </Toolbar>

          </AppBar>


          <BookDetailsHeader
            title={title}
            authors={authors}
            publishedDate={publishedDate}
            publisher={publisher}
            pageCount={pageCount}
            saleInfo={saleInfo}
            isEbook={isEbook}
            industryIdentifiers={industryIdentifiers}
            favorite={favorite}
            handleFavorite={handleFavorite}
            toReadBooks={toReadBooks}
            imageUrl={imageUrl}
            book={book}
            handleMyShelf={handleMyShelf}
          />


          <Paper
            elevation={3}
            sx={{
              marginY: '50px',
              padding: '30px'
            }}
          >

            {description ?
              <>
                <Typography
                  sx={{
                    marginBottom: '15px',
                    color: 'rgb(1, 121, 202)'
                  }}
                >
                  <strong>
                    About this Book:
                  </strong>
                </Typography>

                <Typography align="justify">{removeHTMLTags(description)}</Typography>
              </>
              :
              null
            }

            {categories ?
              <Box sx={{ marginTop: '30px' }}>

                <Typography sx={{ fontWeight: 'bold', color: 'rgb(1, 121, 202)', marginBottom: '15px' }}>
                  Categories:
                </Typography>

                <Typography>
                  {categories}
                </Typography>

              </Box>
              :
              null
            }

            {previewLink &&
              <Link to={previewLink}>
                <Button color="primary" variant="contained" endIcon={<GoogleIcon />} sx={{ marginTop: '30px' }}>
                  More about This Book...
                </Button>
              </Link>
            }


          </Paper>

        </Box>

        :

        <NotFoundPage />
      }


    </Container>


  )
}

export default BookDetail


/*
<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', }}> 

  {industryIdentifiers && industryIdentifiers.length > 0 && 
  industryIdentifiers[0].type === 'ISBN_13'
  ? 
  <>
    <Typography sx={{fontWeight: '700'}}>
      ISBN
    </Typography>
    
    <Typography>
      {industryIdentifiers[0].identifier}
    </Typography>
  </>
  : 
  industryIdentifiers && industryIdentifiers.length > 0 && 
  industryIdentifiers[1].type === 'ISBN_13'
  ? 
  <><Typography sx={{fontWeight: '700'}}>ISBN</Typography><Typography>{industryIdentifiers[1].identifier}</Typography></> 
  : null}

</Box>
 */


