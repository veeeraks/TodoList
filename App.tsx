import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react';
import { Pressable, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Task } from './types/Task'
import { PaperProvider } from 'react-native-paper'
import AppBar from './components/AppBar'
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@tasks')
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks) as Task[])
        }
      } catch (error) {
        console.error('Failed to load tasks:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadTasks()
  }, [])

  const addTask = async () => {
    const text = input.trim()
    if (!text) return

    const newTask: Task = { id: Date.now(), text, completed: 0 }
    const updatedTasks = [...tasks, newTask]

    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks))
      setTasks(updatedTasks)
      setInput('')
    } catch (error) {
      console.error('Failed to save tasks:', error)
    }
  }

  const deleteTask = async (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id)

    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks))
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const toggleTask = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: task.completed === 1 ? 0 : 1 }
        : task
    )

    setTasks(updatedTasks)

    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            editable={!isLoading}
            value={input}
            onChangeText={setInput}
            placeholder='Add new task...'
            onSubmitEditing={addTask}
          />
          <Pressable
            style={[styles.button]}
            disabled={isLoading}
            onPress={addTask}>
            <Text style={styles.textStyle}>Add</Text>
          </Pressable>
        </View>
        <FlatList<Task>
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Row item={item} onDelete={deleteTask} onToggle={toggleTask} />
          )}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 6,
  },
  input: {
    flex: 1,
    borderColor: '#105b3c',
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#105b3c',
    borderRadius: 8,
  },
  textStyle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
