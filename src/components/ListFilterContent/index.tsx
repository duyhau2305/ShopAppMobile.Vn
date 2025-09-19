import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../themes/sty';
import TextDisplay from '../TextDisplay';

interface ListFilterContentProps {
  listFilter: string[];
  sheetFilterRef: any;
}

const ListFilterContent = ({
  listFilter,
  sheetFilterRef,
}: ListFilterContentProps) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={[sty.gap_8, sty.pt_8, sty.px_16]}>
        {listFilter?.map(filter => (
          <TouchableOpacity
            onPress={() => sheetFilterRef?.current?.expand()}
            key={filter}
            style={styles.FilterContent}>
            <TextDisplay text={filter} color="#212326" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListFilterContent;

const styles = StyleSheet.create({
  FilterContent: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: '#EDEFF2',
    borderWidth: 1,
  },
});
