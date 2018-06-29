// import {ADD_PLACE, DELETE_PLACE, SET_PLACES} from './actionTypes';
import {SET_PLACES, DELETE_PLACE} from './actionTypes';
import {uiStartLoading,uiStopLoading, authGetToken} from './index'
export const addPlace=(placeName, location, image )=>{
    return dispatch =>{
        let authToken;
        dispatch(uiStartLoading())
        dispatch(authGetToken())
        .catch(()=> console.log('no valid token found'))
        .then((token)=>{
            authToken= token
            return fetch("https://us-central1-proverbial-will-151206.cloudfunctions.net/storeImage",{
                method:"POST",
                body: JSON.stringify({
                    image: image.base64
                }),
                headers:{
                    Authorization: "Bearer " + authToken
                }
            })
            console.log('inside image fetcg')
        })
      
            .catch(err=> {console.log(err, "error uploading image"); alert(err, 'error uploading image');
                dispatch(uiStopLoading())})
            .then(res=> res.json())
            .then(parsedRes=>{
                 const placeData = {
                 name: placeName,
                location:location,
                image: parsedRes.imageUrl
             };
             console.log(parsedRes, 'helloooooo')
            return fetch("https://proverbial-will-151206.firebaseio.com/places.json?auth=" +authToken, {
            method: "POST",
            body: JSON.stringify(placeData)
        })
    })
        .then(res => res.json())
        .then(parsedRes => {
            alert(parsedRes);
            dispatch(uiStopLoading())
        })
        .catch(err => {alert(err); dispatch(uiStopLoading())})           
    }
}
export const setPlaces=(places)=>{
    return{
        type: SET_PLACES,
        places: places
    }
}

export const getPlaces=()=>{
    return (dispatch, getState)=>{
        dispatch(authGetToken())
        .then(token=>{
           return fetch("https://proverbial-will-151206.firebaseio.com/places.json?auth="+token)
        })
        .catch(()=> console.log('no valid token found'))
         .then(res=> res.json())
         .then(parsedRes=>{
             console.log('inside then block get places,', parsedRes);
              const places=[];
             for(let key in parsedRes)
             {
                 places.push({
                    ...parsedRes[key],
                    image:{
                        uri: parsedRes[key].image
                    },
                    key: key
                 })
             }
            dispatch(setPlaces(places))
         })
         .catch(err=>{
            console.log(err, "get places")
           alert(err)
        })
 
    }
}
export const deletePlace=(key)=>{
    console.log('inside remove place')
    return dispatch=>{
        dispatch(authGetToken())
        .then(token=>{ return fetch("https://proverbial-will-151206.firebaseio.com/places/"+key+".json?auth="+token , {
            method: "DELETE"
        })})
        .catch(()=> console.log('no valid token found'))
       
        .then(res=>res.json())
        .then(parsedRes=>{
            console.log("done!!")
            dispatch(removePlace(key))
        })
        .catch(err=> console.log(err, "error at remove place"))


    }
}
export const removePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

