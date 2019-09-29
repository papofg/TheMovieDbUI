import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import {
    List,
    ListItem,
    Thumbnail,
    Icon,
    Left,
    Right,
    Body,
    Text,
    Button
  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import HttpManager from './HttpManager';

export default class MovieDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            creditlist: '',
            'apiLanguage': '',
            'apiKey': ''
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem('apiKey').then((value) => this.setState({ 'apiKey': value }));
        AsyncStorage.getItem('apiLanguage').then((value) => this.setState({ 'apiLanguage': value }));


        /*   
        
        https://api.themoviedb.org/3/movie/top_rated?api_key=af902e5636e75a8d41d38f847a7f151f&language=es-ES 
        
        https://api.themoviedb.org/3/movie/2503/credits?api_key=af902e5636e75a8d41d38f847a7f151f&language=es-ES
        
        */
    }
    loadCreditList = (dataMovie) => {
        const baseUrl = "https://api.themoviedb.org/3/movie/" + dataMovie.id + '/credits?api_key='+this.state.apiKey+'&language='+this.state.apiLanguage;
        console.log("CARGANDO URL-->"+ baseUrl);
        new HttpManager().getDataFromURL(baseUrl)
            .then((data) => {
                this.setState({
                    creditlist : data,
                    loading: false
                })
            });
    }
    generateCredits = () => {
        let credits = '';
        if(this.state.creditlist != '')
        {
            for(let i = 0; i < 10 && i < this.state.creditlist.cast.length; i++)
            {
                if (credits != '') credits += ', ';
                credits += this.state.creditlist.cast[i].name;
            }
        }
        return (
            <Text style={{ fontSize: 14 }}>{credits}</Text>
        );
    }
    render() {

        const dataMovie = this.props.navigation.getParam('movie', null);
        const baseWidth = 92, baseHeight = 138;
        const baseUrl = "http://image.tmdb.org/t/p/w" + baseWidth.toString();

        if(dataMovie != null && this.state.apiKey != '' && this.state.apiLanguage != '' && this.state.apiKey != null && this.state.apiLanguage != null && this.state.loading)
        {
            this.loadCreditList(dataMovie);
        }

        return (
            <React.Fragment>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "center", margin: 0, padding: 0, paddingTop: 10 }}>
                        <Left style={{ width: baseWidth, height: baseHeight + 20,alignItems: 'center' }}>
                            <Thumbnail square source={{ uri: baseUrl + dataMovie.poster_path }} style={{ width: baseWidth, height: baseHeight }} />
                            <Text>
                                {dataMovie.vote_average}
                            </Text>
                        </Left>
                        <Body>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 23 }}>
                                    {dataMovie.title}
                                </Text>
                                {this.generateCredits()}
                                <Text>
                                    {dataMovie.release_date}
                                </Text>

                            </View>
                        </Body>
                    </View>
                    <View style={{ margin: 0, padding: 20 }}>
                        <Text numberOfLines={15} note>
                            {dataMovie.overview}
                        </Text>
                    </View>
                </View>
                
            </React.Fragment>

        )

    }
}

const styles = StyleSheet.create({
    MainContainer: {
        

    },
    
});