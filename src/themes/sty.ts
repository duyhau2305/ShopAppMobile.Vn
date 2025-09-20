import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

const sty = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  itemsStretch: {
    alignItems: 'stretch',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexNowrap: {
    flexWrap: 'nowrap',
  },
  flex_1: {
    flex: 1,
  },
  shrink_1: {
    flexShrink: 1,
  },
  shrink_0: {
    flexShrink: 0,
  },
  grow_1: {
    flexGrow: 1,
  },
  grow_0: {
    flexGrow: 0,
  },
  objectScaleDown: {
    objectFit: 'scale-down',
  },
  objectCover: {
    objectFit: 'cover',
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  gap_4: {
    gap: 4,
  },
  gap_8: {
    gap: 8,
  },
  gap_12: {
    gap: 12,
  },
  gap_16: {
    gap: 16,
  },
  gap_20: {
    gap: 20,
  },
  gap_24: {
    gap: 24,
  },
  gap_28: {
    gap: 28,
  },
  p_24: {
    padding: 24,
  },
  p_20: {
    padding: 20,
  },
  p_16: {
    padding: 16,
  },
  p_12: {
    padding: 12,
  },
  p_10: {
    padding: 10,
  },

  p_8: {
    padding: 8,
  },
  p_4: {
    padding: 4,
  },
  pb_24: {
    paddingBottom: 24,
  },
  pb_16: {
    paddingBottom: 16,
  },
  pb_12: {
    paddingBottom: 12,
  },
  pb_8: {
    paddingBottom: 8,
  },
  pb_4: {
    paddingBottom: 4,
  },
  pt_24: {
    paddingTop: 24,
  },
  pt_16: {
    paddingTop: 16,
  },
  pt_12: {
    paddingTop: 12,
  },
  pt_8: {
    paddingTop: 8,
  },
  pt_4: {
    paddingTop: 4,
  },
  pt_0: {
    paddingTop: 0,
  },
  py_24: {
    paddingTop: 24,
  },
  py_20: {
    paddingVertical: 20,
  },
  py_16: {
    paddingVertical: 16,
  },
  py_12: {
    paddingVertical: 12,
  },
  py_8: {
    paddingVertical: 8,
  },
  py_4: {
    paddingVertical: 4,
  },
  px_16: {
    paddingHorizontal: 16,
  },
  px_12: {
    paddingHorizontal: 12,
  },
  px_8: {
    paddingHorizontal: 8,
  },
  px_4: {
    paddingHorizontal: 4,
  },
  pr_16: {
    paddingRight: 16,
  },
  pr_12: {
    paddingRight: 12,
  },
  pr_8: {
    paddingRight: 8,
  },
  pr_4: {
    paddingRight: 4,
  },
  pr_0: {
    paddingRight: 0,
  },
  pl_32: {
    paddingLeft: 32,
  },
  pl_16: {
    paddingLeft: 16,
  },
  pl_12: {
    paddingLeft: 12,
  },
  pl_8: {
    paddingLeft: 8,
  },
  pl_4: {
    paddingLeft: 4,
  },
  pl_0: {
    paddingLeft: 0,
  },
  ml_4: {
    marginLeft: 4,
  },
  ml_8: {
    marginLeft: 8,
  },
  ml_12: {
    marginLeft: 12,
  },
  ml_16: {
    marginLeft: 16,
  },
  mr_4: {
    marginRight: 4,
  },
  mr_8: {
    marginRight: 8,
  },
  mr_12: {
    marginRight: 12,
  },
  mr_16: {
    marginRight: 16,
  },
  mb_4: {
    marginBottom: 4,
  },
  mb_8: {
    marginBottom: 8,
  },
  mb_12: {
    marginBottom: 12,
  },
  mb_16: {
    marginBottom: 16,
  },
  mt_4: {
    marginTop: 4,
  },
  mt_8: {
    marginTop: 8,
  },
  mt_12: {
    marginTop: 12,
  },
  mt_16: {
    marginTop: 16,
  },
  mt_20: {
    marginTop: 20,
  },
  mt_24: {
    marginTop: 24,
  },
  my_4: {
    marginVertical: 4,
  },
  my_8: {
    marginVertical: 8,
  },
  my_12: {
    marginVertical: 12,
  },
  my_16: {
    marginVertical: 16,
  },
  my_20: {
    marginVertical: 20,
  },
  min_h_14: {
    minHeight: 14,
  },
  min_h_16: {
    minHeight: 16,
  },
  min_h_18: {
    minHeight: 18,
  },
  min_h_20: {
    minHeight: 20,
  },
  min_h_24: {
    minHeight: 24,
  },
  min_h_50vh: {
    minHeight: height / 2,
  },
  min_h_100vh: {
    minHeight: height,
  },
  min_w_14: {
    minWidth: 14,
  },
  min_w_16: {
    minWidth: 16,
  },
  min_w_24: {
    minWidth: 24,
  },
  w_full: {
    width: '100%',
  },
  w_auto: {
    width: 'auto',
  },
  h_full: {
    height: '100%',
  },
  w_4: {
    width: 4,
  },
  w_8: {
    width: 8,
  },
  w_12: {
    width: 12,
  },
  w_16: {
    width: 16,
  },
  w_20: {
    width: 20,
  },
  w_24: {
    width: 24,
  },
  w_32: {
    width: 32,
  },
  w_40: {
    width: 40,
  },
  w_46: {
    width: 46,
  },
  w_48: {
    width: 48,
  },
  h_4: {
    height: 4,
  },
  h_8: {
    height: 8,
  },
  h_16: {
    height: 16,
  },
  h_12: {
    height: 12,
  },
  h_20: {
    height: 20,
  },
  h_24: {
    height: 24,
  },
  h_32: {
    height: 32,
  },
  h_40: {
    height: 40,
  },
  h_46: {
    height: 46,
  },
  h_48: {
    height: 48,
  },
  h_50vh: {
    height: height / 2,
  },
  h_100vh: {
    height: height,
  },
  top_0: {
    top: 0,
  },
  left_0: {
    left: 0,
  },
  right_0: {
    right: 0,
  },
  bottom_0: {
    bottom: 0,
  },
  rounded_none: {
    borderRadius: 0,
  },
  rounded_4: {
    borderRadius: 4,
  },
  rounded_8: {
    borderRadius: 8,
  },
  rounded_12: {
    borderRadius: 12,
  },
  rounded_16: {
    borderRadius: 16,
  },
  rounded_20: {
    borderRadius: 20,
  },
  rounded_24: {
    borderRadius: 24,
  },
  rounded_full: {
    borderRadius: 9999,
  },
  bg_white: {
    backgroundColor: '#fff',
  },
  bg_primary: {
    backgroundColor: '#1354D4',
  },
  bg_secondPrimary: {
    backgroundColor: '#DEE7F6',
  },
  bg_thirdPrimary: {
    backgroundColor: '#F0F2F8',
  },
  bg_disabled: {
    backgroundColor: '#F2F2F2',
  },
  bg_transparent: {
    backgroundColor: 'transparent',
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  overflowScroll: {
    overflow: 'scroll',
  },
  overflowVisible: {
    overflow: 'visible',
  },
  hidden: {
    display: 'none',
  },
  flex: {
    display: 'flex',
  },
  border_1: {
    borderWidth: 1,
  },
  border_2: {
    borderWidth: 2,
  },
  borderPrimary: {
    borderColor: '#1354D4',
  },
  borderSecondPrimary: {
    borderColor: '#dbdfe5',
  },
  borderError: {
    borderColor: '#DA4646',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  bg_main: {
    backgroundColor: '#F1F3F9',
  },
  opacity_50: {
    opacity: 0.5,
  },
  lineHeight_48: {
    lineHeight: 48,
  },
});

export default sty;
