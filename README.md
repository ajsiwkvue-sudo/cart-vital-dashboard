# CART VITAL - Patient Monitoring Dashboard

> 병원 환자 바이탈 사인 실시간 모니터링 대시보드

비대면 진료 환경에서 환자의 생체신호를 실시간으로 모니터링하고, 이상 징후를 즉시 감지하여 의료진에게 알림을 제공하는 웹 기반 대시보드입니다.

## 주요 기능

### 1. 대시보드 홈
- 전체 환자 현황 한눈에 파악 (총 환자 수, 경고 환자, 연결 끊김)
- 생체신호별 경고 분포 시각화 (원형 게이지 차트)
- 호버 시 해당 카테고리 환자 목록 팝업

### 2. 환자 관리
- **환자 목록**: 전체/경고 필터, 검색, 실시간 스파크라인 패턴
- **환자 상세**: 24시간 바이탈 추이 차트 (혈압, 맥박, SpO2, 호흡수, 체온)
- **AI 분석 리포트**: 환자 데이터 기반 자동 분석 결과 생성

### 3. 물류/재고 통합 관리
- 기기 자산 라이프사이클 관리 (보관 → 발송 → 배송 → 사용 → 회수 → 소독/수리)
- 실시간 배송 추적 UI (CJ대한통운 스타일)
- 신규 기기 등록 및 환자 할당 워크플로우
- 엑셀 다운로드 기능

### 4. 관리항목 조건 설정
- 바이탈 사인별 경고 임계값 커스터마이징
- 항목별 활성/비활성 토글

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React 18, Vite |
| 차트 | Recharts |
| 스타일링 | Tailwind CSS |
| 아이콘 | Lucide React |
| 배포 | GitHub Pages (예정) |

## 프로젝트 구조

```
src/
├── components/
│   ├── common/          # 재사용 컴포넌트
│   │   ├── InputField.jsx
│   │   ├── LinearBattery.jsx
│   │   ├── Sparkline.jsx
│   │   └── StatusBadge.jsx
│   ├── dashboard/       # 대시보드 홈
│   │   └── DashboardHome.jsx
│   ├── patients/        # 환자 관리
│   │   ├── PatientList.jsx
│   │   └── PatientDetail.jsx
│   ├── logistics/       # 물류 관리
│   │   ├── LogisticsManager.jsx
│   │   ├── LogisticsDetailModal.jsx
│   │   └── AssetAssignmentModal.jsx
│   ├── modals/          # 공통 모달
│   │   └── AIReportModal.jsx
│   └── settings/        # 설정
│       └── VitalSettings.jsx
├── utils/
│   └── dataGenerators.js  # 시뮬레이션 데이터 생성
├── styles/
│   └── GlobalStyles.jsx   # 전역 CSS 애니메이션
├── App.jsx                # 메인 앱 (라우팅, 레이아웃)
├── main.jsx               # 엔트리포인트
└── index.css              # Tailwind 설정
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 스크린샷

> 프로젝트 실행 후 스크린샷을 추가하세요

| 대시보드 홈 | 환자 목록 | 환자 상세 |
|---|---|---|
| 전체 현황 요약 | 실시간 바이탈 테이블 | 24시간 추이 차트 |

## 프로젝트 배경

비대면 진료 모니터링 연구 프로젝트의 일환으로, 웨어러블 기기를 통해 수집되는 환자 생체신호 데이터를 효과적으로 시각화하고 관리하기 위해 개발했습니다. Gemini Canvas를 활용하여 프로토타입을 설계한 후, 컴포넌트 분리 및 코드 구조화를 통해 실제 프로젝트 수준으로 리팩토링했습니다.

## 라이선스

MIT License
