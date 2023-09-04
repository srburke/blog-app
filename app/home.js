import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, Modal, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import axios from 'axios';
import { COLORS, icons, images, SIZES, FONT } from "../constants";
import {
    ScreenHeaderBtn,
    Welcome,
    AddPost,
} from "../components";

import { Posts } from '../components';


const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [blogPost, setBlogPost] = useState([]);
    const [users, setUsers] = useState([]);
    const [activePostType, setActivePostType] = useState('news');


    useEffect(() => {
        axios
            .get("https://my-json-server.typicode.com/srburke/blog/users")
            .then((response) => {
                setUsers(response.data);
                console.log("Succesfull GET users");
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/srburke/blog/posts")
            .then((response) => {
                setBlogPost(response.data);
            })
            .catch((error) => console.log(error));
    }, []);


    const postData = async (post) => {
        var id = 1;

        if (blogPost && blogPost.length > 0) {
            id =
                Math.max.apply(
                    Math,
                    blogPost.map(function (o) {
                        return o.id;
                    })
                ) + 1;
        }

        const newPost = {
            id,
            userId: post.selectedUser,
            title: post.title,
            body: post.body,
            cat: post.cat
        };

        axios
            .post("https://my-json-server.typicode.com/srburke/blog/posts", {
                newPost
            })
            .then((response) => {
                console.log(response.data);

                setBlogPost([...blogPost, newPost]);
                console.log("Successful Post");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const username = (post) => {
        // const username = users.find((user) => user.id === post.userId)
        // does not work since userId becomes a string upon newPost, ( selectedUser: "2")
        // convert userId from post obj to an integer using parseInt()
        // so that find() performs correctly and retrieve's
        // the selected users name from the now extracted (int) userId
        var userId = parseInt(post.userId, 5);
        return users.find((user) => user.id === userId).name;
    };

    const filteredPosts = blogPost.filter((post) => {
        return post.cat === activePostType;
    });

    const postList = filteredPosts.map((post) => {
        return (
            <View key={post.id}>
                <View style={{ width: "100%", flex: 1, flexDirection: "row", paddingTop: 15 }}>
                    <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium, paddingLeft: 5, paddingTop: 5 }} >{username(post)}</Text>
                    <Text style={{ paddingLeft: 10, paddingTop: 5 }}>•</Text>
                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.small, paddingLeft: 5, paddingTop: 8 }} > {post.cat}</Text>
                </View>
                <View style={{ paddingLeft: 45 }}>
                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>{post.title}</Text>
                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.medium, marginBottom: 15 }}>{post.body}</Text>
                </View>
            </View >


        )
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                    ),
                    headerRight: () => (
                        <AddPost addPost={postData} username={username} users={users} />
                    ),
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >

                    <Welcome setActivePostType={setActivePostType} activePostType={activePostType} />
                    <Posts postList={postList} />


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;