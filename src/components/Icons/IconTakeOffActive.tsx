import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconSVGProps } from '../../interfaces/common';

const IconTakeOffActive = ({ styles }: IconSVGProps) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" style={styles}>
      <Path
        d="M16.5601 3.41992C19.9001 3.53992 21.5901 4.76992 21.6901 9.46992L21.8201 15.6399C21.9001 19.7599 20.9501 21.8299 15.9501 21.9399L9.95008 22.0599C4.95008 22.1599 3.91008 20.1199 3.83008 16.0099L3.69008 9.82992C3.59008 5.12992 5.24008 3.82992 8.56008 3.57992L16.5601 3.41992Z"
        fill="#1354D4"
      />
      <Path
        d="M10.3101 18V13"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.75 15.5H7.75"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 2V5"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.75 2V5"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 2C9.5 1.58579 9.16421 1.25 8.75 1.25C8.33579 1.25 8 1.58579 8 2H8.75H9.5ZM8.75 2H8V3.62305H8.75H9.5V2H8.75Z"
        fill="#1354D4"
      />
      <Path
        d="M17.5 2C17.5 1.58579 17.1642 1.25 16.75 1.25C16.3358 1.25 16 1.58579 16 2H16.75H17.5ZM16.75 2H16V3.5H16.75H17.5V2H16.75Z"
        fill="#1354D4"
      />
    </Svg>
  );
};

export default IconTakeOffActive;
