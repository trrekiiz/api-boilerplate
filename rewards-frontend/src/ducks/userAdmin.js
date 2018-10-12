export const CREATE_ADMIN_USER = "CREATE_ADMIN_USER";
export const CREATE_ADMIN_USER_SUCCESS = "CREATE_ADMIN_USER_SUCCESS";
export const CREATE_ADMIN_USER_FAIL = "CREATE_ADMIN_USER_FAIL";
export const LOGIN_ADMIN_USER = "LOGIN_ADMIN_USER";
export const LOGIN_ADMIN_USER_SUCCESS = "LOGIN_ADMIN_USER_SUCCESS";
export const LOGIN_ADMIN_USER_FAIL = "LOGIN_ADMIN_USER_FAIL";

export default function (state = {}, action = {} ) {
  switch (action.type) {
    case CREATE_ADMIN_USER:
      return ({
        ...state, loading:true
      });
    case CREATE_ADMIN_USER_SUCCESS:
      return ({
        message: `success`,
        loading: false
      });
    case CREATE_ADMIN_USER_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case LOGIN_ADMIN_USER:
      return ({
        ...state, loading: true
      });
    case LOGIN_ADMIN_USER_SUCCESS:
      const token = action.payload.data;
      console.log(token);
      localStorage.setItem('token', token.token);
      localStorage.setItem('name', token.name);
      return ({
        ...state,
        authenticated: token,
        message: `login success`,
        loading: false
      });
    case LOGIN_ADMIN_USER_FAIL:
      return ({
        ...state, loading: true
      });
    default:
      return state;
  }
}

export function createAdminUser(values){
  const data = {
    ...values
  };
  return{
    type: CREATE_ADMIN_USER,
    payload: {
      client: 'default',
      request: {
        url: process.env.REACT_APP_API_ADMIN_USERS,
        method: 'POST',
        data: data
      }
    }
  }
}

export function loginAdminUser(values){
  const data = {
    ...values
  };
  return{
    type: LOGIN_ADMIN_USER,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_ADMIN_USERS}/signin`,
        method: 'POST',
        data: data
      }
    }
  }
}