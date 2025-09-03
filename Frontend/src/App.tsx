import './App.css'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"
import Dashboard from './pages/Dashboard';
import CreateNote from './pages/form/create';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/create' element={<CreateNote/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
