
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import "./App.css"
import HomePage from './pages/Home/Home';
import AllProductsPage from './pages/Products/All/AllProducts';
import CategoriesPage from './pages/Categories/CategoriesPage';
import CartPage from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import ProductsByCategory from './pages/Products/Category/ProductsByCategory';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SalePage from './pages/Products/Sale/SalesPage';
import store from './redux/store';
import Modal from './components/Modal/Modal';
import NotFaund from './pages/NotFound/NotFaund';

function App() {
  return (
<div>
  <ReduxProvider store={store}>
  <BrowserRouter>
       <Header/>
       <Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="Categories" element={<CategoriesPage/>}/>
<Route path="Categories/:itemId" element={<ProductsByCategory/>}/> 
<Route path="AllProducts" element={<AllProductsPage/>} />
<Route path="Sales" element={<SalePage/>}/>
<Route path="cart" element={<CartPage/>}/> 
<Route path="ProductDetails/:productId" element={<ProductDetails/>}/>
<Route path='*' element={<NotFaund/>}/>  
       </Routes>
       <Footer/>
       <Modal/>
       </BrowserRouter>
       </ReduxProvider>
</div>
  )
}

export default App
