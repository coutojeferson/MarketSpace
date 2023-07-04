import { Box } from 'native-base';
import { X } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function IconClose({ ...rest }: TouchableOpacityProps) {
  return (
    <Box position="absolute" p={1}>
      <TouchableOpacity {...rest}>
        <Box
          ml={10}
          alignItems="center"
          justifyContent="center"
          bg="gray.200"
          rounded="full"
          width={5}
          height={5}
        >
          <X size={15} color="#F7F7F8" />
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
