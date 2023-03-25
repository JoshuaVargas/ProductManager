import './App.css';
import Main from './Views/Main';
import ProductDetails from './Views/ProductDetails';
import ProductUpdate from './Views/ProductUpdate';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/product/details/:id' element={<ProductDetails/>}/>
        <Route path='/product/update/:id' element={<ProductUpdate/>}/>
      </Routes>
    </div>
  );
}

export default App;
