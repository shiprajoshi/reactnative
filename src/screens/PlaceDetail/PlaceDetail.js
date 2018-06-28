import React,{Component} from 'react';
import {View, Button,Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component{
    onDeleteHandler=()=>{
        console.log((this.props.selectedPlace.key), "key")
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop();
    }

    render(){
        return(
                <View >
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.image}/>
                     <Text style={styles.text}>{this.props.selectedPlace.value}</Text>
                 </View>

                    <View>
                        <TouchableOpacity>
                            <View style={styles.deleteButton}>
                              <Icon size={40} name="ios-trash" color="red" onPress={this.onDeleteHandler} />
                            </View>
                        </TouchableOpacity>
                        {/* <Button title="end" color="blue" onPress={props.modalClose}/> */}
                    </View>
                </View>
           // </Modal>
        )
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        onDeletePlace: (key)=> dispatch((deletePlace(key)))

    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);

const styles= StyleSheet.create({
        image:{
            height: 200,
            width: "100%"
        },
        deleteButton:{
            alignItems: 'center'

        },
        text:
        {
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28
        }
})