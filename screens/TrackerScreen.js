import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from "react-native-chart-kit";
import * as Progress from "react-native-progress";
import { VictoryPie, VictoryLabel, LineSegment } from "victory-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const amountUsed = 6200;
const budgetAmount = 10000;
const percentageUsed = (amountUsed / budgetAmount) * 100;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [6813, 5200, 2000, 7240, 5568, 8000],
    },
  ],
};

function* yLabel() {
  // Find the maximum value in the dataset
  const maxDataValue = Math.max(...data.datasets[0].data);
  // Generate uniform labels based on the maximum value
  yield* [
    0,
    maxDataValue / 4,
    maxDataValue / 2,
    maxDataValue * 0.75,
    maxDataValue,
  ];
}

const TrackerScreen = () => {
  const yLabelIterator = yLabel();
  const [endAngle, setEndAngle] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setEndAngle(endAngle => endAngle + 90); // Increase endAngle gradually
    }, 2); // Adjust the interval duration for smoother animation

    // Clear interval when component unmounts
    return () => clearInterval(animationInterval);
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>Expense Summary</Text>
            <Icon name="chart-arc" size={35} color="#000000" />
          </View>
          <View>
            <Progress.Bar
              progress={percentageUsed / 100}
              width={200}
              height={30}
              color={"blue"}
              borderColor={"grey"}
              borderRadius={10}
              useNativeDriver={true}
              animationType={"timing"}
            />
          </View>
            <View>
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
                // labelComponent={<VictoryLabel angle={45}/>}
                // labelRadius={({ innerRadius }) => innerRadius + 5 }
                padAngle={2}
                innerRadius={60}
                width={300}
                height={270}
                style={{
                  data: {
                    fillOpacity: 0.9, stroke: "#ffffff", strokeWidth: 1
                  },
                  labels: {
                    fontSize: 15, fill: "#000000"
                  }
                }}
                labelIndicator={ <LineSegment style={{ stroke: "black", fill: "black", strokeLinecap: "round" }}/>}
                labelIndicatorInnerOffset={5}
              />
            </View>
          <View style={{ alignItems: "center", marginRight: 10 }}>
            <BarChart
              data={data}
              width={windowWidth * 0.90}
              height={windowHeight * 0.3}
              yAxisLabel={"\u20B9"}
              yAxisInterval={0}
              withInnerLines={false}
              withOuterLines={false}
              fromZero={true}
              showValuesOnTopOfBars={true}
              formatYLabel={() => yLabelIterator.next().value}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                barRadius: 5,
                formatYLabel: () => yLabelIterator.next().value,
                color: (opacity = 1) => `rgba(81, 85, 89, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
              }}
            />
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
  inputContainer: {
    width: 250,
    height: 95,
  },
});

export default TrackerScreen;
