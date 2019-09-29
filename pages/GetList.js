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
import HttpManager from './HttpManager';

export default class GetList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movielist: '',
            loading: true,
            pageNumber: 1
        }
    }
    componentDidMount = () => {
    }
    goToViewMovieDetail = dataMovie => {
        this.props.navigation.navigate('Detail', { movie: dataMovie});

    }
    renderList = data => {
        const baseWidth = 92, baseHeight = 138;
        const baseUrl = "http://image.tmdb.org/t/p/w" + baseWidth.toString();
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", justifyContent: "center", margin: 0, padding: 0 }}>
                    {this.state.pageNumber - 5 >= 1 && <Button light style={{margin: 5}} onPress={() => this.previousPage(5)}>
                        <Text>-5</Text>
                    </Button> }
                    {this.state.pageNumber - 1 >= 1 && <Button light style={{margin: 5}} onPress={() => this.previousPage(1)}>
                        <Text>-1</Text>
                    </Button> }
                    <View style={{ justifyContent: "center" }}>
                        <Text>
                            Page {this.state.pageNumber} of {this.state.movielist.total_pages}
                        </Text>
                    </View>
                    {this.state.pageNumber + 1 < this.state.movielist.total_pages && <Button light style={{margin: 5}} onPress={() => this.nextPage(1)}>
                        <Text>+1</Text>
                    </Button> }
                    {this.state.pageNumber + 5 < this.state.movielist.total_pages && <Button light style={{margin: 5}} onPress={() => this.nextPage(5)}>
                        <Text>+5</Text>
                    </Button> }

                </View>
                <View style={{ margin: 0, padding: 0 }}>
                    <List style={{ margin: 0, padding: 0 }}
                        dataArray={data}
                        keyExtractor={item => item.id.toString()}
                        renderRow={item =>
                            <ListItem thumbnail onPress={() => this.goToViewMovieDetail(item)}>
                                <Left style={{ width: baseWidth, height: baseHeight + 5 }}>
                                    <Thumbnail square source={{ uri: baseUrl + item.poster_path }} style={{ width: baseWidth, height: baseHeight }} />
                                </Left>
                                <Body>
                                    <Text>
                                        {item.title}
                                    </Text>
                                    <Text numberOfLines={11} note>
                                        {item.overview}
                                    </Text>
                                </Body>
                            </ListItem>}
                    />
                </View>
            </React.Fragment>
        );
    }
    renderText = () => {
        return (
            <Text>Loading...</Text>
        );
    }
    loadPageList = () => {
        console.log("CARGANDO URL-->"+this.props.listName + "&page=" + this.state.pageNumber);
        new HttpManager().getDataFromURL(this.props.listName + "&page=" + this.state.pageNumber)
            .then((data) => {
                this.setState({
                    movielist : data,
                    loading: false
                })
            });
    }
    nextPage = (increment) => {
        if(this.state.pageNumber + increment < this.state.movielist.total_pages)
            this.setState({ loading: true , pageNumber: this.state.pageNumber+increment})
        else
            Alert.alert("No more pages than "+this.state.movielist.total_pages);
    }
    previousPage = (decrement) => {
        if(this.state.pageNumber - decrement >= 1)
            this.setState({ loading: true , pageNumber: this.state.pageNumber-decrement});
        else
            Alert.alert("No more pages");
    }
    render() {
        if(this.props.listName != '' && this.state.loading)
        {
            this.loadPageList();
        }
        return (
            <React.Fragment>
                <View>
                {this.state.loading ? this.renderText() : this.renderList(this.state.movielist.results)}
                </View>
                
            </React.Fragment>

        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        

    },
    
});