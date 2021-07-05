//separate reducer made just for user authentication
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
      case 'AUTH':{
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload })); //when we have the user and we get back their token we save it in our local storage and it makes it available in the redux store so we can use it globally
        return { ...state, authData: action?.payload};
    }
  
        
      case 'LOGOUT':
        localStorage.clear();//here we clear our local storage
        return { ...state, authData: null};
      default:
        return state;
    }
  };

  export default authReducer;