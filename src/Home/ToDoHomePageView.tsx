import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ToDoHomePageProps } from './ToDoHomePageProps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import images from '../../assets/assets';
import ToDoHomePageVM from './ToDoHomePageVM';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { vector } from '../../assets/Vectors';
import { SimpleLineIcons } from '@expo/vector-icons';
// npm install react-native-svg

  const HomePage = (props: ToDoHomePageProps) => {
    const toDoHomePageVM = ToDoHomePageVM(props);
    const [error, setError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
      toDoHomePageVM.checkTokenExpiry(props);
      const getUserEmail = async () => {
        const email = await SecureStore.getItemAsync('userEmail');
        if (email) {
          setUserEmail(email.split('@')[0]);
        }
      };
      getUserEmail();
    }, []);

    interface Task {
      id: number;
      title: string;
      description: string;
      completed: boolean;
    }

    const apiurl = "https://rntodoapi.vercel.app"
    
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          setIsLoading(true);
          const token = await SecureStore.getItemAsync('userToken');
          if (!token) {
            setError('No authentication token found');
            return;
          }
          
          const response = await axios.get(`${apiurl}/todos`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setTasks(response.data);
        } catch (error) {
          console.error('Error loading tasks:', error);
          setError('Failed to load tasks. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchTasks();
    }, []);

    const toggleTaskCompletion = async (id: number, completed: boolean) => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) return;
      
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        await axios.put(`${apiurl}/todos/${id}`, 
          {
            title: task.title,
            description: task.description,
            completed: !completed
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      
        const updatedTasks = tasks.map(task => 
          task.id === id ? { ...task, completed: !completed } : task
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };

    const filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const incompleteTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {userEmail}!</Text>
          <TouchableOpacity style={styles.profileButton} onPress={() => props.navigation.navigate('profile')}>
            <MaterialIcons name="account-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        {tasks.length > 0 && (
          <View style={styles.searchContainer}>
            <SimpleLineIcons name="magnifier" size={20} color="#fff" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <ScrollView>
          {tasks.length === 0 || filteredTasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={images.SplashIcon} style={styles.emptyImage} />
              <Text style={styles.emptyText}>
                {tasks.length === 0 ? "No tasks yet. Add your first task!" : "No tasks found matching your search."}
              </Text>
            </View>
          ) : (
            <View style={styles.taskList}>
              {incompleteTasks.length > 0 && (
                <>
                  <Text style={styles.taskTitle}>Tasks To Do</Text>
                  {incompleteTasks.map((task) => (
                    <View key={task.id} style={styles.taskCard}>
                      <TouchableOpacity style={styles.actionButton} onPress={() => toggleTaskCompletion(task.id, task.completed)}>
                        <MaterialIcons name="radio-button-unchecked" size={24} color="#34C759" />
                      </TouchableOpacity>
                      <View style={styles.taskContent}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}

              {completedTasks.length > 0 && (
                <>
                  <Text style={styles.taskTitle}>Completed Tasks</Text>
                  {completedTasks.map((task) => (
                    <View key={task.id} style={[styles.taskCard, { opacity: 0.7 }]}>
                      <TouchableOpacity style={styles.actionButton} onPress={() => toggleTaskCompletion(task.id, task.completed)}>
                        <MaterialIcons name="radio-button-checked" size={24} color="#34C759" />
                      </TouchableOpacity>
                      <View style={styles.taskContent}>
                        <Text style={[styles.taskTitle, { textDecorationLine: 'line-through' }]}>{task.title}</Text>
                        <Text style={[styles.taskDescription, { textDecorationLine: 'line-through' }]}>{task.description}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          )}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={toDoHomePageVM.isModalVisible}
          onRequestClose={() => toDoHomePageVM.setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TextInput
                style={[
                  styles.input,
                  toDoHomePageVM.isTaskTitleFocused && styles.focusedInput,
                ]}
                placeholder="Task Title"
                placeholderTextColor="#666"
                value={toDoHomePageVM.taskTitle}
                onChangeText={toDoHomePageVM.setTaskTitle}
                onFocus={() => toDoHomePageVM.setTaskTitleFocused(true)}
                onBlur={() => toDoHomePageVM.setTaskTitleFocused(false)}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.descriptionInput,
                  toDoHomePageVM.isTaskDescriptionFocused && styles.focusedInput,
                ]}
                placeholder="Task Description"
                placeholderTextColor="#666"
                value={toDoHomePageVM.taskDescription}
                onChangeText={toDoHomePageVM.setTaskDescription}
                multiline
                onFocus={() => toDoHomePageVM.setTaskDescriptionFocused(true)}
                onBlur={() => toDoHomePageVM.setTaskDescriptionFocused(false)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => toDoHomePageVM.setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={async () => {
                    await toDoHomePageVM.handleAddTask(
                      toDoHomePageVM.taskTitle,
                      toDoHomePageVM.taskDescription
                    );
                    const updatedTasks = await axios.get(`${apiurl}/todos`, {
                      headers: {
                        Authorization: `Bearer ${await SecureStore.getItemAsync('userToken')}`
                      }
                    });
                    setTasks(updatedTasks.data);
                  }}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => toDoHomePageVM.setModalVisible(true)}
        >
          <MaterialIcons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: 'black',padding: 16,},
  header: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 20,},
  welcomeText: {color: '#fff',fontSize: 24,fontWeight: 'bold',},
  profileButton: {position: 'absolute',right: 0,},
  emptyContainer: {flex: 1,justifyContent: 'center',alignItems: 'center',},
  emptyImage: {width: 200,height: 200,marginBottom: 20,},
  emptyText: {color: '#fff',fontSize: 16,textAlign: 'center',},
  taskList: {flex: 1,},
  taskCard: {backgroundColor: '#1a1a1a',borderRadius: 10,padding: 15,marginBottom: 10,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',},
  taskContent: {flex: 1,marginLeft: 10,},
  taskTitle: {color: 'white',fontSize: 18,fontWeight: 'bold',marginBottom: 5,},
  taskDescription: {color: '#999',fontSize: 14,},
  taskActions: {flexDirection: 'row',alignItems: 'center',},
  actionButton: {padding: 8,},
  addButton: {position: 'absolute',right: 20,bottom: 20,backgroundColor: '#007AFF',width: 56,height: 56,borderRadius: 28,justifyContent: 'center',alignItems: 'center',elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.84,},
  modalContainer: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',},
  modalContent: {backgroundColor: 'black',borderRadius: 10,padding: 20,width: '90%',maxWidth: 400,},
  modalTitle: {fontSize: 20,fontWeight: 'bold',marginBottom: 15,textAlign: 'center',color: '#fff',},
  input: {borderWidth: 1,borderColor: '#666',borderRadius: 5,padding: 10,marginBottom: 10,color: '#fff',backgroundColor: '#1a1a1a',},
  descriptionInput: {height: 100,textAlignVertical: 'top',},
  focusedInput: {borderColor: '#007AFF',},
  buttonContainer: {flexDirection: 'row',justifyContent: 'space-between',marginTop: 15,},
  button: {flex: 1,padding: 10,borderRadius: 5,marginHorizontal: 5,},
  submitButton: {backgroundColor: '#007AFF',},
  cancelButton: {backgroundColor: '#FF3B30',},
  buttonText: {color: 'white',textAlign: 'center',fontWeight: 'bold',},
  searchContainer: {flexDirection: 'row',alignItems: 'center',backgroundColor: '#1a1a1a',borderRadius: 10,paddingHorizontal: 15,marginBottom: 20,height: 45,},
  searchIcon: {marginRight: 10,},
  searchInput: {flex: 1,color: '#fff',fontSize: 16,height: '100%',},
});export default HomePage;