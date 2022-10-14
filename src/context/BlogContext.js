import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        // case 'add_blogpost':
        //     return [...state,
        //         {
        //             id: Math.floor(Math.random() * 99999),
        //             title: action.payload.title,
        //             content: action.payload.content
        //         }];
        case 'delete_blogpost':
            return state.filter(item => item.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return (blogPost.id === action.payload.id) ? action.payload : blogPost
            })
        default:
            return state;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        try {
            const response = await jsonServer.get('/blogposts');
            dispatch({type: 'get_blogposts', payload: response.data});
        } catch (err) {
            console.log(err);
        }
    }
}

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        try {
            await jsonServer.post('/blogposts', {title, content});
            //dispatch({type: 'add_blogpost', payload: response.data});
            if (callback) callback();
        } catch (err) {
            console.log(err);
        }
    }
}

const deleteBlogPost = dispatch => {
    return async id => {
        try {
            await jsonServer.delete(`/blogposts/${id}`);
            dispatch({type: 'delete_blogpost', payload: id});
        } catch (err) {
            console.log(err);
        }

    }
}

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        try {
            await jsonServer.put(`/blogposts/${id}`, {title, content});
            dispatch({type: 'edit_blogpost', payload: {id, title, content}});
            if (callback) callback();
        } catch (err) {
            console.log(err);
        }

    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost},
    []
);