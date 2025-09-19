import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {handleErrorMessage} from '../../utils/helpers';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonLoadMore,
  LoadingTable,
} from '../../components';
import NoData from '../../components/NoData';
import sty from '../../themes/sty';
import ItemConfigWifi from './components/ItemConfigWifi';
import {getListConfigWifiAPI} from '../../apis/configWifi';
import {
  setListConfigWifi,
  setPaginationConfigWifi,
} from '../../redux/slices/configWifiSlice';

const ConfigWifi = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {listConfig, pagination} = useAppSelector(state => state.configWifi);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetListConfigWifi = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListConfigWifiAPI({
        page: 1,
      });
      console.log('listConfig: ', res?.data?.data);
      dispatch(setListConfigWifi(res?.data?.data));
      dispatch(setPaginationConfigWifi(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListConfigWifi();
  }, [handleGetListConfigWifi]);

  const handleLoadMoreListConfigWifi = async () => {
    try {
      setLoading(true);
      const res = await getListConfigWifiAPI({
        page: pagination?.current_page + 1,
      });
      dispatch(setListConfigWifi([...listConfig, ...res?.data?.data]));
      dispatch(setPaginationConfigWifi(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetListConfigWifi();
    setRefreshing(false);
  };

  return (
    <GradientBackground>
      <HeaderBack title="Cấu hình chấm công" />
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
              {paddingBottom: insets.bottom + 16},
            ]}
            showsVerticalScrollIndicator={false}>
            {listConfig?.length > 0 ? (
              listConfig?.map(data => (
                <ItemConfigWifi
                  handleGetListConfigWifi={handleGetListConfigWifi}
                  data={data}
                  key={data?.id}
                />
              ))
            ) : (
              <NoData />
            )}
            {pagination?.current_page < pagination?.last_page && (
              <ButtonLoadMore onPress={handleLoadMoreListConfigWifi} />
            )}
            {loading && <LoadingTable />}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default ConfigWifi;
