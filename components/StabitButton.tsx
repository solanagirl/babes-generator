import {Animated, Pressable, StyleSheet, Text} from 'react-native';

type Props = Readonly<{
  onPress: any
}>;


export default function StabitButton({
  onPress,
}: Props) {
  return (
    <Animated.View>
      <Pressable onPress={onPress()}>
        <Text>Staked</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  
})