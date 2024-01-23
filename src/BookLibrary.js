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
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=newest&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
    )

      .then(res => res.json())
      .then(res => {
        const uniqueISBNs = new Set();

        const nonDuplicate = res.items.filter(item => {
          const isbn13 = item.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier;
          if (isbn13 && !uniqueISBNs.has(isbn13)) {
            uniqueISBNs.add(isbn13);
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
        marginTop: '200px'
      }}
    >

      <HeaderImage />

      {category.map((category) => (

        <Container key={category}>

          <Typography
            sx={{
              paddingX: '24px',
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


