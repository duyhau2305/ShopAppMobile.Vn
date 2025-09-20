import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import IMAGES from '../../assets/images'
import { LIST_UTILITY_APP } from '../../utils/utility'
import TextDisplay from '../TextDisplay'
import sty from '../../themes/sty'
import TextComponent from '../TextComponent/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { appColors } from '../../constants/appColors'
import { useNavigation } from '@react-navigation/native'
import { HOME_ROUTES, ROOT_ROUTES } from '../../routes'

interface UtilityAppComponentProps {
  onPress: (routeKey: string) => void
  utilityApp: any[]
  title?: string
  stylesProps?: StyleProp<ViewStyle>
  itemRow?: number
  gap?: number
}

const UtilityAppComponent = (props: UtilityAppComponentProps) => {
  const { onPress, utilityApp, title, stylesProps, itemRow, gap } = props
  // const utilityApp = LIST_UTILITY_APP
  const navigate = useNavigation<any>();

  // Chia dữ liệu thành các nhóm 4 items
  const chunkArray = (array: any[], chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const groupedItems = chunkArray(utilityApp, itemRow ?? 4)

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        sty.flex_1, 
        sty.itemsCenter, 
        sty.justifyStart,
        sty.py_4,
       
        {
          minHeight: 60, // Cố định chiều cao tối thiểu
        }
      ]}
      onPress={() => {
        // Handle navigation here
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.PRODUCT,
        })
      }}
    >
      
      <View style={[
        sty.w_40, 
        sty.h_40, 
        sty.mb_4,
        
        sty.itemsCenter,
        sty.justifyCenter
      ]}>
        <Image source={item.icon} style={[sty.w_40, sty.h_40]} resizeMode="contain" />
      </View>
      
      {/* Container cho text với chiều cao cố định */}
      <View style={[
        sty.flex_1,
        sty.justifyStart,
        sty.itemsCenter,
        { minHeight: 32 } // Chiều cao tối thiểu cho text
      ]}>
        <TextComponent 
          text={item.name} 
          font={fontFamilies.medium} 
          size={12} 
          color={appColors.text}
          styles={{ 
            textAlign: 'center',
            lineHeight: 16,
            flexWrap: 'wrap'
          }}
          numberOfLine={2}
        />
      </View>
    </TouchableOpacity>
  )

  const renderRow = ({ item }: { item: any[] }) => (
    <View style={[sty.flexRow, {gap: gap ?? 12}]}>
      {item.map((utilityItem) => (
        <View key={utilityItem.id} style={[sty.flex_1]}>
          {renderItem({ item: utilityItem })}
        </View>
      ))}
      {/* Fill remaining spaces if row has less than 4 items */}
      {Array.from({ length: itemRow! - item.length }).map((_, index) => (
        <View key={`empty-${index}`} style={[sty.flex_1]} />
      ))}
    </View>
  )

  return (
    <View style={stylesProps}>
         {title ? (
          <View style={styles.title}>
            <View style={styles.titleIcon} >
            </View>
             <TextComponent text={title} font={fontFamilies.semiBold} size={16}  />           
          
          </View>
         ) : (<View style={[sty.flexRow, sty.gap_16, sty.justifyBetween]}>
                    <TextComponent text='Utility App' font={fontFamilies.semiBold} />
                  <View style={[sty.flexRow, sty.gap_4, sty.itemsCenter]}>
                    <TextComponent text='View All' font={fontFamilies.semiBold} color={appColors.primary} />
                    <Image source={IMAGES.HOME.icon_arrow_right} style={[sty.w_16, sty.h_16]} />
                  </View>
                </View>) }
      
      <FlatList
        data={groupedItems}
        renderItem={renderRow}
        keyExtractor={(item, index) => `row-${index}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[sty.mt_16]}
      />
    </View>
  )
}

export default UtilityAppComponent      
const styles = StyleSheet.create({
  title: {      
    borderLeftColor: appColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    
  },
  titleIcon: {
    width: 4,
    minHeight: 26,
    borderRadius: 4,     
    backgroundColor: appColors.primary,
  },
})