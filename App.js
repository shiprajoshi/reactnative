import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlace from './src/screens/FindPlace/FindPlace';
import SharePlace from './src/screens/SharePlace/SharePlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store= configureStore();

Navigation.registerComponent("newapp.AuthScreen", 
                            ()=> AuthScreen,
                             store,
                             Provider)
Navigation.registerComponent("newapp.FindPlace",
                             ()=> FindPlace,
                             store,
                             Provider)
Navigation.registerComponent("newapp.SharePlace", 
                             ()=> SharePlace,
                             store,
                             Provider) 
Navigation.registerComponent("newapp.PlaceDetail", 
                             ()=> PlaceDetail,
                             store,
                             Provider)
Navigation.registerComponent("newapp.SideDrawer", 
                             ()=> SideDrawer,
                            store,
                            Provider)


Navigation.startSingleScreenApp({
  screen:{
    screen: "newapp.AuthScreen",
    title: "Hello Login"
  }
})



// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import PlaceInput from './src/components/PlaceInput/PlaceInput';
// import {connect} from 'react-redux';
// import {addPlace} from './src/store/actions/index'
// import PlaceList from './src/components/PlaceList/PlaceList';
// import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
// import { selectedPlace, deletePlace, deselectPlace } from './src/store/actions/places';
// class App extends React.Component {

//   onAddHandler=(placeName)=>{
//     this.props.onAddPlace(placeName);
//     //console.log(this.props.places)
//   }
//   onSelectPlaceHandler=(key)=>{
//     this.props.onSelectPlace(key);
//   }

//   onDeletePlaceHandler=()=>{
//     this.props.onDeletePlace();
//   }

//   onDeselectePlaceHandler=()=>{
//     this.props.onDeselectPlace();
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//        <PlaceDetail selectedPlace={this.props.selectedPlace} deleteSelectedPlace={this.onDeletePlaceHandler} modalClose={this.onDeselectePlaceHandler}/>
//        <PlaceInput addPlaceHandler={this.onAddHandler} />
//        <PlaceList places={this.props.places} onItemPress={this.onSelectPlaceHandler}/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: 10
//   },
// });

// const mapStateToProps=(state)=>{
//   return{
//     places: state.places.places,
//     selectedPlace: state.places.selectedPlace
//   }
 
// }

// const mapDispatchToProps=(dispatch)=>{
//   return{
//     onAddPlace: (placeName)=>dispatch(addPlace(placeName)),
//     onSelectPlace:(key)=> dispatch(selectedPlace(key)),
//     onDeletePlace:()=>dispatch(deletePlace()),
//     onDeselectPlace:()=> dispatch(deselectPlace())
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App);