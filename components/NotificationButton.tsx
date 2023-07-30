import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment'; // Use moment to calculate nuanced intervals
import { Colors } from './Colors';

const NotificationButton: React.FC = () => {

  // const handlePress = () => {
  //   PushNotification.localNotification({
  //     channelId: 'default-channel',
  //     title: 'Stabit',
  //     message: 'This is a local notification test',
  //   });
  // };

  // return (
  //   <View>
  //     <Button title="Send Notification" onPress={handlePress} />
  //   </View>
  // );

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handlePress = () => {
    // if (notificationsEnabled) {
    //   // Schedule a daily notification
    //   PushNotification.localNotificationSchedule({
    //     channelId: 'default-channel',
    //     title: 'Stabit',
    //     message: 'This is your Daily Reminder to Check In!',
    //     date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Trigger the notification after 24 hours
    //     repeatType: 'day', // Repeat the notification daily
    //   });
    // }
    PushNotification.popInitialNotification(() => {
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: 'Stabit',
        message: 'This is a local notification test',
      });
    })
    console.log(PushNotification.getChannels(() => {}))
  };

  const handleDisableNotifications = () => {
    // Cancel all scheduled notifications
    PushNotification.cancelAllLocalNotifications();
    setNotificationsEnabled(false);
  };

  const handleEnableNotifications = () => {
    setNotificationsEnabled(true);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.baseText}>
          <Text style={styles.subtitle}>
            Notifications:
          </Text>
        </Text>
        {notificationsEnabled ? (
          <TouchableOpacity activeOpacity={0.5} onPress={() => handleDisableNotifications()} style={styles.smallButton}>
            <Text style={styles.baseText}>
              <Text style={styles.buttonText}>
                Enabled
              </Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.5} onPress={() => handleEnableNotifications()} style={styles.smallButton}>
            <Text style={styles.baseText}>
              <Text style={styles.buttonText}>
                Disabled
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress()} disabled={!notificationsEnabled} style={StyleSheet.compose(styles.smallButton, {maxWidth: 300})}>
        <Text style={styles.baseText}>
          <Text style={styles.buttonText}>
            Send Notification
          </Text>
        </Text>
      </TouchableOpacity>
    </>
    
  );
};

export default NotificationButton;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    padding: 30,
  },
  baseText: {
    fontFamily: 'Nunito',
  },
  subtitle: {
    color: Colors.font,
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallButton: {
    backgroundColor: Colors.component,
    borderRadius: 10,
    maxWidth: 100,
    maxHeight: 30,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.font,
    fontWeight: 'bold',
  },
});
