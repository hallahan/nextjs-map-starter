import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { CssVarsProvider } from '@mui/joy/styles'
import Button from '@mui/joy/Button'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <CssVarsProvider>
        <Component {...pageProps} />
        <Button>Joy UI</Button>
      </CssVarsProvider>
    </SessionProvider>
  )
}

export default App
