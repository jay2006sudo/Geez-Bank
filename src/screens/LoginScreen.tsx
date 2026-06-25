import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {loginAsync, selectError, selectIsLoading} from '../redux/slices/authSlice';
import Button from '../components/Button';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(loginAsync({email, password})).unwrap();
    } catch (err: any) {
      Alert.alert('Login Failed', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Geez Bank</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <Button
          title="Login"
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        />

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;
