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
import {transferMoneyAsync, selectError, selectIsLoading} from '../redux/slices/transactionSlice';
import {selectSelectedAccount} from '../redux/slices/accountSlice';
import Button from '../components/Button';
import Card from '../components/Card';

const TransferScreen = () => {
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const dispatch = useAppDispatch();
  const selectedAccount = useAppSelector(selectSelectedAccount);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const handleTransfer = async () => {
    if (!recipientAccount || !amount || !recipientName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Amount must be greater than 0');
      return;
    }

    if (!selectedAccount) {
      Alert.alert('Error', 'No account selected');
      return;
    }

    try {
      await dispatch(
        transferMoneyAsync({
          fromAccountId: selectedAccount.id,
          toAccountId: recipientAccount,
          amount: parseFloat(amount),
          description,
          recipientName,
        }),
      ).unwrap();

      Alert.alert('Success', 'Transfer completed successfully');
      setRecipientAccount('');
      setAmount('');
      setDescription('');
      setRecipientName('');
    } catch (err: any) {
      Alert.alert('Transfer Failed', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Send Money</Text>

        {selectedAccount && (
          <Card>
            <Text style={styles.label}>From Account</Text>
            <Text style={styles.accountName}>{selectedAccount.accountName}</Text>
            <Text style={styles.accountNumber}>{selectedAccount.accountNumber}</Text>
            <Text style={styles.balance}>
              Available: ${selectedAccount.balance.toFixed(2)}
            </Text>
          </Card>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Recipient Name"
          value={recipientName}
          onChangeText={setRecipientName}
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Recipient Account"
          value={recipientAccount}
          onChangeText={setRecipientAccount}
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          editable={!isLoading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          editable={!isLoading}
          placeholderTextColor="#999"
          multiline
        />

        <Button
          title="Send Money"
          onPress={handleTransfer}
          loading={isLoading}
          disabled={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  accountNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  balance: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default TransferScreen;
