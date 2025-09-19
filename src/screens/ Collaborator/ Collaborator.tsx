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
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonAddFloat,
  ButtonLoadMore,
  LoadingTable,
  InputSearch,
} from '../../components';
import sty from '../../themes/sty';
import CollaboratorItem from './components/CollaboratorItem';
import {handleErrorMessage} from '../../utils/helpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {HOME_ROUTES, ROOT_ROUTES} from '../../routes';
import {getListCollaboratorAPI} from '../../apis/collaborator';
import {useDebounce} from '../../hooks';
import {
  setListCollaborator,
  setPaginationCollaborator,
} from '../../redux/slices/collaboratorSlice';
import NoData from '../../components/NoData';
import IMAGES from '../../assets/images';
import SegmentCollaborator from './components/SegmentCollaborator';

const Collaborator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const {listCollaborator, pagination} = useAppSelector(
    state => state.collaborator,
  );
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 250);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [type, setType] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetListCollaborator = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListCollaboratorAPI({
        page: 1,
        search: searchDebounce,
        status: type,
      });
      dispatch(setListCollaborator(res?.data?.data));
      dispatch(setPaginationCollaborator(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [dispatch, searchDebounce, type]);

  const handleLoadMoreListCollaborator = async () => {
    try {
      setLoading(true);
      const res = await getListCollaboratorAPI({
        page: pagination?.current_page + 1,
        search: searchDebounce,
        status: type,
      });
      dispatch(setListCollaborator([...listCollaborator, ...res?.data?.data]));
      dispatch(setPaginationCollaborator(res?.data?.pagination));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetListCollaborator();
  }, [handleGetListCollaborator]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetListCollaborator();
    setRefreshing(false);
  };

  return (
    <GradientBackground>
      <HeaderBack
        title="Cộng tác viên"
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
      <View style={sty.gap_12}>
        {showSearch && (
          <InputSearch
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
        )}
        <SegmentCollaborator type={type} setType={setType} />
      </View>
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
            {listCollaborator?.length > 0 ? (
              listCollaborator?.map(data => (
                <CollaboratorItem key={data?.id} data={data} />
              ))
            ) : (
              <NoData />
            )}
            {pagination?.current_page < pagination?.last_page && (
              <ButtonLoadMore onPress={handleLoadMoreListCollaborator} />
            )}
            {loading && <LoadingTable />}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ButtonAddFloat
        onPress={() =>
          navigate.navigate(ROOT_ROUTES.HOME_STACK, {
            screen: HOME_ROUTES.ADD_COLLABORATOR,
            params: {
              handleGetListCollaborator,
            },
          })
        }
      />
    </GradientBackground>
  );
};

export default Collaborator;
