import { StyleSheet } from 'react-native';
import { colors as c } from 'config';

export const styles = StyleSheet.create({
  base: {
    fontSize: 13,
    color: c.black,
    fontFamily: 'Roboto',
  },
  base_dark: {
    fontSize: 13,
    color: c.white,
    fontFamily: 'Roboto',
  },
});
export const sizes = StyleSheet.create({
  h1: {
    fontSize: 23,
  },
  h2: {
    fontSize: 19,
  },
  h3: {
    fontSize: 17,
  },
  body1: {
    fontSize: 15,
  },
  body2: {
    fontSize: 13,
  },
  body3: {
    fontSize: 11,
  },
  body4: {
    fontSize: 9,
  },
});

export const colors = StyleSheet.create({
  primary: {
    color: c.primary,
  },
  primary_dark: {
    color: c.secondary,
  },
  secondary: {
    color: c.secondary,
  },
  error: {
    color: c.error,
  },
  success: {
    color: c.success,
  },
});

export const decorators = StyleSheet.create({
  b: { fontWeight: 'bold' },
  em: { fontStyle: 'italic' },
  center: { textAlign: 'center' },
});

export const sizeMap = [
  'h1',
  'h2',
  'h3',
  'body1',
  'body1',
  'body2',
  'body3',
  'body4',
];
export const colorMap = ['primary', 'secondary', 'error', 'success'];
export const decoratorMap = ['em', 'b', 'center'];
