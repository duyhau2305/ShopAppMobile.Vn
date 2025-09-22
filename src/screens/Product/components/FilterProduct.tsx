import {   
    KeyboardAvoidingView,
    Platform, 
    TouchableOpacity,
    StyleSheet,
    Image,
    View,  
  } from 'react-native';
  import React, {useCallback, useEffect, useState} from 'react';
  import {TextComponent} from '../../../components';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  import {
    GradientBackground,
    HeaderBack,
    DividerCustom,
 
  } from '../../../components';
import sty from '../../../themes/sty';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import NoData from '../../../components/NoData';
import IMAGES from '../../../assets/images';
import { fontFamilies } from '../../../constants/fontFamilies';
import { fetchFilterProduct } from '../../../redux/slices/productSlice';
import ProductList from './ProductList';

  
  const Product = () => {
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const {pagination, result, total_stock_by_product,isFetching} = useAppSelector(
      state => state.product,
    );
  // fetch filter product
  useEffect(() => {
    dispatch(fetchFilterProduct({
      page: page,
      limit: limit,
    }));
  }, [dispatch, page, limit ]);

  // Handle load more function
  const handleLoadMore = useCallback(() => {
    if (!isFetching && !isLoadingMore && result && result.length > 0) {
      setIsLoadingMore(true);
      setLimit(prevLimit => prevLimit + 10);
    }
  }, [isFetching, isLoadingMore, result]);

  // Reset loading more state when data is fetched
  useEffect(() => {
    if (!isFetching && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isFetching, isLoadingMore]);

 
   
    
    const section = (
      <View style={[sty.flexRow, sty.itemsCenter, sty.justifyBetween]}>
        <View style={[sty.flexCol, sty.justifyStart, sty.gap_4]}>
            <TextComponent text="Tổng tồn" font={fontFamilies.medium} />
            <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                <TextComponent text={total_stock_by_product?.total_items_product ?? "0"} font={fontFamilies.semiBold} />
                <TextComponent text="hàng hoá" font={fontFamilies.regular} />
            </View>

        </View>
        <TextComponent text={total_stock_by_product?.total_onhand ?? "0"} font={fontFamilies.semiBold} />
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
            
              {result?.length > 0 ? (
                <ProductList 
                  data={result} 
                  isFetching={isFetching} 
                  onLoadMore={handleLoadMore}
                  isLoadingMore={isLoadingMore}
                />
              ) : (
                <NoData />
              )}
         
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                backgroundColor: "#1354D4",
                width: 50,
                height: 50,
                borderRadius: 40,
                boxShadow: "4px 4px 10px 0 rgba(19, 84, 212, 0.40);",
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
              }}
              onPress={() => console.log("Thêm sản phẩm")}
            >
           <Image source={IMAGES.COMMON.icon_button_add_float} style={[sty.w_32, sty.h_32, sty.objectScaleDown]}/>
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