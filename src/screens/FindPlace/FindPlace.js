import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList'
import {getPlaces} from '../../store/actions/index'
class FindPlace extends Component{
    state={
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }
    //for drawer color
    static navigatorStyle={
        navBarButtonColor: "#29aaf4"
    }
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    }
    componentDidMount(){
        this.props.onLoadPlaces()
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
    itemSelectedHandler=(key)=>{
        const selPlace= this.props.places.find(place=>{
            return place.key === key;
        })

        this.props.navigator.push({
            screen: "newapp.PlaceDetail",
            title: selPlace.name ,
            passProps:{
                selectedPlace: selPlace
            }
        })
    }
    
    itemsLoadedHandler=()=>{
        Animated.timing(this.state.placesAnim,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    placesSearchHandler=()=>{
       
        Animated.timing(this.state.removeAnim,{
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(()=> {this.setState({
            placesLoaded: true
        });
        this.itemsLoadedHandler();

        });
    }
    render(){
        let content=(
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform:[
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0,1],
                            outputRange: [12,1]
                        })
                    }
                ]
            }}>
            <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Find places</Text>
                </View>
            </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.placesLoaded){
            content=(
                // <Animated.View style={{opacity: this.state.placesAnim}}>
                <PlaceList places={this.props.places} onItemPress={this.itemSelectedHandler}/>
                // </Animated.View>

            )
        }
        return(  <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
            {content}
            </View>
        )
    }
}

const styles= StyleSheet.create({
    searchButton:{
        borderColor: "#29aaf4",
        borderWidth: 3,
        borderRadius: 50,
        padding : 20, 
        alignItems: "center"
    },
    searchButtonText:{
        color: "#29aaf4",
        fontWeight:"bold",
        fontSize: 26
    },
    buttonContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
const mapStateToProps=(state)=>{
    return{
        places: state.places.places
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        onLoadPlaces:()=> dispatch(getPlaces())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);