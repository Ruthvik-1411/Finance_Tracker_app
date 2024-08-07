import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
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

import { trackerScreen_requestData } from "./utils/ProxyAPIData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TrackerScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [endAngle, setEndAngle] = useState(0);
  const animationRef = useRef(null);
  const [isloading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // follow this api request format for backend
  const defaultrequestData = {
    budget: {
      amountUsed: 6200,
      budgetAmount: 10000,
      budgetLeft: 3800,
      percentageUsed: 62,
    },
    byCategory: [
      { x: "Hobbies", y: 350 },
      { x: "Entertainment", y: 400 },
      { x: "Travel", y: 550 },
      { x: "Food", y: 800 },
    ],
    byMonth: {
      Jan: 6813,
      Feb: 5200,
      Mar: 2000,
      Apr: 7240,
      May: 5568,
      Jun: 9000,
    },
  };

  const [requestData, setRequestData] = useState(defaultrequestData);

  const formatDate = useCallback((date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  }, []);

  const checkfetchnew = useCallback(
    async (chosenDate) => {
      const currentDate = new Date();
      setIsLoading(true);
      try {
        if (
          isFirstLoad ||
          chosenDate.getMonth() !== currentDate.getMonth() ||
          chosenDate.getFullYear() !== currentDate.getFullYear()
        ) {
          // Simulate API call
          // const response = await fetch('api-endpoint');
          // const newData = await response.json();
          setRequestData(trackerScreen_requestData);
          setIsFirstLoad(false);
        }
      } catch (error) {
        Alert.alert("Error fetching data, failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    },
    [isFirstLoad]
  );

  const onChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
      checkfetchnew(currentDate);
    },
    [date, checkfetchnew]
  );

  useEffect(() => {
    checkfetchnew(new Date());
  }, []);

  useEffect(() => {
    const animate = () => {
      setEndAngle((angle) => angle + 180);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.entryContainer}>
          <Text style={styles.entryTitle}>Summary </Text>
          <Icon name="chart-arc" size={35} color="#000000" />
        </View>
        <View style={styles.hstack}>
          <View style={{ width: 140, height: 35 }}>
            {isloading && <ActivityIndicator size="large" color="#000000" />}
          </View>
          <View>
            <Card style={styles.datecard}>
              <View style={styles.dateelements}>
                <Text>{formatDate(date).toString()}</Text>
                <IconButton
                  icon="chevron-down"
                  iconColor="#000000"
                  size={22}
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                />
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    maximumDate={new Date()}
                    onChange={onChange}
                  />
                )}
              </View>
            </Card>
          </View>
        </View>
        <View style={styles.valuecardstyle}>
          <Card style={styles.valuecard}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Spent</Text>
              <Text style={styles.label}>Total Budget</Text>
              <Text style={styles.label}>Budget Left</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={styles.amount}
              >{`\u20B9${requestData.budget.amountUsed}`}</Text>
              <Text
                style={styles.amount}
              >{`\u20B9${requestData.budget.budgetAmount}`}</Text>
              <Text
                style={styles.amount}
              >{`\u20B9${requestData.budget.budgetLeft}`}</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <Progress.Bar
                progress={requestData.budget.percentageUsed / 100}
                width={windowWidth * 0.7}
                height={20}
                color={"rgba(128,128,128,0.5)"}
                borderRadius={10}
                style={styles.progressBar}
              ></Progress.Bar>
              <View style={styles.budgetusedleft}>
                <Text>{`${requestData.budget.percentageUsed.toFixed(
                  2
                )}%`}</Text>
              </View>
              <View style={styles.budgetusedright}>
                <Text>{`${(100 - requestData.budget.percentageUsed).toFixed(
                  2
                )}%`}</Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartTitlestyle}>
            <Text style={styles.chartTitle}>Analysis</Text>
          </View>
          <VictoryPie
            data={requestData.byCategory}
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
          <View style={styles.chartTitlestyle}>
            <Text style={styles.chartTitle}>Trend</Text>
          </View>
          <View style={styles.barchartstyle}>
            <VictoryChart width={300} height={240}>
              <VictoryAxis
                tickValues={Object.keys(requestData.byMonth)}
                style={{
                  tickLabels: { fontSize: 10, padding: 2 },
                  axis: { stroke: "none" }, // Hide axis line
                  grid: { stroke: "none" }, // Hide grid lines
                }}
                tickLabelComponent={<VictoryLabel dx={12} />}
              />
              <VictoryBar
                data={Object.keys(requestData.byMonth).map((month, index) => ({
                  x: month,
                  y: requestData.byMonth[month],
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
        </View>
      </Card>
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
    marginBottom: 10,
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
  datecard: {
    width: 100,
    elevation: 5,
    height: 35,
  },
  dateelements: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    bottom: 7,
  },
  valuecardstyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  valuecard: {
    width: windowWidth * 0.8,
    height: 90,
    alignItems: "center",
    elevation: 5,
    padding: 5,
    marginBottom: -10,
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
  budgetusedleft: {
    position: "absolute",
    left: 10,
    top: 12,
  },
  budgetusedright: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    marginBottom: -20,
  },
  chartTitlestyle: {
    position: "absolute",
    left: 45,
    top: 25,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  barchartstyle: {
    marginTop: 20,
  },
  inputContainer: {
    width: 250,
    height: 95,
  },
});

export default TrackerScreen;
