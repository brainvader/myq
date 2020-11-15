import { makeServer } from "../server/mirage"

import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'

// setup mock server
const importMock = async () => await import('../mocks')

function MyApp({ Component, pageProps }) {

  if (process.env.NODE_ENV !== 'production') importMock()

  return <Component {...pageProps} />
}

export default MyApp
