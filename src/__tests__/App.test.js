import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../App'

test('renders learn react link', async () => {
  render(
    <Router>
      <App />
    </Router>
  )
  await waitFor(() => {
    const headerElement = screen.getByTestId('header-component')
    expect(headerElement).toBeInTheDocument()
  })
})
