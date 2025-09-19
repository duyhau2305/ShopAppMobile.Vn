import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {LoadingTable, TextDisplay} from '../../../components';
import {NotificationParams} from '../../../interfaces/notification';
import {useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import {formatNotifyTime, handleErrorMessage} from '../../../utils/helpers';
import {readNotificationAPI} from '../../../apis/notification';

interface NotificationItemProps {
  notification: NotificationParams;
}

const NotificationItem = ({notification}: NotificationItemProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigation<any>();

  const handleReadNotification = async (data: NotificationParams) => {
    try {
      if (data?.data?.is_approve) {
        if (!data?.is_read) {
          setLoading(true);
          await readNotificationAPI({
            notification_id: data?.id,
          });
          setLoading(false);
        }
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.REQUEST,
        });
      } else {
        if (!data?.is_read) {
          setLoading(true);
          await readNotificationAPI({
            notification_id: data?.id,
          });
          setLoading(false);
        }
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.INFO_NOTIFICATION,
          params: {
            data,
          },
        });
      }
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };
  return (
    <TouchableOpacity
      style={[
        sty.flexRow,
        sty.gap_16,
        sty.itemsCenter,
        sty.p_12,
        sty.rounded_16,
        notification?.is_read ? styles.Readed : styles.NotRead,
      ]}
      onPress={() => handleReadNotification(notification)}>
      <Image
        source={IMAGES.HOME.icon_notification_home}
        style={styles.IconNotification}
      />
      <View style={[sty.shrink_1, sty.grow_1]}>
        <TextDisplay
          text={notification?.title}
          color="#181D27"
          fontWeight="semibold"
          fontSize={16}
          lineHeight={24}
          numberOfLines={2}
        />
        <TextDisplay
          numberOfLines={3}
          text={formatNotifyTime(notification?.hour, notification?.date)}
          color={notification?.is_read ? '#535862' : '#1354D4'}
        />
      </View>
      {loading && <LoadingTable />}
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  IconNotification: {
    width: 40,
    height: 40,
    objectFit: 'scale-down',
  },
  NotRead: {
    backgroundColor: '#F7F9FD',
    opacity: 1,
  },
  Readed: {
    backgroundColor: '#FFF',
    opacity: 0.7,
  },
});
