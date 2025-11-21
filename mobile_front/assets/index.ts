// 중앙 에셋 매니페스트
// 모든 로컬 이미지/아이콘을 한 곳에서 관리해 오프라인 실행을 보장합니다.

export const Images = {
  // 기본 아이콘/플레이스홀더
  favicon: require('./favicon.png'),
  appIcon: require('./icon.png'),
  photoPlaceholder: require('./icon/photo-placeholder.jpg'),
  avatarPlaceholder: require('./icon/avatar-placeholder.jpg'),
  license200: require('../img/licese_200_200.png'),

  // 배너/프로젝트/오피스/뉴스 등 샘플 이미지들
  banner1: require('./icon/banner1.jpg'),
  banner2: require('./icon/banner2.jpg'),
  banner4: require('./icon/banner4.jpg'),
  project1: require('./icon/project-1.jpg'),
  project2: require('./icon/project-2.jpg'),
  office1: require('./icon/office1.jpg'),
  office2: require('./icon/office2.jpg'),
  expertKim: require('./icon/expert-kim.jpg'),
  ismsCourseHero: require('./icon/isms-course-hero.jpg'),
  newsAssembly: require('./icon/news-assembly.jpg'),
  instructor1: require('./icon/instructor1.jpg'),
  instructor2: require('./icon/instructor2.jpg'),
  instructor3: require('./icon/instructor3.jpg'),
};

export type ImageKey = keyof typeof Images;