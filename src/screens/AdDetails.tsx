import { Box, CheckIcon, HStack, Text, VStack } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Select } from 'native-base';
import { useState } from 'react';
import { CardItem } from '@components/CardItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';

export function AdDetails() {
  const [service, setService] = useState('Todos');
  const width = Dimensions.get('window').width;

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} px={6} mt={9}>
      <Header hideTitle onPress={handleBack} />
    </VStack>
  );
}
