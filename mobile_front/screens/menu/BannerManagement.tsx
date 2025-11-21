
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';
import { Images } from '../../assets/index';
import { styles } from '../styles/menu/BannerManagement';

// 로컬 배너 이미지 (React Native는 require 방식 권장)
const banner1 = require('../../assets/icon/banner1.jpg');
const banner2 = require('../../assets/icon/banner2.jpg');
const banner4 = require('../../assets/icon/banner4.jpg');

// 배너 타입
type BannerItem = {
  slot: number;
  title: string;
  description: string;
  buttonText: string;
  // 로컬 이미지(require 결과 number) 또는 URL(string) 지원
  image: string | number | null;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  link?: string;
};

// 날짜 문자열 포맷팅
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function formatKoreanDate(d: Date): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 간단 토스트
function useToast() {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const show = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  };
  return { message, visible, show };
}

// 캘린더 셀 타입
type CalendarCell = {
  label: number; // day number to show
  dateStr: string; // YYYY-MM-DD
  isOtherMonth: boolean;
  hasBanner: boolean;
  isToday: boolean;
  isSelected: boolean;
};

const initialBannerData: Record<string, BannerItem[]> = {
  '2025-01-15': [
    {
      slot: 1,
      title: '2025년 정부지원 인증 프로그램',
      description: '최대 70% 지원금으로 인증 비용 절감 혜택을 받으세요',
      buttonText: '자세히 보기',
      image: banner1,
      startDate: '2025-01-15',
      endDate: '2025-02-28',
      link: 'https://example.com/support',
    },
    {
      slot: 2,
      title: 'ISMS-P 전문가 양성 과정',
      description: '실무 중심의 맞춤형 교육으로 전문가로 성장하세요',
      buttonText: '과정 신청',
      image: banner2,
      startDate: '2025-01-10',
      endDate: '2025-03-31',
      link: 'https://example.com/course',
    },
    {
      slot: 3,
      title: '정보보호 컨설팅 바우처',
      description: '기업 맞춤형 보안 솔루션 지원, 최대 50% 할인',
      buttonText: '지원 신청',
      image: null,
      startDate: '2025-01-20',
      endDate: '2025-04-30',
      link: 'https://example.com/voucher',
    },
    {
      slot: 4,
      title: '글로벌 인증 전문가',
      description: 'ISO 27001, GDPR 등 해외 인증 성공률 98%',
      buttonText: '상담하기',
      image: banner4,
      startDate: '2025-01-25',
      endDate: '2025-05-31',
      link: 'https://example.com/expert',
    },
  ],
};

