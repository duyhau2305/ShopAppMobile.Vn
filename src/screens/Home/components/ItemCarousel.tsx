import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AdvertiseParams} from '../../../interfaces/advertise';
import {TextDisplay} from '../../../components';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';

interface ItemCarouselProps {
  data: AdvertiseParams;
}

const ItemCarousel = ({data}: ItemCarouselProps) => {
  const [avatarError, setImgError] = useState<boolean>(false);
  return (
    <TouchableOpacity key={data?.id} style={sty.gap_8} activeOpacity={1}>
      <Image
        source={avatarError ? IMAGES.COMMON.no_data : {uri: data?.image}}
        style={styles.SwiperImage}
        onError={() => setImgError(true)}
      />
      <TextDisplay text={data?.title} fontWeight="semibold" numberOfLines={2} />
    </TouchableOpacity>
  );
};

export default ItemCarousel;

const styles = StyleSheet.create({
  SwiperImage: {
    height: 300,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 12,
  },
});
