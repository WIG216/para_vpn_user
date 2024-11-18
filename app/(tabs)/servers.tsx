import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Images } from "@/constants";
import { ArrowLeft2, Star1 } from "iconsax-react-native";
import ListWithTitle from "@/components/ListWithTitle";
import { useServers } from "@/servers/queries";
import TestList from "@/components/testList";
import { RefreshControl } from "react-native-gesture-handler";

// // Data for fast and all servers
// const fastServers: RecentLocation[] = [
//   { id: "1", country: "Netherlands", flag: Images.nl, signal: "medium" },
//   { id: "2", country: "United States", flag: Images.us, signal: "high" },
// ];

// const allServers: RecentLocation[] = [
//   { id: "1", country: "Netherlands", flag: Images.nl, signal: "medium" },
//   { id: "2", country: "United States", flag: Images.us, signal: "high" },
//   { id: "3", country: "Canada ", flag: Images.us, signal: "low" },
// ];

const Servers = () => {
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useServers();

  const { allServers = [], lastTwoServers = [] } = data || {};
    useEffect(() => {
    if (error) {
      setSnackbarMessage(error.message || "Failed to load all servers.");
      setSnackbarVisible(true);
    }
  }, [error]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Trigger the refetch from React Query
    setRefreshing(false); // Reset the refreshing state
  };

  // console.log(error)

  return (
    <SafeAreaView style={styles.container}>
       {refreshing && (
        <View>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      )}
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <TestList title="Fastest Servers" data={lastTwoServers} />
            <View style={styles.bannerContainer}>
              <View style={styles.textContainer}>
                <Image source={Images.star} style={styles.starIcon} />
                <Text style={styles.title}>Go Pro</Text>
                <Text style={styles.subtitle}>
                  You can connect to 100 servers all over the world
                </Text>
              </View>
              <Image source={Images.vpn} />
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <TestList title="All Servers" data={allServers ||[]} />
            )}

            {/* Snackbar logic can be integrated here */}
            {/* Uncomment and use if you have Snackbar component */}
            {/* 
            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={Snackbar.DURATION_SHORT}
              action={{
                label: "Dismiss",
                onPress: () => setSnackbarVisible(false),
              }}
            >
              {snackbarMessage}
            </Snackbar>
            */}
          </>
        )}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} // Trigger the onRefresh function
            colors={[Colors.primary]} // Optional: Customize the color of the refresh indicator
          />
        }
      />
    </SafeAreaView>
  );
};

export default Servers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowRadius: 10,
    marginVertical: 24,
  },
  textContainer: {
    flex: 1,
    position: "relative",
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  starIcon: {
    position: "absolute",
    top: -20,
  },
});
