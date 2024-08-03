export const bankingScreen_requestData = {
  identity: {
    aadhar: "5678-9012-3456",
    pan: "PQRST7890U",
  },
  banking: {
    hdfc: {
      acnumber: "159753258456",
      username: "asdfghjkl",
      ifsccode: "ASDF123456",
    },
    hsbc: {
      acnumber: "123654789632",
      username: "qwertyuiop",
      ifsccode: "QWERT1248939",
    },
    iicic: {
      acnumber: "98745632147",
      username: "zxcvbnm",
      ifsccode: "ZXCVB12345",
    },
  },
  upiList: [
    {
      upi_app: "Hpay",
      bank_data: "BIKE 2356",
      ac_type: "Debit",
      upi_id: "abcd@bike.com",
    },
    {
      upi_app: "Ipay",
      bank_data: "LOOK 8992",
      ac_type: "Credit",
      upi_id: "my_cool_id@oklookerpay.com",
    },
    {
      upi_app: "Phonepay",
      bank_data: "KIUT 9446",
      ac_type: "Debit",
      upi_id: "7513abcd@nublo.com",
    },
    {
      upi_app: "Phonepay",
      bank_data: "EXT 1450",
      ac_type: "Debit",
      upi_id: "abshsrhshcuw474gc55wd@exto.com",
    },
    {
      upi_app: "ijni",
      bank_data: "ijni 1246",
      ac_type: "Debit",
      upi_id: "abcd758493@ijni.com",
    },
    {
      upi_app: "ICIC",
      bank_data: "ICIC 1010",
      ac_type: "Debit",
      upi_id: "abcd758493@dfc.com",
    },
  ],
};

export const trackerScreen_requestData = {
  budget: {
    amountUsed: 9705,
    budgetAmount: 10000,
    budgetLeft: 295,
    percentageUsed: 97.05,
  },
  byCategory: [
    { x: "Travel", y: 750 },
    { x: "Investments", y: 1255 },
    { x: "Entertainment", y: 1400 },
    { x: "Food", y: 2800 },
    { x: "Hobbies", y: 3500 },
  ],
  byMonth: {
    Dec: 9000,
    Jan: 6813,
    Feb: 5200,
    Mar: 2000,
    Apr: 7240,
    May: 5568,
  },
};

export const investmentsScreen_requestData = {
  portfolio: {
    investedValue: "29709.02",
    currentValue: "33710.5",
    realizedProft: "784.00",
    unrealizedProfit: "4001.48",
  },
  sector: [
    { x: "Telecom", y: "10%" },
    { x: "Defence", y: "25%" },
    { x: "Mining", y: "10%" },
    { x: "IT", y: "15%" },
    { x: "Bank", y: "25%" },
  ],
  holding: [
    {
      name: "BEL",
      qty: 15,
      purchasecost: 130.62,
      currentcost: 300.97,
      rtdelta: 1.78,
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
      qty: 12,
      purchasecost: 1190.55,
      currentcost: 1200.5,
      rtdelta: 0.47,
    },
    {
      name: "WIPRO",
      qty: 20,
      purchasecost: 426.49,
      currentcost: 505.01,
      rtdelta: 0.83,
    },
    {
      name: "HCLTECH",
      qty: 5,
      purchasecost: 1347.84,
      currentcost: 1419.12,
      rtdelta: -0.76,
    },
    {
      name: "TATASTEEL",
      qty: 10,
      purchasecost: 122.5,
      currentcost: 164.77,
      rtdelta: -0.95,
    },
    {
      name: "ITC",
      qty: 15,
      purchasecost: 413.61,
      currentcost: 423.85,
      rtdelta: 1.07,
    },
  ],
};
