import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${variant}Button`],
        styles[`${size}Button`],
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#E8E8E8',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
