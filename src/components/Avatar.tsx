import { Box, Image, IImageProps } from 'native-base';
import Perfil from '../assets/perfil.png';

type AvatarProps = IImageProps & {
  height?: number;
  width?: number;
  borderColor?: string;
};

export function Avatar({
  height = 45,
  width = 45,
  borderColor = 'blue.500',
  ...rest
}: AvatarProps) {
  return (
    <Box
      borderWidth={2}
      borderColor={borderColor}
      borderRadius={50}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        width={height}
        height={width}
        borderRadius={50}
        source={Perfil}
        alt="Imagem de perfil"
        {...rest}
      />
    </Box>
  );
}
