import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages/components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() { // note that Navbar is at the very top, but still within <BrowserRouter> so it can still use the Link import from Navbar.js
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <div className="pages"> 
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
