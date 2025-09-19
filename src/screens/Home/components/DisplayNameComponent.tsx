import React from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import TextComponent from '../../../components/TextComponent/TextComponent'
import sty from '../../../themes/sty'
import { fontFamilies } from '../../../constants/fontFamilies'
import { appColors } from '../../../constants/appColors'
import IMAGES from '../../../assets/images'
import IMAGES_HOME from '../../../assets/images/HOME'
import { BOTTOM_TAB_ROUTES, ROOT_ROUTES } from '../../../routes'
import { useNavigation } from '@react-navigation/native'
import { PROFILE_ROUTES } from '../../../routes'

const DisplayNameComponent = () => {
  const navigate = useNavigation<any>();
  const handleEdit = () => {
    navigate.navigate(BOTTOM_TAB_ROUTES.PROFILE, {
      
      
    })
  }
  return (

      
    <View style={[  sty.flexRow, sty.rounded_24,{backgroundColor: "#3683F7"}]}>
       <ImageBackground source={IMAGES_HOME.background_display_name} style={[sty.flex_1]}  resizeMode='cover'>
          <View style={[sty.flexRow, sty.justifyBetween,sty.itemsCenter,styles.container]}>
              <View  style={[sty.flexRow, ]}>
                      <View   style={styles.AvatarContainer}>
                          <View>
                          <Image
                              source={IMAGES_HOME.icon_display_name}
                              style={styles.Avatar}
                          
                          />
                          </View>
                      </View>
                      <View   style={[sty.flexCol,sty.gap_4,sty.ml_16]}>
                          <TextComponent text="Nguyễn Văn A" color={appColors.white} font={fontFamilies.medium} size={16} /> 
                          <View style={styles.infor}>
                          <TextComponent text="Nhân viên bán hàng" color={appColors.primary} font={fontFamilies.bold} size={16} />
                          </View>

                          
                      </View>
              
              </View>
              <TouchableOpacity onPress={handleEdit} style={styles.editContainer}>  <Image source={IMAGES.COMMON.icon_edit}  style={styles.edit} />
              </TouchableOpacity>

        </View>
       </ImageBackground>
        
       
    </View>
    
  
  )
}

export default DisplayNameComponent
const styles = StyleSheet.create({
    BackgroundDisplayName: {
        width: 'auto',
        height: '12%',
        objectFit: 'cover',
    
      
    },
    LogoApp: {
      height: 36,
      width: 36,
      objectFit: 'scale-down',
    },
    Notification: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    NotificationBagde: {
      borderColor: '#fff',
      backgroundColor: '#FF4D4F',
      borderWidth: 1,
      borderRadius: 8,
      position: 'absolute',
      right: -8,
      top: -8,
      paddingHorizontal: 4,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Avatar: {
      width: 48,
      height: 48,
      objectFit: 'cover',
      borderWidth: 3,
      borderColor: '#1354D4',
      borderRadius: 9999,
    },
    editContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: 20,
       
    },
    edit: {
      width: 16,
      height: 16,
      objectFit: 'cover',
      
    },
    AvatarContainer: {
      width: 54 ,
      height: 54,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#FFFF',
    },
    infor: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#FFFF',
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
  });
  