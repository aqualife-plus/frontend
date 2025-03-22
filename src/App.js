import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import SignupTerms from './page/SignupTerms/SignupTerms';
import Detail from './page/Detail/Detail';
import Header from './components/Header/Header';
import Refund from './page/Refund/Refund';
import Signup from './page/Signup/Signup';
import LightCo2 from './page/LightCo2/LightCo2';
import DetailEdit from './page/DetailEdit/DetailEdit';
import PhTemp from './page/PhTemp/PhTemp';

function App() {
  return (
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signupterms' element={<SignupTerms />}></Route>
      <Route path='/detail/:id' element={<Detail />}></Route>
      <Route path='/refund' element={<Refund />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/lightco2/:title' element={<LightCo2 />}></Route>
      <Route path='/phtemp/:title' element={<PhTemp />}></Route>
      <Route path='/detailEidt' element={<DetailEdit />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
