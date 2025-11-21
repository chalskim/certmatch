import { StyleSheet } from 'react-native';

// 스타일 파일에서 독자적으로 사용하는 컬러 팔레트
export const colors = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  text: '#333',
  lightGray: '#f8f9fa',
  border: '#e9ecef',
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'column',
    gap: 8,
    marginBottom: 16,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  breadcrumbText: {
    color: '#6c757d',
    fontSize: 13,
  },
  breadcrumbDivider: {
    color: '#6c757d',
    marginHorizontal: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  titleInfo: {
    flex: 1,
  },
  titleName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  titleRole: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  btnIcon: {
    marginRight: 6,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  btnSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: colors.primary,
    fontWeight: '700',
  },
  btnSecondaryOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSecondaryOutlineText: {
    color: '#6c757d',
    fontWeight: '600',
  },
  headerRight: {
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  statusAvailable: {
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
  },
  statusBusy: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  statusText: {
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tagText: {
    color: colors.primary,
    fontWeight: '600',
  },
  tabsContainer: {
    marginBottom: 8,
  },
  tabsBar: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabButtonText: {
    color: '#6c757d',
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: colors.primary,
  },
  paragraph: {
    color: '#444',
    lineHeight: 22,
    marginBottom: 10,
  },
  // Timeline
  timeline: {
    position: 'relative',
    paddingLeft: 16,
  },
  timelineItem: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timelineDate: {
    color: '#6c757d',
    fontSize: 12,
    marginBottom: 4,
  },
  timelineTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineCompany: {
    color: colors.primary,
    marginBottom: 6,
  },
  timelineDesc: {
    color: '#6c757d',
  },
  // Services
  serviceCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceIcon: {
    marginRight: 6,
  },
  serviceTitle: {
    fontWeight: '700',
  },
  serviceDesc: {
    color: '#6c757d',
  },
  // Projects
  projectCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  projectImage: {
    height: 160,
    width: '100%',
  },
  projectContent: {
    padding: 14,
  },
  projectTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  projectClient: {
    color: colors.primary,
    marginBottom: 8,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  projectTag: {
    backgroundColor: colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  projectTagText: {
    color: '#6c757d',
    fontSize: 12,
  },
  projectResult: {
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  projectResultText: {
    color: colors.success,
    fontWeight: '700',
  },
  // Reviews
  reviewCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerAvatarText: {
    color: colors.primary,
    fontWeight: '700',
  },
  reviewerName: {
    fontWeight: '700',
  },
  reviewDate: {
    color: '#6c757d',
    fontSize: 12,
  },
  reviewRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewComment: {
    color: '#444',
    lineHeight: 20,
  },
});

export default styles;