import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const AppBar = () => (
  <Appbar.Header mode="center-aligned">
    <Appbar.Content title="Todo - list" titleStyle={styles.title} />
  </Appbar.Header>
)

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#363636',
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default AppBar