import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { VictoryPie, LineSegment } from "victory-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InvestmentsScreen = () => {
  const [InvestedValue, setInvestedValue] = useState(19888.06);
  const [CurrentValue, setCurrentValue] = useState(23710.5);
  const [RealizedProfit, setRealizedProfit] = useState(501.82);
  const unrealizedProfit = (CurrentValue - InvestedValue).toFixed(2);
  const [endAngle, setEndAngle] = useState(0);

  const stockdata = {
    data: [
      { x: "Hobbies", y: 350 },
      { x: "Entertainment", y: 400 },
      { x: "Travel", y: 550 },
      { x: "Food", y: 800 },
    ],
  };
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setEndAngle((endAngle) => endAngle + 180);
    }, 2);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>Investments</Text>
            <Icon name="finance" size={35} color="#000000" />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={styles.valuecard}>
              <View>
                <View style={styles.hstack}>
                  <View style={styles.vstack}>
                    <Text style={styles.label}>Invested Value</Text>
                    <Text
                      style={styles.amount}
                    >{`\u20B9${InvestedValue}`}</Text>
                  </View>
                  <View style={{ width: 45 }}></View>
                  <View style={styles.vstack}>
                    <Text style={styles.label}>Current Value</Text>
                    <Text style={styles.amount}>{`\u20B9${CurrentValue}`}</Text>
                  </View>
                </View>
                <View style={styles.hstack}>
                  <View style={styles.vstack}>
                    <Text style={styles.label}>Realized Profit</Text>
                    <Text
                      style={styles.amount}
                    >{`\u20B9${RealizedProfit}`}</Text>
                  </View>
                  <View style={{ width: 40 }}></View>
                  <View style={styles.vstack}>
                    <Text style={styles.label}>Unrealized Profit</Text>
                    <Text
                      style={[
                        styles.amount,
                        unrealizedProfit >= 0
                          ? styles.greenText
                          : styles.redText,
                      ]}
                    >{`\u20B9${unrealizedProfit}`}</Text>
                  </View>
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
              <Text style={styles.chartTitle}>Stocks</Text>
            </View>
            <VictoryPie
              data={stockdata.data}
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
          <View>
            <View style={styles.row}>
              <Card style={styles.minicard}>
                <Text>Card 1</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 2</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 3</Text>
              </Card>
            </View>
            <View style={styles.row}>
              <Card style={styles.minicard}>
                <Text>Card 4</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 5</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 6</Text>
              </Card>
            </View>
            <View style={styles.row}>
              <Card style={styles.minicard}>
                <Text>Card 7</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 8</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 9</Text>
              </Card>
            </View>
            <View style={styles.row}>
              <Card style={styles.minicard}>
                <Text>Card 10</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 11</Text>
              </Card>
              <Card style={styles.minicard}>
                <Text>Card 12</Text>
              </Card>
            </View>
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
    top: 5,
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  valuecard: {
    width: windowWidth * 0.8,
    height: 90,
    alignItems: "center",
    elevation: 5,
    padding: 5,
    marginTop: 15,
  },
  hstack: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  vstack: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 13,
    alignItems: "center",
  },
  greenText: {
    color: "green",
  },
  redText: {
    color: "red",
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  minicard: {
    width: windowWidth * 0.24,
    height: 40,
    alignItems: "center",
    elevation: 5,
    padding: 5,
  },
});

export default InvestmentsScreen;
