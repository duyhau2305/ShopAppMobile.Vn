import {StyleSheet} from 'react-native';

const stylesComponent = StyleSheet.create({
  Loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    minHeight: 20,
  },
  ButtonRadio: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#edeff2',
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  RadioItem: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  RadioInner: {
    width: 10,
    height: 10,
    borderRadius: 9999,
  },
  Footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdfe5',
    backgroundColor: '#FFF',
    gap: 8,
  },
  BadgeFilter: {
    backgroundColor: '#FF4D4F',
    position: 'absolute',
    right: -4,
    top: -4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    alignItems: 'center',
  },
});

export default stylesComponent;
