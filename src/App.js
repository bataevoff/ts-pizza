import "./scss/app.scss"
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom'
import Cart from '../src/pages/Cart'
import { useState } from 'react';

function App() {

  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
