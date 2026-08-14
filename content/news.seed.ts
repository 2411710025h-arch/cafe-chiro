import type { NewsArticle } from "@/lib/types";

/**
 * Initial editorial content (§33). Fully trilingual.
 * Newest first is derived at read time from publishedAt.
 */
export const newsSeed: NewsArticle[] = [
  {
    id: "seed-grand-open",
    slug: "grand-open",
    category: "NEWS",
    status: "published",
    thumbnailUrl: null,
    publishedAt: "2026-07-01T10:00:00+09:00",
    createdAt: "2026-07-01T10:00:00+09:00",
    updatedAt: "2026-07-01T10:00:00+09:00",
    title: {
      ja: "カフェ チロ、オープンしました。",
      en: "CAFE CHIRO has opened.",
      ko: "카페 치로, 오픈했습니다."
    },
    content: {
      ja: "大阪・箕面の船場西に、猫と過ごせるカフェ「カフェ チロ」をオープンしました。\n\n白とグレーを基調にした店内には、テーブル席と、4匹の猫たちがいます。コーヒーを飲みながら、本を読みながら、猫との距離は自分のペースで。\n\nご来店はWEBからご予約いただけます。皆さまのお越しをお待ちしています。",
      en: "CAFE CHIRO has opened in Funaba-nishi, Minoh, Osaka — a café where you can spend time with cats.\n\nThe white-and-grey space has proper table seating and four resident cats. Read a book over a coffee, and keep whatever distance from the cats feels right to you.\n\nReservations can be made online. We look forward to welcoming you.",
      ko: "오사카 미노오시 후나바니시에 고양이와 함께 지낼 수 있는 카페 ‘카페 치로’를 오픈했습니다.\n\n흰색과 회색을 기조로 한 매장에는 테이블석과 네 마리의 고양이가 있습니다. 커피를 마시며, 책을 읽으며, 고양이와의 거리는 나만의 속도로.\n\n방문은 웹에서 예약하실 수 있습니다. 여러분의 방문을 기다리겠습니다."
    }
  },
  {
    id: "seed-chiro-afternoon",
    slug: "chiro-afternoon",
    category: "CATS",
    status: "published",
    thumbnailUrl: null,
    publishedAt: "2026-07-20T15:00:00+09:00",
    createdAt: "2026-07-20T15:00:00+09:00",
    updatedAt: "2026-07-20T15:00:00+09:00",
    title: {
      ja: "ちろの午後。",
      en: "Chiro's afternoon.",
      ko: "치로의 오후."
    },
    content: {
      ja: "看板猫のちろは、午後になると窓際のいちばん静かな席のあたりにいることが多い猫です。\n\n誰かがそばに座っても、すぐに逃げるわけでも、すり寄ってくるわけでもありません。少し離れた場所から、こちらの様子をただ眺めています。\n\nその距離感が、カフェ チロの過ごし方をよく表しているのかもしれません。",
      en: "In the afternoon, Chiro — our host cat — tends to settle near the quietest seat by the window.\n\nWhen someone sits down nearby, he neither runs off nor comes to nuzzle. He simply watches, from a little way off.\n\nThat sense of distance is, perhaps, a good picture of how time is spent at CAFE CHIRO.",
      ko: "간판 고양이 치로는 오후가 되면 창가의 가장 조용한 자리 근처에 있을 때가 많은 고양이입니다.\n\n누군가 곁에 앉아도 곧바로 달아나지도, 다가와 몸을 비비지도 않습니다. 조금 떨어진 곳에서 이쪽의 모습을 그저 바라볼 뿐입니다.\n\n그 거리감이 카페 치로에서 시간을 보내는 방식을 잘 보여주는지도 모릅니다."
    }
  },
  {
    id: "seed-new-croffle",
    slug: "new-croffle",
    category: "MENU",
    status: "published",
    thumbnailUrl: null,
    publishedAt: "2026-08-05T11:00:00+09:00",
    createdAt: "2026-08-05T11:00:00+09:00",
    updatedAt: "2026-08-05T11:00:00+09:00",
    title: {
      ja: "新しいCroffleがメニューに加わりました。",
      en: "A new Croffle has joined the menu.",
      ko: "새로운 크로플이 메뉴에 추가되었습니다."
    },
    content: {
      ja: "デザートメニューに、新しく「クロッフル」が加わりました。\n\nクロワッサン生地をワッフルのように焼き上げた、外はさっくり、中はしっとりとした一品です。コーヒーとの相性もよく、少し甘いものが欲しいときにおすすめです。\n\n価格は¥780（税込）。数に限りがある日もありますので、ご了承ください。",
      en: "A new item — the Croffle — has been added to our dessert menu.\n\nCroissant dough baked like a waffle: crisp on the outside, soft within. It pairs well with coffee, and is our pick for when you want something a little sweet.\n\n¥780 (tax incl.). Please note it may sell out on busier days.",
      ko: "디저트 메뉴에 새롭게 ‘크로플’이 추가되었습니다.\n\n크루아상 반죽을 와플처럼 구워낸, 겉은 바삭하고 속은 촉촉한 메뉴입니다. 커피와도 잘 어울려, 조금 단것이 생각날 때 추천합니다.\n\n가격은 ¥780(부가세 포함). 날에 따라 수량이 한정될 수 있는 점 양해 부탁드립니다."
    }
  },
  {
    id: "seed-september-hours",
    slug: "september-hours",
    category: "NEWS",
    status: "published",
    thumbnailUrl: null,
    publishedAt: "2026-08-12T12:00:00+09:00",
    createdAt: "2026-08-12T12:00:00+09:00",
    updatedAt: "2026-08-12T12:00:00+09:00",
    title: {
      ja: "9月の営業について。",
      en: "About our September hours.",
      ko: "9월 영업 안내."
    },
    content: {
      ja: "9月の営業についてお知らせします。\n\n通常どおり、営業時間は11:00〜18:00、定休日は水曜日です。9月は連休中も通常営業の予定です。\n\n混雑が予想される日は、WEBからのご予約をおすすめします。最新情報はこのお知らせページでご案内します。",
      en: "A note on our opening hours for September.\n\nAs usual, we are open 11:00–18:00 and closed on Wednesdays. We plan to keep regular hours through the September holidays as well.\n\nOn days we expect to be busy, we recommend booking online. The latest information will always be posted here.",
      ko: "9월 영업에 대해 안내드립니다.\n\n평소와 같이 영업시간은 11:00~18:00, 정기 휴무는 수요일입니다. 9월 연휴 기간에도 정상 영업할 예정입니다.\n\n혼잡이 예상되는 날에는 웹 예약을 권장합니다. 최신 정보는 이 소식 페이지에서 안내드립니다."
    }
  }
];
