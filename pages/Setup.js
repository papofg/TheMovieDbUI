import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Picker  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Setup extends Component {
    state = {
        'apiLanguage': '',
        'apiKey': ''
    }
    componentDidMount = () => {
        AsyncStorage.getItem('apiKey').then((value) => this.setState({ 'apiKey': value }));
        AsyncStorage.getItem('apiLanguage').then((value) => this.setState({ 'apiLanguage': value }));
    }

    setApiKey = () => {
        AsyncStorage.setItem('apiKey', this.state.apiKey);
        if(this.state.apiKey != "")
        {
            Alert.alert("API Key saved successfully (" + this.state.apiKey + ")");
        }
        else
        {
            Alert.alert("API Key deleted successfully");
        }
    }
    setApiLanguage = () => {
        AsyncStorage.setItem('apiLanguage', this.state.apiLanguage);
        if(this.state.apiLanguage != "")
        {
            Alert.alert("API Language saved successfully (" + this.state.apiLanguage + ")");
        }
        else
        {
            Alert.alert("API Language deleted successfully");
        }

    }
    setTxtInputValue = (value) => {
        this.setState({ 'apiKey': value.trim() });
    }
    setPickerLanguageValue = (value) => {
        this.setState({ 'apiLanguage': value });
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.MainContainer}>
                    <Text style={{ fontSize: 23 }}> API Key </Text>
                    <TextInput style = {styles.textInput} autoCapitalize = 'none' placeholder = "Enter your TheMovieDb.org API Key" onChangeText = {this.setTxtInputValue} >{this.state.apiKey}</TextInput>
                    <Button title="Save Key" onPress={this.setApiKey}/>

                    <Text style={{ fontSize: 23,paddingTop: 50, }}> API Language </Text>
                    <Picker mode="dropdown" style={{ width: 250, borderWidth: 1, borderColor: '#FF9800',}} selectedValue = {this.state.apiLanguage} onValueChange = {this.setPickerLanguageValue}>
                        <Picker.Item label = "" value = "" />
                        <Picker.Item label = "Spanish" value = "es-ES" />
                        <Picker.Item label = "English" value = "en-US" />
                    </Picker>
                    <Button title="Save Language" onPress={this.setApiLanguage}/>
                </View>

            </React.Fragment>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 0,
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
