import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function DriverView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Dashboard</Text>
      <Text>Welcome, Driver! Here you can start tracking, confirm routes, and view passengers.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
