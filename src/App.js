import React from "react";
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import  { Route , Switch } from 'react-router-dom';
function App() {  
  return (
    <Layout>
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/' exact component={BurgerBuilder} />
      </Switch>
    </Layout>
  );
}

export default App;
