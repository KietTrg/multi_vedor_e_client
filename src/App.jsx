
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import Shipping from './pages/Shipping';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_category } from './store/Reducers/homeReducer'
import CategoryShops from './pages/CategoryShop';
import SearchProducts from './pages/Search';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import Wishlist from './components/dashboard/Wishlist';
import ChangePassword from './components/dashboard/ChangePassword';
import OrderDetail from './components/dashboard/OrderDetail';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
import { useLocation } from 'react-router-dom'
import MyVouchers from './components/dashboard/MyVouchers';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category())

  }, [])

  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return (
    <div>

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/products?' element={<CategoryShops />} />
        <Route path='/products/search?' element={<SearchProducts />} />
        <Route path='/card' element={<Card />} />
        <Route path='/order/confirm' element={<ConfirmOrder />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/product/details/:slug/:pid' element={<Details />} />

        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Index />}></Route>
            <Route path='my-orders' element={<Orders />}></Route>
            <Route path='order/order-detail/:orderId' element={<OrderDetail />}></Route>
            <Route path='my-wishlist' element={<Wishlist />}></Route>
            <Route path='my-vouchers' element={<MyVouchers />}></Route>
            <Route path='chat' element={<Chat />}></Route>
            <Route path='chat/:sellerId' element={<Chat />}></Route>
            <Route path='change-password' element={<ChangePassword />}></Route>
          </Route>
        </Route>



      </Routes>

    </div>
  );
}

export default App;
