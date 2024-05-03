import {
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputGroup from "./components/InputGroup";
import TasksContainer from "./components/TasksContainer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "./components/Logo";

interface TaskInterface {
  name: string;
  isDone: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [isModelOpened, setIsModelOpened] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    };
    saveTasks();
  }, [tasks]);

  const onAddPressed = (taskInput: TaskInterface) => {
    if (taskInput) {
      setTasks((prevTasks) => [...prevTasks, taskInput]);
      setIsModelOpened(false);
    }
  };

  const onDeletePressed = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const hanldeAddTaskPress = () => {
    setIsModelOpened(true);
  };

  const hanldeCloseTaskPress = () => {
    setIsModelOpened(false);
  };

  const handleToggle = (index: number) => {
    const newTask = tasks.map((task, i) => {
      if (index === i) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTasks(newTask);
  };

  const handleLinkPress = () => {
    Linking.openURL("https://ks18-portfolio.netlify.app/");
  };

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <InputGroup
          onAddPressed={onAddPressed}
          isModelOpened={isModelOpened}
          hanldeCloseTaskPress={hanldeCloseTaskPress}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={hanldeAddTaskPress}>
            <Text style={styles.buttonText}>Add new task</Text>
          </TouchableOpacity>
        </View>
        <TasksContainer
          tasks={tasks}
          onDeletePressed={onDeletePressed}
          handleToggle={handleToggle}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Original project by</Text>
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={[styles.footerText, styles.footerLink]}>
              Karthikean Selvam
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar barStyle={"light-content"} backgroundColor={"rgba(214, 40, 40, 0.9)"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#2b2d42",
    position: "relative",
  },
  buttonContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#cccccc",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 5,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  footerText: {
    textAlign: "center",
    color: "#edf2f4",
  },
  footerLink: {
    color: "#d62828",
  },
});
