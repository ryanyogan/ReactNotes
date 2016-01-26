'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View
} from 'react-native';

import SimpleButton from './App/Components/SimpleButton';

class ReactNotes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SimpleButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('ReactNotes', () => ReactNotes);
