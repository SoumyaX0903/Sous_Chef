import * as api from '../api';//exporting api

// these are client side actions generated for authentication

export const signin = (formdata,history) => async(dispatch)=>{
    try{
        const { data } = await api.signIn(formdata); // we are waiting for the data to come from backend so we use async-await 

        dispatch({ type: 'AUTH', payload:data }); //sending this data to our Auth reducers
        history.push("/")// after login we route to home page
    }
    catch(error){
        console.log(error);
    }
}
//same func as signin users data gets stored in backend and we get his details from backend
export const signup = (formdata,history) => async(dispatch)=>{
    try{
        const { data } = await api.signUp(formdata);

        dispatch({ type: 'AUTH', payload:data });
        history.push("/")
    }
    catch(error){
        console.log(error);
    }
}

