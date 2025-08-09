// import { StyleSheet } from 'react-native';
// import React from 'react';
// import { FlashList } from '@shopify/flash-list';
// import DataCard from './DataCard';

// export interface CardData {
//   id: number;
//   title: string;
//   paymentMethod: string;
//   description: string;
//   location: string;
// }

// const FlashListCard = ({
//   data,
//   onCardPress,
// }: {
//   data: CardData[];
//   onCardPress?: (item: CardData) => void;
// }) => {
//   return (
//     <FlashList
//       data={data}
//       renderItem={({ item }) => (
//         <DataCard item={item}  />
//       )}
//       estimatedItemSize={300}
//       keyExtractor={(item) => item.id.toString()}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 20 }}
//     />
//   );
// };

// export default FlashListCard;

// const styles = StyleSheet.create({});
