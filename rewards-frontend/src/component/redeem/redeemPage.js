import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../ducks/userTransaction';
import Swal from 'sweetalert2'
import { reduxForm , Field } from 'redux-form';

const generateId =  Math.random().toString(36).substr(2, 9);
class RedeemPage extends Component {

  onSubmit(values) {
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    this.props.uploadPhotoTransaction(formData).then(res => {
      if(res.error){
        Swal(
          'มีบางอย่างผิดพลาด',
          `${res.error}`,
          'error'
        )
      }else{
        this.props.createUserTransaction(values,res.payload.data.Location,generateId).then(res=>{
          if(res.error){
            Swal(
              'มีบางอย่างผิดพลาด',
              `${res.error}`,
              'error'
            )
          }else{
            Swal(
              'บันทึกข้อมูลเรียบร้อยแล้ว',
              `กรุณารอการตรวจสอบจากพนักงาน หากข้อมูลถูกต้องทางเราจะส่งส่วนลดไปทางเบอร์โทรศัพท์ (ref : ${generateId})`,
              'success'
            )
          }
        })
      }
    })
  };

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <div className="container">
          <div className="row">
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>First Name</label>
                    <Field component="input" className="form-control" type="text" name="firstName" required/>
                  </div>
                </div>
                <div className="col-md-12">
                  <label>Last Name</label>
                  <Field component="input" className="form-control" type="text" name="lastName" required/>
                </div>
                <div className="col-md-12">
                  <label>Mobile Number</label>
                  <Field component="input" className="form-control" type="text" name="mobileNumber" required/>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Upload</label>
                    <input type="file" className="form-control-file" onChange={this.handleFileUpload}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <center><button type="submit" className="btn btn-primary"> Submit </button></center>
              </div> 
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.errorMessage};
}

export default compose(connect(mapStateToProps,actions),reduxForm({ form: 'AddRedeem' }))(RedeemPage);
