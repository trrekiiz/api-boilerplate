import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserTransactionById} from '../../ducks/userDashboard';
import _ from 'lodash';

class RedeemPage extends Component {

  componentDidMount(){
    const id  = this.props.match.params.id
    this.props.dispatch(getUserTransactionById(id)).then(res=>{console.log(res)})
  };

  render() {
    console.log(this.props.userDashboard);
    return(
      <div className="container">
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">mobileNumber</th>
            <th scope="col">imageLink</th>
            <th scope="col">created_at</th>
            <th scope="col">status</th>
            <th scope="col">receiptNumber</th>
            <th scope="col">branchId</th>
            <th scope="col">referenceNunber</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">{this.props.userDashboard.id}</td>
            <td scope="col">{this.props.userDashboard.firstName} {this.props.userDashboard.lastName}</td>
            <td scope="col">{this.props.userDashboard.mobileNumber}</td>
            <td scope="col"><img src={this.props.userDashboard.imageLink} width="300"/></td>
            <td scope="col">{this.props.userDashboard.created_at}</td>
            <td scope="col">{this.props.userDashboard.status}</td>
            <td scope="col">{this.props.userDashboard.receiptNumber}</td>
            <td scope="col">{this.props.userDashboard.branchId}</td>
            <td scope="col">{this.props.userDashboard.referenceNunber}</td>
          </tr>
        </tbody>
        </table>
        <center><button type="submit" className="btn btn-success"> Approve </button> <button type="submit" className="btn btn-danger"> Reject </button> <button type="submit" className="btn btn-primary"> Back </button></center>
      </div>
    )
  }
}

const mapStateToProps = (userDashboard) =>{
  return userDashboard;
};

export default connect(mapStateToProps,null)(RedeemPage)
