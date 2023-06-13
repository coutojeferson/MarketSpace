import { HStack, Radio } from 'native-base';
import { useState } from 'react';

export function RadioButton() {
  const [value, setValue] = useState('one');
  return (
    <HStack>
      <Radio.Group
        flexDirection="row"
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
        colorScheme="lightBlue"
      >
        <Radio value="one" my={1}>
          Produto novo
        </Radio>
        <Radio value="two" my={1} ml={6}>
          Produto usado
        </Radio>
      </Radio.Group>
    </HStack>
  );
}
