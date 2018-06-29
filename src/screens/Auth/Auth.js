import React,{Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
// import startMainTabs from '../MainTabs/startMainTabs'; 
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import image from '../../assets/image.jpg';
import validate from '../../utility/validation';
import {connect} from 'react-redux';
import {tryAuth, autoSignIn} from '../../store/actions/auth';

class AuthScreen extends Component{
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls:{
          email:{
            value:"",
            valid: false,
            validationRules:{
              isEmail: true
            },
            touched: false
          },
          password:{
            value: "",
            valid: false,
            validationRules:{
              minlength: 6
            },
            touched: false
          },
          confirmPassword:{
            value: "",
            valid: false,
            validationRules:{
              equalTo: "password"
            },
            touched: false
          }
        }
      };
      constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
      }
      componentWillUnmount(){
          Dimensions.removeEventListener("change", this.updateStyles);
      }

      componentDidMount(){
        this.props.onautoSignIn();
      }

      switchAuthModeHandler=()=>{
        this.setState(prevState=>{
          return{
            authMode: prevState.authMode=== "login"? "signup": "login"
          };
        })
      }
        
      updateStyles=(dims)=>{
        this.setState({
            viewMode:
              dims.window.height > 500 ? "portrait" : "landscape"
          });
      }
    
    tryAuthHandler=()=>{
       // alert('hello')
       const authData={
         email: this.state.controls.email.value,
         password: this.state.controls.password.value,
         confirmPassword: this.state.controls.confirmPassword.value
       }
       this.props.ontryAuth(authData,this.state.authMode)
        // startMainTabs();
    }

    updateInputState = (key, value) => {
      let connectedValue = {};
      if (this.state.controls[key].validationRules.equalTo) {
        const equalControl = this.state.controls[key].validationRules.equalTo;
        const equalValue = this.state.controls[equalControl].value;
        connectedValue = {
          ...connectedValue,
          equalTo: equalValue
        };
      }
      if (key === "password") {
        connectedValue = {
          ...connectedValue,
          equalTo: value
        };
      }
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            confirmPassword: {
              ...prevState.controls.confirmPassword,
              valid:
                key === "password"
                  ? validate(
                      prevState.controls.confirmPassword.value,
                      prevState.controls.confirmPassword.validationRules,
                      connectedValue
                    )
                  : prevState.controls.confirmPassword.valid
            },
            [key]: {
              ...prevState.controls[key],
              value: value,
              valid: validate(
                value,
                prevState.controls[key].validationRules,
                connectedValue
              ),
              touched: true
            }
          }
        };
      });
    };
    // updateInputState=(key, value)=>{
    //   let connectedValue= {};
    //   if(this.state.controls[key].validationRules.equalTo){
    //     const equalControl= this.state.controls[key].validationRules.equalTo;
    //     const equalValue= this.state.controls[equalControl].value;
    //     connectedValue={
    //       ...connectedValue,
    //       equalTo : equalValue

    //     }

    //   }

    //   this.setState((prevState)=>{
    //     return{
    //       controls:{
    //         ...prevState.controls,
    //         [key]:{
    //           ...prevState.controls[key],
    //           value: value,
    //           valid: validate(value, prevState.controls[key].validationRules, connectedValue)
    //         }
    //       }
    //     }
    //   })
    // }
    render()
    {
        let confirmPasswordView= null;
        let submitButton = ( <ButtonWithBackground color="#29aaf4" onPress={this.tryAuthHandler}
        disabled={!this.state.controls.email.valid ||!this.state.controls.password.valid|| !this.state.controls.confirmPassword.valid && this.state.authMode==="signup" }
        > Login</ButtonWithBackground>)
        if(this.props.isLoading){
          submitButton=(<View><ActivityIndicator/><Text>logging in....</Text></View>)
        }
        let heading =null;
        if(this.state.viewMode === "portrait"){
            heading= (
                <MainText>
            <HeadingText>  Please Log in!</HeadingText>
        </MainText>
            )
        }

        if(this.state.authMode==="signup"){
          confirmPasswordView=(<View
            style={
              this.state.viewMode === "portrait"
                ? styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper
            }
          >
            <DefaultInput
              placeholder="Confirm Password"
              style={styles.input}
              value={this.state.controls.confirmPassword.value}
              onChangeText={(value)=>this.updateInputState('confirmPassword', value)}
              valid={this.state.controls.confirmPassword.valid}
              touched={this.state.controls.confirmPassword.touched}
              secureTextEntry
            />
          </View>);
        }

        return(
            <ImageBackground style={styles.bg}source={image}>
        <KeyboardAvoidingView style={styles.container} behaviour="padding">
            {heading}
            <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch to {this.state.authMode==="login"?"signup":"login"}</ButtonWithBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={(value)=>this.updateInputState('email', value)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View
              style={
                this.state.viewMode === "portrait" || this.state.authMode==="login"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === "portrait" || this.state.authMode==="login"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input}
                value={this.state.controls.password.value}
                onChangeText={(value)=>this.updateInputState('password', value)}
                valid={this.state.controls.password.valid} 
                touched={this.state.controls.password.touched}
                secureTextEntry/>
              </View>
                {confirmPasswordView}
            </View>
          </View>
          </TouchableWithoutFeedback>
          {submitButton}
          </KeyboardAvoidingView>
        </ImageBackground>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer:{
        width: "80%"
    },
    input:{
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    bg:{
        flex: 1,
        width: "100%"
    },
    landscapePasswordContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    portraitPasswordContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
      width: "45%"
    },
    portraitPasswordWrapper: {
      width: "100%"
    }
})
const mapStateToProps= state=>{
  return{
    isLoading: state.ui.isLoading
  }
 
}
const mapDispatchToProps=(dispatch)=>{
  return{
    ontryAuth: (authData, authMode)=> dispatch(tryAuth(authData, authMode)),
    onautoSignIn: ()=> dispatch(autoSignIn())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);