import { makeServer } from "../server/mirage"

import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }) {

  if (process.env.NODE_ENV === "development") {
    makeServer({ environment: "development" })
  }

  return <Component {...pageProps} />
}

export default MyApp
