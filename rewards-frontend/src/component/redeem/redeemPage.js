import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../ducks/userTransaction';
import Swal from 'sweetalert2'
import { reduxForm , Field } from 'redux-form';

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
        this.props.createUserTransaction(values,res.payload.data.Location).then(res=>{
          if(res.error){
            Swal(
              'มีบางอย่างผิดพลาด',
              `${res.error}`,
              'error'
            )
          }else{
            Swal(
              'บันทึกข้อมูลเรียบร้อยแล้ว',
              'กรุณารอการตรวจสอบจากพนักงาน หากข้อมูลถูกต้องทางเราจะส่งส่วนลดไปทางเบอร์โทรศัพท์',
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
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          firstName <Field component="input" type="text" name="firstName" required/>
          lastName <Field component="input" type="text" name="lastName" required/>
          mobileNumber <Field component="input" type="text" name="mobileNumber" required/>
          Upload <input type="file" onChange={this.handleFileUpload} required/>
          <button type="submit"> submit </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.errorMessage};
}

export default compose(connect(mapStateToProps,actions),reduxForm({ form: 'AddRedeem' }))(RedeemPage);
