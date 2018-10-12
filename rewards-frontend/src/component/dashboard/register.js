import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../ducks/userAdmin';
import Swal from 'sweetalert2'
import { reduxForm , Field } from 'redux-form';
import { compose } from 'redux';

class Register extends Component {

  onSubmit(values) {
    this.props.createAdminUser(values).then(res => {
      if(res.error){
        Swal(
          'มีบางอย่างผิดพลาด',
          `${res.error}`,
          'error'
        )
      }else{
        console.log(res);
        Swal(
          'บันทึกข้อมูลเรียบร้อยแล้ว',
          `เพิ่มผู้ใช้งาน`,
          'success'
        );
        setTimeout(function(){window.location.replace(`/login`)}, 2000)
      }
    })
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="col-md-8 col-md-offset-2">
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div className="form-group">
            <label>Email address</label>
            <Field component="input" type="email" className="form-control" name="username" placeholder="email@example.com"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field component="input" type="password" className="form-control" name="password" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label>alias Name</label>
            <Field component="input" type="text" className="form-control" name="aliasName"/>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.errorMessage};
}

export default compose(connect(mapStateToProps,actions),reduxForm({ form: 'AddUser' }))(Register);
