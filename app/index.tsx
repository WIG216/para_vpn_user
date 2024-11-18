import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "@/constants";
import Button from "@/components/Button";
import { router } from "expo-router";

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <View style={styles.scaffold}>
        <ImageBackground
          source={Images.onboarding}
          style={styles.background}
          resizeMode="contain"
        />
        <ImageBackground
          source={Images.countries}
          style={styles.background}
          resizeMode="contain"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.0)", "#001336"]}
          style={styles.background}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Welcome to PARA VPN</Text>
        <Text style={styles.subtitle}>
          PARA VPN is the fastest VPN in the world that provides you with more
          than 50 servers in countries all over the world
        </Text>

        <Button
          containerStyles={{ marginTop: 42 }}
          title="Get Started"
          handlePress={() => router.push("/home")}
        />
      </View>
      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scaffold: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.surface,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "80%",
  },
  bodyContainer: {
    paddingTop: 19,
    position: "absolute",
    top: "65%",
    paddingHorizontal: 22,
    paddingBottom: 40,
    color: Colors.white,
    height: "30%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontWeight: 500,
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 22,
  },
  subtitle: {
    color: Colors.label,
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
