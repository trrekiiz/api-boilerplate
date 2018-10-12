import React, { Component } 	from 'react';
import { connect }          	from 'react-redux'
import Redeem from './component/redeem/redeemPage'
import Facebook from './component/redeem/frontPage'
import ListTransactionData from './component/dashboard/dashboardPage'
import ListTransactionDataById from './component/dashboard/detailTransaction'
import Login from './component/dashboard/login';
import Register from './component/dashboard/register';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class RouterPage extends Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Redeem}/>
          <Route path="/dashboard" exact component={ListTransactionData}/>
          <Route path="/dashboard/edit/:id" component={ListTransactionDataById}/>
          <Route path="/" exact component={Facebook}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({location: state.location}))(RouterPage);
