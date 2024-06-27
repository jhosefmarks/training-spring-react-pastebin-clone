import 'bootstrap/dist/css/bootstrap.min.css'

import Container  from 'react-bootstrap/Container'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import checkForToken from './helpers/checkForToken'
import Navigation from './layouts/Navigation'
import Posts from './pages/Posts'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import store from './store'

checkForToken();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navigation></Navigation>
        </div>
        <Container>
          <Routes>
            <Route exact path="/" Component={Posts}></Route>
            <Route exact path="/signin" Component={SignIn}></Route>
            <Route exact path="/signup" Component={SignUp}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App
