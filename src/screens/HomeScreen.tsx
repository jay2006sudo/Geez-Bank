import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchAccountsAsync, selectAccounts, selectIsLoading} from '../redux/slices/accountSlice';
import {selectUser} from '../redux/slices/authSlice';
import Card from '../components/Card';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const accounts = useAppSelector(selectAccounts);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAccountsAsync());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const primaryAccount = accounts?.[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.firstName}!</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>

      {primaryAccount && (
        <Card elevated>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={styles.balance}>${primaryAccount.balance.toFixed(2)}</Text>
          <Text style={styles.accountNumber}>{primaryAccount.accountNumber}</Text>
        </Card>
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Transfer')}>
          <Text style={styles.actionIcon}>💸</Text>
          <Text style={styles.actionText}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💳</Text>
          <Text style={styles.actionText}>Pay Bills</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📱</Text>
          <Text style={styles.actionText}>Mobile Top-up</Text>
        </TouchableOpacity>
      </View>

      {accounts && accounts.length > 1 && (
        <View>
          <Text style={styles.sectionTitle}>My Accounts</Text>
          {accounts.map(account => (
            <Card key={account.id}>
              <Text style={styles.accountName}>{account.accountName}</Text>
              <Text style={styles.accountBalance}>${account.balance.toFixed(2)}</Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  accountNumber: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 8,
  },
});

export default HomeScreen;
