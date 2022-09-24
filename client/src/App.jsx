import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home  from './pages/Home';
import Navbar  from './components/Navbar';
import UpdatePage from './pages/UpdatePage';

const App= () =>{
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
          <Routes>
            <Route 
              path="/update/:id" 
              element={<UpdatePage />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
