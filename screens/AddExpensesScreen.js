import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { CategoryModal, categoriesData } from "./utils/CategoryModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddExpenseScreen = () => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedbin, setSelectedbin] = React.useState("Want"); //can be a date or final password
  const [selectedTxtype, setSelectedTxtype] = React.useState("UPI"); //to handle password expiry

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    toggleModal(); // Close modal after selecting a category
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate); // Assign the selected Date object
  };

  const handleSaveExpense = () => {
    // Call your backend function here to save the expense
    if (amount !== "") {
      // saveExpense({ amount, category: selectedCategory });
      // navigation.goBack();
    } else {
      alert("Please enter an amount!");
    }
  };

  const handleclr = () => {
    setDate(new Date());
    setAmount("");
    setDescription("");
    setNotes("");
    setSelectedCategory(null);
    setSelectedbin("Want");
    setSelectedTxtype("UPI");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>New Expense </Text>
            <Icon name="wallet-plus-outline" size={35} color="#000000" />
          </View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: 140,
                //marginHorizontal: 200,
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
                  icon={<Icon name="chevron-down" size={25} color={"black"} />}
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
          <View style={styles.inputContainer}>
            <TextInput
              label="Amount*"
              value={amount}
              placeholder="Amount"
              onChangeText={setAmount}
              mode="flat"
              maxLength={11}
              keyboardType="numeric"
              style={styles.input}
              theme={{ colors: { primary: "#a9a9a9" } }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Description*"
              value={description}
              placeholder="More about the expense"
              onChangeText={setDescription}
              mode="flat"
              multiline={true}
              maxLength={150}
              style={styles.inputdescription}
              theme={{ colors: { primary: "#a9a9a9" } }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Notes"
              value={notes}
              placeholder="Notes for later"
              onChangeText={setNotes}
              mode="flat"
              maxLength={30}
              style={styles.input}
              theme={{ colors: { primary: "#a9a9a9" } }}
            />
          </View>
          <View>
            <Card
              style={{
                width: 200,
                marginHorizontal: 20,
                marginVertical: 10,
                alignItems: "center",
                elevation: 5,
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 20,
                  }}
                >
                  {selectedCategory ? selectedCategory.name : "Category"}
                </Text>
                <Button
                  onPress={toggleModal}
                  icon={
                    <Icon
                      name="plus-circle-multiple-outline"
                      size={35}
                      color={"black"}
                    />
                  }
                  type="clear"
                />
              </View>
            </Card>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedbin}
                style={styles.dropdownbin}
                onValueChange={(itemValue) => setSelectedbin(itemValue)}
              >
                <Picker.Item label="Want" value="want" />
                <Picker.Item label="Need" value="need" />
                <Picker.Item label="Required" value="required" />
              </Picker>
            </View>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedTxtype}
                style={styles.dropdowntx}
                onValueChange={(itemValue) => setSelectedTxtype(itemValue)}
              >
                <Picker.Item label="UPI" value="upi" />
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Debit Card" value="debitcard" />
                <Picker.Item label="Credit Card" value="creditcard" />
                <Picker.Item label="Net Banking" value="netbanking" />
              </Picker>
            </View>
          </View>
          <View style={styles.hstack}>
            <Button
              title="Clear"
              titleStyle={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "bold",
              }}
              buttonStyle={{
                backgroundColor: "#000000",
                borderRadius: 20,
                marginTop: 40,
                marginLeft: 20,
              }}
              containerStyle={{
                width: 120,
              }}
              onPress={handleclr}
            />
            <Button
              title="Save"
              titleStyle={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "bold",
              }}
              buttonStyle={{
                backgroundColor: "#000000",
                borderRadius: 20,
                marginTop: 40,
                marginLeft: 50,
              }}
              containerStyle={{
                width: 150,
              }}
              onPress={handleSaveExpense}
            />
          </View>
          <CategoryModal
            showModal={showModal}
            toggleModal={toggleModal}
            selectCategory={selectCategory}
          />
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
  hstack: {
    flexDirection: "row",
    alignItems: "center",
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
    height: 65,
  },
  input: {
    backgroundColor: "transparent",
    marginTop: 5,
    fontSize: 14,
  },
  inputdescription: {
    backgroundColor: "transparent",
    marginTop: 5,
    fontSize: 14,
    height: 80,
  },
  dropdownContainer: {
    marginTop: 15,
  },
  dropdownbin: {
    width: 145,
    height: 20,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
    justifyContent: "center",
  },
  dropdowntx: {
    width: 170,
    height: 20,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
  },
});

export default AddExpenseScreen;
