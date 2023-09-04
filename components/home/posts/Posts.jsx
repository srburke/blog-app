import { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './posts.style';
import { icons, SIZES } from '../../../constants';

const Posts = ({ postList }) => {
    return (
        <View>
            <View style={styles.container}>
                {postList}
            </View>
        </View >
    )
}

export default Posts;