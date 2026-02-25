import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DTCDetailsModal } from '../../components/DTCDetailsModal';
import { DTCDisplay } from '../../components/DTCDisplay';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useTheme } from '../../constants/ThemeContext';
import { getDTCsBySystem, searchDTCs } from '../../services/DTCDatabase';
import { DTC } from '../../types/dtc.types';

const { width } = Dimensions.get('window');
const PAGE_SIZE = 20; // Number of items to load per batch

// Define proper types for filters
type SystemCategory = 'powertrain' | 'chassis' | 'network' | 'body';

interface SystemOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: SystemCategory;
}

export default function DiagnosticsScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDTC, setSelectedDTC] = useState<DTC | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string>('engine');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory>('powertrain');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allDTCs, setAllDTCs] = useState<DTC[]>([]);
  const [displayedDTCs, setDisplayedDTCs] = useState<DTC[]>([]);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);

  // All systems with their categories - memoized to prevent recreation
  const allSystems = useMemo((): SystemOption[] => [
    // Powertrain
    { id: 'engine', label: 'Engine', icon: 'cog', category: 'powertrain' },
    { id: 'transmission', label: 'Transmission', icon: 'car', category: 'powertrain' },
    { id: 'emissions', label: 'Emissions', icon: 'leaf', category: 'powertrain' },
    { id: 'fuel-air', label: 'Fuel/Air', icon: 'flame', category: 'powertrain' },
    { id: 'ignition', label: 'Ignition', icon: 'flash', category: 'powertrain' },
    { id: 'injector', label: 'Injectors', icon: 'water', category: 'powertrain' },
    { id: 'computer', label: 'Computer', icon: 'hardware-chip', category: 'powertrain' },
    { id: 'speed', label: 'Speed/Idle', icon: 'speedometer', category: 'powertrain' },
    { id: 'hybrid', label: 'Hybrid', icon: 'battery-charging', category: 'powertrain' },
    { id: 'cylinder-deactivation', label: 'Cyl Deact', icon: 'sync', category: 'powertrain' },
    
    // Chassis
    { id: 'abs-brakes', label: 'ABS/Brakes', icon: 'warning', category: 'chassis' },
    { id: 'steering-suspension', label: 'Steering/Susp', icon: 'swap-horizontal', category: 'chassis' },
    { id: 'traction-control', label: 'Traction Ctrl', icon: 'car-sport', category: 'chassis' },
    { id: 'chassis-electrical', label: 'Chassis Elec', icon: 'flash', category: 'chassis' },
    
    // Network
    { id: 'network-electrical', label: 'Network Elec', icon: 'git-network', category: 'network' },
    { id: 'network-communication', label: 'Communication', icon: 'radio', category: 'network' },
    { id: 'network-software', label: 'Software', icon: 'code-slash', category: 'network' },
    { id: 'network-data', label: 'Data', icon: 'analytics', category: 'network' },
    
    // Body
    { id: 'airbags', label: 'Airbags/SRS', icon: 'alert-circle', category: 'body' },
    { id: 'hvac', label: 'HVAC', icon: 'thermometer', category: 'body' },
    { id: 'instrument-cluster', label: 'Instrument', icon: 'speedometer', category: 'body' },
    { id: 'body-electrical', label: 'Body Elec', icon: 'bulb', category: 'body' },
  ], []);

  // Filter systems by category - memoized
  const systems = useMemo(() => 
    allSystems.filter(system => system.category === selectedCategory),
    [allSystems, selectedCategory]
  );

  // Get full DTC list - memoized
  const fullDTCList = useMemo(() => 
    searchQuery 
      ? searchDTCs(searchQuery)
      : getDTCsBySystem(selectedSystem),
    [searchQuery, selectedSystem]
  );

  // Load initial data when filters change
  useEffect(() => {
    setAllDTCs(fullDTCList);
    setCurrentPage(1);
    setDisplayedDTCs(fullDTCList.slice(0, PAGE_SIZE));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [fullDTCList]);

  // Load more data when scrolling
  const loadMoreData = useCallback(() => {
    if (isLoadingMore || displayedDTCs.length >= allDTCs.length) return;
    
    setIsLoadingMore(true);
    
    // Simulate async loading
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newItems = allDTCs.slice(0, nextPage * PAGE_SIZE);
      setDisplayedDTCs(newItems);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 100);
  }, [isLoadingMore, displayedDTCs.length, allDTCs, currentPage]);

  // Memoized renderItem function
  const renderItem = useCallback(({ item }: { item: DTC }) => (
    <DTCDisplay
      dtcCode={item.code}
      onPress={handleDTCPress}
      showLocation={true}
    />
  ), []);

  // Memoized key extractor
  const keyExtractor = useCallback((item: DTC) => item.code, []);

  const handleDTCPress = useCallback((dtc: DTC) => {
    setSelectedDTC(dtc);
    setModalVisible(true);
  }, []);

  // Scroll to selected chip when it changes
  useEffect(() => {
    if (scrollViewRef.current && !searchQuery) {
      const selectedIndex = systems.findIndex(s => s.id === selectedSystem);
      if (selectedIndex >= 0) {
        scrollViewRef.current.scrollTo({
          x: selectedIndex * 100 - width / 2 + 50,
          animated: true,
        });
      }
    }
  }, [selectedSystem, searchQuery, selectedCategory, systems]);

  // Reset selected system when category changes
  useEffect(() => {
    if (systems.length > 0 && !systems.some(s => s.id === selectedSystem)) {
      setSelectedSystem(systems[0].id);
    }
  }, [selectedCategory, systems, selectedSystem]);

  // Memoized header component
  const ListHeaderComponent = useCallback(() => (
    <>
      <View style={[styles.searchContainer, { 
        backgroundColor: colors.cardBg,
        borderColor: colors.borderPrimary 
      }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Search DTC code or description..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          onPress={() => setShowFilters(!showFilters)}
          style={[styles.filterToggle, { borderLeftColor: colors.borderDim }]}
        >
          <Ionicons 
            name={showFilters ? 'funnel' : 'funnel-outline'} 
            size={20} 
            color={colors.borderPrimary} 
          />
        </TouchableOpacity>
      </View>

      {!searchQuery && showFilters && (
        <View style={styles.filterSection}>
          <View style={styles.filterHeader}>
            <Text style={[styles.filterTitle, { color: colors.textSecondary }]}>
              Filter by system:
            </Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Category Tabs */}
          <View style={styles.categoryTabs}>
            {(['powertrain', 'chassis', 'network', 'body'] as const).map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryTab, { 
                  backgroundColor: selectedCategory === category ? colors.borderPrimary : colors.cardBg,
                  borderColor: colors.borderPrimary,
                }]}
                onPress={() => setSelectedCategory(category)}
              >
                <Ionicons 
                  name={
                    category === 'powertrain' ? 'cog' :
                    category === 'chassis' ? 'car' :
                    category === 'network' ? 'git-network' : 'car-sport'
                  } 
                  size={16} 
                  color={selectedCategory === category ? '#FFFFFF' : colors.borderPrimary} 
                />
                <Text style={[styles.categoryTabText, { 
                  color: selectedCategory === category ? '#FFFFFF' : colors.textPrimary 
                }]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* System Chips */}
          <ScrollView 
            ref={scrollViewRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.systemSelector}
            contentContainerStyle={styles.systemSelectorContent}
            decelerationRate="fast"
            snapToInterval={100}
          >
            {systems.map((system) => (
              <TouchableOpacity
                key={system.id}
                style={[styles.systemChip, { 
                  backgroundColor: selectedSystem === system.id ? colors.borderPrimary : colors.cardBg,
                  borderColor: colors.borderPrimary,
                  minWidth: 90,
                }]}
                onPress={() => setSelectedSystem(system.id)}
              >
                <Ionicons 
                  name={system.icon} 
                  size={16} 
                  color={selectedSystem === system.id ? '#FFFFFF' : colors.borderPrimary} 
                />
                <Text style={[styles.systemChipText, { 
                  color: selectedSystem === system.id ? '#FFFFFF' : colors.textPrimary 
                }]}>
                  {system.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results count */}
      <View style={styles.resultsInfo}>
        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          Showing {displayedDTCs.length} of {allDTCs.length} DTC codes
        </Text>
      </View>
    </>
  ), [colors, searchQuery, showFilters, selectedCategory, selectedSystem, systems, displayedDTCs.length, allDTCs.length]);

  // Memoized footer component
  const ListFooterComponent = useCallback(() => (
    isLoadingMore ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.borderPrimary} />
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Loading more...
        </Text>
      </View>
    ) : displayedDTCs.length < allDTCs.length ? (
      <TouchableOpacity 
        style={[styles.loadMoreButton, { borderColor: colors.borderPrimary }]}
        onPress={loadMoreData}
      >
        <Text style={[styles.loadMoreText, { color: colors.borderPrimary }]}>
          Load More ({allDTCs.length - displayedDTCs.length} remaining)
        </Text>
      </TouchableOpacity>
    ) : allDTCs.length > 0 ? (
      <View style={styles.footerEnd}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          End of list ({allDTCs.length} total)
        </Text>
      </View>
    ) : null
  ), [isLoadingMore, displayedDTCs.length, allDTCs.length, colors, loadMoreData]);

  // Memoized empty component
  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No DTCs found
      </Text>
    </View>
  ), [colors]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        <ScreenHeader title="DIAGNOSTICS" showBack={true} />

        <FlatList
          ref={flatListRef}
          data={displayedDTCs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.3}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          initialNumToRender={10}
          updateCellsBatchingPeriod={50}
        />

        <DTCDetailsModal
          visible={modalVisible}
          dtc={selectedDTC}
          onClose={() => setModalVisible(false)}
        />

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  filterToggle: {
    paddingLeft: 12,
    borderLeftWidth: 1,
  },
  filterSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 6,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  categoryTabText: {
    fontSize: 11,
    fontWeight: '600',
  },
  systemSelector: {
    maxHeight: 50,
    flexGrow: 0,
  },
  systemSelectorContent: {
    paddingVertical: 4,
    gap: 8,
    alignItems: 'center',
  },
  systemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  systemChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 12,
  },
  footerEnd: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    marginVertical: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
});