import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {LoadingTable} from '../../../components';
import sty from '../../../themes/sty';
import {getListAdvertiseAPI} from '../../../apis/advertise';
import {handleErrorMessage} from '../../../utils/helpers';
import {AdvertiseParams} from '../../../interfaces/advertise';
import ItemCarousel from './ItemCarousel';

const {width} = Dimensions.get('window');

const CarouselHome = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [listAdvertise, setListAdvertise] = useState<AdvertiseParams[]>([]);

  const handleGetListAdvertise = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListAdvertiseAPI();
      setListAdvertise(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    handleGetListAdvertise();
  }, [handleGetListAdvertise]);
  return (
    <TouchableOpacity activeOpacity={1}>
      {listAdvertise?.length > 0 && (
        <>
          <Carousel
            loop
            width={width - 32}
            height={360}
            style={sty.w_full}
            data={listAdvertise}
            scrollAnimationDuration={1000}
            modeConfig={{
              stackInterval: 20,
            }}
            autoPlayInterval={5000}
            autoPlay
            pagingEnabled={true}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({item}) => <ItemCarousel key={item?.id} data={item} />}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={[sty.flexRow, sty.justifyCenter]}>
            {listAdvertise.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.Dot,
                 { backgroundColor: currentIndex === index ? "#1354D4" : "#ccc" }
,
                ]}
              />
            ))}
          </TouchableOpacity>
        </>
      )}
      {loading && <LoadingTable />}
    </TouchableOpacity>
  );
};

export default CarouselHome;

const styles = StyleSheet.create({
  Dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
