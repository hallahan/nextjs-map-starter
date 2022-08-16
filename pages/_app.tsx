import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { CssVarsProvider } from '@mui/joy/styles'

import 'maplibre-gl/dist/maplibre-gl.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <CssVarsProvider>
        <Component {...pageProps} />
      </CssVarsProvider>
    </SessionProvider>
  )
}

export default App
