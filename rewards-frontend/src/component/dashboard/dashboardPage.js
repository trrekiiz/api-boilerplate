import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllUserTransaction} from '../../ducks/userDashboard';
import _ from 'lodash';

class RedeemPage extends Component {

  componentDidMount(){
    this.props.getAllUserTransaction();
  };

  renderFilterButtons = () => _.map(this.props.userDashboard, _item =>
    <tr key={_item.id}>
      <td><a href={`dashboard/edit/${_item.id}`}>{_item.id}</a></td>
      <td>{_item.firstName} {_item.lastName}</td>
      <td>{_item.mobileNumber}</td>
      <td><img src={_item.imageLink} alt={_item.id} width="200"/></td>
      <td>{_item.created_at}</td>
      <td>{_item.status}</td>
    </tr>
)

  render() {
    console.log(this.props.userDashboard);
    return(
      <div className="container">
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">mobileNumber</th>
            <th scope="col">imageLink</th>
            <th scope="col">created_at</th>
            <th scope="col">status</th>
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

export default connect(mapStateToProps,mapDispatchToProps)(RedeemPage)
