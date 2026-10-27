import React, { useState, useEffect } from 'react'
import GenreBooks from './GenreBooks'
import { BOOKS_API_KEY } from "./config/Key"
import { Container, Typography } from '@mui/material'
import HeaderImage from './components/HeaderImage'


const BookLibrary = () => {

  const [fetchedBooks, setFetchedBooks] = useState([])

  const category = ['Fiction', 'Science', 'Health and Fitness', 'Cooking']


  const handleFetchedBooks = (category) => {

    (category === 'New Releases' ?
      fetch(`https://www.googleapis.com/books/v1/volumes?key=${BOOKS_API_KEY}&q={search_query}&orderBy=newest&maxResults=10&langRestrict=en`)
      :
      // Google Books now returns nothing for a one-word subject on its own, so add the word 'book' to the search
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}+book&orderBy=newest&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
    )

      .then(res => res.json())
      .then(res => {
        const uniqueISBNs = new Set();

        // 'items' is missing when nothing matches
        const nonDuplicate = (res.items || []).filter(item => {
          const isbn13 = item.volumeInfo.industryIdentifiers?.find(identifier => identifier.type === 'ISBN_13')?.identifier;
          // many books have no ISBN-13, so fall back to the Google Books id
          const uniqueKey = isbn13 || item.id;
          // the same book often comes back several times under different ISBNs, so check the title too
          const title = item.volumeInfo.title?.toLowerCase();
          if (!uniqueISBNs.has(uniqueKey) && !uniqueISBNs.has(title)) {
            uniqueISBNs.add(uniqueKey);
            uniqueISBNs.add(title);
            return true;
          }
          return false;
        });

        setFetchedBooks(prevState => ({ ...prevState, [category]: nonDuplicate }));
      })
      .catch(error => console.error(error));
  }

  //For each category the handleFetchedBooks function is called
  useEffect(() => {
    category.forEach(category => {
      handleFetchedBooks(category);
    });
  }, []);


  return (

    <Container
      sx={{
        marginTop: '200px',
        paddingX: { xs: 0, lg: '24px' }
      }}
    >

      <HeaderImage />

      {category.map((category) => (

        <Container key={category} sx={{ paddingX: { xs: 0, lg: '24px' } }}>

          <Typography
            sx={{
              paddingX: { xs: 0, lg: '24px' },
              marginTop: '40px',
              fontSize: '20px',
              fontWeight: '700',
              color: 'rgb(109, 109, 109)'
            }}
          >
            {category}
          </Typography>

          <GenreBooks
            category={category}
            fetchedBooks={fetchedBooks[category] || []}
          />

        </Container>

      ))}

    </Container>

  )
}

export default BookLibrary


