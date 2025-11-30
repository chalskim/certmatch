import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Ensure correct SubformHeader import; fix any prior mistaken '../components/.SubformHeader'
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/ShoppingCartPerson'; 

type Category = 'premium' | 'standard' | 'basic';

type CartItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  category: Category;
  price: number;
  quantity: number;
  duration?: number;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  provider?: string;
  contact?: string;
  selected: boolean;
};

const initialCartItems: CartItem[] = [
  {
    id: 'p1',
    title: '개인 전문가 상담 패키지',
    description: '인증 전문가 1:1 상담(60분) 패키지',
    type: '상담',
    category: 'premium',
    price: 120000,
    quantity: 1,
    duration: 1,
    provider: '인증 전문가 매칭센터',
    contact: 'help@superslice.com',
    selected: true,
  },
  {
    id: 'p2',
    title: '자격증 학습 패키지',
    description: '온라인 강의 + 문제은행 이용권(30일)',
    type: '교육',
    category: 'standard',
    price: 89000,
    quantity: 1,
    duration: 30,
    provider: '에듀테크코리아',
    contact: '02-3333-4444',
    selected: true,
  },
  {
    id: 'p3',
    title: '이력서 첨삭 서비스',
    description: '전문가 맞춤 피드백 제공',
    type: '컨설팅',
    category: 'basic',
    price: 45000,
    quantity: 1,
    provider: '커리어업센터',
    contact: '02-1111-2222',
    selected: false,
  },
  {
    id: 'p4',
    title: '모의 면접 코칭',
    description: '화상 모의 면접 1회(45분)',
    type: '코칭',
    category: 'standard',
    price: 70000,
    quantity: 1,
    provider: '커리어업센터',
    contact: '02-1111-2222',
    selected: false,
  },
];

function getCategoryText(category: Category): string {
  const map: Record<Category, string> = {
    premium: '프리미엄',
    standard: '스탠다드',
    basic: '베이직',
  };
  return map[category];
}

