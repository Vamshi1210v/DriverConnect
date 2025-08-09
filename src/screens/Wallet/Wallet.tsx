import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import data from '../../components/CustomFlatlist/src/data'
import ScratchCardScreen from '../ScratchCard/ScratchCard'

const Wallet = () => {

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={{ flex: 1, margin: 10, backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
                {/* <Image source={{ uri: item.image }} style={{ width: '100%', height: 100, borderRadius: 10 }} /> */}
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>hi</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>htfytfyjhguygu</Text>
            </View>
        )
    }

    return (
        <View style={styles.safeArea}>
            <View style={styles.mainCircle}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addMoneyButton}>
                        <Text style={styles.moneyText}>Add Amount</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <Text style={styles.amountText}>1000</Text>
                <Text style={styles.subText}>Total Wallet Balance</Text>
                </View>
            </View>
            <View style={styles.bottomContent}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
    )
}

export default Wallet

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    mainCircle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#237FAD',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bottomContent: {
        flex: 4
    },
    amountText: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    addMoneyButton: {
        marginLeft: 'auto',
        backgroundColor: '#D6A198',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moneyText:{
        color: '#fff',
        fontWeight: 'bold',
    }
})