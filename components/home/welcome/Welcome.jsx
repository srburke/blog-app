
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const postTypes = ["news", "sports", "entertainment"];

const Welcome = ({ setActivePostType, activePostType, getPosts }) => {
    const router = useRouter();
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeMessage}>Find posts</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onChange={() => { }}
                        placeholder='Search for posts'
                        placeholderTextColor="black"
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                    <Image
                        source={icons.search}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList
                    data={postTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.tab(activePostType, item)}
                            onPress={() => {
                                setActivePostType(item);
                                console.log(item);

                            }}>
                            <Text style={styles.tabText(activePostType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal

                />
            </View>



        </View >
    )
}

export default Welcome;