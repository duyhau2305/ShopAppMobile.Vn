import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconSVGProps } from '../../interfaces/common';

const IconProfile = ({ styles }: IconSVGProps) => (
  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" style={styles}>
    <Path
      d="M12.125 12C14.8864 12 17.125 9.76142 17.125 7C17.125 4.23858 14.8864 2 12.125 2C9.36358 2 7.125 4.23858 7.125 7C7.125 9.76142 9.36358 12 12.125 12Z"
      stroke="#A4AFBD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.125 12C14.8864 12 17.125 9.76142 17.125 7C17.125 4.23858 14.8864 2 12.125 2C9.36358 2 7.125 4.23858 7.125 7C7.125 9.76142 9.36358 12 12.125 12Z"
      stroke="black"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.715 22C20.715 18.13 16.865 15 12.125 15C7.38503 15 3.53503 18.13 3.53503 22"
      stroke="#A4AFBD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.715 22C20.715 18.13 16.865 15 12.125 15C7.38503 15 3.53503 18.13 3.53503 22"
      stroke="black"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default IconProfile;
