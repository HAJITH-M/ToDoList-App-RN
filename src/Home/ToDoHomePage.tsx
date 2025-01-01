      import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native'
      import React, { useState, useEffect } from 'react'
      import { ToDoHomePageProps } from './ToDoHomePageProps'
      import MaterialIcons from '@expo/vector-icons/MaterialIcons'
      import * as SecureStore from 'expo-secure-store'
      import images from '../../assets/assets'

      const HomePage = (props: ToDoHomePageProps) => {
        const tasks = [] // This would be replaced with actual tasks state
        const [isModalVisible, setModalVisible] = useState(false)
        const [taskTitle, setTaskTitle] = useState('')
        const [taskDescription, setTaskDescription] = useState('')

        useEffect(() => {
          checkTokenExpiry()
        }, [])

        const checkTokenExpiry = async () => {
          try {
            const expiryTime = await SecureStore.getItemAsync('tokenExpiry')
            if (expiryTime) {
              const currentTime = new Date().getTime()
              if (currentTime > parseInt(expiryTime)) {
                await SecureStore.deleteItemAsync('userToken')
                await SecureStore.deleteItemAsync('tokenExpiry')
                props.navigation.navigate('login')
              }
            } else {
              props.navigation.navigate('login')
            }
          } catch (error) {
            console.log(error)
            props.navigation.navigate('login')
          }
        }

        const handleAddTask = () => {
          // Add task logic here
          setModalVisible(false)
          setTaskTitle('')
          setTaskDescription('')
        }

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Welcome, email</Text>
              <TouchableOpacity style={styles.profileButton}>
                <MaterialIcons name="account-circle" size={40} color="#fff" />
              </TouchableOpacity>
            </View>

            {tasks.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={images.SplashIcon}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>
              </View>
            ) : (
              <View style={styles.taskList}>
                {/* Task list will go here */}
              </View>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add New Task</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    placeholderTextColor="#666"
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                  />
                  <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Task Description"
                    placeholderTextColor="#666"
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                    multiline
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.submitButton]}
                      onPress={handleAddTask}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="add" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )
      }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'black',
          padding: 16,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        },
        welcomeText: {
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
        },
        profileButton: {
          position: 'absolute',
          right: 0,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        emptyImage: {
          width: 200,
          height: 200,
          marginBottom: 20,
        },
        emptyText: {
          color: '#fff',
          fontSize: 16,
          textAlign: 'center',
        },
        taskList: {
          flex: 1,
        },
        addButton: {
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: '#007AFF',
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          backgroundColor: 'black',
          borderRadius: 10,
          padding: 20,
          width: '90%',
          maxWidth: 400,
        },
        modalTitle: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
          textAlign: 'center',
          color: '#fff',
        },
        input: {
          borderWidth: 1,
          borderColor: '#666',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          color: '#fff',
          backgroundColor: '#1a1a1a',
        },
        descriptionInput: {
          height: 100,
          textAlignVertical: 'top',
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        },
        button: {
          flex: 1,
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 5,
        },
        submitButton: {
          backgroundColor: '#007AFF',
        },
        cancelButton: {
          backgroundColor: '#FF3B30',
        },
        buttonText: {
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
        },
      })

      export default HomePage