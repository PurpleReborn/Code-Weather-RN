import {StyleSheet} from 'react-native';
import React from 'react';
import {Row, Text, View} from 'native-base';
import colors from '../../theme/colors';

const DetailInfo = ({text, align}: {text: string; align?: any}) => {
  return (
    <Text fontSize={'14px'} textAlign={align} flex={1} color={colors.white}>
      {text}
    </Text>
  );
};

const ItemInfo = ({data}: {data: any}) => {
  const temp = data?.main?.temp;
  const windSpeed = data?.wind?.speed;
  const pressure = data?.main?.pressure;
  const humidity = data?.main?.humidity;
  const visibility = data?.visibility / 1000;
  const dewPoint = Math.round(temp - (100 - humidity) / 5);
  return (
    <View alignItems={'center'} pt={'40px'}>
      <View
        borderRadius={'8px'}
        p={'14px'}
        bgColor={'rgba(255, 255, 255, 0.2)'}>
        <Row w={'100%'} space={'5px'}>
          <DetailInfo text={`Wind: ${windSpeed}m/s`} />
          <DetailInfo text={`Humidity: ${humidity}%`} align="center" />
          <DetailInfo text={'UV index: 0.0'} align="right" />
        </Row>
        <Row pt={'20px'} w={'100%'} space={'14px'}>
          <DetailInfo text={`Pressure: ${pressure}hPa`} />
          <DetailInfo text={`Visibility: ${visibility}km`} align="center" />
          <DetailInfo text={`Dew point: ${dewPoint}°C`} align="right" />
        </Row>
      </View>
    </View>
  );
};

export default ItemInfo;

const styles = StyleSheet.create({});
