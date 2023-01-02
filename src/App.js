import { BrowserRouter , Route ,Routes }from "react-router-dom";
import './App.css';
import Login from './Login';
import Product from './Product';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


function App() {


  return ( 
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/product" element={<Product/>}/>

</Routes>
</BrowserRouter>

   
  );
}

export default App;
