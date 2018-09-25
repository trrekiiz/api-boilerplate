export const CREATE_USER_TRANSACTIONS = "CREATE_USER_TRANSACTIONS";
export const CREATE_USER_TRANSACTIONS_SUCCESS = "CREATE_USER_TRANSACTIONS_SUCCESS";
export const CREATE_USER_TRANSACTIONS_FAIL = "CREATE_USER_TRANSACTIONS_FAIL";
export const PHOTO_TRANSACTIONS = "PHOTO_TRANSACTIONS";
export const PHOTO_TRANSACTIONS_SUCCESS = "PHOTO_TRANSACTIONS_SUCCESS";
export const PHOTO_TRANSACTIONS_FAIL = "PHOTO_TRANSACTIONS_FAIL";

export default function (state = {}, action = {} ) {
  switch (action.type) {
    case CREATE_USER_TRANSACTIONS:
      return ({
        ...state, loading:true
      });
    case CREATE_USER_TRANSACTIONS_SUCCESS:
      return ({
        message: `success`,
        loading: false
      });
    case CREATE_USER_TRANSACTIONS_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case PHOTO_TRANSACTIONS:
      return ({
        ...state, loading:true
      });
    case PHOTO_TRANSACTIONS_SUCCESS:
      return ({
        message: `success`,
        loading: false
      });
    case PHOTO_TRANSACTIONS_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    default:
      return state;
  }
}

export function createUserTransaction(values,link){
  const data = {
    ...values,
    status: `Waiting`,
    imageLink : link
  };
  return{
    type: CREATE_USER_TRANSACTIONS,
    payload: {
      client: 'default',
      request: {
        url: process.env.REACT_APP_API_USER_TRANSACTIONS,
        method: 'POST',
        data: data
      }
    }
  }
}

export function uploadPhotoTransaction(data){
  return{
    type: PHOTO_TRANSACTIONS,
    payload: {
      client: 'default',
      request: {
        url: process.env.REACT_APP_API_USER_PHOTO,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    }
  }
}