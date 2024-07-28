import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { VictoryPie, LineSegment } from "victory-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InvestmentsScreen = () => {
  const [endAngle, setEndAngle] = useState(0);

  // need to set requestdata when api is called, so keep a default one and replace the value
  //Todo: Add state setter to update request data 
  const requestData = {
    portfolio: {
      investedValue: "19888.06",
      currentValue: "23710.5",
      realizedProft: "501.82",
      unrealizedProfit: "4178.44",
    },
    sector: [
      { x: "Telecom", y: "10%" },
      { x: "Defence", y: "15%" },
      { x: "Mining", y: "10%" },
      { x: "IT", y: "20%" },
      { x: "Bank", y: "25%" },
    ],
    holding: [
      {
        name: "BEL",
        qty: 10,
        purchasecost: 113.83,
        currentcost: 324.05,
        rtdelta: 2.11,
      },
      {
        name: "HDFCBANK",
        qty: 10,
        purchasecost: 1572.62,
        currentcost: 1648.1,
        rtdelta: -4.58,
      },
      {
        name: "BHARTIARTL",
        qty: 2,
        purchasecost: 690.55,
        currentcost: 1429.7,
        rtdelta: 0.47,
      },
      {
        name: "WIPRO",
        qty: 2,
        purchasecost: 426.49,
        currentcost: 535.1,
        rtdelta: 0.83,
      },
      {
        name: "HCLTECH",
        qty: 5,
        purchasecost: 1327.34,
        currentcost: 1519.4,
        rtdelta: -0.19,
      },
      {
        name: "TATASTEEL",
        qty: 10,
        purchasecost: 112.58,
        currentcost: 174.71,
        rtdelta: -0.9,
      },
      {
        name: "ITC",
        qty: 10,
        purchasecost: 436.61,
        currentcost: 433.65,
        rtdelta: 1.07,
      },
    ],
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setEndAngle((endAngle) => endAngle + 180);
    }, 2);

    return () => clearInterval(animationInterval);
  }, []);

  const getunrealizedpercent = (purchasecostcost, currentcost, qty) => {
    const totalcurrentvalue = currentcost * qty;
    const totalpurchasevalue = purchasecostcost * qty;
    return (
      ((totalcurrentvalue - totalpurchasevalue) / totalpurchasevalue) * 100
    );
  };

  const CustomStockItem = ({
    name,
    qty,
    purchasecost,
    currentcost,
    rtdelta,
  }) => (
    <Card style={styles.minicard}>
      <View>
        <View style={styles.holdingcontainer}>
          <View style={styles.holdinghstack}>
            <Text style={styles.nameText}>{name} </Text>
            <Icon name="briefcase" size={10} />
            <Text style={styles.qtyText}>{qty}</Text>
          </View>
          <View style={styles.holdinghstack}>
            <Text
              style={styles.holdingvalueText}
            >{`\u20B9${currentcost}`}</Text>
            <Text
              style={[
                styles.deltaText,
                { color: rtdelta >= 0 ? "green" : "red" },
              ]}
            >
              ({rtdelta}%)
            </Text>
          </View>
        </View>
        <View style={styles.holdingcontainer}>
          <View style={styles.vstack}>
            <Text style={styles.holdingLabel}>Invested Value</Text>
            <Text style={styles.holdingvalueText}>{`\u20B9${(
              purchasecost * qty
            ).toFixed(2)}`}</Text>
          </View>
          <View style={styles.vstack}>
            <Text style={styles.holdingLabel}>Unrealized Profit</Text>
            <View style={styles.holdinghstack}>
              <Text style={styles.holdingvalueText}>{`\u20B9${(
                (currentcost - purchasecost) *
                qty
              ).toFixed(2)}`}</Text>
              <Text
                style={[
                  styles.deltaText,
                  { color: currentcost - purchasecost >= 0 ? "green" : "red" },
                ]}
              >
                (
                {getunrealizedpercent(purchasecost, currentcost, qty).toFixed()}
                %)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.entryContainer}>
          <Text style={styles.entryTitle}>Investments</Text>
          <Icon name="finance" size={35} color="#000000" />
        </View>
        <View style={styles.valuecardstyle}>
          <Card style={styles.valuecard}>
            <View>
              <View style={styles.hstack}>
                <View style={styles.vstack}>
                  <Text style={styles.valueLabel}>Invested Value</Text>
                  <Text style={styles.amount}>{`\u20B9${requestData.portfolio.investedValue}`}</Text>
                </View>
                <View style={{ width: 45 }}></View>
                <View style={styles.vstack}>
                  <Text style={styles.valueLabel}>Current Value</Text>
                  <Text style={styles.amount}>{`\u20B9${requestData.portfolio.currentValue}`}</Text>
                </View>
              </View>
              <View style={styles.hstack}>
                <View style={styles.vstack}>
                  <Text style={styles.valueLabel}>Realized Profit</Text>
                  <Text style={styles.amount}>{`\u20B9${requestData.portfolio.realizedProft}`}</Text>
                </View>
                <View style={{ width: 40 }}></View>
                <View style={styles.vstack}>
                  <Text style={styles.valueLabel}>Unrealized Profit</Text>
                  <Text
                    style={[
                      styles.amount,
                      styles.deltaText,
                      { color: Number(requestData.portfolio.unrealizedProfit) >= 0 ? "green" : "red" },
                    ]}
                  >{`\u20B9${requestData.portfolio.unrealizedProfit}`}</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartTitlestyle}>
            <Text style={styles.chartTitle}>Stocks</Text>
          </View>
          <VictoryPie
            data={requestData.sector}
            endAngle={endAngle}
            labels={({ datum }) => `${datum.x}: \n ${datum.y}`}
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
          <Text style={styles.holdingTitle}>Holdings</Text>
          <View style={styles.scrollableBoxContainer}>
            <ScrollView style={styles.scrollableBox}>
              {requestData.holding.map((item, index) => (
                <CustomStockItem key={index} {...item} />
              ))}
            </ScrollView>
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
  valueLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 13,
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    marginBottom: 10,
  },
  chartTitlestyle: {
    position: "absolute",
    left: 45,
    top: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  holdingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    left: 45,
  },
  scrollableBoxContainer: {
    width: windowWidth * 0.85,
    height: 200,
    margin: 5,
    marginLeft: 25,
  },
  scrollableBox: {
    flex: 1,
  },
  minicard: {
    width: windowWidth * 0.84,
    height: 60,
    elevation: 5,
    margin: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  holdingcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  holdinghstack: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  qtyText: {
    marginLeft: 2,
    fontSize: 12,
  },
  holdingLabel: {
    fontSize: 12,
  },
  holdingvalueText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  deltaText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default InvestmentsScreen;
