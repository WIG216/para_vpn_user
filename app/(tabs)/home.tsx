import { Colors, Images } from "@/constants";
// import { router } from "expo-router";
import {
  ArrowDown,
  ArrowUp,
  HambergerMenu,
  Location,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import ListWithTitle from "@/components/ListWithTitle";
import { useServers } from "@/servers/queries";
import TestList from "@/components/testList";
interface recentLocations {
  id: string;
  country: string;
  flag: string;
  signal: string;
}

const recentLocations: RecentLocation[] = [
  { id: "1", country: "Netherlands", flag: Images.nl, signal: "medium" },
  { id: "2", country: "United States", flag: Images.us, signal: "high" },
];
export default function Home() {
  const navigation = useNavigation();
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const { data, isLoading, error } = useServers();

  const { allServers = [], lastTwoServers = [] } = data || {};
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.message || "Failed to load all servers.");
      setSnackbarVisible(true);
    }
  }, [error]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconWrapper}>
            <HambergerMenu size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PARA VPN</Text>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => navigation.navigate("servers")}
          >
            <Location size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Power Button */}
        <View style={styles.powerContainer}>
          <TouchableOpacity style={styles.powerButton}>
            <Image source={Images.connect} resizeMode="contain" />
            {/* <Text style={styles.powerIcon}>⏻</Text> */}
          </TouchableOpacity>
          <Text style={styles.connectionStatus}>Connected</Text>
          <Text style={styles.currentLocation}>
            Your Current Location:{" "}
            <Text style={styles.locationHighlight}>Netherlands</Text>
          </Text>
        </View>

        {/* Speed Info */}
        <View style={styles.arrowsWrapper}>
          <View style={styles.arrowRow}>
            <ArrowUp color="green" size={20} />
            <Text style={{ color: Colors.white }}>25MB/s</Text>
          </View>
          <View style={styles.arrowRow}>
            <ArrowDown color="red" size={20} />
            <Text style={{ color: Colors.white }}>15KB/s</Text>
          </View>
        </View>
        {/* Recent Locations */}
        {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <TestList title="Your recent locations" data={lastTwoServers ||[]} />
            )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1738",
    paddingHorizontal: 16,
  },
  iconWrapper: {
    padding: 12,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "400",
  },
  powerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    height: "58%",
  },
  powerButton: {
    width: 115,
    height: 115,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  powerIcon: {
    color: Colors.white,
    fontSize: 36,
  },
  connectionStatus: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  currentLocation: {
    color: "#9BA1B5",
    fontSize: 14,
  },
  locationHighlight: {
    color: Colors.white,
    fontWeight: "600",
  },
  speedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  arrowsWrapper: {
    display: "flex",
    flexDirection: "row",
    columnGap: 27,
    marginBottom: 61,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainer,
  },

  signalIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  signalHigh: {
    backgroundColor: "#00FF00",
  },
  signalLow: {
    backgroundColor: "#FF0000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#1A2565",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
});
