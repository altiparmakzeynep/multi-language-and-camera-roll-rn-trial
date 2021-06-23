import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Main from './components/pages/Main';

class RouterComp extends Component {
    render() {
        const Stack  = createStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator name = "authStack" initialRouteName = "main" >
                    <Stack.Screen name = "main" options = {{headerShown: false}} component = {Main}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

export default RouterComp;