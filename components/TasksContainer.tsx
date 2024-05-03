import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RadioButton from "./RadioButton";

interface TaskInterface {
  name: string;
  isDone: boolean;
}

interface TasksContainerProps {
  tasks: TaskInterface[];
  onDeletePressed: any;
  handleToggle: any;
}

export default function TasksContainer({
  tasks,
  onDeletePressed,
  handleToggle,
}: TasksContainerProps) {
  const handleDeletePress = (index: number) => {
    onDeletePressed(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks:</Text>
      {tasks.length < 1 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nothing to see here...</Text>
          <Text style={styles.emptyText}>
            Click 'Add new task' to add tasks
          </Text>
        </View>
      )}
      <FlatList
        style={styles.tasksContainer}
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <View style={{ flexDirection: "row", gap: 3, width: "60%" }}>
              <Text style={styles.taskText}>{index + 1}.</Text>
              <View style={{ position: "relative" }}>
                <Text style={styles.taskText}>{item.name}</Text>
                <View
                  style={{
                    position: "absolute",
                    height: 2,
                    width: item.isDone ? "100%" : "0%",
                    backgroundColor: "#d62828",
                    top: "50%",
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <RadioButton
                handleToggle={handleToggle}
                index={index}
                isDone={item.isDone}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeletePress(index)}
              >
                <Text style={styles.buttonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 250,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: "#edf2f4",
  },
  tasksContainer: {
    paddingHorizontal: 15,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  taskText: {
    fontSize: 20,
    color: "#edf2f4",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#cccccc",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "400",
  },
  emptyContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 50,
    gap: 10,
  },
  emptyText: {
    fontSize: 20,
    color: "#edf2f4",
  },
});
