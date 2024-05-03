import React, { useState, useLayoutEffect } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function RadioButton({ handleToggle, index, isDone }: any) {
  const [isToggled, setIsToggled] = useState<boolean>(isDone);

  const onToggle = () => {
    setIsToggled((prev) => !prev);
    handleToggle(index);
  };

  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isToggled]);

  const styles = StyleSheet.create({
    radioButton: {
      borderWidth: 1,
      borderColor: "#cccccc",
      height: 25,
      width: 45,
      borderRadius: 100,
      position: "relative",
    },
    radio: {
      height: 20,
      width: 20,
      backgroundColor: "#cccccc",
      borderRadius: 10,
      position: "absolute",
      top: "50%",
      transform: [{ translateY: -10 }],
      left: isToggled ? "48%" : "5%", 
    },
  });

  return (
    <TouchableOpacity style={styles.radioButton} onPress={onToggle}>
      <View style={styles.radio}></View>
    </TouchableOpacity>
  );
}
