import { useNavigate, Outlet, Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../SearchStyles'
import { AppBar, Toolbar, Box, Button, FormControl, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HeaderIcons from './HeaderIcons'

const Header = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const [value, setValue] = useState('0')

  // genre tabs don't fit on small screens, so make them scrollable there
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const handleSearch = event => {
    event.preventDefault()
    if (!query.trim()) return // nothing to search for
    navigate(`/search/${encodeURIComponent(query.trim())}`)
    // when clicked search, take user to that page
    setQuery('')
    setValue('0')
  }

  const handleText = (event, newValue) => {
    const genre = event.currentTarget.textContent

    navigate(`/genre/${genre}`)
    setValue(newValue)
  }

  return (

    <Box sx={{ flexGrow: 1 }}>

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#44318D'
        }}
      >

        <Toolbar
          sx={{
            height: { xs: 'auto', md: '100px' },
            display: 'flex',
            flexDirection: 'row',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: 'space-between',
            paddingY: { xs: '8px', md: 0 }
          }}
        >

          <Box
            sx={{
              marginTop: { xs: 0, md: '26px' },
              marginLeft: { xs: 0, md: '20px' },
              '& img': { height: { xs: '60px', md: '100px' } }
            }}
          >
            <Link to='/'>
              <img src='/bookworm3.png' alt='Book Worm' height='100px' />
            </Link>
          </Box>

          <FormControl
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              order: { xs: 1, md: 0 },
              width: { xs: '100%', md: 'auto' },
              marginTop: { xs: '8px', md: 0 }
            }}
          >

            <Search>

              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                value={query}
                placeholder="Search by Title..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => setQuery(event.target.value)}
              />

            </Search>

            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                marginLeft: '2px',
                bgcolor: '#d82679',
                '&:hover': { bgcolor: '#ad0352' },
                letterSpacing: '2px'
              }}
            >
              Search
            </Button>

          </FormControl>

          <HeaderIcons />

        </Toolbar>

        <Box
          sx={{
            width: '100%',
            bgcolor: '#A4B3B6'
          }}
        >

          <Tabs
            onChange={handleText}
            centered={!isSmallScreen}
            variant={isSmallScreen ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={value}
            indicatorColor="primary"
          >
            <Tab value="0" label="Home" component={Link} to="/" sx={{ fontWeight: '700' }} />
            <Tab value="1" label="Fiction" sx={{ fontWeight: '700' }}/>
            <Tab value="2" label="Psychology" sx={{ fontWeight: '700' }}/>
            <Tab value="3" label="Science" sx={{ fontWeight: '700' }}/>
            <Tab value="4" label="Politics" sx={{ fontWeight: '700' }}/>
            <Tab value="5" label="Business" sx={{ fontWeight: '700' }}/>
            <Tab value="6" label="Poetry" sx={{ fontWeight: '700' }}/>
            <Tab value="7" label="Law" sx={{ fontWeight: '700' }}/>
            <Tab value="8" label="Biography" sx={{ fontWeight: '700' }}/>

          </Tabs>

        </Box>

      </AppBar>

      <Outlet />

    </Box>

  )
}

export default Header
