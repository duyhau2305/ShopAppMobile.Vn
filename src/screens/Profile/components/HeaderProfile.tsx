import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {handleErrorMessage} from '../../../utils/helpers';
import {getTotalUnReadAPI} from '../../../apis/notification';
import {setTotalUnRead} from '../../../redux/slices/notificationSlice';
import { TextComponent } from '../../../components/index';
import { fontFamilies } from '../../../constants/fontFamilies';
import { appColors } from '../../../constants/appColors';

import IMAGES_HOME from '../../../assets/images/HOME';

const HeaderHome = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigate = useNavigation<any>();



  return (
    <View
      style={[
        sty.flexRow,
        sty.itemsCenter,
        sty.justifyBetween,
        sty.p_16,        
        {paddingTop: insets.top + 8},
        {backgroundColor: appColors.primary},
        styles.HeaderProfile,
        {minHeight: 120   }   
     
    
      ]}>         
              <View  style={[sty.flexRow, ]}>
                      <ImageBackground  source={IMAGES.COMMON.icon_gradient_border} style={styles.AvatarContainer}>                            
                          <View>
                          <Image
                              source={IMAGES_HOME.icon_display_name}
                              style={styles.Avatar}
                          
                          />
                          </View>
                      </ImageBackground>
                      <View   style={[sty.flexCol,sty.gap_4,sty.ml_16]}>
                          <TextComponent text="Nguyễn Văn A" color={appColors.white} font={fontFamilies.semiBold} size={16} /> 
                          <View style={styles.infor}>
                          <TextComponent text="Chi nhánh trung tâm" color={appColors.white} font={fontFamilies.regular} size={16} />
                          </View>

                          
                      </View>
              
              </View>
              <TouchableOpacity onPress={()=>{}} style={styles.editContainer}>  <Image source={IMAGES.COMMON.icon_edit_white}  style={styles.edit} />
              </TouchableOpacity>
  
    
       
      

    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
    HeaderProfile: {
        boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.08)',
    },
    AvatarContainer: {
        width: 50 ,
        height: 50,
        borderRadius: 50,
        position: 'relative',
 

      },
    Avatar: {
        width: 46,
        height: 46,
        objectFit: 'cover',
        borderWidth: 3,
        borderColor: '#1354D4',
        borderRadius: 9999,
        position: 'absolute',
        right: 2,
        top: 2,
      },
      editContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#018DFF',
          width: 38,
          height: 38,
          borderRadius: 50,       
         
      },
      edit: {
        width: 16,
        height: 16,
        objectFit: 'cover',
        
      },
    
      infor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,       
        marginTop: 3, 
        borderRadius: 10,
      },
      container: {
       
        paddingVertical: 16,
      },
});
