import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default async function (token) {
    const decoded = jwtDecode(token);
    for (const [key, val] of Object.entries(decoded)) {
        await AsyncStorage.setItem(key, val);
    }

    const first_name_ = await AsyncStorage.getItem('first_name');
    const last_name_ = await AsyncStorage.getItem('last_name');
    const birth_date_ = await AsyncStorage.getItem('birth_date');
    const email_ = await AsyncStorage.getItem('email');
    const username_ = await AsyncStorage.getItem('username');
    const height_ = await AsyncStorage.getItem('height');
    const weight_ = await AsyncStorage.getItem('weight');
    const profile_ = await AsyncStorage.getItem('profile');
    const slug_ = await AsyncStorage.getItem('slug');

};