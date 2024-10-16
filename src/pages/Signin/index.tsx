import * as React from 'react';
import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import moment from 'moment';

import LogoDark from '../../assets/logoDark.webp';
import Button from '../../components/Button';
import ValidationCode from '../../components/ValidationCode';
import {RequestStatus, useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  clearError,
  verifyLogin,
  login,
} from '../../store/features/user/userSlice';
import * as S from './styles';
import InputMasked from '../../components/InputMasked';

interface IFormInputs {
  phone: string;
  code: string;
}

const Signin: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {error, loadingIdentifier, loadingCode} = useAppSelector(
    state => state.user,
  );
  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    resetField,
    reset,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      phone: '',
      code: '',
    },
  });
  const watchPhone = watch('phone');

  const [codeSended, setCodeSended] = useState(false);
  const [period, setPeriod] = useState(0);

  const background = {
    uri: 'https://primepass-imagens.s3.us-east-1.amazonaws.com/site-novo/welcome-background-mobile-light.webp',
  };

  useEffect(() => {
    dispatch(clearError());
    setCodeSended(false);
    resetField('code');
  }, [watchPhone, dispatch, resetField]);

  useEffect(() => {
    if (watchPhone) {
      clearErrors('phone');
    }
  }, [watchPhone, clearErrors]);

  useEffect(() => {
    if (period > 0) {
      const timer = setInterval(() => {
        setPeriod(period - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [period]);

  const errorMessage = (field: string): string => {
    if (field === 'phone') {
      if (errors.phone?.type === 'required') {
        return 'Campo obrigatório';
      }
      if (errors.phone?.type === 'pattern') {
        return 'Digite um telefone válido';
      }
    }

    if (error !== null && error && 'type' in error && error.type === field) {
      return error.message;
    }
    return '';
  };

  const resendCode = async (): Promise<void> => {
    if (period > 0) {
      return;
    }
    setCodeSended(false);
    await submitPhone();
  };

  const submitPhone = async (): Promise<void> => {
    resetField('code');
    const response: any = await dispatch(
      verifyLogin({phone: watchPhone.replace(/[^0-9]/g, '')}),
    );
    if (response.meta.requestStatus === RequestStatus.fulfilled) {
      setCodeSended(true);
      setPeriod(response.payload?.period);
    }
  };

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    if (!codeSended) {
      await submitPhone();
      return;
    }

    if (data.code.length === 6) {
      const response = await dispatch(login(data.code));
      if (response.meta.requestStatus === RequestStatus.fulfilled) {
        reset();
        navigation.navigate('BottomTabs', {screen: 'Home'});
        navigation.reset({index: 1, routes: [{name: 'BottomTabs'}]});
        return;
      }
    }
  };

  return (
    <S.Keyboard behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Background source={background}>
          <S.Logo source={LogoDark} />

          <S.ContentBottom>
            <S.Text>Para fazer login digite:</S.Text>

            <S.Form>
              <Controller
                control={control}
                rules={{
                  maxLength: 255,
                  required: true,
                }}
                render={({field}) => (
                  <InputMasked
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '+55 (99) ',
                    }}
                    placeholder="Telefone"
                    onChangeText={field.onChange}
                    errorMessage={errorMessage('phone')}
                    placeholderTextColor="#505050"
                    {...field}
                  />
                )}
                name="phone"
              />

              {codeSended && (
                <S.ContentCode>
                  <S.Text>
                    Para sua segurança, digite o PIN que você recebeu no seu
                    celular:
                  </S.Text>
                  <Controller
                    control={control}
                    rules={{
                      maxLength: 6,
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <ValidationCode
                        onBlur={onBlur}
                        onChangeText={onChange}
                        onTextChange={onChange}
                        value={value}
                        errorMessage={errorMessage('code')}
                        keyboardType={'numeric'}
                        autoFocus
                      />
                    )}
                    name="code"
                  />
                  <S.Link onPress={resendCode}>
                    <S.LinkText>
                      Reenviar código
                      {period > 0
                        ? ` em ${moment
                            .utc(
                              moment
                                .duration(period, 'seconds')
                                .as('milliseconds'),
                            )
                            .format('mm:ss')}`
                        : ''}
                    </S.LinkText>
                  </S.Link>
                </S.ContentCode>
              )}

              <Button
                label={codeSended ? 'Entrar' : 'Continuar'}
                onPress={handleSubmit(onSubmit)}
                loading={loadingIdentifier || loadingCode}
              />
            </S.Form>
          </S.ContentBottom>
        </S.Background>
      </TouchableWithoutFeedback>
    </S.Keyboard>
  );
};

export default Signin;
