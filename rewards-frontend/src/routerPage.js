import React, { Component } 	from 'react';
import { connect }          	from 'react-redux'
import Redeem from './component/redeem/redeemPage'
import ListTransactionData from './component/dashboard/dashboardPage'
import ListTransactionDataById from './component/dashboard/detailTransaction'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class RouterPage extends Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Redeem}/>
          <Route path="/dashboard" exact component={ListTransactionData}/>
          <Route path="/dashboard/edit/:id" component={ListTransactionDataById}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({location: state.location}))(RouterPage);
