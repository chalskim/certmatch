import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Platform,
} from 'react-native';
import type { ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/NoticeItemlistDetail';

// 뉴스 및 정부 정책 상세 화면 (타입스크립트 변환)
// 기존 mokup/뉴스및정부정책상세.html을 React Native/Expo 스타일로 변환한 화면입니다.
// 하단 인기 뉴스 카드는 본문과 동일한 폭으로 표시됩니다.

const COLORS = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  text: '#333',
  lightGray: '#f8f9fa',
  border: '#e9ecef',
};

export default function NoticeItemlistDetail() {
  const navigation = useNavigation<any>();
  const onShare = useCallback(async () => {
    try {
      if (
        Platform.OS === 'web' &&
        typeof window !== 'undefined' &&
        (window as any).navigator?.share
      ) {
        await (window as any).navigator.share({
          title: '[속보] 정보보호법 개정안 국회 본회의 통과',
          text: '개인정보보호 강화 조치, 내년 1월부터 시행 예정',
          url: (window as any).location?.href ?? '',
        });
      } else {
        await Share.share({
          message:
            '[속보] 정보보호법 개정안 국회 본회의 통과 - 개인정보보호 강화 조치, 내년 1월부터 시행 예정',
        });
      }
    } catch (e) {
      Alert.alert('공유 실패', '공유 중 오류가 발생했습니다.');
    }
  }, []);

  const onPrint = useCallback(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      (window as any).print?.();
    } else {
      Alert.alert('인쇄', '인쇄 기능은 웹에서만 지원됩니다.');
    }
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 상단 공통 서브 헤더 */}
      <SubformHeader
        title="뉴스 상세"
        showBack
        showHome
        navigation={navigation}
        onHome={() => navigation.navigate('Home')}
      />
      {/* 헤더 영역 */}
      <View style={styles.header}>
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbLink}>홈</Text>
          <Text style={styles.breadcrumbSeparator}>{'>'}</Text>
          <Text style={styles.breadcrumbLink}>공지사항 및 뉴스</Text>
          <Text style={styles.breadcrumbSeparator}>{'>'}</Text>
          <Text style={styles.breadcrumbActive}>뉴스 상세</Text>
        </View>

        <Text style={styles.articleTitle}>
          [속보] 정보보호법 개정안 국회 본회의 통과
        </Text>

        {/* 메타 정보 */}
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📅</Text>
            <Text style={styles.metaText}>2025년 1월 15일</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>🏢</Text>
            <Text style={styles.metaText}>국회 과학기술정보방송통신위원회</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>👁️</Text>
            <Text style={styles.metaText}>조회 15,234회</Text>
          </View>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onPrint} style={styles.actionBtn}>
            <Text style={styles.actionText}>인쇄</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.actionBtn}>
            <Text style={styles.actionText}>공유</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>글자 크기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 히어로 이미지 */}
      <Image
            source={require('../../assets/icon/news-assembly.jpg')}
        style={styles.heroImage as ImageStyle}
        resizeMode="cover"
        accessibilityLabel="국회 본회의 장면"
      />

      {/* 본문 카드 */}
      <View style={styles.card}>
        <View>
          <Text style={styles.paragraph}>
            오늘 오전, 국회 본회의에서 개인정보보호법 일부 개정안이 재석의원 과반수 찬성으로 의결되었습니다. 이번 개정안은 디지털 전환 가속화에 따른 새로운 개인정보 보호 위협에 대응하고, 기업의 책임을 강화하는 데 중점을 두고 있습니다.
          </Text>

          <View style={styles.keyPoint}>
            <Text style={styles.keyPointTitle}>주요 변경 사항 요약</Text>
            <Text style={styles.paragraph}>
              개정안은 내년 1월 1일부터 시행될 예정이며, 기업은 6개월의 유예 기간을 갖고 시스템과 정책을 정비해야 합니다.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>1. 가명정보 활용 범위 확대</Text>
          <Text style={styles.paragraph}>
            가장 큰 변화 중 하나는 가명정보 활용 범위의 확대입니다. 기존에는 통계 작성, 연구 목적 등으로 제한되었던 가명정보의 활용이 마케팅, 신상품 개발 등 상업적 목적으로도 허용됩니다. 다만, 정보주체에게 사전 고지하고 동의를 받아야 하며, 안전성 확보 조치를 의무화했습니다.
          </Text>

          <Text style={styles.sectionTitle}>2. 데이터 주체의 권리 강화</Text>
          <Text style={styles.paragraph}>데이터 주체의 자기정보결정권을 실질적으로 보장하기 위한 조치들이 포함되었습니다.</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>자동화된 개인정보 처리 거부권: </Text>
              채용, 대출 심사 등에서 인공지능이나 알고리즘을 통한 결정에 대해 설명을 요구하고 거부할 수 있는 권리가 신설되었습니다.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>정보 이동권 강화: </Text>
              특정 플랫폼에 축적된 개인정보를 다른 서비스로 옮길 수 있는 권리가 명확해졌습니다.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>동의 철회 절차 간소화: </Text>
              온라인 플랫폼 내에서 개인정보 처리 동의를 간편하게 철회할 수 있는 기능을 의무화합니다.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>3. 기업의 처벌 수위 대폭 상향</Text>
          <Text style={styles.quote}>
            "3년 이하의 징역 또는 5천만원 이하의 벌금에 그쳤던 과징금이 최대 50억원으로 대폭 상향되었습니다. 또한, 고의적인 중대 침해에 대해서는 과징금의 3배를 부과할 수 있도록 '가중처벌' 조항이 신설되었습니다."
          </Text>

          <Text style={styles.sectionTitle}>4. 글로벌 스탠다드와의 정합성 제고</Text>
          <Text style={styles.paragraph}>
            이번 개정은 유럽연합의 GDPR(일반개인정보보호규정) 등 해외 주요 국가의 개인정보보호 법체계와의 정합성을 높이는 데도 중점을 두었습니다. 이는 국내 기업의 해외 진출 시 규제 장벽을 낮추고, 글로벌 데이터 자유로운 이동(Free Flow of Data)을 촉진하는 효과가 있을 것으로 기대됩니다.
          </Text>

          <Text style={styles.subTitle}>기업의 과제</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>1. 내부 개인정보 처리 정책 전면 재검토 및 개정</Text>
            <Text style={styles.listItem}>2. 데이터 거버넌스 체계 구축 및 DPO(개인정보보호책임자) 역량 강화</Text>
            <Text style={styles.listItem}>3. 개인정보 영향평가(PIA) 및 기술적·관리적 보호조치 강화</Text>
            <Text style={styles.listItem}>4. 임직원 대상 개인정보보호 교육 및 인식 제고 프로그램 운영</Text>
          </View>

          <Text style={styles.paragraph}>
            정보보호 전문가들은 "이번 법 개정은 '규제 강화'라는 부담감보다는, 신뢰 기반의 데이터 경제를 구축할 기회로 삼아야 한다"며 "선제적인 대응을 통해 데이터 주체의 신뢰를 얻는 기업이 미래 시장에서 경쟁 우위를 확보할 수 있을 것"이라고 조언했습니다.
          </Text>
        </View>
      </View>

      {/* 하단 인기 뉴스 카드 (본문과 동일 폭) */}
      <View style={styles.bottomCard}>
        <Text style={styles.sidebarTitle}>인기 뉴스</Text>
        {renderTrendingItem(1, '[속보] 정보보호법 개정안 국회 본회의 통과', '개인정보보호 강화 조치, 내년 1월부터 시행')}
        {renderTrendingItem(2, '2025년 상급종합병원 ISMS-P 의무인증 기한 안내', '전국 47개 상급종합병원 대상 2025.08.31까지')}
        {renderTrendingItem(3, '중소기업 정보보호 인증 지원사업 (2025년 1차)', 'ISMS-P 인증 취득 비용 최대 70% 지원')}
        {renderTrendingItem(4, '금융권 정보보호 컨설팅 바우처', '금융회사 대상 ISMS-P-FSI 컨설팅 비용 50% 지원')}
        {renderTrendingItem(5, 'ISO 27001 인증 기업, 평균 매출 23% 증가', '정보보호 투자가 기업 성장에 직접적인 영향')}
      </View>
    </ScrollView>
  );

  function renderTrendingItem(number: number, title: string, desc: string) {
    return (
      <TouchableOpacity key={number} style={styles.trendingItem} activeOpacity={0.7}>
        <View style={styles.trendingNumber}>
          <Text style={styles.trendingNumberText}>{number}</Text>
        </View>
        <View style={styles.trendingContent}>
          <Text style={styles.trendingTitle}>{title}</Text>
          <Text style={styles.trendingDesc}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
