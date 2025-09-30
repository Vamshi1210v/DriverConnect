import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import LinearGradient from 'react-native-linear-gradient';

const ReferAndEarn = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backArrowButton} onPress={() => navigation.goBack()}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="arrow-back" size={22} color="#ffffff" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>Refer & Earn</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Ionicons name="gift-outline" size={60} color="#2862C7" />
                <Text style={styles.heading}>Invite friends to Driver Connect</Text>
                <Text style={styles.description}>
                    Invite friends to Driver Connect and get{' '}
                    <Text style={styles.highlight}>₹501</Text> when your friend accepts their booking. They get{' '}
                    <Text style={styles.highlight}>₹201</Text> as a welcome bonus!
                </Text>
            </View>

            {/* Invite Button */}
            <TouchableOpacity style={styles.buttonWrapper}>
                <LinearGradient colors={['#4c8bf5', '#2862C7']} style={styles.inviteButton}>
                    <Text style={styles.inviteButtonText}>Invite Now</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 20,
    },
    headerRow: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    backArrowButton: {
        marginRight: 10,
    },
    iconCircle: {
        backgroundColor: "#2862C7",
        borderRadius: 20,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginTop: 15,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 22,
    },
    highlight: {
        color: "#2862C7",
        fontWeight: "bold",
    },
    buttonWrapper: {
        marginBottom: 40,
        alignItems: "center",
    },
    inviteButton: {
        borderRadius: 25,
        width: '80%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    inviteButtonText: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "600",
    },
});
