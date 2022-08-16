import React, { ReactNode } from 'react'
import Container from '@mui/material/Container'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = props => (
  <div>
    <Header />
    <Container>
      {props.children}
    </Container>
  </div>
)

export default Layout
