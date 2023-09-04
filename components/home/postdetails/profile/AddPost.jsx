import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Picker, Button, Modal, Pressable } from 'react-native';
import { COLORS, icons, images, SIZES, FONT } from "../../../../constants";
import styles from './addpost.style';

const postTypes = ["news", "sports", "entertainment"];

const UserProfile = ({ addPost, username, blogPost, users }) => {
    const [selectedUser, setSelectedUser] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cat, setSelectedCat] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = () => {
        if (!title || !body || !selectedUser || !cat) {
            alert("please includ text or type user name if you haven't");
            return;
        }

        addPost({ selectedUser, title, body, cat });
        setSelectedUser("");
        setTitle("");
        setBody("");
        setSelectedCat("");
    };
    return (

        <View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View style={styles.modalView}>
                        <Pressable style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ display: "flex", marginLeft: 250 }}>Close</Text>
                        </Pressable>
                        <Text style={styles.modalText}>Add Post</Text>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            {/* <Picker
                                selectedValue={selectedUser}
                                style={{ width: 200, marginBottom: 20 }}
                                onValueChange={(itemValue) => setSelectedUser(itemValue)}
                            >
                                <Picker.Item label="Select the user" value="" />
                                {users.map((user) => (
                                    <Picker.Item key={user.id} label={`${user.id} - ${user.name}`} value={user.id} />
                                ))}
                            </Picker> */}


                            <TextInput
                                placeholder="Category"
                                value={cat}
                                onChangeText={(text) => setSelectedCat(text)}
                                style={{ width: 200, marginBottom: 20, padding: 10, borderColor: "gray", borderWidth: 1 }}
                            />


                            <TextInput
                                placeholder="Blog Title"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                style={{ width: 200, marginBottom: 20, padding: 10, borderColor: "gray", borderWidth: 1 }}
                            />
                            <TextInput
                                placeholder="Blog Post"
                                value={body}
                                onChangeText={(text) => setBody(text)}
                                multiline
                                numberOfLines={4}
                                style={{ width: 200, marginBottom: 20, padding: 10, borderColor: "gray", borderWidth: 1 }}
                            />
                            <Button title="Post" style={{ borderRadius: "30px" }} onPress={onSubmit} />
                        </View>

                    </View>
                </View>
            </Modal>
            <Pressable
                style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
                onPress={() => setModalVisible(true)}>
                <Image
                    source={icons.plusCircleFill}
                    resizeMode='cover'

                // style={{ width: "18px", height: "18px" }}
                />
            </Pressable>


        </View>
    );

}

export default UserProfile;