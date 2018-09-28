import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserTransactionById} from '../../ducks/userDashboard';

class RedeemPage extends Component {

  componentDidMount(){
    const id  = this.props.match.params.id
    this.props.dispatch(getUserTransactionById(id)).then(res=>{console.log(res)})
  };

  render() {
    console.log(this.props.userDashboard);
    return(
      <div className="container">
        {/* <table class="table table-striped">
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
            <td>{this.props.userDashboard.id}</td>
            <td>{this.props.userDashboard.firstName} {this.props.userDashboard.lastName}</td>
            <td>{this.props.userDashboard.mobileNumber}</td>
            <td><img src={this.props.userDashboard.imageLink} width="300"/></td>
            <td>{this.props.userDashboard.created_at}</td>
            <td>{this.props.userDashboard.status}</td>
            <td>{this.props.userDashboard.receiptNumber}</td>
            <td>{this.props.userDashboard.branchId}</td>
            <td>{this.props.userDashboard.referenceNunber}</td>
          </tr>
        </tbody>
        </table> */}
        <div className="row">
          <div className="col-md-6">
            <img src={this.props.userDashboard.imageLink} alt={this.props.userDashboard.id} width="500"/>
          </div>
          <div className="col-md-6">
            <div class="col-md-12">
              <label>Name</label>
              <input className="form-control" type="text" value={`${this.props.userDashboard.firstName} ${this.props.userDashboard.lastName}`}/>
            </div>
            <div class="col-md-12">
              <label>mobileNumber</label>
              <input className="form-control" type="text" value={this.props.userDashboard.mobileNumber}/>
            </div>
            <div class="col-md-12">
              <label>Date</label>
              <input className="form-control" type="text" value={this.props.userDashboard.created_at}/>
            </div>
            <div class="col-md-12">
              <label>receiptNumber</label>
              <input className="form-control" type="text" value={this.props.userDashboard.receiptNumber}/>
            </div>
            <div class="col-md-12">
              <label>branchId</label>
              <input className="form-control" type="text" value={this.props.userDashboard.branchId}/>
            </div>
            <div class="col-md-12">
              <label>status</label>
              <input className="form-control" type="text" value={this.props.userDashboard.status}/>
            </div>
          </div>
        </div>
        
        <center><button type="submit" className="btn btn-success"> Approve </button> <button type="submit" className="btn btn-danger"> Reject </button> <button type="submit" className="btn btn-primary"> Back </button></center>
      </div>
    )
  }
}

const mapStateToProps = (userDashboard) =>{
  return userDashboard;
};

export default connect(mapStateToProps,null)(RedeemPage)
