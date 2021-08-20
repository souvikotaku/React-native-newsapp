import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import RenderHtml from "react-native-render-html";

export default function App() {
  const [newInput, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const callNewsApi2 = async () => {
    const formatYmd = (date) => date.toISOString().slice(0, 10);
    // console.log(formatYmd(new Date()));

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${newInput}&from=${formatYmd(
        new Date()
      )}&sortBy=publishedAt&apiKey=6473a3e8958c4b59b1ee45966a983e7f`
    );
    const json = await response.json();
    console.log(json);
    setApiData(json.articles);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 10,
          fontSize: 26,
          padding: 5,
        }}
        required={true}
        placeholder="Enter search query"
        onChange={(event) => {
          setInput(event.nativeEvent.text);
          console.log(newInput);
        }}
      ></TextInput>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#b30059",
          display: "flex",
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={() => {
          callNewsApi2();
          setLoading(true);
          // const formatYmd = (date) => date.toISOString().slice(0, 10);
          // console.log(formatYmd(new Date()));
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 26, color: "white" }}>
          {loading === true ? "loading..." : "search articles"}
        </Text>
      </TouchableOpacity>
      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        <StatusBar style="auto" />

        <View>
          {apiData &&
            apiData.map((item, index) => {
              const html = item.description;
              return (
                <View
                  key={index}
                  style={{
                    padding: 20,
                    // borderWidth: 1,
                    borderColor: "#ccc",
                    shadowColor: "#ccc",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    marginBottom: 10,
                  }}
                >
                  <RenderHtml source={{ html }} />

                  <Image
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: `${item.urlToImage}` }}
                  />
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: 50,
                      backgroundColor: "#cc00cc",
                      display: "flex",
                      justifyContent: "center",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    onPress={() => {
                      Linking.openURL(`${item.url}`);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 26,
                        color: "white",
                      }}
                    >
                      Read more
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
        {/* <Image source={{ uri: props.img }}  /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    height: 30,
  },
});
