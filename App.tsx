/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

const url = 'https://run.mocky.io/v3/6d0ad460-f600-47a7-b973-4a779ebbaeaf';

type Shares = {
  avg_price: string;
  cnc_used_quantity: number;
  collateral_qty: number;
  collateral_type: string;
  collateral_update_qty: number;
  company_name: string;
  haircut: number;
  holdings_update_qty: number;
  isin: string;
  product: string;
  quantity: number;
  symbol: string;
  t1_holding_qty: number;
  token_bse: string;
  token_nse: string;
  withheld_collateral_qty: number;
  withheld_holding_qty: number;
  ltp: number;
  close: number;
};
let totalCurrentValue = 0;
let totalInvestment = 0;
let todayPNL = 0;

export default function App() {
  const [data, setData] = useState<Shares[]>([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const holdings = data.map(item => {
    const currentVal = item.ltp * item.quantity;
    const investmentVal = +item.avg_price * item.quantity;
    return {
      ...item,
      currentVal,
      investmentVal,
    };
  });

  holdings.forEach(item => {
    totalCurrentValue += item.currentVal;
    totalInvestment += item.investmentVal;
    todayPNL += (item.close - item.ltp) * item.quantity;
  });

  // Calculate total PNL
  const totalPNL = totalCurrentValue - totalInvestment;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upstox Holding</Text>
      </View>
      {holdings.map((el, index) => {
        return (
          <View key={index.toString()} style={styles.card}>
            <View>
              <Text style={styles.symbol}>{el.symbol}</Text>
              <Text style={styles.quantity}>{el.quantity}</Text>
            </View>
            <View>
              <Text style={styles.symbol}>
                <Text style={styles.fontWeight}>LTP:</Text> ₹ {el.ltp}
              </Text>
              <Text style={[styles.symbol, {top: 5}]}>
                <Text style={styles.fontWeight}>P&L: </Text>₹{' '}
                {Math.round((el.currentVal - el.investmentVal) * 100) / 100}
              </Text>
            </View>
          </View>
        );
      })}

      <View style={styles.totalHolding}>
        <View style={styles.content}>
          <Text style={styles.symbol}>Current Value:</Text>
          <Text style={styles.fontWeight}>₹ {totalCurrentValue}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.symbol}>Total Investment:</Text>
          <Text style={styles.fontWeight}>₹ {totalInvestment}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.symbol}>Today's Profit & Loss:</Text>
          <Text style={styles.fontWeight}>₹ {todayPNL}</Text>
        </View>
        <View style={[styles.content, {marginTop: 20}]}>
          <Text style={styles.symbol}>Profit & Loss:</Text>
          <Text style={styles.fontWeight}>₹ {totalPNL}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#C7C7CC',
  },
  header: {
    backgroundColor: '#8D0085',
    padding: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5E7F4',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#CACACA',
  },
  symbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  fontWeight: {fontWeight: '500', color: '#565656'},
  totalHolding: {
    marginTop: 'auto',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quantity: {
    fontWeight: '500',
    color: '#565656',
    top: 5,
  },
});
