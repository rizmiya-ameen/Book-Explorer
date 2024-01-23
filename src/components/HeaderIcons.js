import { Link } from 'react-router-dom'
import { Badge, Tooltip, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import React, { useState, useEffect } from 'react'

const HeaderIcons = () => {
  const [favorite, setFavorite] = useState([])
  const [toReadBooks, setToReadBooks] = useState([])
  const [readingBooks, setReadingBooks] = useState([])
  const [completedBooks, setCompletedBooks] = useState([])

  const myShelfBooksCount = (toReadBooks.length + readingBooks.length + completedBooks.length)

  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks')
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites))
    }
    const storedToReadBooks = localStorage.getItem('toReadBooks')
    if (storedToReadBooks) {
      setToReadBooks(JSON.parse(storedToReadBooks))
    }
    const storedReadingBooks = localStorage.getItem('readingBooks')
    if (storedReadingBooks) {
      setReadingBooks(JSON.parse(storedReadingBooks))
    }

    const storedCompletedBooks = localStorage.getItem('completedBooks')
    if (storedCompletedBooks) {
      setCompletedBooks(JSON.parse(storedCompletedBooks))
    }
  }, [])

  console.log(myShelfBooksCount)

  return (

    <Box sx={{ display: 'flex', flexDirection: 'row' }}>

      <Link to={'/favorite'}>

        <Tooltip title="Favorites" placement="top">

          <IconButton
            size="large"
            aria-label="show favorite items"
            sx={{
              color: 'white',
              backgroundColor: '#625694',
              marginRight: '10px'
            }}
          >
            <Badge badgeContent={favorite.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

        </Tooltip>

      </Link>

      <Link to={'/myshelf'}>

        <Tooltip title="My Shelf" placement="top">

          <IconButton
            size="large"
            aria-label="show favorite items"
            sx={{
              color: 'white',
              backgroundColor: '#625694',
              marginRight: '24px'
            }}
          >
            <Badge badgeContent={myShelfBooksCount} color="error">
              <LibraryBooksIcon />
            </Badge>
          </IconButton>

        </Tooltip>

      </Link>

    </Box>

  )
}

export default HeaderIcons
