import React,{Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Button, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import {addPlace} from '../../store/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
//import PlaceInput from '../../components/UI/DefaultInput/DefaultInput';
import imagePlaceholder from '../../assets/image.jpg';
import PickImage from '../../components/PickImage/PickImage';
import LocatePlace from '../../components/LocatePlace/LocatePlace';



class SharePlace extends Component{
    static navigatorStyle={
        navBarButtonColor: "#29aaf4"
    }
    state={
        placeName:'',
        controls:{
            location:{
                value: null,
                valid: false
            },
            image:{
                value: null,
                valid: false
            }
        }
    }
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        
    }


    onNavigatorEvent=event=>{
        if(event.type=== "NavBarButtonPress") {
            if(event.id==="sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }

        }   
    }
    onChangeHandler=(val)=>{
        this.setState({
            placeName: val
          });
        
    };
    onAddHandler=()=>{
        if(this.state.placeName.trim() !=='')
        {
            this.props.onPlaceAdded(this.state.placeName, this.state.controls.location.value, this.state.controls.image.value);


        }
    }

    locationPickHandler=(location)=>{
        this.setState((prevState)=>{
            return{
                controls:{
                    ...prevState.controls,
                    location:{
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickerHandler=(image)=>{
        this.setState((prevState)=>{
            return{
                controls:{
                    ...prevState.controls,
                   image:{
                    value: image,
                    valid: true
                   } 
                }
            }
        })
    }
    render(){
        let submitButton= (<Button title="Share the Place!"  onPress={this.onAddHandler} disabled={!this.state.controls.location.valid}/>)
        if(this.props.isLoading){
            submitButton= (<View><ActivityIndicator/><Text>loading</Text></View>)
        }
        return(
            <ScrollView>
            <View style={styles.container}>
              <MainText>
                <HeadingText>Share a Place with us!</HeadingText>
              </MainText>
              <PickImage onImagePicked={this.imagePickerHandler}  />
              <LocatePlace onLocationPick={this.locationPickHandler}/>
              <PlaceInput onChangeText={this.onChangeHandler} placeName={this.state.placeName} />
              <View style={styles.button}>
                {submitButton}
              </View>
            </View>
          </ScrollView>
       
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
      },
      placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
      },
      button: {
        margin: 8
      },
      previewImage: {
          width: "100%",
          height: "100%"
      }
})
const mapStateToProps= state=>{
    return{
        isLoading: state.ui.isLoading
    }
}
const mapDispatchToProps= dispatch=>{
    return{
        onPlaceAdded: (placeName,location,image)=> dispatch(addPlace(placeName,location,image))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);