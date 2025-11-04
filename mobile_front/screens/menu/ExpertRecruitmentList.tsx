import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import styles from '../styles/menu/ExpertRecruitmentList';

// Note: React hooks (useState/useEffect) must be called inside components.
// The stateful hooks are declared inside the default exported component below.


type JobPosting = {
id: number;
title: string;
company: string;
location: string;
status: 'active' | 'closed';
views: number;
applicants: number;
deadline: string; // ISO date string
postedDate: string; // ISO date string
};

type Applicant = {
id: number;
jobId: number;
name: string;
title: string;
experience: string;
status: 'reviewing' | 'interview' | 'passed' | 'failed';
email?: string;
phone?: string;
location?: string;
};

const MOCK_JOB_POSTINGS: JobPosting[] = [
{
    id: 1,
    title: '정보보호 담당자 (ISMS-P 경험 필수)',
    company: '㈜테크솔루션',
    location: '서울 강남구',
    status: 'active',
    views: 125,
    applicants: 8,
    deadline: '2025-03-15',
    postedDate: '2025-02-15',
},
{
    id: 2,
    title: '클라우드 보안 전문가 (AWS/Azure)',
    company: '㈜클라우드테크',
    location: '서울 서초구',
    status: 'active',
    views: 98,
    applicants: 5,
    deadline: '2025-03-10',
    postedDate: '2025-02-10',
},
{
    id: 3,
    title: '개인정보보호 담당자 (PIMS 경험자)',
    company: '㈜핀테크코리아',
    location: '서울 여의도',
    status: 'closed',
    views: 210,
    applicants: 12,
    deadline: '2025-02-28',
    postedDate: '2025-01-28',
},
];

const MOCK_APPLICANTS: Applicant[] = [
{
    id: 1,
    jobId: 1,
    name: '김민수',
    title: '정보보호 컨설턴트',
    experience: '5년',
    status: 'reviewing',
    email: 'kimms@example.com',
    phone: '010-1234-5678',
    location: '서울 강남구',
},
{
    id: 2,
    jobId: 1,
    name: '이지영',
    title: '정보보호 관리자',
    experience: '3년',
    status: 'interview',
    email: 'leejy@example.com',
    phone: '010-2345-6789',
    location: '경기 성남시',
},
{
    id: 3,
    jobId: 1,
    name: '박준호',
    title: '네트워크 보안 엔지니어',
    experience: '7년',
    status: 'passed',
    email: 'parkjh@example.com',
    phone: '010-3456-7890',
    location: '서울 서초구',
},
];


