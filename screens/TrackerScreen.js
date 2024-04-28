import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from "react-native-progress";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  LineSegment,
} from "victory-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TrackerScreen = () => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [endAngle, setEndAngle] = useState(0);

  const amountUsed = 6200;
  const budgetAmount = 10000;
  const budgetLeft = budgetAmount - amountUsed;
  const percentageUsed = (amountUsed / budgetAmount) * 100;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [6813, 5200, 2000, 7240, 5568, 9000],
      },
    ],
  };


  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setEndAngle((endAngle) => endAngle + 180); // Increase endAngle gradually
    }, 2); // Adjust the interval duration for smoother animation

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>Summary </Text>
            <Icon name="chart-arc" size={35} color="#000000" />
          </View>
          <View style={styles.hstack}>
            <View style={{ width: 140, height: 60 }}></View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Card
                style={{
                  width: 100,
                  alignItems: "center",
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text>{formatDate(date).toString()}</Text>
                  <Button
                    onPress={() => setShowDatePicker(true)}
                    icon={
                      <Icon name="chevron-down" size={15} color={"black"} />
                    }
                    type="clear"
                  />
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={"date"}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </Card>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                width: windowWidth * 0.8,
                height: 90,
                alignItems: "center",
                elevation: 5,
                padding: 5,
              }}
            >
              <View style={styles.row}>
                <Text style={styles.label}>Total Spent</Text>
                <Text style={styles.label}>Total Budget</Text>
                <Text style={styles.label}>Budget Left</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.amount}>{`\u20B9${amountUsed}`}</Text>
                <Text style={styles.amount}>{`\u20B9${budgetAmount}`}</Text>
                <Text style={styles.amount}>{`\u20B9${budgetLeft}`}</Text>
              </View>
              <View style={{ flex: 1, width: "100%" }}>
                <Progress.Bar
                  progress={percentageUsed / 100}
                  width={windowWidth * 0.7}
                  height={20}
                  color={"rgba(128,128,128,0.5)"}
                  borderRadius={10}
                  style={styles.progressBar}
                ></Progress.Bar>
                <View
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 12,
                  }}
                >
                  <Text>{`${percentageUsed}%`}</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 12,
                  }}
                >
                  <Text>{`${100 - percentageUsed}%`}</Text>
                </View>
              </View>
            </Card>
          </View>
          <View style={styles.chartContainer}>
            <View
              style={{
                position: "absolute",
                left: 45,
                top: 2,
              }}
            >
              <Text style={styles.chartTitle}>Analysis</Text>
            </View>
            <VictoryPie
              data={[
                { x: "Hobbies", y: 350 },
                { x: "Entertainment", y: 400 },
                { x: "Travel", y: 550 },
                { x: "Food", y: 800 },
              ]}
              endAngle={endAngle}
              labels={({ datum }) => `${datum.x}: \n \u20B9${datum.y}`}
              labelPosition={"centroid"}
              padAngle={2}
              innerRadius={35}
              width={windowWidth}
              height={200}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                },
                labels: {
                  fontSize: 13,
                  fill: "#000000",
                },
              }}
              labelIndicator={
                <LineSegment
                  style={{
                    stroke: "black",
                    fill: "black",
                    strokeLinecap: "round",
                  }}
                />
              }
              labelIndicatorInnerOffset={2}
            />
          </View>
          <View style={styles.chartContainer}>
            <View
              style={{
                position: "absolute",
                left: 45,
                top: 25,
              }}
            >
              <Text style={styles.chartTitle}>Trend</Text>
            </View>
            <VictoryChart width={300} height={240}>
              <VictoryAxis
                tickValues={data.labels}
                style={{
                  tickLabels: { fontSize: 10, padding: 2 },
                  axis: { stroke: "none" }, // Hide axis line
                  grid: { stroke: "none" }, // Hide grid lines
                }}
                tickLabelComponent={<VictoryLabel dx={12} />}
              />
              <VictoryBar
                data={data.datasets[0].data.map((y, index) => ({
                  x: data.labels[index],
                  y,
                }))}
                barRatio={0.8}
                cornerRadius={5}
                barWidth={20}
                labels={({ datum }) => `\u20B9${datum.y}`}
                labelComponent={
                  <VictoryLabel
                    dy={-2}
                    dx={10}
                    style={{
                      tickLabels: { fontSize: 12 },
                    }}
                  />
                }
                style={{ data: { fill: "rgba(128,128,128,0.5)" } }}
                alignment="start" // Align bars to the right of the tick marks
              />
            </VictoryChart>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.85,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hstack: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 12,
    alignItems: "center",
  },
  progressBar: {
    marginTop: 10,
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    marginBottom: -10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    width: 250,
    height: 95,
  },
});

export default TrackerScreen;
