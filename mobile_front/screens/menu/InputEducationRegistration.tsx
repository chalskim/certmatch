import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/InputEducationRegistration';
import SubformHeader from '../components/SubformHeader';

type ScheduleItem = {
  id: string;
  startDate: string;
  endDate: string;
  timeSlot: string;
  content: string;
};

type InstructorItem = {
  id: string;
  name: string;
  career: string;
};

const newId = (prefix = '') => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;

export const EducationRegistration: React.FC = () => {
  const navigation = useNavigation();

  // Institution
  const [institutionName, setInstitutionName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [institutionIntro, setInstitutionIntro] = useState('');

  // Course
  const [courseName, setCourseName] = useState('');
  const [courseOverview, setCourseOverview] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [location, setLocation] = useState('');

  // Period & method
  const [totalHours, setTotalHours] = useState('');
  const [duration, setDuration] = useState('');
  const [method, setMethod] = useState<'online' | 'offline' | 'hybrid' | ''>('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');

  // Fee & capacity
  const [tuitionFee, setTuitionFee] = useState('');
  const [governmentSupport, setGovernmentSupport] = useState(false);
  const [capacity, setCapacity] = useState('');

  // Dynamic lists
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [instructors, setInstructors] = useState<InstructorItem[]>([]);

  // Uploaded files for course materials
  const [files, setFiles] = useState<Array<{ name: string; uri: string; size?: number; mimeType?: string }>>([]);

  // Helpers
  const addSchedule = () => {
    const id = newId('sched_');
    setSchedules([...schedules, { id, startDate: '', endDate: '', timeSlot: '', content: '' }]);
  };
  const removeSchedule = (id: string) => setSchedules(schedules.filter(s => s.id !== id));
  const updateSchedule = (id: string, patch: Partial<ScheduleItem>) => setSchedules(schedules.map(s => s.id === id ? { ...s, ...patch } : s));

  const addInstructor = () => {
    const id = newId('instr_');
    setInstructors([...instructors, { id, name: '', career: '' }]);
  };
  const removeInstructor = (id: string) => setInstructors(instructors.filter(i => i.id !== id));
  const updateInstructor = (id: string, patch: Partial<InstructorItem>) => setInstructors(instructors.map(i => i.id === id ? { ...i, ...patch } : i));

  // Initial add when component mounts: add one schedule and one instructor for convenience
  React.useEffect(() => {
    if (schedules.length === 0) addSchedule();
    if (instructors.length === 0) addInstructor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateAndSubmit = () => {
    const required = [institutionName, contactNumber, courseName, curriculum, totalHours, tuitionFee, capacity];
    if (required.some(v => !v || v.toString().trim() === '')) {
      Alert.alert('필수 입력', '필수 항목을 모두 입력해주세요.');
      return;
    }
    if (!method || !level) {
      Alert.alert('선택 필요', '교육 방식과 난이도를 선택해주세요.');
      return;
    }
    if (schedules.length === 0) {
      Alert.alert('일정 필요', '최소 하나 이상의 일정을 추가해주세요.');
      return;
    }
    if (instructors.length === 0) {
      Alert.alert('강사 필요', '최소 한 명 이상의 강사를 추가해주세요.');
      return;
    }

    // Collect data
    const formData = {
      institution: { institutionName, representativeName, contactNumber, address, institutionIntro },
      course: { courseName, courseOverview, curriculum, location },
      details: { totalHours, duration, method, level },
      fee: { tuitionFee, governmentSupport, capacity },
      schedules,
      instructors,
      certificate: false,
      files,
    };

    console.log('Education registration submit', formData);
    Alert.alert('등록 완료', '교육 과정이 성공적으로 등록되었습니다.', [{ text: '확인', onPress: () => navigation.goBack() }]);
  };

  // File picker (uses expo-document-picker if available)
  const pickFile = async () => {
    try {
      // @ts-ignore - optional dependency, may not be installed in all environments
      const DocumentPicker = await import('expo-document-picker');
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (res.type === 'success') {
        setFiles(prev => [...prev, { name: res.name, uri: res.uri, size: (res as any).size, mimeType: (res as any).mimeType }]);
      }
    } catch (err) {
      console.warn('DocumentPicker not available or failed:', err);
      Alert.alert('파일 업로드 불가', '파일 선택 기능을 사용하려면 expo-document-picker를 설치하거나 네이티브 환경에서 실행하세요.');
    }
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <SubformHeader
        title="인증 교육 등록"
        navigation={navigation as any}
        onHome={() => (navigation as any)?.navigate('Home')}
      />

      <View style={styles.formContainer}>
        {/* Institution Info */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>교육기관 정보</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>기관명 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={institutionName} onChangeText={setInstitutionName} placeholder="교육기관명을 입력하세요" />
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>대표자명</Text>
              <TextInput style={styles.input} value={representativeName} onChangeText={setRepresentativeName} placeholder="대표자명을 입력하세요" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>연락처 <Text style={styles.required}>*</Text></Text>
              <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} placeholder="연락처를 입력하세요" keyboardType="phone-pad" />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>주소</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="주소를 입력하세요" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>기관 소개</Text>
            <TextInput style={[styles.input, styles.textArea]} value={institutionIntro} onChangeText={setInstitutionIntro} multiline numberOfLines={3} placeholder="교육기관에 대한 간단한 소개를 입력하세요" />
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>과정 정보</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>과정명 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={courseName} onChangeText={setCourseName} placeholder="교육 과정명을 입력하세요" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>교육 개요</Text>
            <TextInput style={[styles.input, styles.textArea]} value={courseOverview} onChangeText={setCourseOverview} multiline numberOfLines={3} placeholder="교육 과정에 대한 개요를 입력하세요" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>커리큘럼 <Text style={styles.required}>*</Text></Text>
            <TextInput style={[styles.input, styles.textArea]} value={curriculum} onChangeText={setCurriculum} multiline numberOfLines={5} placeholder="교육 커리큘럼을 상세히 입력하세요" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>장소</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="교육 장소를 입력하세요 (예: 서울 강남구 ○○센터 또는 온라인)"
            />
          </View>
        </View>

        {/* Period & Method */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>교육 기간 및 방식</Text>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>총 교육 시간 <Text style={styles.required}>*</Text></Text>
              <TextInput style={styles.input} value={totalHours} onChangeText={setTotalHours} placeholder="예: 40" keyboardType="numeric" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>교육 기간</Text>
              <TextInput style={styles.input} value={duration} onChangeText={setDuration} placeholder="예: 4주, 3개월" />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>교육 방식 <Text style={styles.required}>*</Text></Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity style={styles.radioItem} onPress={() => setMethod('online')}>
                <FontAwesome5 name={method === 'online' ? 'dot-circle' : 'circle'} size={14} color={method === 'online' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>온라인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioItem} onPress={() => setMethod('offline')}>
                <FontAwesome5 name={method === 'offline' ? 'dot-circle' : 'circle'} size={14} color={method === 'offline' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>오프라인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioItem} onPress={() => setMethod('hybrid')}>
                <FontAwesome5 name={method === 'hybrid' ? 'dot-circle' : 'circle'} size={14} color={method === 'hybrid' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>혼합</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>난이도 <Text style={styles.required}>*</Text></Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity style={styles.radioItem} onPress={() => setLevel('beginner')}>
                <FontAwesome5 name={level === 'beginner' ? 'dot-circle' : 'circle'} size={14} color={level === 'beginner' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>입문</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioItem} onPress={() => setLevel('intermediate')}>
                <FontAwesome5 name={level === 'intermediate' ? 'dot-circle' : 'circle'} size={14} color={level === 'intermediate' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>중급</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioItem} onPress={() => setLevel('advanced')}>
                <FontAwesome5 name={level === 'advanced' ? 'dot-circle' : 'circle'} size={14} color={level === 'advanced' ? '#0066CC' : '#666'} />
                <Text style={{ marginLeft: 8 }}>고급</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Fee & Capacity */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>수강료 및 정원</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>수강료 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={tuitionFee} onChangeText={setTuitionFee} placeholder="예: 350,000원" />
          </View>

          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.checkboxItem} onPress={() => setGovernmentSupport(!governmentSupport)}>
              <FontAwesome5 name={governmentSupport ? 'check-square' : 'square'} size={16} color={governmentSupport ? '#0066CC' : '#666'} />
              <Text style={{ marginLeft: 8 }}>정부지원 가능</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>정원 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={capacity} onChangeText={setCapacity} placeholder="모집 정원을 입력하세요" keyboardType="numeric" />
          </View>
        </View>

        {/* Schedule dynamic list */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>교육 과정 등록</Text>

          <View style={styles.dynamicList}>
            {schedules.map((s, idx) => (
              <View key={s.id} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>일정 {idx + 1}</Text>
                  <TouchableOpacity onPress={() => removeSchedule(s.id)}>
                    <FontAwesome5 name="times" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
                <View style={styles.formRow}>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>시작일</Text>
                    <TextInput style={styles.input} value={s.startDate} onChangeText={(v) => updateSchedule(s.id, { startDate: v })} placeholder="YYYY-MM-DD" />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>종료일</Text>
                    <TextInput style={styles.input} value={s.endDate} onChangeText={(v) => updateSchedule(s.id, { endDate: v })} placeholder="YYYY-MM-DD" />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>요일/시간</Text>
                  <TextInput style={styles.input} value={s.timeSlot} onChangeText={(v) => updateSchedule(s.id, { timeSlot: v })} placeholder="예: 월/수/금 19:00-22:00" />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>교육내용</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={s.content}
                    onChangeText={(v) => updateSchedule(s.id, { content: v })}
                    multiline
                    numberOfLines={3}
                    placeholder="해당 일정에 진행할 교육 내용을 입력하세요 (예: 1주차 - 품질경영 개론)"
                  />
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addItemBtn} onPress={addSchedule}>
            <FontAwesome5 name="plus" size={14} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 8 }}>일정 추가</Text>
          </TouchableOpacity>
        </View>

        {/* Instructors dynamic list */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>수료증 및 강사 정보</Text>

          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.checkboxItem} onPress={() => { /* toggle certificate issuance if needed */ }}>
              <FontAwesome5 name={'square'} size={16} color="#666" />
              <Text style={{ marginLeft: 8 }}>수료증 발급</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dynamicList}>
            {instructors.map((ins, idx) => (
              <View key={ins.id} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>강사 {idx + 1}</Text>
                  <TouchableOpacity onPress={() => removeInstructor(ins.id)}>
                    <FontAwesome5 name="times" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>강사명</Text>
                  <TextInput style={styles.input} value={ins.name} onChangeText={(v) => updateInstructor(ins.id, { name: v })} placeholder="강사명을 입력하세요" />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>주요 경력</Text>
                  <TextInput style={[styles.input, styles.textArea]} value={ins.career} onChangeText={(v) => updateInstructor(ins.id, { career: v })} multiline numberOfLines={2} placeholder="주요 경력 및 전문 분야를 입력하세요" />
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addItemBtn} onPress={addInstructor}>
            <FontAwesome5 name="plus" size={14} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 8 }}>강사 추가</Text>
          </TouchableOpacity>
        </View>

        {/* Course materials / file upload */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>교육 자료 업로드</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>강의자료, 슬라이드, 예제 파일 등을 업로드하세요</Text>
            <TouchableOpacity style={[styles.addItemBtn, { backgroundColor: '#0066CC', marginTop: 8 }]} onPress={pickFile}>
              <FontAwesome5 name="cloud-upload-alt" size={14} color="#fff" />
              <Text style={{ color: '#fff', marginLeft: 8 }}>파일 선택</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dynamicList}>
            {files.length === 0 ? (
              <Text style={{ color: '#999' }}>업로드된 파일이 없습니다.</Text>
            ) : (
              files.map((f, idx) => (
                <View key={idx} style={styles.listItem}>
                  <View style={styles.listItemHeader}>
                    <Text style={styles.listItemTitle}>{f.name}</Text>
                    <TouchableOpacity onPress={() => removeFile(idx)}>
                      <FontAwesome5 name="times" size={16} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: '#666', fontSize: 12 }}>{f.size ? `${(f.size / 1024).toFixed(1)} KB` : ''} {f.mimeType ? `· ${f.mimeType}` : ''}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Submit actions */}
        <View style={styles.formActions}>
          <View />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
              <FontAwesome5 name="times" size={14} color="#333" />
              <Text style={styles.secondaryButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={validateAndSubmit}>
              <FontAwesome5 name="paper-plane" size={14} color="#fff" />
              <Text style={styles.primaryButtonText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default EducationRegistration;
