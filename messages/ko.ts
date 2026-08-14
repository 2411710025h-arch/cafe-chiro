import type { Dictionary } from "./ja";

const ko: Dictionary = {
  meta: {
    siteName: "카페 치로",
    brand: "CAFE CHIRO",
    tagline: "고양이와, 제대로 카페하기.",
    description:
      "카페 치로는 오사카 미노오의 고양이 카페입니다. 정돈된 현대적인 공간에서, 커피와 네 마리 고양이와의 시간을 나만의 속도로."
  },
  nav: {
    about: "ABOUT",
    cats: "CATS",
    menu: "MENU",
    price: "PRICE",
    news: "NEWS",
    access: "ACCESS",
    reservation: "예약",
    reservationFull: "웹 예약",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    home: "홈",
    language: "언어"
  },
  common: {
    reserve: "웹 예약",
    viewCats: "고양이 보기",
    viewAll: "전체 보기",
    readMore: "자세히 보기",
    back: "뒤로",
    next: "다음",
    taxIncluded: "부가세 포함",
    minutes: "분",
    from: "부터",
    loading: "불러오는 중",
    required: "필수",
    optional: "선택"
  },
  hero: {
    line1: "고양이와,",
    line2: "제대로 카페하기.",
    catCafe: "CAT CAFE",
    location: "MINOH, OSAKA",
    scroll: "SCROLL"
  },
  aboutSection: {
    eyebrow: "ABOUT",
    headingLine1: "고양이 카페를,",
    headingLine2: "조금 더 카페답게.",
    body: [
      "카페 치로는 고양이와 보내는 시간과 카페에서 보내는 시간, 그 둘을 모두 제대로 즐길 수 있는 곳을 지향하는 고양이 카페입니다.",
      "테이블에서 커피를 마시거나, 책을 읽거나. 그 바로 곁을 네 마리의 고양이가 자유롭게 거닙니다.",
      "고양이와의 거리도, 보내는 방식도, 나만의 속도로."
    ],
    link: "카페 치로 소개"
  },
  aboutPage: {
    eyebrow: "ABOUT",
    title: "정돈된 공간에,\n고양이가 있다.",
    lead: "바닥에 앉아 고양이를 만지기 위한 방이 아니라, 그냥 가고 싶어지는 카페. 그 연장선 위에 고양이와의 시간이 있습니다.",
    sections: [
      {
        heading: "콘셉트",
        body: [
          "카페 치로는 ‘고양이와, 제대로 카페하기’를 중심에 둔 고양이 카페입니다.",
          "제대로 된 테이블과 의자. 청결하고 정돈된, 차분한 공간. 그 안에서 네 마리의 고양이가 자연스럽게 지냅니다."
        ]
      },
      {
        heading: "공간에 대하여",
        body: [
          "흰색과 회색, 금속과 유리. 밝은 자연광이 들어오는 무기질의 현대적인 인테리어.",
          "고양이용 상부 동선과 가구도 인테리어의 일부로 설계했습니다. 물건이 흩어진 ‘고양이 방’이 아니라, 디자인된 카페입니다."
        ]
      },
      {
        heading: "거리감에 대하여",
        body: [
          "고양이와의 거리를 강요하지 않습니다. 만지고 싶은 분도, 조금 떨어져 바라보고 싶은 분도.",
          "어른이 혼자 찾아와도 편안한 곳을 지향합니다."
        ]
      }
    ],
    values: [
      { title: "CLEAN", body: "청결하고 정돈된 공간." },
      { title: "CALM", body: "차분하게 보내는 시간." },
      { title: "CONTEMPORARY", body: "무기질의 도회적인 디자인." }
    ]
  },
  catsSection: {
    eyebrow: "CATS",
    heading: "네 마리의 고양이.",
    lead: "성격도, 지내는 방식도 제각각입니다. 억지로 다가가지 말고, 고양이의 속도를 존중해 주세요.",
    link: "고양이 보기"
  },
  catsPage: {
    eyebrow: "CATS",
    title: "네 마리의 고양이.",
    lead: "카페 치로에는 네 마리의 고양이가 살고 있습니다. 모두 믹스묘. 저마다의 거리감으로 매장에서 지냅니다.",
    labels: {
      breed: "털색",
      sex: "성별",
      age: "나이",
      personality: "성격",
      years: "세"
    },
    sexMale: "♂",
    sexFemale: "♀"
  },
  menuSection: {
    eyebrow: "MENU",
    heading: "카페로서,\n제대로 맛있게.",
    lead: "커피, 논커피, 디저트, 가벼운 식사. 고양이가 없어도 다시 찾고 싶어지는 메뉴를.",
    link: "메뉴 보기"
  },
  menuPage: {
    eyebrow: "MENU",
    title: "MENU",
    lead: "모든 가격은 부가세 포함입니다. 이용 시 한 분당 한 잔(개) 주문을 부탁드립니다.",
    categories: {
      coffee: "COFFEE",
      nonCoffee: "NON COFFEE",
      dessert: "DESSERT",
      lightFood: "LIGHT FOOD"
    },
    note: "※ 표시 가격은 부가세 포함입니다. 재료 수급에 따라 메뉴가 변경될 수 있습니다."
  },
  priceSection: {
    eyebrow: "PRICE",
    heading: "요금",
    lead: "체류 시간으로 고르는 캣 차지. 별도로 한 분당 한 잔(개) 주문제입니다.",
    link: "요금·이용 안내"
  },
  pricePage: {
    eyebrow: "PRICE & GUIDE",
    title: "요금과,\n지내는 방법.",
    lead: "처음 오시는 분도 이해하기 쉬운, 단순한 요금입니다.",
    chargeTitle: "CAT CHARGE",
    extension: "연장",
    extensionUnit: "15분마다",
    oneOrder: "별도로 한 분당 한 잔(개) 주문제입니다. 카페 메뉴 주문을 부탁드립니다.",
    taxNote: "모든 가격은 부가세 포함 표시입니다.",
    guideTitle: "GUIDE",
    guideLead: "고양이와 손님이 편안하게 지내기 위한 몇 가지 부탁입니다."
  },
  reservationSection: {
    eyebrow: "RESERVATION",
    headingLine1: "자리와 고양이를,",
    headingLine2: "예약하기.",
    lead: "웹에서 방문 예약을 할 수 있습니다.",
    cta: "예약하러 가기"
  },
  reservation: {
    eyebrow: "RESERVATION",
    title: "웹 예약",
    lead: "날짜부터 차례로 고르기만 하면 됩니다. 몇 분이면 완료됩니다.",
    stepOf: "STEP",
    steps: {
      date: "날짜",
      time: "시간",
      duration: "체류 시간",
      party: "인원",
      info: "고객 정보",
      confirm: "확인",
      done: "완료"
    },
    date: {
      title: "희망 날짜",
      hint: "수요일은 정기 휴무일입니다.",
      closedWed: "휴무"
    },
    time: {
      title: "희망 시간",
      hint: "영업시간은 11:00 – 18:00 입니다.",
      noSlots: "이 날짜에는 예약 가능한 시간이 없습니다. 다른 날짜를 선택해 주세요."
    },
    duration: {
      title: "체류 시간",
      hint: "마감 시간을 넘기는 시간대는 선택할 수 없습니다.",
      unavailable: "이 시작 시간에는 선택할 수 없습니다"
    },
    party: {
      title: "방문 인원",
      unit: "명",
      hint: "6명 이상 방문은 전화로 문의해 주세요."
    },
    info: {
      title: "고객 정보",
      name: "이름",
      namePlaceholder: "홍길동",
      email: "이메일",
      emailPlaceholder: "you@example.com",
      phone: "전화번호",
      phonePlaceholder: "090-0000-0000",
      note: "요청·비고",
      notePlaceholder: "알레르기나 문의 사항 등 (선택)"
    },
    confirm: {
      title: "내용 확인",
      hint: "내용을 확인하신 후 예약을 확정해 주세요.",
      date: "날짜",
      time: "시간",
      duration: "체류 시간",
      party: "인원",
      name: "이름",
      email: "이메일",
      phone: "전화",
      note: "비고",
      submit: "예약 확정하기",
      submitting: "전송 중…"
    },
    done: {
      title: "예약이 완료되었습니다.",
      body: "예약해 주셔서 감사합니다. 확인 메일은 발송되지 않는 데모입니다. 방문하시는 날 조심히 오세요.",
      codeLabel: "예약 번호",
      addAnother: "다른 예약하기",
      backHome: "홈으로"
    },
    actions: {
      next: "다음",
      back: "뒤로",
      selectDate: "날짜 선택",
      selectTime: "시간 선택",
      selectDuration: "체류 시간 선택"
    },
    errors: {
      name: "이름을 입력해 주세요.",
      email: "유효한 이메일 주소를 입력해 주세요.",
      phone: "전화번호를 입력해 주세요."
    },
    demoNote: "※ 이것은 데모 예약입니다. 실제 방문 예약은 발생하지 않습니다."
  },
  newsSection: {
    eyebrow: "NEWS",
    heading: "소식",
    link: "모든 소식"
  },
  newsPage: {
    eyebrow: "NEWS",
    title: "NEWS",
    lead: "카페 치로의 소식, 이벤트, 메뉴, 고양이 이야기.",
    all: "ALL",
    categories: {
      NEWS: "NEWS",
      EVENT: "EVENT",
      MENU: "MENU",
      CATS: "CATS"
    },
    empty: "이 카테고리의 소식은 아직 없습니다.",
    backToList: "소식 목록으로",
    published: "게시일"
  },
  accessSection: {
    eyebrow: "ACCESS",
    heading: "매장 정보"
  },
  accessPage: {
    eyebrow: "ACCESS",
    title: "ACCESS",
    lead: "오사카부 미노오시 후나바니시. 최신 영업 정보는 NEWS를 확인해 주세요.",
    addressLabel: "주소",
    hoursLabel: "영업시간",
    closedLabel: "정기 휴무",
    telLabel: "전화",
    emailLabel: "이메일",
    mapLabel: "MAP",
    mapNote: "※ 본 사이트는 포트폴리오용 가상 매장입니다. 지도는 미노오시 주변을 나타내는 데모 표시입니다.",
    directions: "오시는 길"
  },
  business: {
    hours: "11:00 – 18:00",
    closed: "수요일",
    closedShort: "수",
    addressPostal: "〒562-0000",
    address: "오사카부 미노오시 후나바니시 0-0-0 CHIRO 1F",
    tel: "000-0000-0000",
    email: "hello@cafechiro.example"
  },
  footer: {
    tagline: "고양이와, 제대로 카페하기.",
    siteNav: "SITE",
    contactNav: "CONTACT",
    followNav: "FOLLOW",
    langNav: "LANGUAGE",
    disclaimer: "※ 본 사이트는 포트폴리오용으로 제작한 가상 매장 웹사이트입니다.",
    rights: "© 2026 CAFE CHIRO. Portfolio work.",
    backToTop: "위로"
  },
  admin: {
    title: "ADMIN",
    subtitle: "카페 치로 관리자",
    login: {
      heading: "관리자 로그인",
      passcode: "패스코드",
      enter: "로그인",
      error: "패스코드가 올바르지 않습니다.",
      demoHint: "데모용 패스코드: chiro-admin"
    },
    logout: "로그아웃",
    tabs: {
      news: "소식",
      reservations: "예약 목록"
    },
    news: {
      new: "새 글 작성",
      edit: "편집",
      delete: "삭제",
      confirmDelete: "이 글을 삭제하시겠습니까?",
      title: "제목",
      slug: "슬러그",
      category: "카테고리",
      status: "상태",
      statusDraft: "임시저장",
      statusPublished: "공개",
      publishedAt: "게시 일시",
      thumbnail: "썸네일 URL",
      content: "본문",
      langJa: "日本語",
      langEn: "English",
      langKo: "한국어",
      save: "저장",
      cancel: "취소",
      empty: "글이 없습니다.",
      updated: "수정했습니다.",
      created: "작성했습니다.",
      deleted: "삭제했습니다.",
      resetSeed: "초기 데이터로 되돌리기"
    },
    reservations: {
      code: "예약 번호",
      date: "날짜",
      time: "시간",
      duration: "체류",
      party: "인원",
      name: "이름",
      email: "이메일",
      phone: "전화",
      note: "비고",
      createdAt: "접수 일시",
      empty: "예약이 아직 없습니다.",
      count: "건"
    },
    storageNote: "※ 이 데모의 데이터는 이 브라우저 내(localStorage)에만 저장됩니다. 실제 운영에서는 Supabase에 저장됩니다."
  },
  states: {
    notFoundTitle: "페이지를 찾을 수 없습니다.",
    notFoundBody: "찾으시는 페이지가 이동되었거나 삭제되었을 수 있습니다.",
    errorTitle: "문제가 발생했습니다.",
    errorBody: "잠시 후 다시 시도해 주세요.",
    retry: "새로고침",
    backHome: "홈으로",
    loading: "불러오는 중…",
    emptyNews: "소식이 아직 없습니다."
  }
};

export default ko;
