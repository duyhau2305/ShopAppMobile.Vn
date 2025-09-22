import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ProductData } from "../../../interfaces/Product/product";
import { formatCash } from "../../../utils/utility";
import { fontFamilies } from "../../../constants/fontFamilies";
import { appColors } from "../../../constants/appColors";
import sty from "../../../themes/sty";
interface ProductListProps {
  data: ProductData[]
  isFetching: boolean
  onLoadMore?: () => void
  isLoadingMore?: boolean
}
interface ProductItemProps {
  item: ProductData
}
const ProductItem = ({ item }: ProductItemProps) => (
    console.log('item', item),
  <TouchableOpacity
    style={{
      backgroundColor: "#fff",
      borderRadius: 12,
      marginVertical: 6,
      paddingVertical: 12,        
      paddingHorizontal: 6,
      borderWidth: 1,
      borderColor: item.products?.status === 1 ? appColors.active : appColors.inactive,
      flexDirection: "row",   
      boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
    }}
  >
    <Image
      source={{ uri: item.products?.images[0] }}
      style={{ width: 44, height: 44, borderRadius: 8, position: "relative", marginRight: 10 }}
    /> 
    {/* <View style={{ width: 12, position: "absolute", left: 45, bottom: 18, height: 12, borderRadius: 100, backgroundColor: item.products?.status === 1 ? appColors.active : appColors.inactive }} /> */}
    <View style={{ flex: 1,gap:4 }}>
        <View style={{ flexDirection: "row",gap: 4 ,width: "100%"}}>
            <Text style={{ fontWeight: "500", fontSize: 14 ,width: "70%"}}>{item.products?.name}</Text>
            <Text style={{ fontWeight: "500", fontSize: 14,width: "30%"}}>
             {item.product_unit?.units?.name && item.product_unit.units.name.trim() !== '' && (
              <Text style={{ color: appColors.primary }}>
                ({item.product_unit.units.name}{item?.product_attribute?.attribute_value ? `, ${item.product_attribute.attribute_value}` : ''})
              </Text>
            )}
             </Text> 
        </View>   
     
      <View style={{ flexDirection: "row",alignItems: "center",gap: 4 }}>
        <Text style={{ fontSize: 13, color: "#535862" }}>Tồn kho: {item.on_hand}</Text>
        <View style={[sty.w_4,sty.h_4,{backgroundColor: "#C3CAD7"},sty.rounded_full]}> </View>
        <Text style={{ fontSize: 12, color: appColors.gray2 }}>{item.products?.product_code}</Text>
      </View>
      <Text style={{ fontWeight: "600", fontSize: 14 }}>
        {formatCash(item.product_unit?.price as unknown as number)} đ
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ProductListScreen({data, isFetching, onLoadMore, isLoadingMore}: ProductListProps) {
  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#1354D4" />
          <Text style={{ marginTop: 8, color: '#666' }}>Đang tải thêm...</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductItem item={item} />}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
}
