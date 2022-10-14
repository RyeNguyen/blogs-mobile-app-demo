import React, {useContext} from 'react';
import {StyleSheet} from "react-native";
import {Context as blogContext} from "../context/BlogContext";

import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({navigation}) => {
    const {state, editBlogPost} = useContext(blogContext);

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'));
    if (!blogPost) return null;

    return <BlogPostForm
        initialValues={{title: blogPost.title, content: blogPost.content}}
        onSubmit={(title, content) => {
            editBlogPost(blogPost.id, title, content, () => {
                navigation.pop();
            });
        }}/>
}

const styles = StyleSheet.create({});

export default EditScreen;