export default function ExpertRecruitmentList({ navigation }: any) {
    const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
    const [applicants] = useState<Applicant[]>(MOCK_APPLICANTS);

    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);

    function showToast(msg: string) {
        setToast(msg);
    }

    function openJobDetail(job: JobPosting) {
        setSelectedJob(job);
    }

    function closeJobDetail() {
        setSelectedJob(null);
    }

    function openApplicantProfile(app: Applicant) {
        setSelectedApplicant(app);
    }

    function closeApplicantProfile() {
        setSelectedApplicant(null);
    }

    function updateApplicantStatus(applicantId: number, newStatus: Applicant['status']) {
        const found = applicants.find(a => a.id === applicantId);
        if (found) {
        showToast(`${found.name}님의 상태가 ${newStatus}로 변경되었습니다.`);
        }
    }

    function sendMessage() {
        if (!messageText.trim()) {
        showToast('메시지 내용을 입력해주세요.');
        return;
        }
        showToast('메시지가 전송되었습니다.');
        setMessageText('');
        setMessageModalVisible(false);
    }

    function deleteJob(jobId: number) {
        const filtered = jobs.filter(j => j.id !== jobId);
        setJobs(filtered);
        showToast('공고가 삭제되었습니다.');
        closeJobDetail();
    }

    function closeJob(jobId: number) {
        setJobs(prev => prev.map(j => (j.id === jobId ? { ...j, status: 'closed' } : j)));
        showToast('공고가 마감되었습니다.');
        closeJobDetail();
    }

    function repostJob(jobId: number) {
        setJobs(prev =>
        prev.map(j => {
            if (j.id !== jobId) return j;
            const d = new Date(j.deadline);
            d.setDate(d.getDate() + 30);
            return { ...j, status: 'active', deadline: d.toISOString().split('T')[0] };
        }),
        );
        showToast('공고가 재공고되었습니다.');
        closeJobDetail();
    }

    const renderJobItem = ({ item }: { item: JobPosting }) => (
        <TouchableOpacity style={styles.jobCard} onPress={() => openJobDetail(item)}>
        <View style={styles.jobHeader}>
            <View>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{`${item.company} · ${item.location}`}</Text>
            </View>
            <View style={[styles.jobStatus, item.status === 'active' ? styles.statusActive : styles.statusClosed]}>
            <Text style={styles.statusText}>{item.status === 'active' ? '모집중' : '마감'}</Text>
            </View>
        </View>

        <View style={styles.jobStats}>
            <Text style={styles.statText}>👁 조회수: {item.views}</Text>
            <Text style={styles.statText}>👥 지원자: {item.applicants}명</Text>
            <Text style={styles.statText}>📅 마감: {item.deadline}</Text>
        </View>

        <View style={styles.jobFooter}>
            <Text style={styles.postedDate}>등록일: {item.postedDate}</Text>
            <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.smallBtn, styles.viewBtn]} onPress={() => openJobDetail(item)}>
                <Text style={styles.btnText}>지원자 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallBtn, styles.editBtn]} onPress={() => showToast('공고 수정 (데모)')}>
                <Text style={styles.btnText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallBtn, styles.deleteBtn]} onPress={() => deleteJob(item.id)}>
                <Text style={styles.btnText}>삭제</Text>
            </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
    );

    const applicantsForSelectedJob = selectedJob ? applicants.filter(a => a.jobId === selectedJob.id) : [];

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => (navigation?.goBack ? navigation.goBack() : null)}>
            <Text style={styles.headerLeft}>{'◀'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>인증 인력모집 지원 목록</Text>
            <TouchableOpacity onPress={() => showToast('홈으로 이동 (데모)')}>
            <Text style={styles.headerRight}>🏠</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.actionsTop}>
            <Text style={styles.pageTitle}>내 공고 목록</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => showToast('새 공고 등록 (데모)')}>
            <Text style={styles.primaryBtnText}>+ 새 공고 등록</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={jobs}
            keyExtractor={j => String(j.id)}
            renderItem={renderJobItem}
            contentContainerStyle={{ padding: 16 }}
            ListEmptyComponent={() => (
            <View style={styles.emptyState}>
                <Text style={{ fontSize: 18, marginBottom: 8 }}>등록된 공고가 없습니다.</Text>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => showToast('새 공고 등록 (데모)')}>
                <Text style={styles.primaryBtnText}>첫 공고 등록하기</Text>
                </TouchableOpacity>
            </View>
            )}
        />

        {/* Job Detail Modal */}
        <Modal visible={!!selectedJob} animationType="slide" onRequestClose={closeJobDetail}>
            <SafeAreaView style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {selectedJob && (
                <View>
                    <View style={styles.detailHeaderBlock}>
                    <Text style={styles.detailTitle}>{selectedJob.title}</Text>
                    <Text style={styles.detailMeta}>{`${selectedJob.company} · 조회수: ${selectedJob.views} · 지원자: ${selectedJob.applicants}명`}</Text>
                    <View style={styles.detailActions}>
                        <TouchableOpacity style={[styles.actionBtn, styles.closeBtn]} onPress={() => closeJob(selectedJob.id)}>
                        <Text style={styles.actionBtnText}>공고 마감</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.repostBtn]} onPress={() => repostJob(selectedJob.id)}>
                        <Text style={styles.actionBtnText}>재공고</Text>
                        </TouchableOpacity>
                    </View>
                    </View>

                    <Text style={{ fontSize: 18, marginVertical: 12 }}>지원자 목록</Text>
                    {applicantsForSelectedJob.length === 0 ? (
                    <View style={styles.emptyStateSmall}>
                        <Text>아직 지원자가 없습니다.</Text>
                    </View>
                    ) : (
                    applicantsForSelectedJob.map(app => (
                        <TouchableOpacity key={app.id} style={styles.applicantCard} onPress={() => openApplicantProfile(app)}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{ color: '#999' }}>👤</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.applicantName}>{app.name}</Text>
                            <Text style={styles.applicantDetails}>{`${app.title} · ${app.experience}`}</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.statusBadge} onPress={() => updateApplicantStatus(app.id, 'interview')}>
                            <Text style={{ color: '#fff' }}>{app.status}</Text>
                            </TouchableOpacity>
                        </View>
                        </TouchableOpacity>
                    ))
                    )}

                    <View style={{ height: 40 }} />
                    <TouchableOpacity style={styles.primaryBtn} onPress={closeJobDetail}>
                    <Text style={styles.primaryBtnText}>목록으로</Text>
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
            </SafeAreaView>
        </Modal>

        {/* Applicant Profile Modal */}
        <Modal visible={!!selectedApplicant} animationType="slide" onRequestClose={closeApplicantProfile}>
            <SafeAreaView style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {selectedApplicant && (
                <View>
                    <View style={styles.profileHeader}>
                    <View style={styles.profileAvatar}> <Text>👤</Text> </View>
                    <Text style={styles.profileName}>{selectedApplicant.name}</Text>
                    <Text style={styles.profileTitle}>{`${selectedApplicant.title} · ${selectedApplicant.experience}`}</Text>
                    <TouchableOpacity style={styles.primaryBtn} onPress={() => setMessageModalVisible(true)}>
                        <Text style={styles.primaryBtnText}>메시지 보내기</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>기본 정보</Text>
                    <Text style={styles.sectionContent}>{`이메일: ${selectedApplicant.email ?? '-'}`}</Text>
                    <Text style={styles.sectionContent}>{`연락처: ${selectedApplicant.phone ?? '-'}`}</Text>
                    <Text style={styles.sectionContent}>{`거주지: ${selectedApplicant.location ?? '-'}`}</Text>
                    </View>

                    <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>경력</Text>
                    <Text style={styles.sectionContent}>- (데모 데이터) 주요 경력 및 프로젝트를 여기에 표시합니다.</Text>
                    </View>

                    <TouchableOpacity style={styles.primaryBtn} onPress={closeApplicantProfile}>
                    <Text style={styles.primaryBtnText}>닫기</Text>
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
            </SafeAreaView>
        </Modal>

        {/* Message Modal */}
        <Modal visible={messageModalVisible} transparent animationType="fade" onRequestClose={() => setMessageModalVisible(false)}>
            <View style={styles.centeredOverlay}>
            <View style={styles.messageModalBox}>
                <Text style={{ fontSize: 18, marginBottom: 8 }}>메시지 보내기</Text>
                <TextInput
                style={styles.textarea}
                multiline
                value={messageText}
                onChangeText={setMessageText}
                placeholder="메시지 내용을 입력하세요..."
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity style={[styles.actionBtn, { marginRight: 8 }]} onPress={() => setMessageModalVisible(false)}>
                    <Text style={styles.actionBtnText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.repostBtn]} onPress={sendMessage}>
                    <Text style={styles.actionBtnText}>보내기</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>

        {/* Toast */}
        {toast ? (
            <View style={styles.toastBox} pointerEvents="none">
            <Text style={{ color: '#fff' }}>{toast}</Text>
            </View>
        ) : null}
        </SafeAreaView>
    );
}