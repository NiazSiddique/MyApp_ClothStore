import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const DrpDowItem = ({ data, boxStyle, placeholderText }) => {
  const [selected, setSelected] = useState(placeholderText);

  return (
    <View>
      <SelectList
        placeholder={selected}
        setSelected={setSelected}
        //   fontFamily='lato'
        data={data}
        //   searchicon={<FontAwesome name="search" size={12} color={'black'} />}
        search={true}
        boxStyles={[{ borderRadius: 8 }, boxStyle]} //override default styles
        save="value"
        defaultOption={{}} //default selected option
      />
    </View>
  );
};

export default DrpDowItem;

const styles = StyleSheet.create({});
