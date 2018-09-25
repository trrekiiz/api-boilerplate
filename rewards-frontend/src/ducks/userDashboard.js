export const FETCH_ALL_USER_TRANSACTION = "FETCH_ALL_USER_TRANSACTION";
export const FETCH_ALL_USER_TRANSACTION_SUCCESS = "FETCH_ALL_USER_TRANSACTION_SUCCESS";
export const FETCH_ALL_USER_TRANSACTION_FAIL = "FETCH_ALL_USER_TRANSACTION_FAIL";

export default function (state = {}, action = {} ) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_ALL_USER_TRANSACTION:
      return ({
        ...state, loading:true
      });
    case FETCH_ALL_USER_TRANSACTION_SUCCESS:
      const data = action.payload.data;
      return ({
        ...state,
        ...data,
        message: `success`,
        loading: false
      });
    case FETCH_ALL_USER_TRANSACTION_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    default:
      return state;
  }
}
export function getAllUserTransaction(){
  return{
    type: FETCH_ALL_USER_TRANSACTION,
    payload: {
      client: 'default',
      request: {
        url: process.env.REACT_APP_API_USER_TRANSACTIONS,
        method: 'GET'
      }
    }
  }
}
