import React,{Component} from 'react';
import {View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps'
//import imagePlaceholder from '../../assets/image.jpg';

class LocatePlace extends Component{
  state={
    focussedLocation:{
      latitude: 37.7000352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
    },
    placeChosen: false
  }

  getLocationHandler=()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
      const coordsEvent={
        nativeEvent:{
          coordinate:{
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
     err=>{console.log('error', err); alert
    ('error fetching location')})
  }

  pickLocationHandler=(event)=>{
    const coord= event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focussedLocation,
      latitude: coord.latitude,
      longitude: coord.longitude
    })
    this.setState((prevState)=>{
      return{
        focussedLocation:{
          ...prevState.focussedLocation,
          latitude: coord.latitude,
          longitude: coord.longitude
        },
        placeChosen: true
      }
    })
    this.props.onLocationPick({
      latitude: coord.latitude,
      longitude: coord.longitude
    })
  }
  render(){
    let marker= null;
    if(this.state.placeChosen){
      marker= <MapView.Marker coordinate={this.state.focussedLocation}/>
    }
    return(
      <View style={styles.container}>
        <MapView 
        initialRegion={this.state.focussedLocation}  
        region={this.state.focussedLocation}
        style={styles.map}
        zoomEnabled = {true}
        onPress={this.pickLocationHandler}
        ref={ref=> this.map= ref}>
        {marker}
        
        </MapView>
            <View style={styles.button}>
              <Button title="Locate Me"  onPress={this.getLocationHandler}/>
            </View>
    </View>
  )

  }
   
}
const styles= StyleSheet.create({
    container: {
        flex:1,
        width: "100%",
        alignItems: "center"
      },
      // placeholder: {
      //   borderWidth: 1,
      //   borderColor: "black",
      //   backgroundColor: "#eee",
      //   width: "80%",
      //   height: 150
      // },
      map:{
        flex:1,
        width: '100%',
        height: 250

      },
      button: {
        margin: 8
      },
      previewImage: {
          width: "100%",
          height: "100%"
      }
})
export default LocatePlace;