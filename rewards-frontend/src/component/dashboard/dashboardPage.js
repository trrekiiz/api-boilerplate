import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllUserTransaction} from '../../ducks/userDashboard';
import _ from 'lodash';
import requireAuth from '../requireAuth';
import ExifOrientationImg from 'react-exif-orientation-img';

class RedeemPage extends Component {

  componentDidMount(){
    this.props.getAllUserTransaction();
  };

  renderFilterButtons = () => _.map(this.props.userDashboard, _item =>
    <tr key={_item.id}>
      <td><a href={`dashboard/edit/${_item.id}`}>{_item.id}</a></td>
      <td>{_item.firstName} {_item.lastName}</td>
      <td>{_item.mobileNumber}</td>
      <td><ExifOrientationImg src={_item.imageLink} alt={_item.id} width="200"/></td>
      <td>{_item.created_at}</td>
      <td>{_item.status}</td>
    </tr>
);

  render() {
    console.log(this.props.userDashboard);
    return(
      <div className="container">
        <div>Login By : {localStorage.getItem('name')} </div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>mobileNumber</th>
            <th>imageLink</th>
            <th>created_at</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
        {this.renderFilterButtons()}
        </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (userDashboard) =>{
  return userDashboard;
};

const mapDispatchToProps = (dispatch) => ({
  getAllUserTransaction: () => dispatch(getAllUserTransaction())
});

export default requireAuth(connect(mapStateToProps,mapDispatchToProps)(RedeemPage))
