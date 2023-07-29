import { useAuth } from '@hooks/useAuth';
import { Center, Text } from 'native-base';

export function SignOut() {
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }
  return (
    <Center flex={1}>
      <Text onPress={handleSignOut}>SignOut</Text>
    </Center>
  );
}
