import React, { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const BankingScreen = () => {
  const [selectedbank, setSelectedbank] = useState("default_bank");
  const [aadharnumber, setAadharnumber] = useState("0000 0000 0000");
  const [pannumber, setPannumber] = useState("ABCDE12340");
  const [displayaadhar, setDisplayaadhar] = useState(false);
  const [displaypan, setDisplaypan] = useState(false);

  const upi_data = [
    {
      upi_app: "Gpay",
      bank_data: "HDFC 4366",
      ac_type: "Debit",
      upi_id: "abcd@okhdfc.com",
    },
    {
      upi_app: "Gpay",
      bank_data: "HDFC 2396",
      ac_type: "Credit",
      upi_id: "my_cool_id@okicicdfcbank",
    },
    {
      upi_app: "Phonepay",
      bank_data: "HDFC 9446",
      ac_type: "Debit",
      upi_id: "7513abcd@ybl.com",
    },
    {
      upi_app: "Phonepay",
      bank_data: "SBI 1450",
      ac_type: "Debit",
      upi_id: "abshsrhshcuw474gc55wd@icici.com",
    },
    {
      upi_app: "i ici",
      bank_data: "ICIC 1246",
      ac_type: "Debit",
      upi_id: "abcd758493@dfc.com",
    },
    {
      upi_app: "ICIC",
      bank_data: "ICIC 1010",
      ac_type: "Debit",
      upi_id: "abcd758493@dfc.com",
    },
  ];

  const bankingdata = {
    hdfc: {
      acnumber: "11234567890123",
      username: "qwertyuiop",
      ifsccode: "HGTE1248936",
    },
    hsbc: {
      acnumber: "11123456789012",
      username: "qwertyuiop",
      ifsccode: "HGTE1248939",
    },
    iicic: {
      acnumber: "11112345678901",
      username: "qwertyuiop",
      ifsccode: "HGTE1248932",
    },
  };

  const CustomUpiItem = ({ upi_app, bank_data, ac_type, upi_id }) => {
    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(upi_id);
    };
    return (
      <Card style={styles.upiCard}>
        <View style={styles.upicardContent}>
          <View style={styles.upicardHeader}>
            <Text style={styles.upiheaderText}>{upi_app}</Text>
            <Text style={styles.upisubHeaderText}>
              {bank_data} - {ac_type}
            </Text>
          </View>
          <View style={styles.upicardBody}>
            <Text style={styles.upiIdText}>{upi_id}</Text>
            <IconButton
              icon="content-copy"
              iconColor="#000000"
              size={18}
              onPress={() => {
                copyToClipboard(), Alert.alert("Copied UPI ID to Clipboard!");
              }}
            />
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.entryContainer}>
          <Text style={styles.entryTitle}>Banking</Text>
          <Icon name="bank" size={35} color="#000000" />
        </View>
        <View style={styles.hstack}>
          <Text style={styles.credentialTitle}>Credentials</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedbank}
              style={styles.dropdownbin}
              backgroundColor="blue"
              mode="dialog"
              onValueChange={(itemValue) => setSelectedbank(itemValue)}
            >
              <Picker.Item label="Bank" value="default" />
              <Picker.Item label="HDFC" value="hdfc" />
              <Picker.Item label="HSBC" value="hsbc" />
              <Picker.Item label="ICICI" value="icici" />
            </Picker>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.hstack}>
            <View>
              <Text style={styles.detailsheader}>AC Number</Text>
              <Text style={styles.acnumbertext}>
                {bankingdata[selectedbank]?.acnumber ?? "00000000000000"}
              </Text>
            </View>
            <View>
              <Text style={styles.detailsheader}>IFSC Code</Text>
              <Text style={styles.ifsctext}>
                {bankingdata[selectedbank]?.ifsccode ?? "BANK0000000"}
              </Text>
            </View>
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <Text style={styles.detailsheader}>UserName</Text>
            <Text style={styles.ifsctext}>
              {bankingdata[selectedbank]?.username ?? "Richdotcom"}
            </Text>
          </View>
        </View>
        <View style={styles.idcontainer}>
          <Text style={styles.detailsheader}>Aadhar Card</Text>
          <View style={styles.hstack}>
            <Text style={styles.idtext}>
              {displayaadhar ? aadharnumber : "**** **** 0000"}
            </Text>
            <IconButton
              icon={displayaadhar ? "eye-off" : "eye"}
              iconColor="#000000"
              size={20}
              onPress={() => {
                setDisplayaadhar(!displayaadhar);
              }}
            />
          </View>
          <Text style={styles.detailsheader}>Pan Number</Text>
          <View style={styles.hstack}>
            <Text style={styles.idtext}>
              {displaypan ? pannumber : "A********0 "}
            </Text>
            <IconButton
              icon={displaypan ? "eye-off" : "eye"}
              iconColor="#000000"
              size={20}
              onPress={() => {
                setDisplaypan(!displaypan);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.upiTitle}>UPI</Text>
          <View style={styles.scrollableBoxContainer}>
            <ScrollView style={styles.scrollableBox}>
              {upi_data.map((item, index) => (
                <CustomUpiItem key={index} {...item} />
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
  credentialTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
  },
  hstack: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "left",
    justifyContent: "space-between",
    marginRight: 10,
  },
  dropdownContainer: {
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 12,
    marginTop: 25,
    marginRight: 10,
  },
  dropdownbin: {
    width: 140,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    justifyContent: "center",
    fontSize: 20,
  },
  detailscontainer: {
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "space-evenly",
  },
  detailsheader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  acnumbertext: {
    fontSize: 18,
    letterSpacing: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  ifsctext: {
    fontSize: 18,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    alignSelf: "flex-start",
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  idcontainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "space-evenly",
  },
  idtext: {
    fontSize: 20,
    letterSpacing: 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  upiTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  scrollableBoxContainer: {
    width: windowWidth * 0.85,
    height: 180,
    margin: 5,
    marginLeft: 10,
  },
  scrollableBox: {
    flex: 1,
  },
  upiCard: {
    width: windowWidth * 0.83,
    height: 55,
    elevation: 5,
    margin: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  upicardContent: {
    padding: 2,
    flexDirection: "column",
  },
  upicardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  upiheaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  upisubHeaderText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  upicardBody: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 5,
  },
  upiIdText: {
    fontSize: 15,
    flex: 1,
  },
});

export default BankingScreen;
