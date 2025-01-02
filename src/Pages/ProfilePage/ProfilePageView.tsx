import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }

const ProfilePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await SecureStore.getItemAsync('userEmail');
      if (email) {
        setUserEmail(email.split('@')[0]);
      }
    };
    getUserEmail();
    fetchTasks();
  }, []);

  const apiurl = "https://rntodoapi.vercel.app";

  const fetchTasks = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) return;

      const response = await axios.get(`${apiurl}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <MaterialIcons name="account-circle" size={120} color="#34C759" />
        </View>
        <Text style={styles.username}>{userEmail}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{incompleteTasks.length}</Text>
            <Text style={styles.statLabel}>Tasks Todo</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{completedTasks.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsLeft}>
              <MaterialIcons name="settings" size={24} color="#34C759" />
              <Text style={styles.settingsText}>App Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsLeft}>
              <MaterialIcons name="person" size={24} color="#34C759" />
              <Text style={styles.settingsText}>Change Account Name</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsLeft}>
              <MaterialIcons name="lock" size={24} color="#34C759" />
              <Text style={styles.settingsText}>Change Account Password</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsLeft}>
              <MaterialIcons name="image" size={24} color="#34C759" />
              <Text style={styles.settingsText}>Change Account Image</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#3A3A3C',
  },
  settingsContainer: {
    width: '80%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    marginTop: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 15,
  }
});

export default ProfilePage;