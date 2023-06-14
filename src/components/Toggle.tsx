import { HStack, Text, Switch, VStack } from 'native-base';

export function Toggle() {
  return (
    <VStack alignItems="flex-start">
      <Text fontFamily="heading" fontSize="sm">
        Aceito troca?
      </Text>
      <Switch size="lg" colorScheme="lightBlue" />
    </VStack>
  );
}
