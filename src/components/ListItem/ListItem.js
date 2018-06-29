import React,{Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
const ListItem=(props)=>
{
    console.log(props, 'list item props')

    return(
    <TouchableOpacity onPress={props.onItemPressed}>
            <View style={styles.listView}>
                <Image source={props.imageName} style={styles.image}/>
                <Text>{props.placeName}</Text>
            </View>
        </TouchableOpacity>
)}
   

const styles= StyleSheet.create({
    listView:{
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        margin : 5,
        flexDirection: "row",
        alignItems: "center"
    },
    image:{
        height: 30,
        width: 30,
        marginRight: 8
    }
})

export default ListItem;