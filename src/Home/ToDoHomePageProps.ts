import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigations/typesRootNavigation";

export type ToDoHomePageProps = NativeStackScreenProps<RootStackParamList, 'homepage'>;
export interface Task {
      id: number;
      title: string;
      description: string;
      completed: boolean;
      createdAt: string;

}