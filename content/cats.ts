import type { Localized } from "@/lib/types";

/** Monochrome placeholder variants — differentiation stays within the palette. */
export type CoatVariant = "solid" | "tabby" | "mid" | "light";

export interface Cat {
  id: string;
  name: string; // romaji, uppercase display
  nameLocal: Localized;
  catch: string; // English tagline, e.g. THE HOST
  breed: Localized;
  sex: "male" | "female";
  age: number;
  personality: Localized;
  note?: Localized; // extra editorial line (used for the signature cat)
  coat: CoatVariant;
  /** Real photo under /public. Falls back to the silhouette if the file is absent. */
  photo?: string;
  /** object-position for portrait crops, keeps the face in frame on mobile. */
  focus?: string;
}

export const cats: Cat[] = [
  {
    id: "chiro",
    name: "CHIRO",
    nameLocal: { ja: "ちろ", en: "CHIRO", ko: "치로" },
    catch: "THE HOST",
    breed: { ja: "黒", en: "Black", ko: "검정" },
    sex: "male",
    age: 4,
    personality: {
      ja: "落ち着いていてマイペース。人のそばにはいるけれど、べったりしすぎない。気がつくと、少し離れた場所からこちらを見ているタイプ。",
      en: "Calm and self-paced. Stays near people without ever getting clingy — the type you'll find watching you from a little way off.",
      ko: "차분하고 마이페이스. 사람 곁에 있지만 달라붙지는 않습니다. 문득 보면 조금 떨어진 곳에서 이쪽을 바라보고 있는 타입."
    },
    note: {
      ja: "カフェ チロの看板猫。店名の「チロ」は、この猫から取られています。",
      en: "The host of CAFE CHIRO. The name “CHIRO” is taken from this cat.",
      ko: "카페 치로의 간판 고양이. 매장 이름 ‘치로’는 이 고양이에서 따왔습니다."
    },
    coat: "solid",
    photo: "/cats/chiro.jpg",
    focus: "50% 38%"
  },
  {
    id: "nagi",
    name: "NAGI",
    nameLocal: { ja: "なぎ", en: "NAGI", ko: "나기" },
    catch: "THE CURIOUS ONE",
    breed: { ja: "キジ白", en: "Tabby & white", ko: "태비 & 화이트" },
    sex: "female",
    age: 3,
    personality: {
      ja: "好奇心旺盛。新しいものを見つけると、すぐに確認しに来る。窓辺が好き。",
      en: "Endlessly curious. Comes to inspect anything new right away. Loves the windowsill.",
      ko: "호기심이 왕성. 새로운 것을 발견하면 곧바로 확인하러 옵니다. 창가를 좋아합니다."
    },
    coat: "tabby",
    photo: "/cats/nagi.jpg",
    focus: "54% 30%"
  },
  {
    id: "mugi",
    name: "MUGI",
    nameLocal: { ja: "むぎ", en: "MUGI", ko: "무기" },
    catch: "THE SOCIAL ONE",
    breed: { ja: "茶トラ", en: "Orange tabby", ko: "치즈 태비" },
    sex: "male",
    age: 2,
    personality: {
      ja: "4匹の中で一番活発。遊ぶのが好きで、人にも比較的近づいてくる。",
      en: "The most active of the four. Loves to play, and comes fairly close to people.",
      ko: "네 마리 중 가장 활발. 노는 것을 좋아하고, 사람에게도 비교적 가까이 다가옵니다."
    },
    coat: "mid",
    photo: "/cats/mugi.jpg",
    focus: "50% 32%"
  },
  {
    id: "tsuki",
    name: "TSUKI",
    nameLocal: { ja: "つき", en: "TSUKI", ko: "츠키" },
    catch: "THE OBSERVER",
    breed: { ja: "グレー", en: "Grey", ko: "그레이" },
    sex: "female",
    age: 5,
    personality: {
      ja: "静かな場所が好き。少し高い場所から、店内を眺めていることが多い。",
      en: "Prefers the quiet spots. Often watches the room from somewhere up high.",
      ko: "조용한 장소를 좋아합니다. 조금 높은 곳에서 매장을 바라보고 있을 때가 많습니다."
    },
    coat: "light",
    photo: "/cats/tsuki.jpg",
    focus: "40% 34%"
  }
];

export function getCat(id: string): Cat | undefined {
  return cats.find((c) => c.id === id);
}
