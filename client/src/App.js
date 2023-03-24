import './App.css';
import Main from './Views/Main';
import ProductDetails from './Views/ProductDetails';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/product/details/:id' element={<ProductDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
