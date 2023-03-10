import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/index'

function MyApp({ Component, pageProps }) {
  return (<Provider store={store}>
    <Component {...pageProps} />
  </Provider>)
}

export default MyApp



//am using thunk, a function that delays action untill something finishes