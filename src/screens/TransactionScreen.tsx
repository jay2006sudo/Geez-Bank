import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchTransactionsAsync, selectTransactions, selectIsLoading} from '../redux/slices/transactionSlice';
import {selectSelectedAccount} from '../redux/slices/accountSlice';
import Card from '../components/Card';
import moment from 'moment';

const TransactionScreen = () => {
  const dispatch = useAppDispatch();
  const selectedAccount = useAppSelector(selectSelectedAccount);
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectIsLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (selectedAccount) {
      dispatch(fetchTransactionsAsync({accountId: selectedAccount.id}));
    }
  }, [selectedAccount, dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (selectedAccount) {
      await dispatch(fetchTransactionsAsync({accountId: selectedAccount.id}));
    }
    setRefreshing(false);
  };

  const renderTransaction = ({item}: any) => (
    <Card>
      <View style={styles.transactionRow}>
        <View style={styles.transactionInfo}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.timestamp}>
            {moment(item.timestamp).format('MMM DD, YYYY')}
          </Text>
        </View>
        <Text
          style={[
            styles.amount,
            item.type === 'credit' ? styles.creditAmount : styles.debitAmount,
          ]}>
          {item.type === 'credit' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
      </View>
    </Card>
  );

  if (isLoading && !transactions.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions yet</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: '#34C759',
  },
  debitAmount: {
    color: '#FF3B30',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});

export default TransactionScreen;
