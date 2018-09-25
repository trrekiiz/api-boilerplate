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
      <td>{_item.id}</td>
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
      <div>
        <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>mobileNumber</th>
          <th>imageLink</th>
          <th>created_at</th>
          <th>status</th>
        </tr>
        {this.renderFilterButtons()}
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

//
// export default connect(mapStateToProps)(RedeemPage)
