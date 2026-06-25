import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser, logout} from '../redux/slices/authSlice';
import Card from '../components/Card';
import Button from '../components/Button';

const ProfileScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'Logout',
          onPress: () => {
            dispatch(logout());
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName[0]}
            {user?.lastName[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Card>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{user?.phoneNumber || 'Not provided'}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>
          {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </Card>

      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Security</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy & Policy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="danger"
        size="large"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default ProfileScreen;
