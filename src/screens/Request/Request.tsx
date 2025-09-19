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
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDebounce} from '../../hooks';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import IMAGES from '../../assets/images';
import {
  GradientBackground,
  HeaderBack,
  InputSearch,
  DividerCustom,
  ButtonLoadMore,
  LoadingTable,
} from '../../components';
import NoData from '../../components/NoData';
import sty from '../../themes/sty';
import {handleErrorMessage} from '../../utils/helpers';
import RequestItem from './components/RequestItem';
import {getListRequestAPI} from '../../apis/request';
import {
  setListRequest,
  setPaginationRequest,
} from '../../redux/slices/requestSlice';

const Request = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {listRequest, pagination} = useAppSelector(state => state.request);
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 250);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetListRequest = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListRequestAPI({
        page: 1,
        search: searchDebounce,
      });
      dispatch(setListRequest(res?.data?.data));
      dispatch(setPaginationRequest(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [dispatch, searchDebounce]);

  useEffect(() => {
    handleGetListRequest();
  }, [handleGetListRequest]);

  const handleLoadMoreListRequest = async () => {
    try {
      setLoading(true);
      const res = await getListRequestAPI({
        page: pagination?.current_page + 1,
        search: searchDebounce,
      });
      dispatch(setListRequest([...listRequest, ...res?.data?.data]));
      dispatch(setPaginationRequest(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetListRequest();
    setRefreshing(false);
  };

  return (
    <GradientBackground>
      <HeaderBack
        title="Danh sách đơn yêu cầu"
        RightIcon={
          <TouchableOpacity
            onPress={() => setShowSearch(state => !state)}
            style={[sty.p_8, sty.bg_white, sty.rounded_full]}>
            <Image
              style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
              source={IMAGES.COMMON.icon_search}
            />
          </TouchableOpacity>
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
              {paddingBottom: insets.bottom + 80},
            ]}
            showsVerticalScrollIndicator={false}>
            {listRequest?.length > 0 ? (
              listRequest?.map(data => (
                <RequestItem handleGetListRequest={handleGetListRequest} data={data} key={data?.id} />
              ))
            ) : (
              <NoData />
            )}
            {pagination?.current_page < pagination?.last_page && (
              <ButtonLoadMore onPress={handleLoadMoreListRequest} />
            )}
            {loading && <LoadingTable />}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default Request;
