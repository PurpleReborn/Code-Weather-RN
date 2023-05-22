import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {Row, Text, View} from 'native-base';
import colors from '../../theme/colors';

const ItemWeather = ({weatherIcon, data}: {weatherIcon: any; data: any}) => {
  const temp = Math?.floor?.(data?.main?.temp);
  const description = data?.weather?.[0]?.description;
  const main = data?.weather?.[0]?.main;
  return (
    <View>
      <Row justifyContent={'center'} alignItems={'center'} space={'10px'}>
        {weatherIcon && (
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weatherIcon}.png`,
            }}
            style={styles.weatherIcon}
          />
        )}
        <View>
          <Text color={colors.white}>{description}</Text>
          <Text color={colors.white}>{main}</Text>
        </View>
      </Row>
      {data && (
        <View>
          <Text color={colors.white} textAlign={'center'} fontSize={'60px'}>
            {temp}°C
          </Text>
          <Text color={colors.white} textAlign={'center'}>
            Feels like {temp}°C
          </Text>
        </View>
      )}
    </View>
  );
};

export default ItemWeather;

const styles = StyleSheet.create({
  weatherIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});
