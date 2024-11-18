import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Images } from "@/constants";


interface ListWithTitleProps {
  title: string;
  data: RecentLocation[];
  keyExtractor?: (item: RecentLocation, index: number) => string;
}

const ListWithTitle = ({ title, data, keyExtractor }: ListWithTitleProps) => {
  const serverSignal: Record<SignalType, any> = {
    high: Images.high,
    low: Images.low,
    medium: Images.medium,
  };

  const renderItem = ({ item }: { item: RecentLocation }) => (
    <TouchableOpacity style={styles.locationContainer}>
      <View
        style={{
          flexDirection: "row",
          columnGap: 8,
          alignItems: "center",
          width: "80%",
        }}
      >
        <Image
          source={ item.flag }
          style={{ height: 12, width: 16 }}
          resizeMode="contain"
        />
        <Text style={styles.locationText}>{item.country}</Text>
      </View>
      <Image source={serverSignal[item.signal]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  locationText: {
    color: Colors.white,
    fontSize: 16,
    flex: 1,
  },
});

export default ListWithTitle;
