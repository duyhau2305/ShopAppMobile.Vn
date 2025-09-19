import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientBackground, DividerCustom} from '../../components';
import sty from '../../themes/sty';
import HeaderInfoCollaborator from './components/HeaderInfoCollaborator';
import CollaboratorPending from './components/CollaboratorPending';
import CollaboratorApproved from './components/CollaboratorApproved';

const InfoCollaborator = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {data} = route.params as any;

  console.log(data);
  return (
    <GradientBackground>
      <HeaderInfoCollaborator data={data} title="Thông tin cộng tác viên" />
      <DividerCustom styles={sty.mt_12} />
      <KeyboardAvoidingView
        style={sty.flex_1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={sty.flex_1}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              sty.p_16,
              sty.gap_12,
              {paddingBottom: insets.bottom + 16},
            ]}
            showsVerticalScrollIndicator={false}>
            {data?.status === 1 ? (
              <CollaboratorPending data={data} />
            ) : (
              <CollaboratorApproved data={data} />
            )}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default InfoCollaborator;
