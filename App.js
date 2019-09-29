//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import Setup from './pages/Setup';
import Movies from './pages/Movies';
import Screen3 from './pages/Screen3';
import MovieDetail from './pages/MovieDetail';

class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('./images/drawer.png')}
                        style={{ width: 25, height: 25, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const FirstActivity_StackNavigator = createStackNavigator({
    //All the screen from the Setup will be indexed here
    Third: {
        screen: Setup,
        navigationOptions: ({ navigation }) => ({
            title: 'Configuration',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const Screen2_StackNavigator = createStackNavigator({
    //All the screen from the Movies will be indexed here
    Second: {
        screen: Movies,
        navigationOptions: ({ navigation }) => ({
            title: 'Movies',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
    Detail: {
        screen: MovieDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Movie info',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
},
{
    initialRouteName: 'Second',
}
);

const Screen3_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    First: {
        screen: Screen3,
        navigationOptions: ({ navigation }) => ({
            title: 'TheMovieDb UI',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: {
        //Title
        screen: FirstActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Configuration',
        },
    },
    Screen2: {
        //Title
        screen: Screen2_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Movies',
        },
    },
    Screen3: {
        //Title
        screen: Screen3_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Help',
        },
    },
}
,{
    initialRouteName: "Screen3",
    unmountInactiveRoutes: true
});


export default createAppContainer(DrawerNavigatorExample);
