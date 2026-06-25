import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({children, elevated = false, style, ...props}) => {
  return (
    <View
      style={[styles.card, elevated && styles.elevatedCard, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  elevatedCard: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Card;
