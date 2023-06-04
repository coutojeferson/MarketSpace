import { CheckIcon, HStack, Text, VStack } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { Select } from 'native-base';
import { useState } from 'react';
import { CardItem } from '@components/CardItem';

export function MyAds() {
  const [service, setService] = useState('Todos');
  return (
    <VStack flex={1} px={6}>
      <HStack mt={9} alignItems="center" flexDirection="row-reverse">
        <Text fontFamily="heading" fontSize={20} flex={1} textAlign="center">
          Meus anúncios
        </Text>
        <TouchableOpacity style={{ position: 'absolute' }}>
          <Plus />
        </TouchableOpacity>
      </HStack>
      <HStack alignItems="center" justifyContent="space-between" mt={8}>
        <Text fontFamily="body" fontSize="sm">
          9 anúncios
        </Text>
        <Select
          size="sm"
          color="gray.100"
          selectedValue={service}
          height={8}
          minWidth={100}
          accessibilityLabel="Mudar filtro"
          placeholder="Todos"
          _selectedItem={{
            bg: 'blue.500',
            endIcon: <CheckIcon size="5" color="#FFFF" />,
          }}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Inativos" value="inactive" />
          <Select.Item label="Ativos" value="active" />
        </Select>
      </HStack>
      <HStack mt={5} flexWrap="wrap" justifyContent="space-between">
        <CardItem statusItem="new" avatar={false} active={false} />
        <CardItem statusItem="used" avatar={false} />
        <CardItem statusItem="used" avatar={false} />
      </HStack>
    </VStack>
  );
}
