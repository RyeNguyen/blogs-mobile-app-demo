import React, {useContext} from 'react';
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {Context as blogContext} from "../context/BlogContext";
import {EvilIcons} from "@expo/vector-icons";

const ShowScreen = ({navigation}) => {
    const {state} = useContext(blogContext);

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'));

    if (!blogPost) return null;

    return <>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
    </>
}

ShowScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
                <EvilIcons name="pencil" size={30}/>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({});

export default ShowScreen;