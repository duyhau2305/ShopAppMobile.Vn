import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonAddFloat,
  LoadingTable,
  ButtonLoadMore,
  TextDisplay,
  InputSearch,
  ListFilterContent,
} from '../../components';
import sty from '../../themes/sty';
import OffItem from './components/OffItem';
import {useNavigation} from '@react-navigation/native';
import {ROOT_ROUTES, TAKE_OFF_ROUTES} from '../../routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import NoData from '../../components/NoData';
import {getListTakeOffAPI} from '../../apis/takeOff';
import {
  setListTakeOff,
  setPaginationTakeOff,
} from '../../redux/slices/takeOffSlice';
import {handleErrorMessage} from '../../utils/helpers';
import {useDebounce} from '../../hooks';
import IMAGES from '../../assets/images';
import BottomSheet from '@gorhom/bottom-sheet';
import stylesComponent from '../../themes/styComponents';
import FilterListTakeOff from './components/FilterListTakeOff';
import {LIST_STATUS_TAKE_OFF, LIST_TYPE_TAKE_OFF} from '../../common/constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const TakeOff = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const {listTakeOff, pagination, filter} = useAppSelector(
    state => state.takeOff,
  );
  const sheetFilterRef = useRef<BottomSheet>(null);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 250);

  const handleGetListTakeOff = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListTakeOffAPI({
        page: 1,
        search: searchDebounce,
        type: filter?.type,
        status: filter?.status,
      });
      dispatch(setListTakeOff(res?.data?.data));
      dispatch(setPaginationTakeOff(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [dispatch, filter?.status, filter?.type, searchDebounce]);

  useEffect(() => {
    handleGetListTakeOff();
  }, [handleGetListTakeOff]);

  const handleLoadMoreListTakeOff = async () => {
    try {
      setLoading(true);
      const res = await getListTakeOffAPI({
        page: pagination?.current_page + 1,
        search: searchDebounce,
        type: filter?.type,
        status: filter?.status,
      });
      dispatch(setListTakeOff([...listTakeOff, ...res?.data?.data]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetListTakeOff();
    setRefreshing(false);
  };

  const totalFilter = () => {
    let total = 0;
    if (search) {
      total = total + 1;
    }
    if (filter?.status) {
      total = total + 1;
    }
    if (filter?.type) {
      total = total + 1;
    }
    return total;
  };

  return (
    <GradientBackground>
      <HeaderBack
        title="Xin nghỉ"
        RightIcon={
          <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
            <TouchableOpacity
              onPress={() => setShowSearch(state => !state)}
              style={[sty.p_8, sty.bg_white, sty.rounded_full]}>
              <Image
                style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
                source={IMAGES.COMMON.icon_search}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sheetFilterRef?.current?.expand()}
              style={[
                sty.bg_white,
                sty.rounded_full,
                sty.p_8,
                sty.itemsCenter,
                sty.justifyCenter,
              ]}>
              <Image
                style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
                source={IMAGES.COMMON.icon_filter}
              />
              {!!totalFilter() && (
                <View style={stylesComponent.BadgeFilter}>
                  <TextDisplay
                    color="#fff"
                    text={totalFilter()}
                    fontSize={12}
                    lineHeight={20}
                    fontWeight="semibold"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        }
      />
      {showSearch && (
        <View>
          <InputSearch
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
        </View>
      )}
      <ListFilterContent
        sheetFilterRef={sheetFilterRef}
        listFilter={[
          LIST_TYPE_TAKE_OFF?.find(item => item?.type === filter?.type)
            ?.label || 'Tất cả loại yêu cầu',
          LIST_STATUS_TAKE_OFF?.find(item => item?.status === filter?.status)
            ?.label || 'Tất cả trạng thái',
        ]}
      />
      <DividerCustom styles={sty.mt_12} />
      <KeyboardAvoidingView
        style={sty.flex_1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={sty.flex_1}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#1354D4"
                colors={['#1354D4']}
              />
            }
            contentContainerStyle={[
              sty.p_16,
              sty.gap_12,
              {paddingBottom: insets.bottom + tabBarHeight + 80},
            ]}
            showsVerticalScrollIndicator={false}>
            {listTakeOff?.length > 0 ? (
              listTakeOff?.map(data => <OffItem key={data?.id} data={data} />)
            ) : (
              <NoData />
            )}
            {pagination?.current_page < pagination?.last_page && (
              <ButtonLoadMore onPress={handleLoadMoreListTakeOff} />
            )}
            {loading && <LoadingTable />}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ButtonAddFloat
        onPress={() =>
          navigate.navigate(ROOT_ROUTES.TAKE_OFF_STACK, {
            screen: TAKE_OFF_ROUTES.ADD_TAKE_OFF,
            params: {
              handleGetListTakeOff,
            },
          })
        }
      />
      <FilterListTakeOff sheetRef={sheetFilterRef} />
    </GradientBackground>
  );
};

export default TakeOff;
