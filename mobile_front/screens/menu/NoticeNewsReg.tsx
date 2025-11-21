import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import SubformHeader from '../components/SubformHeader';

type PublicationType = 'immediate' | 'scheduled';

const categoryOptions = ['일반', '속보', '긴급공지', '산업뉴스', '글로벌', '지원사업'] as const;
const certOptions = ['ISMS-P', 'ISO 27001', 'GS 인증', 'CPPG', '정부지원', '기타'] as const;
const iconOptions = ['📰', '📢', '🔥', '📈', '💰', '🌍', '📋', '⚠️'] as const;

const NoticeNewsReg: React.FC<any> = ({ navigation, route }) => {
  const mode: 'create' | 'edit' = route?.params?.mode ?? 'create';
  const item = route?.params?.item as any | undefined;
  const onSave = route?.params?.onSave as ((newItem: any) => void) | undefined;
  const onUpdate = route?.params?.onUpdate as ((updatedItem: any) => void) | undefined;
  // 폼 상태
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writtenDate, setWrittenDate] = useState(''); // YYYY-MM-DD
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<string>('');
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [publicationType, setPublicationType] = useState<PublicationType>('immediate');
  const [reserveDate, setReserveDate] = useState(''); // YYYY-MM-DD
  const [reserveTime, setReserveTime] = useState(''); // HH:mm
  const [selectedIcon, setSelectedIcon] = useState<string>('📰');

  // 편집 모드일 경우 초기값 설정
  useEffect(() => {
    if (mode === 'edit' && item) {
      setTitle(item.title ?? '');
      setContent(item.content ?? '');
      setWrittenDate(item.date ?? item.writtenDate ?? '');
      setOrganization(item.org ?? item.organization ?? '');
      setCategory(item.category ?? '');
      setSelectedCerts(Array.isArray(item.certifications) ? item.certifications : []);
      const pubType = item.publication?.type === 'scheduled' ? 'scheduled' : 'immediate';
      setPublicationType(pubType);
      setReserveDate(item.publication?.date ?? '');
      setReserveTime(item.publication?.time ?? '');
      setSelectedIcon(item.icon ?? '📰');
    }
  }, [mode, item]);

  const toggleCert = (name: string) => {
    setSelectedCerts((prev) => {
      if (prev.includes(name)) return prev.filter((c) => c !== name);
      return [...prev, name];
    });
  };

  const onSubmit = () => {
    if (!title.trim() || !content.trim() || !writtenDate.trim() || !organization.trim() || !category.trim()) {
      Alert.alert('입력 확인', '필수 항목(제목/내용/작성일자/기관/분류)을 입력해주세요.');
      return;
    }
    const publication: any = { type: publicationType };
    if (publicationType === 'scheduled') {
      publication.date = reserveDate;
      publication.time = reserveTime;
    }
    const formData = {
      title,
      content,
      writtenDate,
      organization,
      category,
      certifications: selectedCerts,
      publication,
      icon: selectedIcon,
    };
    console.log('서버로 전송될 데이터:', formData);
    if (mode === 'edit' && item?.id) {
      const updated = { ...item, ...formData, date: formData.writtenDate };
      onUpdate?.(updated);
      Alert.alert('수정 완료', '공지사항이 성공적으로 수정되었습니다!', [
        { text: '확인', onPress: () => navigation?.goBack?.() },
      ]);
    } else {
      const newItem = { id: Date.now(), ...formData, date: formData.writtenDate, org: formData.organization };
      onSave?.(newItem);
      Alert.alert('등록 완료', '공지사항이 성공적으로 등록되었습니다!', [
        { text: '확인', onPress: () => navigation?.goBack?.() },
      ]);
      // 폼 초기화
      setTitle('');
      setContent('');
      setWrittenDate('');
      setOrganization('');
      setCategory('');
      setSelectedCerts([]);
      setPublicationType('immediate');
      setReserveDate('');
      setReserveTime('');
      setSelectedIcon('📰');
    }
  };

  const onCancel = () => {
    Alert.alert('취소 확인', '정말로 등록을 취소하시겠습니까? 입력된 내용은 저장되지 않습니다.', [
      { text: '아니오', style: 'cancel' },
      {
        text: '예',
        style: 'destructive',
        onPress: () => {
          setTitle('');
          setContent('');
          setWrittenDate('');
          setOrganization('');
          setCategory('');
          setSelectedCerts([]);
          setPublicationType('immediate');
          setReserveDate('');
          setReserveTime('');
          setSelectedIcon('📰');
        },
      },
    ]);
  };

  const isScheduled = publicationType === 'scheduled';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SubformHeader
        title="공지사항 및 뉴스 등록"
        onBack={() => navigation?.goBack?.()}
        onHome={() => navigation?.navigate?.('Home')}
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* 제목 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="공지사항 제목을 입력하세요"
            style={styles.input}
            accessibilityLabel="공지사항 제목 입력"
          />
        </View>

        {/* 내용 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="공지사항 상세 내용을 입력하세요"
            style={[styles.input, { minHeight: 120, textAlignVertical: 'top' }]}
            multiline
            accessibilityLabel="공지사항 내용 입력"
          />
        </View>

        {/* 작성일자 / 기관 */}
        <View style={styles.row}>
          <View style={styles.formGroupRowItem}>
            <Text style={styles.label}>작성일자</Text>
            <TextInput
              value={writtenDate}
              onChangeText={setWrittenDate}
              placeholder="YYYY-MM-DD"
              style={styles.input}
              accessibilityLabel="작성일자 입력"
            />
          </View>
          <View style={styles.formGroupRowItem}>
            <Text style={styles.label}>기관/소스</Text>
            <TextInput
              value={organization}
              onChangeText={setOrganization}
              placeholder="예: 과학기술정보통신부"
              style={styles.input}
              accessibilityLabel="기관/소스 입력"
            />
          </View>
        </View>

        {/* 분류 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>분류</Text>
          <View style={styles.selectorRow}>
            {categoryOptions.map((opt) => {
              const active = category === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setCategory(opt)}
                  style={[styles.chip, active ? styles.chipActive : undefined]}
                  accessibilityLabel={`분류 선택: ${opt}`}
                >
                  <Text style={[styles.chipText, active ? { color: '#fff', fontWeight: '700' } : undefined]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 관련 인증 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>관련 인증 (중복 선택 가능)</Text>
          <View style={styles.selectorRow}>
            {certOptions.map((opt) => {
              const active = selectedCerts.includes(opt);
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => toggleCert(opt)}
                  style={[styles.chip, active ? styles.chipActive : undefined]}
                  accessibilityLabel={`관련 인증 선택: ${opt}`}
                >
                  <Text style={[styles.chipText, active ? { color: '#fff', fontWeight: '700' } : undefined]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 발행 설정 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>발행 설정</Text>
          <View style={styles.selectorRow}>
            {(['immediate', 'scheduled'] as PublicationType[]).map((opt) => {
              const label = opt === 'immediate' ? '즉시 발행' : '예약 발행';
              const active = publicationType === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setPublicationType(opt)}
                  style={[styles.chip, active ? styles.chipActive : undefined]}
                  accessibilityLabel={`발행 설정: ${label}`}
                >
                  <Text style={[styles.chipText, active ? { color: '#fff', fontWeight: '700' } : undefined]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 예약 발행 필드 */}
        <View style={[styles.formGroup, !isScheduled ? styles.disabledFieldset : undefined]}>
          <View style={styles.row}>
            <View style={styles.formGroupRowItem}>
              <Text style={styles.label}>예약일자</Text>
              <TextInput
                value={reserveDate}
                onChangeText={setReserveDate}
                placeholder="YYYY-MM-DD"
                style={styles.input}
                editable={isScheduled}
                accessibilityLabel="예약일자 입력"
              />
            </View>
            <View style={styles.formGroupRowItem}>
              <Text style={styles.label}>예약시간</Text>
              <TextInput
                value={reserveTime}
                onChangeText={setReserveTime}
                placeholder="HH:mm"
                style={styles.input}
                editable={isScheduled}
                accessibilityLabel="예약시간 입력"
              />
            </View>
          </View>
        </View>

        {/* 아이콘 선택 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>아이콘 선택</Text>
          <View style={styles.selectorRow}>
            {iconOptions.map((opt) => {
              const active = selectedIcon === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setSelectedIcon(opt)}
                  style={[styles.iconOption, active ? styles.iconActive : undefined]}
                  accessibilityLabel={`아이콘 선택: ${opt}`}
                >
                  <Text style={{ fontSize: 22 }}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 액션 */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.btnSecondary]} accessibilityLabel="등록 취소">
            <Text style={[styles.btnText, { color: '#555' }]}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={[styles.btn, styles.btnPrimary]} accessibilityLabel={mode === 'edit' ? '공지 수정' : '공지 등록'}>
            <Text style={[styles.btnText, { color: '#fff' }]}>{mode === 'edit' ? '수정하기' : '등록하기'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  formGroupRowItem: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 15,
    color: '#444',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  chipActive: {
    backgroundColor: '#4a6fdc',
    borderColor: '#4a6fdc',
  },
  chipText: {
    color: '#555',
    fontSize: 14,
  },
  disabledFieldset: {
    opacity: 0.5,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  iconActive: {
    borderColor: '#4a6fdc',
    backgroundColor: '#f0f4ff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#4a6fdc',
  },
  btnSecondary: {
    backgroundColor: '#f5f5f5',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NoticeNewsReg;