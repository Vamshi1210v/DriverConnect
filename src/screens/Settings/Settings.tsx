import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const Settings = () => {

  const navigation = useNavigation<NavigationProp>();
  const handleBackPress = () => navigation.goBack();
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    },
  });

  const onSubmit = (data: FormData) => {
    setIsEditing(false);
    Alert.alert('Saved Successfully', JSON.stringify(data, null, 2));
  };

  const onCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backArrowButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Profile */}
      <View style={styles.profileCard}>
        <Image
          source={require('../../assests/images/profile.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <View style={styles.header}>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.icon}>
            <Ionicons name="create-outline" size={24} color="#3696F7" />
          </TouchableOpacity>
        )}
      </View>

      {/* Form Fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={isEditing}
              placeholder="Enter name"
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={isEditing}
              keyboardType="email-address"
              placeholder="Enter email"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Enter valid 10-digit number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="Enter phone"
            />
          )}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
      </View>

      {/* Save Button */}
      {isEditing && (
              <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
                      <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                      <Text style={styles.saveButtonText}>Cancel</Text>
                  </TouchableOpacity>
              </View>
      )}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
  },
  formGroup: {
    marginVertical: 12,
    width:"90%",
    alignSelf: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
  },
  cancelIcon: {
    fontSize: 22,
    color: '#ff4d4d',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#3696F7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width:"40%",
    alignSelf: 'center',
    shadowColor: '#000',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width:"40%",
    alignSelf: 'center',
    shadowColor: '#000',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backArrowButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  headerRow: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#E6CBC3',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
  },
  icon:{
    top:10,
    right:10
  }
});
