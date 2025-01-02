import * as SecureStore from 'expo-secure-store'
import { ToDoHomePageProps } from './ToDoHomePageProps'
import { useState } from 'react'
import axios from 'axios'

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const ToDoHomePageVM = (props: ToDoHomePageProps) => {

    const tasks = [] // This would be replaced with actual tasks state
    const [isModalVisible, setModalVisible] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [isTaskTitleFocused, setTaskTitleFocused] = useState(false);
      const [isTaskDescriptionFocused, setTaskDescriptionFocused] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [tasksload, setTasks] = useState<Task[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitError, setSubmitError] = useState<string | null>(null);

    const checkTokenExpiry = async (props: ToDoHomePageProps) => {
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

      const apiurl = "https://rntodoapi.vercel.app"

      const loadTasks = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
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


      const handleAddTask = async (title: string, description: string) => {
        if (!title.trim()) {
            setSubmitError('Title is required');
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const token = await SecureStore.getItemAsync('userToken');
            if (!token) {
                setSubmitError('No authentication token found');
                return;
            }

            const response = await axios.post(`${apiurl}/todos`, 
                { title, description },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Task added successfully:', response.data);
            
            // Clear form and close modal
            setTaskTitle('');
            setTaskDescription('');
            setModalVisible(false);
            
            // Reload tasks immediately after adding
            await loadTasks();

            return response.data;

        } catch (error: any) {
            console.error('Error adding task:', error);
            setSubmitError('Failed to add task. Please try again.');
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }; 

         const handleAddTaskModal = () => {
                // Add task logic here
                setModalVisible(false)
                setTaskTitle('')
                setTaskDescription('')
              }

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


              const handleProfileNavigation = () => {
                props.navigation.navigate('profile');
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
      
  return {
        checkTokenExpiry,
        fetchTasks,
        tasks,
        isModalVisible,
        setModalVisible,
        taskTitle,
        setTaskTitle,
        taskDescription,
        setTaskDescription,
        handleAddTaskModal,
        handleAddTask,
        isTaskTitleFocused,
        setTaskTitleFocused,
        isTaskDescriptionFocused,
        setTaskDescriptionFocused,
        error,
        tasksload,
        setTasks,
        isLoading,
        setIsLoading,
        loadTasks,
        handleProfileNavigation,
        toggleTaskCompletion

  }
}

export default ToDoHomePageVM