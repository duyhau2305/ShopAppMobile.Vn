import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import IMAGES from '../../../assets/images';
import {TextDisplay} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import {handleErrorMessage} from '../../../utils/helpers';
import {getCountRequestAPI} from '../../../apis/request';

const MenuHome = () => {
  const navigate = useNavigation<any>();
  const {role} = useAppSelector(state => state.auth);
  const [totalRequest, setTotalRequest] = useState<number>(0);

  const handleGetCountRequest = useCallback(async () => {
    try {
      const res = await getCountRequestAPI();
      setTotalRequest(res?.data?.data?.totalLeaveRequests);
    } catch (error) {
      handleErrorMessage(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetCountRequest();
    }, [handleGetCountRequest]),
  );

  return role?.role_id !== 5 ? (
    <View style={styles.FormDouble}>
      <View style={styles.FormDoubleItem}>
        <TouchableOpacity
          onPress={() =>
            navigate.navigate(ROOT_ROUTES.HOME_STACK, {
              screen: HOME_ROUTES.REQUEST,
            })
          }
          style={styles.ButtonFunction}>
          <Image
            source={IMAGES.HOME.icon_list_request}
            style={styles.IconFunction}
          />
          <View>
            <TextDisplay
              text="Đơn yêu cầu"
              color="#393D42"
              fontWeight="semibold"
            />
            <TextDisplay
              text={totalRequest}
              color="#1354D4"
              fontWeight="semibold"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.FormDoubleItem}>
        <TouchableOpacity
          onPress={() =>
            navigate.navigate(ROOT_ROUTES.HOME_STACK, {
              screen: HOME_ROUTES.COLLABORATOR,
            })
          }
          style={styles.ButtonFunction}>
          <Image
            source={IMAGES.HOME.icon_collaborator}
            style={styles.IconFunction}
          />
          <TextDisplay
            text="Cộng tác viên"
            color="#393D42"
            fontWeight="semibold"
          />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.COLLABORATOR,
        })
      }
      style={styles.ButtonFunction}>
      <Image
        source={IMAGES.HOME.icon_collaborator}
        style={styles.IconFunction}
      />
      <TextDisplay text="Cộng tác viên" color="#393D42" fontWeight="semibold" />
    </TouchableOpacity>
  );
};

export default MenuHome;

const styles = StyleSheet.create({
  FormDouble: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  FormDoubleItem: {
    paddingHorizontal: 6,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
  },
  IconFunction: {
    width: 28,
    height: 28,
    objectFit: 'scale-down',
  },
  ButtonFunction: {
    borderWidth: 1,
    borderColor: '#dbdfe5',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flexGrow: 1,
  },
});
