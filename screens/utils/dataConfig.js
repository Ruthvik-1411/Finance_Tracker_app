import { Dimensions } from "react-native";
import * as Clipboard from "expo-clipboard";

export const copyToClipboard = async (value) => {
  await Clipboard.setStringAsync(value);
};

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const checkInternetConnection = async () => {
  try {
    const response = await fetch("https://www.google.com", {
      method: "HEAD",
      timeout: 1000
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const chip_logo_uri =
  "https://github.com/Ruthvik-1411/Finance_Tracker_app/blob/main/assets/card_assets/card_chip.png?raw=true";
export const nfc_logo_uri =
  "https://github.com/Ruthvik-1411/Finance_Tracker_app/blob/main/assets/card_assets/nfc_logo.png?raw=true";

export const defaultExpenseData = {
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

export const defaultInvestmentsData = {
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

export const defaultBankingData = {
  identity: {
    aadhar: "1234-5678-9012",
    pan: "ABCDE1234F",
  },
  banking: {
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
  },
  upiList: [
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
  ],
};
