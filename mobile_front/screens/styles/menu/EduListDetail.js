import { StyleSheet } from 'react-native';

// Centralized color palette used throughout EduListDetail styles.
// Define colors before styles to avoid temporal dead zone issues.
const colors = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  info: '#17a2b8',
  text: '#333',
  border: '#e9ecef',
  lightGray: '#f8f9fa',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  breadcrumbText: {
    color: '#6c757d',
    fontSize: 13,
  },
  breadcrumbDivider: {
    color: '#6c757d',
    marginHorizontal: 6,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  providerLogo: {
    width: 64,
    height: 64,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogoLarge: {
    width: 72,
    height: 72,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerLogoText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  courseTitleInfo: {
    flex: 1,
  },
  titleH1: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: colors.text,
  },
  titleSub: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  badgeNew: {
    backgroundColor: 'rgba(23, 162, 184, 0.1)',
  },
  badgePopular: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  badgeDefault: {
    backgroundColor: '#eee',
  },
  badgeTextBase: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  btnIcon: {
    marginRight: 6,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnOutlineText: {
    color: colors.primary,
    fontWeight: '700',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: '#6c757d',
    fontWeight: '600',
  },
  ratingSummary: {
    paddingLeft: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStarIcon: {
    marginRight: 2,
  },
  ratingScore: {
    fontWeight: '700',
    marginLeft: 8,
    color: colors.text,
  },
  ratingCount: {
    color: '#6c757d',
    marginLeft: 6,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  tuitionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  priceDisplay: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  priceNote: {
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 12,
  },
  tabsContainer: {
    marginBottom: 12,
  },
  tabsBar: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  paragraph: {
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  module: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  moduleHeader: {
    backgroundColor: colors.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleHeaderTitle: {
    fontWeight: '700',
    color: colors.text,
  },
  moduleContent: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  lessonIcon: {
    marginRight: 8,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructorAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  instructorOrg: {
    color: '#6c757d',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badgePrimary: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgePrimaryText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  benefitIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  benefitDesc: {
    color: '#6c757d',
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerAvatarText: {
    color: colors.primary,
    fontWeight: '700',
  },
  reviewerMeta: {
    justifyContent: 'center',
  },
  reviewerName: {
    fontWeight: '700',
  },
  reviewerSub: {
    color: '#6c757d',
  },
  bottomContainer: {
    marginTop: 8,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    color: colors.text,
  },
  providerDesc: {
    color: '#6c757d',
  },
  btnOutlineSmall: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnOutlineSmallText: {
    color: colors.primary,
    fontWeight: '700',
  },
  relatedCourseCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  relatedCourseTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  relatedCourseProvider: {
    color: '#6c757d',
    marginBottom: 4,
  },
  relatedCoursePrice: {
    color: colors.primary,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    maxWidth: 480,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalDesc: {
    color: '#6c757d',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
});

export { styles, colors };