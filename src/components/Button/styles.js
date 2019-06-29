import { StyleSheet } from 'react-native';
import { colors as c } from 'config';

export const clearStyles = StyleSheet.create({
  primary: { color: c.primary },
  secondary: { color: c.secondary },
  error: { color: c.error },
  success: { color: c.success },
});
export const solidStyles = StyleSheet.create({
  primary: { backgroundColor: c.primary },
  secondary: { backgroundColor: c.secondary },
  error: { backgroundColor: c.error },
  success: { backgroundColor: c.success },
});
export const colorMap = ['primary', 'secondary', 'error', 'success'];
