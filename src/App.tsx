import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts";
import {ProductPage} from "./pages";
import {ProductByCategoryList} from "./components";

function App() {
  return (
     <div>
         <Routes>
             <Route path={'/'} element={<MainLayout/>}>
                 <Route index element={<ProductPage/>}/>
                 <Route path={'/menClothes'} element={<ProductByCategoryList/>}/>
             </Route>
         </Routes>
     </div>
  );
}

export default App;