const BannerManagement: React.FC<any> = ({ navigation }) => {
  const [bannerData, setBannerData] = useState<Record<string, BannerItem[]>>(initialBannerData);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // 모달 상태 및 폼
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('베너 추가');
  const [formSlot, setFormSlot] = useState<number>(1);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formButtonText, setFormButtonText] = useState('');
  const [formLink, setFormLink] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');

  const { message, visible, show } = useToast();
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 캘린더 제목
  const calendarTitle = useMemo(() => `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`, [currentDate]);
  const selectedDateText = useMemo(() => formatKoreanDate(selectedDate), [selectedDate]);

  // 특정 날짜의 배너 목록
  const bannersForSelectedDate = useMemo(() => bannerData[toDateStr(selectedDate)] || [], [bannerData, selectedDate]);

  // 캘린더 셀 생성
  const calendarCells = useMemo<CalendarCell[]>(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    const cells: CalendarCell[] = [];

    // 이전 달 날짜
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevLastDate - i);
      const dateStr = toDateStr(d);
      cells.push({
        label: d.getDate(),
        dateStr,
        isOtherMonth: true,
        hasBanner: false,
        isToday: false,
        isSelected: false,
      });
    }

    // 현재 달 날짜
    for (let date = 1; date <= lastDateOfMonth; date++) {
      const d = new Date(year, month, date);
      const dateStr = toDateStr(d);
      cells.push({
        label: date,
        dateStr,
        isOtherMonth: false,
        hasBanner: !!bannerData[dateStr]?.length,
        isToday: toDateStr(d) === toDateStr(new Date()),
        isSelected: toDateStr(d) === toDateStr(selectedDate),
      });
    }

    // 다음 달 날짜로 채우기 (총 42 셀)
    const remaining = 42 - (firstDayOfWeek + lastDateOfMonth);
    for (let date = 1; date <= remaining; date++) {
      const d = new Date(year, month + 1, date);
      const dateStr = toDateStr(d);
      cells.push({
        label: date,
        dateStr,
        isOtherMonth: true,
        hasBanner: false,
        isToday: false,
        isSelected: false,
      });
    }
    return cells;
  }, [currentDate, selectedDate, bannerData]);

  // 날짜 선택
  const selectDate = (dateStr: string) => {
    const parts = dateStr.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    setSelectedDate(d);
    setCurrentSlide(0);
  };

  // 미리보기 자동 슬라이드
  useEffect(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    const count = bannersForSelectedDate.length;
    if (count > 1) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % count);
      }, 5000);
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [bannersForSelectedDate]);

  // 네비게이션 버튼: 오늘, 이전/다음 달
  const goPrevMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToday = () => { const t = new Date(); setCurrentDate(new Date(t.getFullYear(), t.getMonth(), 1)); setSelectedDate(t); };

  // 모달 열기/닫기
  const openAddModal = (slot?: number) => {
    setModalTitle('베너 추가');
    setFormSlot(slot ?? 1);
    setFormTitle('');
    setFormDesc('');
    setFormButtonText('');
    setFormLink('');
    setFormImageUrl('');
    setFormStartDate(toDateStr(selectedDate));
    setFormEndDate(toDateStr(selectedDate));
    setModalVisible(true);
  };
  const openEditModal = (slot: number, item: BannerItem) => {
    setModalTitle('베너 수정');
    setFormSlot(slot);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormButtonText(item.buttonText);
    setFormLink(item.link || '');
    setFormImageUrl(typeof item.image === 'string' ? item.image : '');
    setFormStartDate(item.startDate);
    setFormEndDate(item.endDate);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const saveBanner = () => {
    const dateStr = toDateStr(selectedDate);
    const newBanner: BannerItem = {
      slot: formSlot,
      title: formTitle.trim(),
      description: formDesc.trim(),
      buttonText: formButtonText.trim(),
      image: formImageUrl ? formImageUrl.trim() : null,
      startDate: formStartDate,
      endDate: formEndDate,
      link: formLink.trim() || undefined,
    };

    setBannerData((prev) => {
      const list = [...(prev[dateStr] || [])];
      const idx = list.findIndex((b) => b.slot === formSlot);
      if (idx >= 0) list[idx] = newBanner; else list.push(newBanner);
      list.sort((a, b) => a.slot - b.slot);
      return { ...prev, [dateStr]: list };
    });

    setModalVisible(false);
    show('베너가 저장되었습니다.');
  };

  const deleteBanner = (slot: number) => {
    const dateStr = toDateStr(selectedDate);
    Alert.alert('삭제 확인', '베너를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제', style: 'destructive', onPress: () => {
          setBannerData((prev) => {
            const list = (prev[dateStr] || []).filter((b) => b.slot !== slot);
            const next = { ...prev };
            if (list.length) next[dateStr] = list; else delete next[dateStr];
            return next;
          });
          show('베너가 삭제되었습니다.');
        }
      }
    ]);
  };

  // UI 렌더링
  // 이미지 소스 헬퍼: 로컬(require) 또는 URL을 모두 지원
  // 추가: 문자열이 "local:<key>" 형식이면 중앙 Images 매니페스트에서 로컬 이미지를 불러옵니다.
  const toSource = (img: string | number | null): ImageSourcePropType | undefined => {
    if (!img) return undefined;
    if (typeof img === 'number') return img;
    // 문자열 처리
    const s = String(img).trim();
    if (s.startsWith('local:')) {
      const key = s.slice('local:'.length) as keyof typeof Images;
      return Images[key] ?? undefined;
    }
    return { uri: s };
  };

  const renderPreviewSlides = () => {
    const slides = bannersForSelectedDate;
    if (slides.length === 0) {
      return (
        <View style={styles.previewContainerEmpty}>
          <Text style={{ color: '#fff' }}>선택한 날짜에 등록된 베너가 없습니다.</Text>
        </View>
      );
    }

    return (
      <View style={styles.previewContainer}>
        {slides.map((item, idx) => {
          const isActive = idx === currentSlide;
          return (
            <View key={idx} style={[styles.previewSlide, isActive ? styles.previewSlideActive : undefined]}>
              {item.image ? (
                <Image source={toSource(item.image)!} style={styles.previewImage} />
              ) : null}
              <View style={styles.previewContent}>
                <Text style={styles.previewTitle}>{item.title}</Text>
                <Text style={styles.previewDesc}>{item.description}</Text>
                <View style={styles.previewButton}> 
                  <Text style={styles.previewButtonText}>{item.buttonText || '자세히 보기'}</Text>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.previewDots}>
          {slides.map((_, idx) => (
            <TouchableOpacity key={idx} onPress={() => setCurrentSlide(idx)}>
              <View style={[styles.previewDot, idx === currentSlide ? styles.previewDotActive : undefined]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderSlotCard = (slot: number) => {
    const item = bannersForSelectedDate.find((b) => b.slot === slot) || null;
    const hasContent = !!item;

    return (
      <TouchableOpacity key={slot} activeOpacity={0.9} style={[styles.slotCard, hasContent ? styles.slotHasContent : styles.slotEmpty]} onPress={() => { if (!hasContent) openAddModal(slot); }}>
        <View style={styles.slotHeader}>
          <Text style={styles.slotNumber}>베너 {slot}</Text>
          <View style={styles.slotActions}>
            <TouchableOpacity onPress={() => hasContent ? openEditModal(slot, item as BannerItem) : openAddModal(slot)}>
              <FontAwesome5 name="edit" size={16} color="#4a6bdf" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBanner(slot)}>
              <FontAwesome5 name="trash" size={16} color="#e53935" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bannerPreview}>
          {hasContent ? (
            item!.image ? (
              <Image source={toSource(item!.image)!} style={styles.bannerImage} />
            ) : (
              <View style={styles.emptyBanner}>
                <FontAwesome5 name="image" size={24} color="#999" />
                <Text style={{ color: '#999', marginTop: 4 }}>이미지 없음</Text>
              </View>
            )
          ) : (
            <View style={styles.emptyBanner}>
              <FontAwesome5 name="plus-circle" size={24} color="#999" />
              <Text style={{ color: '#999', marginTop: 4 }}>베너 추가</Text>
            </View>
          )}
        </View>

        <View style={styles.bannerInfo}>
          <Text numberOfLines={1} style={styles.bannerTitle}>{hasContent ? item!.title : '베너 없음'}</Text>
          <Text style={styles.bannerPeriod}>{hasContent ? `${item!.startDate} - ${item!.endDate}` : '-'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SubformHeader title="베너 관리" onBack={() => navigation?.goBack?.()} onHome={() => navigation?.navigate?.('Home')} />

      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {/* 미리보기 섹션 */}
        <View style={styles.previewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>베너 미리보기</Text>
            <View style={styles.dateInfo}><Text style={styles.dateInfoText}>{selectedDateText}</Text></View>
          </View>
          {renderPreviewSlides()}
        </View>

        {/* 캘린더 섹션 */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>{calendarTitle}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={goPrevMonth}><FontAwesome5 name="chevron-left" size={16} color="#4a6bdf" /></TouchableOpacity>
              <TouchableOpacity onPress={goToday}><Text style={{ color: '#4a6bdf', fontWeight: '600' }}>오늘</Text></TouchableOpacity>
              <TouchableOpacity onPress={goNextMonth}><FontAwesome5 name="chevron-right" size={16} color="#4a6bdf" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekHeader}>
            {weekDays.map((d) => (
              <Text key={d} style={styles.weekDay}>{d}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarCells.map((cell, idx) => (
              <TouchableOpacity key={idx} style={[styles.calendarDay,
                cell.isOtherMonth ? styles.calendarDayOther : undefined,
                cell.isSelected ? styles.calendarDaySelected : undefined,
                cell.isToday ? styles.calendarDayToday : undefined,
              ]} onPress={() => !cell.isOtherMonth && selectDate(cell.dateStr)}>
                <Text style={styles.calendarDayText}>{cell.label}</Text>
                {cell.hasBanner ? <View style={styles.bannerIndicator} /> : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 베너 관리 섹션 */}
        <View style={styles.bannerSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>베너 관리</Text>
            <View style={styles.dateInfo}><Text style={styles.dateInfoText}>{selectedDateText}</Text></View>
          </View>

          <View style={styles.bannerSlots}>
            {Array.from({ length: 4 }).map((_, i) => renderSlotCard(i + 1))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
            <TouchableOpacity style={styles.addButton} onPress={() => openAddModal()}>
              <FontAwesome5 name="plus" size={16} color="#fff" />
              <Text style={styles.addButtonText}>베너 추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={closeModal}><Text style={{ fontSize: 20 }}>×</Text></TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: '80%' }}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>베너 제목</Text>
                <TextInput value={formTitle} onChangeText={setFormTitle} style={styles.input} placeholder="베너 제목을 입력하세요" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>베너 설명</Text>
                <TextInput value={formDesc} onChangeText={setFormDesc} style={[styles.input, { height: 100 }]} multiline placeholder="베너에 대한 상세 설명을 입력하세요" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>버튼 텍스트</Text>
                <TextInput value={formButtonText} onChangeText={setFormButtonText} style={styles.input} placeholder="버튼에 표시할 텍스트 (예: 자세히 보기)" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>연결 링크</Text>
                <TextInput value={formLink} onChangeText={setFormLink} style={styles.input} placeholder="클릭 시 이동할 링크 주소" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>베너 이미지(URL 또는 local:key)</Text>
                <TextInput
                  value={formImageUrl}
                  onChangeText={setFormImageUrl}
                  style={styles.input}
                  placeholder="예) https://... 또는 local:banner1 / local:photoPlaceholder"
                />
                {formImageUrl ? (
                  <Image source={toSource(formImageUrl)!} style={styles.imagePreview} />
                ) : null}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>게시 기간</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TextInput value={formStartDate} onChangeText={setFormStartDate} style={[styles.input, { flex: 1 }]} placeholder="YYYY-MM-DD" />
                  <View style={{ alignSelf: 'center' }}><Text> ~ </Text></View>
                  <TextInput value={formEndDate} onChangeText={setFormEndDate} style={[styles.input, { flex: 1 }]} placeholder="YYYY-MM-DD" />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>슬롯 선택</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {Array.from({ length: 4 }).map((_, i) => {
                    const n = i + 1;
                    const active = n === formSlot;
                    return (
                      <TouchableOpacity key={n} style={[styles.chip, active ? styles.chipActive : undefined]} onPress={() => setFormSlot(n)}>
                        <Text style={[styles.chipText, active ? { color: '#fff', fontWeight: '700' } : undefined]}>슬롯 {n}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <View style={styles.formActions}>
              <TouchableOpacity style={styles.btnSecondary} onPress={closeModal}><Text style={styles.btnSecondaryText}>취소</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={saveBanner}><Text style={styles.btnPrimaryText}>저장</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 토스트 */}
      {visible && (
        <View style={styles.toast}><Text style={{ color: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>{message}</Text></View>
      )}
    </View>
  );
};

export default BannerManagement;
