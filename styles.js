import { StyleSheet, Dimensions } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    titleBar: {
      height: 60,
      marginTop: 25,
      backgroundColor: '#6aa5c1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      flex: 1
    },
    content: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 20
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
    },
    locationContainer: {
      alignItems: 'center',
    },
    locationTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    locationBox: {
      flexDirection: 'row',
    },
    locationLabel: {
      fontSize: 18,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 0.6,
    },
    settingsIcon: {
      marginRight: 5, // added to add some spacing between the title and icon
    }
  });