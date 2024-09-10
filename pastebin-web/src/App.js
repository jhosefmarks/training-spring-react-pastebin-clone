import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt'
import Container  from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import checkForToken from './helpers/checkForToken'
import Navigation from './layouts/Navigation'
import Posts from './pages/Posts'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NewPost from './pages/NewPost'
import PostDetails from './pages/PostDetails'
import store from './store'
import PrivateRoute from './utils/PrivateRoute'
import UserPosts from './pages/UserPosts'
import EditPost from './pages/EditPost'

moment.locale('pt')

checkForToken()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navigation />
        </div>
        <Container>
          <ToastContainer />

          <Routes>
            <Route exact path="/" Component={Posts} />
            <Route exact path="/signin" Component={SignIn} />
            <Route exact path="/signup" Component={SignUp} />
            <Route exact path="/post/:id" Component={PostDetails} />
            <Route exact path="/posts" element={<PrivateRoute component={UserPosts} /> } />
            <Route exact path="/newpost" element={<PrivateRoute component={NewPost} /> } />
            <Route exact path="/editpost/:id" element={<PrivateRoute component={EditPost} /> } />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App
