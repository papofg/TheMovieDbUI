import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Picker  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GetList from "./GetList";

export default class SearchMovies extends Component {
    state = {
        'query': '',
        loading: true,
        listURL: ''
    }
    componentDidMount = () => {
    }
    searchMovie = () => {
        if (this.props.apiKey != '' && this.props.apiLanguage != '' && this.props.apiKey != null && this.props.apiLanguage != null
            && this.state.query != '' && this.state.query != null && this.state.loading)
        {

            this.setState({ 
                loading: false, 
                listURL: "https://api.themoviedb.org/3/search/movie?"+'api_key='+this.props.apiKey+'&language='+this.props.apiLanguage+'&query='+this.state.query 
            });
        }
        else
        {
            Alert.alert("The title is required");
        }
    }
    setTxtInputValue = (value) => {
        this.setState({ 'query': value.trim() });
    }
    resetTxtInputValue = () => {
        this.setState({ 'query': '', loading: true, listURL: '' });
    }
    render() {
        return (
            <React.Fragment>
                <View style={styles.QueryContainer}>
                    <Text style={{ fontSize: 23 }}> Movie </Text>
                    <TextInput style = {styles.textInput} autoCapitalize = 'none' placeholder = "Enter the title" onFocus = {this.resetTxtInputValue} onChangeText = {this.setTxtInputValue} >{this.state.query}</TextInput>
                    <Button title="Search Movie" onPress = {() => this.searchMovie()}/>
                </View>
                {this.state.listURL != '' &&
                    <View style={styles.ListContainer}><GetList listName={this.state.listURL} navigation={this.props.navigation}/></View>
                }
            </React.Fragment>

        );
    }
}

const styles = StyleSheet.create({
    QueryContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        marginTop: 0,
    },
    ListContainer: {
        flex: 3,
        paddingTop: 20,
        margin: 0,
    },
    textInput: {
        margin: 5,
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: '#FF9800',
        backgroundColor: '#F6EFEF'
    },
});
