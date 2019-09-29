import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Screen3 extends Component {
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Getting Started </Text>
                <View style={{ textAlign: 'left',paddingTop: 10 }}>
                    <Text numberOfLines={2} note>
                        1. Go to https://www.themoviedb.org and login with your account
                    </Text>
                    <Text numberOfLines={2} note>
                        2. Go to Settings -&gt; API and request an API key
                    </Text>
                    <Text numberOfLines={2} note>
                        3. In this app, go to Configuration and save your API key and the language
                    </Text>
                    <Text numberOfLines={2} note>
                        4. Enjoy
                    </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,

    },
});
