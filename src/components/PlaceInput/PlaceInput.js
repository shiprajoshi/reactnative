import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

class PlaceInput extends Component{

    addPlaces=()=>{
        if(this.state.placeName.trim()==='')
            return;
        this.props.addPlaceHandler(this.state.placeName)
        //alert('hello add places!!!'+ this.state.placeName)
    }
 
    render(){
        return(
            <DefaultInput placeholder="Place Name"  onChangeText={this.props.onChangeText} value={this.props.placeName}/>

            // <View style={styles.container}>
            //     <TextInput
            //     placeholder="An awesome place"
            //     style={styles.placeInput}
            //     value={this.state.placeName}
            //     onChangeText={this.onChangeHandler}
            //     />
            //     <Button
            //     title="Add Places"
            //     style={styles.placeButton}
            //     onPress={this.addPlaces}/>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    placeInput:{
        width: '70%',
        padding: 10
    },
    placeButton:{
        width: '30%'
    }
  });

  export default PlaceInput;