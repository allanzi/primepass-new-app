import React, {createContext, useContext, useMemo, useState} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';
import {NavigationProp} from '@react-navigation/native';

import {invoke as LogoutInvoke} from './Consumers/Logout';
import {invoke as LinkOpenInvoke} from './Consumers/LinkOpen';
import {invoke as ClipboardInvoke} from './Consumers/Clipboard';
import {AppDispatch} from '../../store';

interface EventMessagerProps {
  children: React.ReactNode;
}

interface Message {
  event: string;
  data: Object;
}

export interface Config {
  dispatch: AppDispatch;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

interface EventMessagerContextData {
  consume: (message: Message) => void;
  onMessage: (event: WebViewMessageEvent, messageConfig: Config) => void;
}

const EventMessagerContext = createContext<EventMessagerContextData>(
  {} as EventMessagerContextData,
);

const UseEventMessagerProvider: React.FC<EventMessagerProps> = ({children}) => {
  const [config, setConfig] = useState({} as Config);

  const consumers = useMemo(
    () => ({
      Logout: LogoutInvoke,
      LinkOpen: LinkOpenInvoke,
      Clipboard: ClipboardInvoke,
    }),
    [],
  );

  const consume = async (message: Message) => {
    try {
      if (!message.event) {
        throw new Error('Event not provided!');
      }

      consumers[message.event](message.data, config);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onMessage = (event: WebViewMessageEvent, messageConfig: Config) => {
    setConfig(messageConfig);

    const message = JSON.parse(event.nativeEvent.data);
    consume(message);
  };

  return (
    <EventMessagerContext.Provider
      value={{
        consume,
        onMessage,
      }}>
      {children}
    </EventMessagerContext.Provider>
  );
};

function useEventMessager(): EventMessagerContextData {
  const context = useContext(EventMessagerContext);
  if (!context) {
    throw new Error('EventMessagerContext is required');
  }
  return context;
}

export {UseEventMessagerProvider, useEventMessager};
