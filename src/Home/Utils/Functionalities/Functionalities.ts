import axios from "axios";
import * as SecureStore from 'expo-secure-store';



const Functionalities = () => {


    type User = {
        email: string,
        password: string;
    };

    interface Task {
        title: string;
        description: string;
        date: string;
      }

    const apiurl = "https://rntodoapi.vercel.app"

 


    const handleaddtask = async (title: string, description: string) => {
        try {
          const token = await SecureStore.getItemAsync('token');
          if (!token) {
            console.log('No token found');
            return;
          }
      
          console.log('Sending request with:', { title, description, token }); // Debug log
          console.log("#######################")
      
          const response = await axios.post(`${apiurl}/todos`, 
            { title, description },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          );
      
          console.log('Response:', response.data); // Debug log
          return response.data;
      
        } catch (error: any) {
          console.error('Full error:', error); // Detailed error log
          throw error;
        }
      }; 
      
         const handleDeleteTask = async (title: string) => {
          try {
            // Retrieve stored tasks from AsyncStorage
            const storedTasks = await SecureStore.getItemAsync('tasks');
            if (storedTasks) {
              const tasks = JSON.parse(storedTasks);
        
              // Filter out the task to be deleted by its title (or any other identifier)
              const updatedTasks = tasks.filter((task: Task) => task.title !== title);
        
              // Save the updated task list back to AsyncStorage
              await SecureStore.setItemAsync('tasks', JSON.stringify(updatedTasks));
        
              console.log(`Task with title "${title}" deleted successfully.`);
            }
          } catch (error) {
            console.log('Error deleting task:', error);
          }
        };

  return{
 
        handleaddtask,
        handleDeleteTask

  }
}

export default Functionalities