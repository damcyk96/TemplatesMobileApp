import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem(
      '@storage_Key',
      typeof value === 'string' ? value : JSON.stringify(value),
    );
  } catch (error) {}
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue === null ? null : JSON.parse(jsonValue);
  } catch (error) {}
};

export default { getData, storeData };
