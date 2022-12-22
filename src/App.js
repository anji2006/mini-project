import './App.css'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route component={NotFound} />
  </Switch>
)

export default App
