import type { Localized } from "@/lib/types";

export type GuideIcon =
  | "sanitize"
  | "no-lift"
  | "no-flash"
  | "no-feed"
  | "sleeping"
  | "pace";

export interface GuideItem {
  icon: GuideIcon;
  text: Localized;
}

export const guideItems: GuideItem[] = [
  {
    icon: "sanitize",
    text: {
      ja: "入店時は手指消毒をお願いします。",
      en: "Please sanitise your hands when you arrive.",
      ko: "입장 시 손 소독을 부탁드립니다."
    }
  },
  {
    icon: "no-lift",
    text: {
      ja: "猫を無理に抱き上げないでください。",
      en: "Please don't pick the cats up.",
      ko: "고양이를 억지로 안아 올리지 말아 주세요."
    }
  },
  {
    icon: "no-flash",
    text: {
      ja: "フラッシュ撮影は禁止です。",
      en: "Flash photography is not allowed.",
      ko: "플래시 촬영은 금지입니다."
    }
  },
  {
    icon: "no-feed",
    text: {
      ja: "猫への持ち込み食品の給餌は禁止です。",
      en: "Please don't feed the cats your own food.",
      ko: "반입 음식을 고양이에게 주는 것은 금지입니다."
    }
  },
  {
    icon: "sleeping",
    text: {
      ja: "猫が眠っている場合は、そっと見守ってください。",
      en: "If a cat is asleep, please watch over it gently.",
      ko: "고양이가 자고 있을 때는 조용히 지켜봐 주세요."
    }
  },
  {
    icon: "pace",
    text: {
      ja: "猫との接触は、猫自身のペースを尊重してください。",
      en: "Let contact happen at the cat's own pace.",
      ko: "고양이와의 접촉은 고양이 자신의 속도를 존중해 주세요."
    }
  }
];
