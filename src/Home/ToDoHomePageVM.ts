import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Task, ToDoHomePageProps } from './ToDoHomePageProps';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
// }

const ToDoHomePageVM = (props: ToDoHomePageProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isTaskTitleFocused, setTaskTitleFocused] = useState(false);
  const [isTaskDescriptionFocused, setTaskDescriptionFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const apiurl = "https://rntodoapi.vercel.app";

  useEffect(() => {
    checkTokenExpiry(props);
    getUserEmail();
    fetchTasks();
  }, []);

  const checkTokenExpiry = async (props: ToDoHomePageProps) => {
    const token = await SecureStore.getItemAsync('userToken');
    const tokenExpiry = await SecureStore.getItemAsync('tokenExpiry');
    
    if (!token || !tokenExpiry) {
      props.navigation.navigate('login');
      return;
    }

    const currentTime = new Date().getTime();
    const expiryTime = parseInt(tokenExpiry);

    if (currentTime > expiryTime) {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('tokenExpiry');
      props.navigation.navigate('login');
      return;
    }
  };
  
  const getUserEmail = async () => {
    const email = await SecureStore.getItemAsync('userEmail');
    if (email) {
      setUserEmail(email.split('@')[0]);
    }
  };

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

  const handleAddTask = async (title: string, description: string) => {
    try {
      if (!title.trim()) return;

      const token = await SecureStore.getItemAsync('userToken');
      
      if (!token) return;

      await axios.post(`${apiurl}/todos`,
        {
          title: title.trim(),
          description: description.trim(),
          completed: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTaskTitle('');
      setTaskDescription('');
      setModalVisible(false);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    // ||
    // task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return {
    isModalVisible,
    setModalVisible,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    isTaskTitleFocused,
    setTaskTitleFocused,
    isTaskDescriptionFocused,
    setTaskDescriptionFocused,
    error,
    tasks,
    isLoading,
    searchQuery,
    setSearchQuery,
    userEmail,
    incompleteTasks,
    completedTasks,
    checkTokenExpiry,
    handleAddTask,
    toggleTaskCompletion,
    fetchTasks,
    filteredTasks
  };
};

export default ToDoHomePageVM;