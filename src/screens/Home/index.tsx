import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeatherData} from '../../redux/actions/weather';
import {Row, Text, View} from 'native-base';
import ItemWeather from '../../components/ItemWeather.tsx';
import colors from '../../theme/colors';
import ItemInfo from '../../components/ItemInfo.tsx';
import SearchPng from '../../assets/search.png';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector((state: any) => state.weather);
  const weatherIcon = data?.weather[0]?.icon;
  const [loc, setLoc] = useState<string>('Bandung');

  const handleInputChange = (value: string) => {
    setLoc(value);
  };

  useEffect(() => {
    dispatch(fetchWeatherData(loc));
  }, [dispatch]);

  if (loading) {
    return (
      <View justifyContent={'center'} style={styles.container}>
        <Text color={colors.white}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View justifyContent={'center'} style={styles.container}>
        <Text color={colors.white}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View px={'14px'} py={'20px'} style={styles.container}>
      <Row pb={'40px'} alignItems={'center'}>
        <Image source={SearchPng} style={styles.searchIcon} />
        <TextInput
          value={loc}
          onChangeText={handleInputChange}
          onSubmitEditing={() => dispatch(fetchWeatherData(loc))}
          placeholder="Enter location"
          style={styles.input}
        />
      </Row>
      <ItemWeather weatherIcon={weatherIcon} data={data} />
      <ItemInfo data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  searchIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 5,
  },
  input: {
    color: colors.white,
    fontSize: 22,
  },
});

export default HomeScreen;
