import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class SideDrawer extends Component{
    render()
    {
        return(
            
            <View style={[styles.container,{width: Dimensions.get("window").width * 0.8}]}>
            <TouchableOpacity>
            <View style={styles.drawerItem}>
            <Icon  name="md-log-out" size={30} color="#bbb" style={styles.drawerItemIcon}/>

            <Text>Sign  out</Text>
            </View>
            </TouchableOpacity>
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 50,
        flex: 1,
        backgroundColor: "white"
    },
    drawerItem:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:"#eee"
    },
    drawerItemIcon:{
        marginRight: 10
    }
})
export default SideDrawer;