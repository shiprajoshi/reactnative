import React, {Component} from 'react';
import {View, Text, ListView, FlatList, StyleSheet} from 'react-native'
import ListItem from '../ListItem/ListItem';
class PlaceList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props, 'props');
        return(
            <FlatList
            style={styles.listView}
            data={this.props.places}
            renderItem={(info)=>{console.log(info, 'info, placelist');
                                    return(<ListItem key={info.item.key} 
                                           placeName={info.item.name}
                                           imageName={info.item.image}
                                           onItemPressed={()=>this.props.onItemPress(info.item.key)} />)}}/>
            // <View>
            //     {
            //         this.props.places.map((place, index)=>{
            //             return(
            //                 <Text key={index}>{place.value}</Text>
            //             )
                        
            //         })
            //     }
             
            // </View>
        )
    }
}
const styles= StyleSheet.create({
    listView:{
        width: '100%'
    }
})
export default PlaceList;