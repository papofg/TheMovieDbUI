//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    Tabs,
    Tab,
    ScrollableTab
} from "native-base";
import GetList from "./GetList";
import SearchMovies from "./SearchMovies";


export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'apiLanguage': '',
            'apiKey': ''
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem('apiKey').then((value) => this.setState({ 'apiKey': value }));
        AsyncStorage.getItem('apiLanguage').then((value) => this.setState({ 'apiLanguage': value }));
    }
    componentDidUpdate = () => {
    }
    renderMoviesTabLists = () => {
        const baseUrl = "https://api.themoviedb.org/3/movie";
        let targetTopRatedURL= '', targetUpcomingURL= '', targetPopularURL= '';
        if (this.state.apiKey != '' && this.state.apiLanguage != '' && this.state.apiKey != null && this.state.apiLanguage != null)
        {
            targetTopRatedURL += baseUrl + '/top_rated?api_key='+this.state.apiKey+'&language='+this.state.apiLanguage;
            targetUpcomingURL += baseUrl + '/upcoming?api_key='+this.state.apiKey+'&language='+this.state.apiLanguage;
            targetPopularURL += baseUrl + '/popular?api_key='+this.state.apiKey+'&language='+this.state.apiLanguage;
        }
        return (

                <Container style={styles.MainContainer}>
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        <Tab heading="Search" tabStyle={{backgroundColor: '#c57601'}} activeTabStyle={{backgroundColor: '#FF9800'}}>
                            <SearchMovies apiKey={this.state.apiKey} apiLanguage={this.state.apiLanguage} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading="Top Rated" tabStyle={{backgroundColor: '#c57601'}} activeTabStyle={{backgroundColor: '#FF9800'}} >
                            <GetList listName={targetTopRatedURL} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading="Upcoming" tabStyle={{backgroundColor: '#c57601'}} activeTabStyle={{backgroundColor: '#FF9800'}}>
                            <GetList listName={targetUpcomingURL} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading="Top Popular" tabStyle={{backgroundColor: '#c57601'}} activeTabStyle={{backgroundColor: '#FF9800'}}>
                            <GetList listName={targetPopularURL} navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </Container>

        );
    }
    renderMessageConfiguration = () => {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23, paddingBottom: 20, paddingTop: 20 }}> Configuration is required </Text>
                <Button title="Go to configuration" onPress={() => this.props.navigation.navigate('Screen1') }/>
            </View>
        );
    } 
    //Movies Component
    render() {
        return(
            <React.Fragment>
                {this.state.apiKey != '' && this.state.apiKey != null && this.state.apiLanguage != '' && this.state.apiLanguage != null ? this.renderMoviesTabLists() : this.renderMessageConfiguration() }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 0,
        alignItems: 'center',
        marginTop: 0,

    },
});
