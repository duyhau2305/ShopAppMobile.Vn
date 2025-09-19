import React from 'react'
import { StyleProp, TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import TextComponent from '../../../components/TextComponent/TextComponent'
import { globalStyles } from '../../../styles/globalStyles'
import { appColors } from '../../../constants/appColors'
import { fontFamilies } from '../../../constants/fontFamilies'
import { appInfor } from '../../../constants/appInfos'


interface ButtonComponentProps {
  icon?: React.ReactNode
  text: string
  type?: 'primary' | 'secondary' | 'outline' | 'link' | 'text'  
  color?: string 
  texFont?: string
  textColor?: string
  styles?: StyleProp<ViewStyle>
  textstyle?: StyleProp<TextStyle>
  onPress: () => void
  iconFlex?: 'right' | 'left'
  width?: number
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const { icon, text,  textColor,  onPress, iconFlex, color, textstyle, styles, type, width, texFont } = props
  return (

    type === 'primary' ? (
    <TouchableOpacity 
    onPress={onPress} style={[globalStyles.button, globalStyles.shadow, 
        {
            backgroundColor: color,
            width: width ?? appInfor.sizes.WIDTH*0.9,
            marginBottom: (styles as ViewStyle)?.marginBottom ?? 3,
            borderWidth: 1,
            borderColor: '#dbdfe5',
        },
     styles]}>
        {icon &&  icon}
      <TextComponent
       text={text} 
       color={textColor ?? appColors.white}
       font={texFont ?? fontFamilies.medium}
        
       styles={[textstyle as TextStyle, { marginLeft: icon ? 25 : 0 }]}
       flex={icon && iconFlex === 'right' ? 1 : 0}
        />
        {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
    
  ) : (
    <TouchableOpacity onPress={onPress} style={styles as ViewStyle}>
      <TextComponent
        text={text}
        color={color ?? (type === 'link' ? appColors.link : textColor)}
        styles={textstyle as TextStyle}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ))
}

export default ButtonComponent
