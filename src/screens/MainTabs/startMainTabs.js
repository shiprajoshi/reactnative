import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {Platform} from 'react-native';
const startMainTabs=()=>{
    Promise.all([
        Icon.getImageSource( Platform.OS==='android'? "md-map": "ios-map", 30),
        Icon.getImageSource(Platform.OS==='android'? "md-share-alt": "ios-share-alt", 30),
        Icon.getImageSource(Platform.OS==='android'? "md-menu": "ios-menu", 30),
    ]).then(sources=>{
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen : "newapp.FindPlace",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon: sources[2],
                                title: "Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
             },
                {
                    screen : "newapp.SharePlace",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon: sources[2],
                                title: "Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabStyle:{
                tabBarSelectedButtonColor: "orange"
            },
            drawer:{
                left:{
                    screen: "newapp.SideDrawer"
                }
            },
            //tab color change for android
            appStyle:{
                tabBarSelectedButtonColor: "#29aaf4"
            }

        });
     }) 
}

export default startMainTabs;