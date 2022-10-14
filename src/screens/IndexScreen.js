import React, {useContext, useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Context as blogContext} from "../context/BlogContext";
import {EvilIcons} from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
    const {state, deleteBlogPost, getBlogPosts} = useContext(blogContext);

    useEffect(() => {
        getBlogPosts();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        }
    }, []);

    return <>
        <Button title='Add Post' onPress={() => navigation.navigate('Create')}/>
        <FlatList
            data={state}
            keyExtractor={post => post.id}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <EvilIcons style={styles.icon} name='trash'/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }}
        />
    </>
}

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <EvilIcons name="plus" size={30}/>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'rgba(17,64,232,0.58)'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 30
    }
});

export default IndexScreen;