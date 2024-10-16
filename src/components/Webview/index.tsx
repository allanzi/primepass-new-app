/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import RNWebView from 'react-native-webview';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {PermissionsAndroid, Platform} from 'react-native';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

import {ActivityIndicator, View} from 'react-native';
import {useEventMessager} from '../../hooks/UseEventMessager';
import {useAppDispatch} from '../../store/hooks';
import {SITE_BASE_URL} from '@env';

interface Props {
  uri: string;
}

const Loading: React.FC = () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgb(247, 246, 247)',
    }}>
    <ActivityIndicator color={'rgb(12, 76, 109);'} size="large" />
  </View>
);

const Webview: React.FC<Props> = ({uri}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {onMessage} = useEventMessager();
  const webViewRef = useRef() as any;
  const [enableTracking, setEnableTracking] = useState(false);

  useFocusEffect(
    useCallback(() => {
      webViewRef.current.injectJavaScript('window.location.reload(true)');
    }, []),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Localização',
          message:
            'Precisamos obter a sua localização para listar os cinemas próximos a você.',
          buttonPositive: 'Obter localização',
        },
      );
    }
  }, []);

  useEffect(() => {
    const checkPermissionTracking = async () => {
      try {
        const trackingStatus = await requestTrackingPermission();
        setEnableTracking(
          trackingStatus === 'authorized' || trackingStatus === 'unavailable',
        );
      } catch (e) {
        setEnableTracking(false);
      }
    };

    // eslint-disable-next-line no-void
    void checkPermissionTracking();
  }, []);

  const config = useMemo(
    () => ({
      dispatch,
      navigation,
    }),
    [dispatch, navigation],
  );

  const disableZoomScript = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1');
    document.getElementsByTagName('head')[0].appendChild(meta);
  `;

  return (
    <RNWebView
      ref={ref => (webViewRef.current = ref)}
      onMessage={event => onMessage(event, config)}
      pullToRefreshEnabled
      calesPageToFit={false}
      source={{
        uri: `${SITE_BASE_URL}${uri}${
          Platform.OS === 'ios'
            ? `&enableTracking=${JSON.stringify(enableTracking)}`
            : ''
        }`,
      }}
      style={{
        backgroundColor: 'rgb(247, 246, 247)',
        flex: 1,
      }}
      renderLoading={() => <Loading />}
      startInLoadingState
      geolocationEnabled
      javaScriptEnabled={true}
      injectedJavaScript={disableZoomScript}
    />
  );
};

export default Webview;
