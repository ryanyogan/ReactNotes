'use strict';

import React, {
  MapView,
  StyleSheet,
  Component
} from 'react-native';

export default class NoteLocationScreen extends Component {
  render() {
    const locations = _.values(this.props.notes)
      .filter((note) => {
        return !!note.location;
      })
      .map((note) => {
      return {
        latitude: note.location.coords.latitude,
        longitude: note.location.coords.longitude,
        hasLeftCallout: true,
        onLeftCalloutPress: this.props.onSelectNote.bind(this, note),
        title: note.title
      };
    });

    return (
      <MapView
        annotations={locations}
        showsUserLocation={true}
        style={styles.map}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    marginTop: 64
  }
});