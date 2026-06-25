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
import {registerAsync, selectError, selectIsLoading} from '../redux/slices/authSlice';
import Button from '../components/Button';

const RegisterScreen = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    try {
      await dispatch(
        registerAsync({email, password, firstName, lastName}),
      ).unwrap();
    } catch (err: any) {
      Alert.alert('Registration Failed', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Geez Bank</Text>
        <Text style={styles.subtitle}>Create Account</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          editable={!isLoading}
          placeholderTextColor="#999"
        />

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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
        />

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            Login
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
  loginText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;