export default function ShoppingCartPerson() {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return cartItems.filter((item) => {
      const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
      const searchMatch =
        item.title.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower);
      return categoryMatch && searchMatch;
    });
  }, [cartItems, categoryFilter, searchTerm]);

  const selectedItems = useMemo(() => cartItems.filter((i) => i.selected), [cartItems]);
  const subtotal = useMemo(() => selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [selectedItems]);
  const tax = useMemo(() => Math.floor(subtotal * 0.1), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handleBack = () => navigation.goBack();
  const handleHome = () => navigation.navigate('Home');

  const toggleItemSelection = (id: string) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
  };

  const removeItem = (id: string) => {
    Alert.alert('삭제 확인', '이 상품을 장바구니에서 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setCartItems((prev) => prev.filter((i) => i.id !== id)),
      },
    ]);
  };

  const deleteSelectedItems = () => {
    const selectedCount = cartItems.filter((i) => i.selected).length;
    if (selectedCount === 0) {
      Alert.alert('알림', '삭제할 상품을 선택해주세요.');
      return;
    }
    Alert.alert('삭제 확인', `선택된 ${selectedCount}개 상품을 장바구니에서 삭제하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setCartItems((prev) => prev.filter((i) => !i.selected)),
      },
    ]);
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
    );
  };

  const updateQuantity = (id: string, value: string) => {
    const num = parseInt(value, 10);
    setCartItems((prev) => prev.map((i) => (i.id === id && num > 0 ? { ...i, quantity: num } : i)));
  };

  const handlePayment = () => {
    const selected = cartItems.filter((i) => i.selected);
    if (selected.length === 0) {
      Alert.alert('알림', '결제할 상품을 선택해주세요.');
      return;
    }
    const itemTitles = selected.map((i) => `${i.title} (${i.quantity}개)`).join(', ');
    const subtotalVal = selected.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const taxVal = Math.floor(subtotalVal * 0.1);
    const totalVal = subtotalVal + taxVal;

    Alert.alert(
      '결제 확인',
      `다음 상품을 결제하시겠습니까?\n\n상품: ${itemTitles}\n상품 금액: ₩${subtotalVal.toLocaleString()}\n부가세: ₩${taxVal.toLocaleString()}\n총 결제 금액: ₩${totalVal.toLocaleString()}`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '결제하기',
          onPress: () => {
            Alert.alert('알림', '결제가 완료되었습니다!');
            setCartItems((prev) => prev.filter((i) => !i.selected));
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    const selected = cartItems.filter((i) => i.selected);
    if (selected.length > 0) {
      Alert.alert('취소 확인', '선택된 상품을 모두 취소하시겠습니까?', [
        { text: '아니오', style: 'cancel' },
        {
          text: '예',
          onPress: () => setCartItems((prev) => prev.map((i) => ({ ...i, selected: false }))),
        },
      ]);
    } else {
      Alert.alert('알림', '선택된 상품이 없습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubformHeader title="장바구니" onBack={handleBack} onHome={handleHome} />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* 헤더 안내 블록 제거됨 */}

        <View style={styles.controls}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>카테고리:</Text>
            <View style={styles.filterButtons}>
              {(
                [
                  { key: 'all', label: '전체' },
                  { key: 'premium', label: '프리미엄' },
                  { key: 'standard', label: '스탠다드' },
                  { key: 'basic', label: '베이직' },
                ] as const
              ).map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.filterBtn,
                    categoryFilter === opt.key && styles.filterBtnActive,
                  ]}
                  onPress={() => setCategoryFilter(opt.key as any)}
                >
                  <Text
                    style={[
                      styles.filterBtnText,
                      categoryFilter === opt.key && styles.filterBtnTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="상품명으로 검색..."
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={deleteSelectedItems}>
            <Text style={styles.btnText}>선택 삭제</Text>
          </TouchableOpacity>
        </View>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>🛒</Text>
            <Text style={styles.emptyCartTitle}>장바구니가 비어있습니다</Text>
            <Text style={styles.emptyCartDescription}>상품을 장바구니에 추가해주세요</Text>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleHome}>
              <Text style={styles.btnText}>상품 보러가기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cartContainer}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={[
                        styles.categoryBadge,
                        item.category === 'premium' && styles.categoryPremium,
                        item.category === 'standard' && styles.categoryStandard,
                        item.category === 'basic' && styles.categoryBasic,
                      ]}
                    >
                      <Text style={styles.categoryBadgeText}>{getCategoryText(item.category)}</Text>
                    </View>
                    {item.provider && (
                      <Text style={{ marginLeft: 8, fontSize: 14, color: '#7f8c8d' }}>{item.provider}</Text>
                    )}
                  </View>
                  <TouchableOpacity style={[styles.btn, styles.btnDanger, styles.btnSm]} onPress={() => removeItem(item.id)}>
                    <Text style={styles.btnText}>삭제</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cartItemBody}>
                  <TouchableOpacity style={styles.itemCheckbox} onPress={() => toggleItemSelection(item.id)}>
                    <View style={[styles.checkbox, item.selected && styles.checkboxChecked]}>
                      {item.selected && <Text style={styles.checkboxMark}>✓</Text>}
                    </View>
                  </TouchableOpacity>

                  <View style={styles.itemImage}>
                    <Text style={{ color: '#7f8c8d', fontSize: 14 }}>상품 이미지</Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <View style={styles.itemMeta}>
                      {item.duration && (
                        <View style={styles.metaItem}>
                          <Text style={{ marginRight: 4 }}>⏱️</Text>
                          <Text>{item.duration}일 이용권</Text>
                        </View>
                      )}
                      {item.contact && (
                        <View style={styles.metaItem}>
                          <Text style={{ marginRight: 4 }}>📞</Text>
                          <Text>{item.contact}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.itemPrice}>₩{(item.price * item.quantity).toLocaleString()}</Text>
                    <View style={styles.itemActions}>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity style={styles.quantityBtn} onPress={() => decreaseQuantity(item.id)}>
                          <Text style={styles.quantityBtnText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                          value={String(item.quantity)}
                          onChangeText={(v) => updateQuantity(item.id, v)}
                          keyboardType="number-pad"
                          style={styles.quantityInput}
                        />
                        <TouchableOpacity style={styles.quantityBtn} onPress={() => increaseQuantity(item.id)}>
                          <Text style={styles.quantityBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity style={[styles.btn, styles.btnPrimary, styles.btnSm]} onPress={() => Alert.alert('안내', '상세 정보는 준비 중입니다.')}> 
                          <Text style={styles.btnText}>상세 정보</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 결제 요약 바텀시트 */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />
        <View style={styles.bottomSheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>주문 요약</Text>
            <Text>{selectedItems.length}개 상품 선택</Text>
          </View>
          <View style={styles.sheetSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>상품 금액</Text>
              <Text style={styles.summaryValue}>₩{subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>부가세</Text>
              <Text style={styles.summaryValue}>₩{tax.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, styles.summaryTotal]}>₩{total.toLocaleString()}</Text>
              <Text style={styles.summaryLabel}>합계</Text>
            </View>
          </View>
          <View style={styles.sheetActions}>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={handleCancel}>
              <Text style={[styles.btnText, styles.btnStrong]}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnPayment]}
              onPress={handlePayment}
              disabled={selectedItems.length === 0}
            >
              <Text style={[styles.btnText, styles.btnStrong]}>결제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
