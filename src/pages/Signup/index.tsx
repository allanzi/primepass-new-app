import * as React from 'react';
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import {VerifyLoginParams} from '@PrimePassCinema/prime-connector/dist/services/api/login/login';
import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMasked from '../../components/InputMasked';
import LogoDark from '../../assets/logoDark.webp';
import ValidationCode from '../../components/ValidationCode';
import {RequestStatus, useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  clearError,
  verifySignup,
  signup,
  verifyExists,
} from '../../store/features/user/userSlice';
import * as S from './styles';

interface IFormInputs {
  name: string;
  document: string;
  email: string;
  phone: string;
  code: string;
}

const Signup: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {error, loadingIdentifier, loadingCode, loadingVerify} = useAppSelector(
    state => state.user,
  );

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    resetField,
    reset,
    setError,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      name: '',
      document: '',
      email: '',
      phone: '',
      code: '',
    },
  });
  const watchName = watch('name');
  const watchDocument = watch('document');
  const watchEmail = watch('email');
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

    if (watchEmail) {
      clearErrors('email');
    }
    if (watchName) {
      clearErrors('name');
    }
    if (watchPhone) {
      clearErrors('phone');
    }
    if (watchDocument) {
      clearErrors('document');
    }
  }, [
    watchName,
    watchEmail,
    watchPhone,
    watchDocument,
    clearErrors,
    dispatch,
    resetField,
  ]);

  useEffect(() => {
    if (period > 0) {
      const timer = setInterval(() => {
        setPeriod(period - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [period]);

  const handleError = (errorApi: any): void => {
    const fieldsError = Object.keys(errorApi);

    if (fieldsError.length > 0) {
      fieldsError.forEach((field: any) => {
        setError(field, {type: 'api', message: errorApi[field]});
      });
    }
  };

  const submitEmail = async (): Promise<void> => {
    resetField('code');

    const response: any = await dispatch(
      verifySignup({
        email: watchEmail.toLowerCase().trim(),
        phone: `+55${watchPhone.replace(/[^0-9]/g, '')}`,
      }),
    );

    if (response.meta.requestStatus === RequestStatus.rejected) {
      handleError(response.payload.message);
    }

    if (response.meta.requestStatus === RequestStatus.fulfilled) {
      setCodeSended(true);
      setPeriod(response.payload.period);
    }
  };

  const resendCode = async (): Promise<void> => {
    if (period > 0) {
      return;
    }
    setCodeSended(false);
    await submitEmail();
  };

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    if (!codeSended) {
      await submitEmail();
      return;
    }

    if (data.code.length === 6) {
      const response: any = await dispatch(
        signup({
          name: data.name,
          document: data.document.replace(/[^0-9]/g, ''),
          phone: `+55${data.phone.replace(/[^0-9]/g, '')}`,
          token: data.code,
        }),
      );

      if (response.meta.requestStatus === RequestStatus.rejected) {
        handleError(response.payload.message);
      }

      if (response.meta.requestStatus === RequestStatus.fulfilled) {
        dispatch(clearError());
        reset();
        navigation.navigate('BottomTabs', {screen: 'Home'});
      }
    }
  };

  const validateDuplicate = async (
    payload: VerifyLoginParams,
  ): Promise<boolean> => {
    const {
      payload: {found},
    }: any = await dispatch(verifyExists(payload));

    return !found;
  };

  const errorMessage = (field: string): string => {
    if (field === 'name') {
      if (errors.name?.type === 'required') {
        return 'Campo obrigatório';
      }

      if (errors.name?.type === 'pattern') {
        return 'Deve ter duas palavras';
      }
    }

    if (field === 'email') {
      if (errors.email?.type === 'required') {
        return 'Campo obrigatório';
      }

      if (errors.email?.type === 'pattern') {
        return 'Digite um email válido';
      }

      if (errors.email?.type === 'validate') {
        return 'Erro inesperado. Tente novamente mais tarde';
      }

      if (errors.email?.type === 'api') {
        return errors.email.message ?? '';
      }
    }

    if (field === 'document') {
      if (errors.document?.type === 'required') {
        return 'Campo obrigatório';
      }

      if (errors.document?.type === 'duplicate') {
        return 'Erro inesperado. Tente novamente mais tarde';
      }

      if (errors.document?.type === 'api') {
        return errors.document.message ?? '';
      }
    }

    if (field === 'phone') {
      if (errors.phone?.type === 'required') {
        return 'Campo obrigatório';
      }

      if (errors.phone?.type === 'duplicate') {
        return 'Erro inesperado. Tente novamente mais tarde';
      }

      if (errors.phone?.type === 'api') {
        return errors.phone.message ?? '';
      }
    }

    if (error !== null && error && 'type' in error && error.type === field) {
      return error.message;
    }

    return '';
  };

  return (
    <S.Keyboard behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Background source={background}>
          <S.Logo source={LogoDark} />

          <S.ContentBottom>
            <S.Text>
              Para assegurarmos sua identidade precisamos de alguns dados:
            </S.Text>

            <S.Form>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[\wà-ü']+ [\wà-ü']+/,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Nome completo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errorMessage('name')}
                    placeholderTextColor="#505050"
                  />
                )}
                name="name"
              />

              <Controller
                name="document"
                control={control}
                rules={{
                  required: true,
                  validate: {
                    duplicate: async (document: string) =>
                      await validateDuplicate({
                        document: document.replace(/[^0-9]/g, ''),
                      }),
                  },
                }}
                render={({field}) => (
                  <InputMasked
                    type={'cpf'}
                    placeholder="CPF"
                    onChangeText={field.onChange}
                    errorMessage={errorMessage('document')}
                    placeholderTextColor="#505050"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{
                  maxLength: 255,
                  required: true,
                  pattern: /^[\w.+-_]+@\w+.\w{2,}(?:.\w{2})?$/,
                  validate: async (email: string) =>
                    await validateDuplicate({email}),
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errorMessage('email')}
                    placeholderTextColor="#505050"
                  />
                )}
                name="email"
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                  validate: {
                    duplicate: async (phone: string) =>
                      await validateDuplicate({
                        phone: `+55${phone.replace(/[^0-9]/g, '')}`,
                      }),
                  },
                }}
                render={({field}) => (
                  <InputMasked
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    placeholder="Telefone"
                    onChangeText={field.onChange}
                    errorMessage={errorMessage('phone')}
                    placeholderTextColor="#505050"
                    {...field}
                  />
                )}
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
                        placeholderTextColor="#505050"
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
                label="Continuar"
                onPress={handleSubmit(onSubmit)}
                loading={loadingIdentifier || loadingCode || loadingVerify}
              />
            </S.Form>
          </S.ContentBottom>
        </S.Background>
      </TouchableWithoutFeedback>
    </S.Keyboard>
  );
};

export default Signup;
