// import {ADD_PLACE, DELETE_PLACE, SET_PLACES} from './actionTypes';
import {SET_PLACES} from './actionTypes';

import {uiStartLoading,uiStopLoading} from './ui'
export const addPlace=(placeName, location, image )=>{
    return dispatch =>{
        dispatch(uiStartLoading())
        const placeData = {
            name: placeName,
            location:location
        };
    //     fetch("",{
    //             method:"POST",
    //             body: JSON.stringify({
    //                 image: image.base64
    //             })
    //         })
    //         .catch(err=> console.log(err))
    //         .then(res=> res.json())
    //         .then(parsedRes=>{
    //              const placeData = {
    //              name: placeName,
    //             location:location,
    //             image: image.base64
    //          };
                
    //         return fetch("https://proverbial-will-151206.firebaseio.com/places.json", {
    //         method: "POST",
    //         body: JSON.stringify(placeData)
    //     })
    // })
    //     .catch(err => alert(err))
    //     .then(res => res.json())
    //     .then(parsedRes => {
    //         alert(parsedRes);
    //     });      
    //             console.log(parsedRes);

           




        // fetch("",{
        //     method:"POST",
        //     body: JSON.stringify({
        //         image: image.base64
        //     })
        // })
        // .catch(err=> console.log(err))
        // .then(res=> res.json())
        // .then(parsedRes=>{
        //     console.log(parsedRes);
        // })
        fetch("https://proverbial-will-151206.firebaseio.com/places.json", {
            method: "POST",
            body: JSON.stringify(placeData)
        })
        .catch(err => {
            alert(err); 
            dispatch(uiStopLoading())})
        .then(res => res.json())
        .then(parsedRes => {
            alert(parsedRes);
            dispatch(uiStopLoading())
        });       
    }
}
export const setPlaces=(places)=>{
    return{
        type: SET_PLACES,
        places: places
    }
}

export const getPlaces=()=>{
    return dispatch=>{
        fetch("https://proverbial-will-151206.firebaseio.com/places.json")
         .catch(err=>{
             console.log(err, "get places")
            alert(err)
         })
         .then(res=>{
             res.json()
         })
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
 
    }
}
export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

