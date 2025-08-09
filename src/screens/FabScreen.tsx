import {Button, ScrollView, StyleSheet ,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import FirstType from '../components/FirstType';
import SecondType from '../components/SecondType';
import ThirdType from '../components/ThirdType';
import FourthType from '../components/FourthType';
const FabScreen = () => {
  const [type, setType] = useState('first');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Button title="First Type" onPress={() => setType('first')} />
        <Button title="Second Type" onPress={() => setType('second')} />
        <Button title="Third Type" onPress={() => setType('third')} />
        <Button title="Fourth Type" onPress={() => setType('fourth')} />
      </ScrollView>
      {type === 'first' && <FirstType />}
      {type === 'second' && <SecondType />}
      {type === 'third' && <ThirdType />}
      {type === 'fourth' && <FourthType />}
    </SafeAreaView>
  );
};

export default FabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
