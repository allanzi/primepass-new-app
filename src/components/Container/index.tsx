import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
}

const Container: React.FC<Props> = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: insets.top,
        backgroundColor: 'rgb(247, 246, 247)',
        flex: 1,
      }}>
      {children}
    </View>
  );
};

export default Container;
