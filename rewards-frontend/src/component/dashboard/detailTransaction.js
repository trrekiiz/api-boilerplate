import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../ducks/userDashboard';
import Swal from 'sweetalert2';

class RedeemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptNumber : this.props.userDashboard.receiptNumber,
      branchId : this.props.userDashboard.branchId
    };
  }

  componentDidMount(){
    const id  = this.props.match.params.id;
    this.props.getUserTransactionById(id).then(res=>{console.log(res)})
  };

  onApprove = () => {
    const id  = this.props.match.params.id;
    this.props.updateUserTransactionById(id,"Approve", this.state.receiptNumber, this.state.branchId).then((res)=>{
      if(res.error){
        Swal(
          'มีบางอย่างผิดพลาด เลขสัญญาอาจจะซ้ำ',
          'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
          'error'
        );
      }else if(res.payload.status === 200){
        Swal(
          'บันทึกข้อมูลเรียบร้อยแล้ว',
          'ข้อมูลที่ท่านบันทึกจะอยู่ในระบบของเรา',
          'success'
        );
        setTimeout(function(){window.location.replace(`/dashboard`)}, 2000)
      }
    })
  };

  onReject = () => {
    const id  = this.props.match.params.id;
    this.props.updateUserTransactionById(id,"Reject").then((res)=>{
      if(res.error){
        Swal(
          'มีบางอย่างผิดพลาด เลขสัญญาอาจจะซ้ำ',
          'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
          'error'
        );
      }else if(res.payload.status === 200){
        Swal(
          'บันทึกข้อมูลเรียบร้อยแล้ว',
          'ข้อมูลที่ท่านบันทึกจะอยู่ในระบบของเรา',
          'success'
        );
        setTimeout(function(){window.location.replace(`/dashboard`)}, 2000)
      }
    })
  };

  render() {
    console.log(this.props.userDashboard , this.state);
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={this.props.userDashboard.imageLink} alt={this.props.userDashboard.id} width="500"/>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <label>Name</label>
              <input className="form-control" type="text" value={`${this.props.userDashboard.firstName} ${this.props.userDashboard.lastName}`}/>
            </div>
            <div className="col-md-12">
              <label>mobileNumber</label>
              <input className="form-control" type="text" value={this.props.userDashboard.mobileNumber}/>
            </div>
            <div className="col-md-12">
              <label>Date</label>
              <input className="form-control" type="text" value={this.props.userDashboard.created_at}/>
            </div>
            <div className="col-md-12">
              <label>receiptNumber</label>
              <input className="form-control" type="text" value={this.props.userDashboard.receiptNumber} onChange={ e => {this.setState({receiptNumber:e.target.value})}}/>
            </div>
            <div className="col-md-12">
              <label>branchId</label>
              <input className="form-control" type="text" value={this.props.userDashboard.branchId} onChange={ e => {this.setState({branchId :e.target.value})}}/>
            </div>
            <div className="col-md-12">
              <label>status</label>
              <input className="form-control" type="text" value={this.props.userDashboard.status}/>
            </div>
          </div>
        </div>
        
        <center>
          <button type="button" className="btn btn-success" onClick={this.onApprove}> Approve </button>
          <button type="button" className="btn btn-danger" onClick={this.onReject}> Reject </button>
          <button type="button" className="btn btn-primary"> Back </button>
        </center>
      </div>
    )
  }
}

const mapStateToProps = (userDashboard) =>{
  return userDashboard;
};

export default connect(mapStateToProps,actions)(RedeemPage)
