import "react-native-reanimated";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bookmark from "./bookmark";
import Notification from "./notification";
import Settings from "./settings";
import Home from "./home";
import Servers from "./servers";
import {
  Archive,
  ArrowLeft2,
  Home2,
  NotificationBing,
  Setting2,
} from "iconsax-react-native";
import { Colors } from "@/constants";
import IconButton from "@/components/IconButton";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabs = [
  { icon: Home2, path: "home", component: StackNavigator },
  { icon: Archive, path: "bookmark", component: Bookmark },
  { icon: NotificationBing, path: "notification", component: Notification },
  { icon: Setting2, path: "settings", component: Settings },
];

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          height: 84,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.path}
          name={tab.path}
          component={tab.component}
          options={{
            headerShown: false,
            title: tab.path,
            tabBarIcon: ({ color, focused }) => (
              <tab.icon
                size={28}
                color={color}
                variant={focused ? "Bold" : "Outline"}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function StackNavigator() {
  // const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="servers"
        component={Servers}
        options={{
          title: "Select Server",
          headerStyle: {
            backgroundColor: Colors.surface,
            borderBottomColor: "red",
            shadowOpacity: 0,
            height: 100,
          },
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 24,
            color: Colors.white,
          },

          headerLeft: ({ onPress }) => (
            <IconButton
              icon={ArrowLeft2}
              size={24}
              color={Colors.white}
              style={{ marginLeft: 16 }}
              onPress={onPress}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return <TabNavigator />;
}
