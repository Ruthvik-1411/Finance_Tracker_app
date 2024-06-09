import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

import { cardDetails } from "./utils/BankCardData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function getCardDetails(bank, cardType) {
  const bankData = cardDetails[bank] || cardDetails["default"];
  return bankData[cardType] || cardDetails["default"][cardType];
}

const CardsScreen = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedbank, setSelectedbank] = useState("default");
  const [selectedCardtype, setSelectedCardtype] = useState("debit");
  const [displayedCardDetails, setDisplayedCardDetails] = useState(
    getCardDetails(selectedbank, selectedCardtype)
  );

  useEffect(() => {
    setDisplayedCardDetails(getCardDetails(selectedbank, selectedCardtype));
  }, [selectedbank, selectedCardtype]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>Cards</Text>
            <Icon name="credit-card-scan" size={35} color="#000000" />
          </View>
          <View style={styles.hstack}>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedbank}
                style={styles.dropdownbin}
                backgroundColor="blue"
                mode="dropdown"
                onValueChange={(itemValue) => setSelectedbank(itemValue)}
              >
                <Picker.Item label="Bank" value="default" />
                <Picker.Item label="HDFC" value="hdfc" />
                <Picker.Item label="SBI" value="sbi" />
                <Picker.Item label="ICICI" value="icici" />
              </Picker>
            </View>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedCardtype}
                style={styles.dropdowntx}
                backgroundColor="blue"
                mode="dropdown"
                onValueChange={(itemValue) => setSelectedCardtype(itemValue)}
              >
                <Picker.Item label="Type" value="debit" />
                <Picker.Item label="Debit" value="debit" />
                <Picker.Item label="Credit" value="credit" />
              </Picker>
            </View>
          </View>
          <View>
            <Card style={styles.cardstyle}>
              <View style={styles.cardheader}>
                <View>
                  <Text>{displayedCardDetails.category}</Text>
                </View>
                <View>
                  <Image
                    source={{
                      uri: displayedCardDetails.banklogo,
                    }}
                    style={styles.banklogo}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.cardstaticheader}>
                <Image
                  source={{
                    uri: "https://github.com/Ruthvik-1411/Finance_Tracker_app/blob/main/assets/card_assets/card_chip.png?raw=true",
                  }}
                  style={styles.chipstyle}
                  resizeMode="contain"
                />
                <Image
                  source={{
                    uri: "https://github.com/Ruthvik-1411/Finance_Tracker_app/blob/main/assets/card_assets/nfc_logo-bg.png?raw=true",
                  }}
                  style={styles.nfcstyle}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardNumbercontainer}>
                <Text style={styles.cardNumberText}>
                  {displayedCardDetails.number}
                </Text>
              </View>
              <View style={styles.middlecontainer}>
                <Text style={styles.textheader}>Valid{"\n"}Thru</Text>
                <Text style={styles.expiryDateText}>
                  {" "}
                  {displayedCardDetails.validity}{" "}
                </Text>
                <Text style={styles.textheader}>CVV</Text>
                <Text style={styles.cvvText}> {displayedCardDetails.cvv}</Text>
              </View>
              <View style={styles.cardfooter}>
                <Text style={styles.cardHolder}>
                  {displayedCardDetails.holdername}
                </Text>
                <Image
                  source={{
                    uri: displayedCardDetails.gatewaylogo,
                  }}
                  style={styles.gatewaylogo}
                  resizeMode="contain"
                />
              </View>
            </Card>
          </View>
          <View>
            <Button
              onPress={() => setShowDetails(true)}
              icon={<Icon name="eye" size={15} color={"black"} />}
              type="clear"
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
    alignItems: "flex-start",
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  hstack: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  dropdownContainer: {
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 12,
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 15,
  },
  dropdownbin: {
    width: 140,
    height: 20,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
    justifyContent: "center",
  },
  dropdowntx: {
    width: 130,
    height: 20,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
  },
  cardstyle: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.24,
    borderRadius: 10,
    elevation: 5,
    margin: 15,
    padding: 5,
    backgroundColor: "#4b7bec",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // justifyContent: 'space-between'
  },
  cardheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  banklogo: {
    width: 100,
    height: 30,
    // backgroundColor: "#ffffff",
  },
  cardstaticheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nfcstyle: {
    width: 40,
    height: 40,
    marginTop: 20,
    tintColor: "#ffffff",
  },
  chipstyle: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  cardNumbercontainer: {
    alignItems: "center",
    marginTop: 2,
    // backgroundColor: "#ffffff",
  },
  cardNumberText: {
    fontSize: 18,
    color: "#ffffff",
    letterSpacing: 2,
  },
  middlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  textheader: {
    fontSize: 10,
    color: "#000000",
  },
  expiryDateText: {
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 1,
  },
  cvvText: {
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 1,
  },
  cardfooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
  },
  cardHolder: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 5,
    marginTop: 15,
    // backgroundColor: "#fff",
  },
  gatewaylogo: {
    width: 60,
    height: 40,
    marginLeft: 10,
    // backgroundColor: "#fff",
  },
});

export default CardsScreen;
