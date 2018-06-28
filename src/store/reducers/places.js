// import {ADD_PLACE, SELECTED_PLACE, DELETE_PLACE, DESELECT_PLACE, SET_PLACES} from '../actions/actionTypes';
import { DELETE_PLACE, SET_PLACES} from '../actions/actionTypes';

const initialState={
    places:[]
};
const placeReducer=(state=initialState, action)=>{
    switch (action.type) {
        case SET_PLACES:
            return{
                ...state,
                places: action.places
            }
        
        // case ADD_PLACE:
        //     return{
        //         ...state,
        //         places: state.places.concat({key: Math.random(),
        //                                      value: action.placeName,
        //                                      image:{uri: action.image.uri},
        //                                      location: action.location
        //                                      })
        //     }
        // case SELECTED_PLACE:
        //     return{
        //         ...state,
        //         selectedPlace: state.places.find((place)=>{
        //            return place.key===action.key})     
        //     }
        case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
      };
        default:
            return state;
           
    }
}

export default placeReducer;