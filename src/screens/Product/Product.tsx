import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    Text,
    
  } from 'react-native';
  import React, {useCallback} from 'react';
  import TextComponent from '../../components/TextComponent/TextComponent';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  import {
    GradientBackground,
    HeaderBack,
    DividerCustom,
    ButtonLoadMore,
  } from '../../components';
  import sty from '../../themes/sty';
  import {getListNotificationAPI} from '../../apis/notification';
  import {handleErrorMessage} from '../../utils/helpers';
  import {useAppDispatch, useAppSelector} from '../../redux/hooks';
  import {
    setListNotification,
    setPaginationNotification,
  } from '../../redux/slices/notificationSlice';
  
  import NoData from '../../components/NoData';
  import {useFocusEffect} from '@react-navigation/native';
import IMAGES from '../../assets/images';
import { fontFamilies } from '../../constants/fontFamilies';
  
  const Product = () => {
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const {listNotification, pagination} = useAppSelector(
      state => state.notification,
    );
  
    const handeGetListNotification = useCallback(async () => {
      try {
        const res = await getListNotificationAPI();
        dispatch(setListNotification(res?.data?.data));
        dispatch(setPaginationNotification(res?.data?.pagination));
      } catch (error) {
        handleErrorMessage(error);
      }
    }, [dispatch]);
  
    useFocusEffect(
      useCallback(() => {
        handeGetListNotification();
      }, [handeGetListNotification]),
    );
    const section = (
      <View style={[sty.flexRow, sty.itemsCenter, sty.justifyBetween]}>
        <View style={[sty.flexCol, sty.justifyStart, sty.gap_4]}>
            <TextComponent text="Tổng tồn" font={fontFamilies.medium} />
            <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                <TextComponent text="100" font={fontFamilies.semiBold} />
                <TextComponent text="hàng hoá" font={fontFamilies.regular} />
            </View>

        </View>
        <TextComponent text="Hàng Hóa" font={fontFamilies.semiBold} />
      </View>
    );
  
    return (
      <GradientBackground>
        <HeaderBack title="Hàng Hóa" style={styles.HeaderBack}        
            RightIcon={<Image source={IMAGES.COMMON.icon_search} style={[sty.w_20, sty.h_20, sty.objectScaleDown]}/>}
            RightIcon2={<Image source={IMAGES.COMMON.icon_filter} style={[sty.w_20, sty.h_20, sty.objectScaleDown]}/>}
            section={section}
         />
        <DividerCustom styles={sty.mt_12} />
        <KeyboardAvoidingView
          style={[sty.flex_1, sty.p_16,sty.bg_main]}    
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity
            style={sty.flex_1}
            activeOpacity={1}
            onPress={Keyboard.dismiss}>
            
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={[styles.footer]}>
           <View style={[sty.flexRow, sty.itemsCenter, sty.gap_24]}>
              <View style={[sty.flexCol, sty.justifyStart, sty.gap_4]}>              
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                    <View style={[sty.w_12, sty.h_12, sty.rounded_full,sty.mr_4, sty.bg_primary]} />
                    <TextComponent text="Còn hàng" font={fontFamilies.regular} size={14} />
                </View>
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4,sty.mt_4]}>
                    <View style={[sty.w_12, sty.h_12, sty.rounded_full,sty.mr_4, {backgroundColor: '#EDA215'}]} />
                    <TextComponent text="Dưới định mức tồn" font={fontFamilies.regular} size={14} />
                </View>
              </View>
              <View style={[sty.flexCol, sty.justifyStart, sty.gap_4]}>              
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                    <View style={[sty.w_12, sty.h_12, sty.rounded_full,sty.mr_4, {backgroundColor: '#D41313'}]} />
                    <TextComponent text="Hết hàng" font={fontFamilies.regular} size={14} />
                </View>
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4,sty.mt_4]}>
                    <View style={[sty.w_12, sty.h_12, sty.rounded_full,sty.mr_4, {backgroundColor: '#BB1BFF'}]} />
                    <TextComponent text="Vượt định mức tồn" font={fontFamilies.regular} size={14} />
                </View>
              </View>
           </View>
        </View>   
      </GradientBackground>
    );
  };
  
  export default Product;

  const styles = StyleSheet.create({
    HeaderBack: {
      
    },
    footer: {
      padding: 20,
      minHeight: 98,
    },
  });