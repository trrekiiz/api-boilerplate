import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../ducks/userDashboard';
import Swal from 'sweetalert2';
import requireAuth from '../requireAuth';
import ExifOrientationImg from 'react-exif-orientation-img';

class RedeemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptNumber : this.props.userDashboard.receiptNumber,
      branchId : this.props.userDashboard.branchId,
      mobileNumber: this.props.userDashboard.mobileNumber
    };
  }

  componentDidMount(){
    const id  = this.props.match.params.id;
    this.props.getUserTransactionById(id).then(res=>{
      this.setState({
        mobileNumber:this.props.userDashboard.mobileNumber,
        referenceNumber:this.props.userDashboard.referenceNumber
      });
    })
  };

  onApprove = () => {
    let redeemCode = '';
    try{
      const id  = this.props.match.params.id;
        this.props.countApproveUser().then((res)=> {
          if(res.error){
            Swal(
              'มีบางอย่างผิดพลาด ไม่สามารถดึงข้อมูลส่วนลดได้',
              'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
              'error'
            );
          }else if(res.payload.status === 200){
            this.props.getRedeemCodeFromId((res.payload.data+1)).then((res)=>{
              if(res.error){
                Swal(
                  'มีบางอย่างผิดพลาด ไม่สามารถดึงข้อมูลส่วนลดได้',
                  'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
                  'error'
                );
              }else if (res.payload.status === 200){
                redeemCode = res.payload.data.codeRedeem;
                console.log(redeemCode);
                this.props.mapUserTransactionWithRedeemCode(id,res.payload.data.id).then((res) => {
                  if(res.error) {
                    Swal(
                      'มีบางอย่างผิดพลาด ใบเสร็จใบนี้อาจจะได้รับโค้ดส่วนลดแล้ว',
                      'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
                      'error'
                    );
                  }else if (res.payload.status === 200){
                    this.props.updateUserTransactionById(id,"Approve", this.state.receiptNumber, this.state.branchId).then((res)=>{
                      if(res.error){
                        Swal(
                          'มีบางอย่างผิดพลาด',
                          'ข้อมูลที่ท่านบันทึกจะไม่ได้อยู่ในระบบของเรา',
                          'error'
                        );
                      }else if(res.payload.status === 200){
                        this.props.sendSMSToUserTransactionWhenApprove(this.state.mobileNumber,this.state.referenceNumber,redeemCode).then((res)=>{
                          console.log(res);
                          Swal(
                            'บันทึกข้อมูลเรียบร้อยแล้ว',
                            'ข้อมูลที่ท่านบันทึกจะอยู่ในระบบของเรา',
                            'success'
                          );
                        });
                        // setTimeout(function(){window.location.replace(`/dashboard`)}, 2000)
                      }
                    })
                  }
                })
              }
            })
          }
        })
    }catch(error){
      console.log(error);
    }
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

  onBack = () => {
    window.location.replace(`/dashboard`)
    // setTimeout(function(){window.location.replace(`/dashboard`)}, 500);
  };

  render() {
    console.log(this.state);
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ExifOrientationImg src={this.props.userDashboard.imageLink} alt={this.props.userDashboard.id} width="500"/>
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
          <button type="button" className="btn btn-primary" onClick={this.onBack}> Back </button>
        </center>
      </div>
    )
  }
}

const mapStateToProps = (userDashboard) =>{
  return userDashboard;
};

export default requireAuth(connect(mapStateToProps,actions)(RedeemPage))
