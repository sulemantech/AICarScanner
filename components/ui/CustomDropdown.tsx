import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface CustomDropdownProps {
  selected: string;
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
}

export const CustomDropdown = ({ selected, options, placeholder, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdownSelected, { 
          backgroundColor: colors.dropdownBg,
          borderColor: colors.borderPrimary 
        }]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>
          {selected || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { 
            backgroundColor: colors.dropdownBg,
            borderColor: colors.borderPrimary 
          }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, { borderBottomColor: colors.borderDim }]}
                  onPress={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, { color: colors.textPrimary }]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 20,
    padding: 16,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    borderWidth: 2,
    borderRadius: 24,
    overflow: 'hidden',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});