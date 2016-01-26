'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Component
} from 'react-native';

export default class NoteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Create Note Screen!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});