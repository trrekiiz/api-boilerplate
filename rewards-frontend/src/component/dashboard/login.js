import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../ducks/userAdmin';
import Swal from 'sweetalert2'
import { reduxForm , Field } from 'redux-form';
import { compose } from 'redux';

class Login extends Component {

  onSubmit(values) {
    this.props.loginAdminUser(values).then(res => {
      console.log(res);
      if(res.error){
        Swal(
          'มีบางอย่างผิดพลาด',
          `${res.error}`,
          'error'
        )
      }else{
        this.props.history.push('/dashboard');
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
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.errorMessage};
}

export default compose(connect(mapStateToProps,actions),reduxForm({ form: 'AddUser' }))(Login);
