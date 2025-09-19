import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconSVGProps } from '../../interfaces/common';

const IconProfileActive = ({ styles }: IconSVGProps) => (
  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" style={styles}>
    <Path
      d="M16.625 7C16.625 9.48528 14.6103 11.5 12.125 11.5C9.63972 11.5 7.625 9.48528 7.625 7C7.625 4.51472 9.63972 2.5 12.125 2.5C14.6103 2.5 16.625 4.51472 16.625 7Z"
      fill="#1354D4"
      stroke="#1354D4"
    />
    <Path
      d="M12.1249 14.5C7.11491 14.5 3.03491 17.86 3.03491 22C3.03491 22.28 3.25491 22.5 3.53491 22.5H20.7149C20.9949 22.5 21.2149 22.28 21.2149 22C21.2149 17.86 17.1349 14.5 12.1249 14.5Z"
      fill="#1354D4"
    />
  </Svg>
);
export default IconProfileActive;
