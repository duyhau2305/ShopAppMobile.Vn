import { View, ImageBackground, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import sty from '../../../themes/sty'
import IMAGES_HOME from '../../../assets/images/HOME'
import { appColors } from '../../../constants/appColors'
import IMAGES from '../../../assets/images'
import { fontFamilies } from '../../../constants/fontFamilies'
import TextComponent from '../../../components/TextComponent/TextComponent'
import { GradientBackground } from '../../../components'
import LinearGradient from 'react-native-linear-gradient'

const DisplayTimeKeeping = () => {
  const [isCheckIn, setIsCheckIn] = useState<boolean>(false)
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false)
  const [timeCheckIn, setTimeCheckIn] = useState<string>('--:--')
  const [timeNowState, setTimeNowState] = useState<string>('')
  const [timeCheckOut, setTimeCheckOut] = useState<string>('--:--')
    
    //format datenow Thứ Hai, 26/09/2025
    const currentDate = new Date(); // Create a new Date object representing the current date and time
    const dateNow = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    //Lấy thứ trong ngày
    const day = currentDate.getDay()
    const dayName = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    const dayNameNow = dayName[day]
    
    // Hàm lấy thời gian hiện tại
    const getCurrentTime = () => {
      const now = new Date()
      return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
    }   
    //cập nhật thời gian mỗi 1 phút
    useEffect(() => {
      // Set initial time
      setTimeNowState(getCurrentTime())
      
      const interval = setInterval(() => {
        setTimeNowState(getCurrentTime())
      }, 10000) // 60000ms = 1 minute
      return () => clearInterval(interval)
    }, [])
   

    //nếu người dùng ấn check in thì set isCheckIn true và set isCheckOut false và set timeCheckIn là timeNow
    const handleCheckIn = () => {
      setIsCheckIn(true)
      setIsCheckOut(false)
      setTimeCheckIn(timeNowState)
    }
    const handleCheckOut = () => {
      setIsCheckIn(false)
      setIsCheckOut(true)
      setTimeCheckOut(timeNowState)
    }
    
  
  return (
    <View style={[  sty.flexRow, sty.rounded_24,{backgroundColor: "#FFFFFF"},styles.BackgroundTimeKeeping]}>
    <ImageBackground source={IMAGES_HOME.background_timekeeping} style={[sty.flex_1]}  resizeMode='cover'>
       <View style={[sty.flexRow, sty.justifyBetween,sty.itemsCenter,styles.container]}>
           <View  style={[sty.flexRow, ]}>
                   <View style={[sty.flexCol,sty.gap_4]} >
                       <View>                       
                        <TextComponent text={timeNowState} color={appColors.gray} font={fontFamilies.bold} size={36} styles={sty.lineHeight_48} />
                        <TextComponent text={dayNameNow + ', ' + dateNow} color={appColors.gray2} font={fontFamilies.medium} size={16} />
                      
                       </View>
                       <View style={[sty.flexRow,sty.gap_16,sty.itemsCenter,sty.justifyBetween,sty.mt_16]}>
                         <View style={[{flexDirection: 'column',gap: 4,alignItems: 'flex-start',marginRight: 10}]}>
                            <Image source={IMAGES.HOME.icon_clock} style={[{width: 24, height: 24},sty.objectScaleDown,]} />
                            <TextComponent text={timeCheckIn} color={appColors.green} font={fontFamilies.bold} size={16} styles={sty.mt_8} />
                            <TextComponent text="Check-in" color={appColors.gray2} font={fontFamilies.medium} size={16} />
                         </View>
                         <View style={[{flexDirection: 'column',gap: 4,alignItems: 'flex-start'}]}>
                          <Image source={IMAGES.HOME.icon_clock} style={[{width: 24, height: 24},sty.objectScaleDown,]} />
                          <TextComponent text={timeCheckOut} color={appColors.gray} font={fontFamilies.bold} size={16} styles={sty.mt_8} />
                          <TextComponent text="Check-out" color={appColors.gray2} font={fontFamilies.medium} size={16} />
                         </View>
                         
                       </View>
                       
                   
                   </View>
                   
           
           </View>
           <View style={styles.checkInOutContainer}>
              <TouchableOpacity style={styles.checkInOutButton} onPress={isCheckIn ? handleCheckOut : handleCheckIn} >
                <LinearGradient colors={["#FFFFFF", "#EEF2F9"]} 
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }} 
                  style={styles.checkInOutButtonContent} >
                <TouchableOpacity
                  
                  
                >
                  <TouchableOpacity onPress={isCheckIn ? handleCheckOut : handleCheckIn} style={[sty.flexCol,sty.itemsCenter,sty.gap_16]} >
                    <Image source={IMAGES.HOME.icon_click} style={[{width: 24, height: 24},sty.objectScaleDown,]} />
                    <TextComponent text={isCheckIn ? "Check-out" : "Check-in"} color={appColors.orange} font={fontFamilies.medium} size={16} />
                  </TouchableOpacity>
                </TouchableOpacity>    
                </LinearGradient>
              </TouchableOpacity>  
            
           </View>

     </View>
    </ImageBackground>
     
    
 </View>
  )
}

export default DisplayTimeKeeping
const styles = StyleSheet.create({ 
  checkInOutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF5E8',
    width: 134,
    height: 186,
    borderRadius: 16,
    padding: 7,
    borderWidth: 1,
    borderColor: '#FEEFD7',
  
    
  },
  checkInOutButton: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '100%',
    height: '100%', 
    padding: 6,      
    boxShadow: '58px 61px 23px 0 rgba(46, 56, 96, 0.00), 37px 39px 21px 0 rgba(46, 56, 96, 0.02), 21px 22px 18px 0 rgba(46, 56, 96, 0.06), 9px 10px 13px 0 rgba(46, 56, 96, 0.09), 2px 2px 7px 0 rgba(46, 56, 96, 0.11);',

  },    
  checkInOutButtonContent: {
    width: '100%',
    height: '100%',
    borderRadius: 14,   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFDFF',
  },  
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  BackgroundTimeKeeping: {
    minHeight: 120,
    borderRadius: 20,
    backgroundColor: '#FFF',    
    boxShadow: '0 1px 1px 0 rgba(60, 117, 174, 0.04), 0 3px 3px 0 rgba(60, 117, 174, 0.03), 0 6px 4px 0 rgba(60, 117, 174, 0.02), 0 11px 4px 0 rgba(60, 117, 174, 0.01), 0 24px 24px -12px rgba(60, 117, 174, 0.06)',
  },
});