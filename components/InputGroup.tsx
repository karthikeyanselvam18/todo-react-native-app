import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InputGroup({
  onAddPressed,
  isModelOpened,
  hanldeCloseTaskPress,
}: any) {
  const [input, setInput] = useState<string>("");
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isModelOpened) {
      setTimeout(() => {
        textInputRef.current?.focus();
        textInputRef.current?.blur();
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 100);
      }, 100);
    }
  }, [isModelOpened]);

  const onInput = (text: string) => {
    setInput(text);
  };

  const handleAddPress = () => {
    if (input) {
      onAddPressed({ name: input, isDone: false });
      setInput("");
    }
  };

  const handleCancel = () => {
    hanldeCloseTaskPress();
    setInput("");
  };

  return (
    <Modal
      visible={isModelOpened}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={false}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: "bold" }}>
            New Task!
          </Text>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="Enter task"
            onChangeText={onInput}
            value={input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddPress}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 25,
  },
  container: {
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(237, 246, 249,0.9)",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonText: { fontSize: 18, fontWeight: "400" },
});
