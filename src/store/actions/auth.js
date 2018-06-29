import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs'
import {AsyncStorage} from 'react-native';
export const tryAuth=(authData, authMode)=>{
    let url= "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCTbP-C8cKlcg9WTnREXTlI5qjVlJNfkxM";
    const key= "AIzaSyCTbP-C8cKlcg9WTnREXTlI5qjVlJNfkxM"
    return dispatch=>{
        if(authMode=== "login"){
            url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+key;
        }
        fetch(url,{
            method:"POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
      .then(res=> res.json())
        .then(parsedRes=> {
            dispatch(uiStopLoading())
            console.log(parsedRes,"authentication data")
            if(!parsedRes.idToken){
                alert('authentication failed')
            }
            else{
                console.log('token in auth is', parsedRes.idToken)
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
                alert('authentication successful')
                startMainTabs();
            }
        })
        // .catch(err=> {
        //     alert('Authentication Failed')
        //     dispatch(uiStopLoading())
        // })
       

    }
};

export const authStoreToken= (token, expiresIn)=>{
    return dispatch=>{
        dispatch(authsetToken(token))
        const now= new Date();
        const expiry= now.getTime()+ expiresIn*1000
       AsyncStorage.setItem("ap:auth:token", token)
        AsyncStorage.setItem("ap:auth:expiry", expiry.toString())
        console.log('time', expiry.toString())

    }
}

export const authsetToken=(token)=>{
    return{
        type: AUTH_SET_TOKEN,
        token: token
    }
}


export const authGetToken=()=>{
    return(dispatch, getState)=>{
        const promise= new Promise((resolve, reject)=>{
            const token = getState().auth.token;
            if(!token){
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err=> reject())   
                    .then(tokenFromStorage=>{
                        fetchedToken=tokenFromStorage
                        if(!tokenFromStorage)
                        {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiry"); 
                    })  
                    .then(expiry=> {
                        const parsedExp=  new Date(parseInt(expiry))
                        const now= new Date();
                        if(parsedExp> now)
                        {
                            dispatch(authsetToken(fetchedToken));
                            resolve(fetchedToken)
                        }
                        else{
                            reject();
                        }
                      
                    }) 
                    .catch(err=> reject())          
                    // reject();
            }
            else{
                resolve(token)
            }
        });
        promise.catch(err => {
            dispatch(authClearStorage());
        });
        return promise
    }
}

export const autoSignIn=()=>{
    return dispatch=>{
        dispatch(authGetToken())
        .then(token=> startMainTabs())
        .catch(err=> console.log('failed to get any tokens'))

    }
}

export const authClearStorage=()=>{
    return dispatch=>{
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiry");
    }
}