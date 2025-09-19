import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CollaboratorParams} from '../../../interfaces/collaborator';
import sty from '../../../themes/sty';
import {TextDisplay} from '../../../components';

interface CollaboratorPendingProps {
  data: CollaboratorParams;
}

const CollaboratorPending = ({data}: CollaboratorPendingProps) => {
  return (
    <TouchableOpacity activeOpacity={1} style={sty.gap_12}>
      <TouchableOpacity activeOpacity={1} style={styles.FormAvatar}>
        <Image
          style={[sty.w_full, sty.h_full, sty.objectCover]}
          source={{
            uri: data?.employee?.avatar,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          sty.gap_12,
          sty.p_12,
          sty.rounded_12,
          sty.border_1,
          sty.borderSecondPrimary,
        ]}>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Họ và tên:" color="#181D27" />
          <TextDisplay
            text={data?.employee?.full_name}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Số CCCD:" color="#181D27" />
          <TextDisplay
            text={data?.employee?.cccd}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Số điện thoại:" color="#181D27" />
          <TextDisplay
            text={data?.employee?.phone_number}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Địa chỉ:" color="#181D27" />
          <TextDisplay
            text={data?.employee?.address}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.FormImage}>
        <Image
          style={[sty.w_full, sty.h_full, sty.objectCover]}
          source={{
            uri: data?.employee?.before_card_id,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.FormImage}>
        <Image
          style={[sty.w_full, sty.h_full, sty.objectCover]}
          source={{
            uri: data?.employee?.after_card_id,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CollaboratorPending;

const styles = StyleSheet.create({
  FormAvatar: {
    borderWidth: 1,
    borderRadius: 16,
    borderStyle: 'dashed',
    padding: 12,
    borderColor: '#dbdfe5',
    backgroundColor: '#FFF',
    height: 250,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FormImage: {
    borderWidth: 1,
    borderRadius: 16,
    borderStyle: 'dashed',
    padding: 12,
    borderColor: '#dbdfe5',
    backgroundColor: '#FFF',
    height: 200,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
