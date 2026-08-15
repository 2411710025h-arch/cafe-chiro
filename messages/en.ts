import type { Dictionary } from "./ja";

const en: Dictionary = {
  meta: {
    siteName: "CAFE CHIRO",
    brand: "CAFE CHIRO",
    tagline: "A café, with cats.",
    description:
      "CAFE CHIRO is a cat café in Minoh, Osaka. A calm, contemporary space for coffee and time with four cats — at your own pace."
  },
  nav: {
    about: "ABOUT",
    cats: "CATS",
    menu: "MENU",
    price: "PRICE",
    news: "NEWS",
    access: "ACCESS",
    reservation: "RESERVE",
    reservationFull: "RESERVATION",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Home",
    language: "Language"
  },
  common: {
    reserve: "RESERVATION",
    viewCats: "Meet the cats",
    viewAll: "View all",
    readMore: "Read more",
    back: "Back",
    next: "Next",
    taxIncluded: "tax incl.",
    minutes: "min",
    from: "from",
    loading: "Loading",
    required: "required",
    optional: "optional"
  },
  hero: {
    line1: "A café,",
    line2: "with cats.",
    catCafe: "CAT CAFE",
    location: "MINOH, OSAKA",
    scroll: "SCROLL"
  },
  aboutSection: {
    eyebrow: "ABOUT",
    headingLine1: "A cat café,",
    headingLine2: "made to feel like a café.",
    body: [
      "CAFE CHIRO is a cat café built so you can enjoy both — time with cats, and time in a café.",
      "Have a coffee at the table, read a book. And nearby, four cats wander as they please.",
      "How close you get, and how you spend the time, is entirely up to you."
    ],
    link: "About CAFE CHIRO"
  },
  aboutPage: {
    eyebrow: "ABOUT",
    title: "A composed space,\nwith cats in it.",
    lead: "Not a room where you sit on the floor to pet cats, but a café you would actually want to visit — with time alongside the cats as a natural extension of that.",
    sections: [
      {
        heading: "Concept",
        body: [
          "CAFE CHIRO is a cat café centred on a single idea: a café, with cats.",
          "Proper tables and chairs. A clean, composed, quiet space — with four cats living naturally within it."
        ]
      },
      {
        heading: "The space",
        body: [
          "White and grey, metal and glass. A contemporary, understated interior filled with bright, natural light.",
          "Even the cats' elevated walkways and furniture are designed as part of the interior. Not a cluttered cat room, but a café that was designed."
        ]
      },
      {
        heading: "Distance",
        body: [
          "We never force closeness with the cats. For those who want to touch, and those who would rather watch from a little way off.",
          "A place made to feel comfortable, even for an adult visiting alone."
        ]
      }
    ],
    values: [
      { title: "CLEAN", body: "A clean, composed space." },
      { title: "CALM", body: "Time you can spend at ease." },
      { title: "CONTEMPORARY", body: "An understated, urban design." }
    ]
  },
  aboutStory: {
    introHeading: "A café,\nwith cats.",
    introBody:
      "CAFE CHIRO is a place where four cats live, right beside the time you spend in a café.",
    space: {
      heading: "A cat café,\nmade more like a café.",
      body: "Sit down properly and have a coffee. First of all, a place that simply feels good as a café."
    },
    everyday: {
      heading: "Have a coffee. Read a book.\nAnd right there, a cat.",
      body: "Playing with the cats isn't the only way to spend time here. They simply blend into an ordinary afternoon at the café."
    },
    distance: {
      heading: "How close you get,\nat your own pace.",
      body: "If one comes near, say hello. If it's asleep, leave it be. The cats — and everyone here — keep their own time."
    },
    residentsHeading: "A little more\nabout the four."
  },
  catsSection: {
    eyebrow: "CATS",
    heading: "Four cats.",
    lead: "Each with their own temperament and pace. Please don't push — let the cats set the distance.",
    link: "Meet the cats"
  },
  catsPage: {
    eyebrow: "CATS",
    title: "Four cats.",
    lead: "Four cats live at CAFE CHIRO. All mixed-breed, each keeping their own distance as they move through the space.",
    labels: {
      breed: "Coat",
      sex: "Sex",
      age: "Age",
      personality: "Character",
      years: "yrs"
    },
    sexMale: "♂",
    sexFemale: "♀"
  },
  menuSection: {
    eyebrow: "MENU",
    heading: "Genuinely good,\nas a café.",
    lead: "Coffee, non-coffee, dessert and light food. A menu worth coming back for, cats or no cats.",
    link: "See the menu"
  },
  menuPage: {
    eyebrow: "MENU",
    title: "MENU",
    lead: "All prices include tax. We ask for one order per guest during your stay.",
    categories: {
      coffee: "COFFEE",
      nonCoffee: "NON COFFEE",
      dessert: "DESSERT",
      lightFood: "LIGHT FOOD"
    },
    note: "* Prices include tax. The menu may change with seasonal availability."
  },
  priceSection: {
    eyebrow: "PRICE",
    heading: "Pricing",
    lead: "A cat charge by length of stay, plus one order per guest.",
    link: "Price & guide"
  },
  pricePage: {
    eyebrow: "PRICE & GUIDE",
    title: "Pricing,\nand how to spend it.",
    lead: "Simple, easy-to-read pricing — even on your first visit.",
    chargeTitle: "CAT CHARGE",
    extension: "Extension",
    extensionUnit: "per 15 min",
    oneOrder: "One order per guest is also required. We ask that you order from the café menu.",
    taxNote: "All prices include tax.",
    guideTitle: "GUIDE",
    guideLead: "A few small requests, so both the cats and our guests can feel at ease."
  },
  reservationSection: {
    eyebrow: "RESERVATION",
    headingLine1: "Reserve a seat,",
    headingLine2: "and the cats.",
    lead: "Book your visit online.",
    cta: "Go to reservation"
  },
  reservation: {
    eyebrow: "RESERVATION",
    title: "Reservation",
    lead: "Just choose in order, starting from the date. It takes a few minutes.",
    stepOf: "STEP",
    steps: {
      date: "Date",
      time: "Time",
      duration: "Duration",
      party: "Guests",
      info: "Details",
      confirm: "Confirm",
      done: "Done"
    },
    date: {
      title: "Preferred date",
      hint: "We are closed on Wednesdays.",
      closedWed: "Closed"
    },
    time: {
      title: "Preferred time",
      hint: "Opening hours are 11:00 – 18:00.",
      noSlots: "No time slots are available on this day. Please choose another date."
    },
    duration: {
      title: "Length of stay",
      hint: "Slots that run past closing time can't be selected.",
      unavailable: "Not available at this start time"
    },
    party: {
      title: "Number of guests",
      unit: "",
      hint: "For parties of 6 or more, please contact us by phone."
    },
    info: {
      title: "Your details",
      name: "Name",
      namePlaceholder: "Taro Yamada",
      email: "Email",
      emailPlaceholder: "you@example.com",
      phone: "Phone",
      phonePlaceholder: "090-0000-0000",
      note: "Notes",
      notePlaceholder: "Allergies, questions, etc. (optional)"
    },
    confirm: {
      title: "Review",
      hint: "Please review the details and confirm your reservation.",
      date: "Date",
      time: "Time",
      duration: "Duration",
      party: "Guests",
      name: "Name",
      email: "Email",
      phone: "Phone",
      note: "Notes",
      submit: "Confirm reservation",
      submitting: "Sending…"
    },
    done: {
      title: "Your reservation is complete.",
      body: "Thank you. This is a demo, so no confirmation email is sent. We look forward to seeing you.",
      codeLabel: "Reservation code",
      addAnother: "Make another reservation",
      backHome: "Back to home"
    },
    actions: {
      next: "Next",
      back: "Back",
      selectDate: "Select a date",
      selectTime: "Select a time",
      selectDuration: "Select a duration"
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a phone number."
    },
    demoNote: "* This is a demo reservation. No actual booking is made."
  },
  newsSection: {
    eyebrow: "NEWS",
    heading: "News",
    link: "All news"
  },
  newsPage: {
    eyebrow: "NEWS",
    title: "NEWS",
    lead: "Announcements, events, menu and the cats — from CAFE CHIRO.",
    all: "ALL",
    categories: {
      NEWS: "NEWS",
      EVENT: "EVENT",
      MENU: "MENU",
      CATS: "CATS"
    },
    empty: "No news in this category yet.",
    backToList: "Back to news",
    published: "Published"
  },
  accessSection: {
    eyebrow: "ACCESS",
    heading: "Access"
  },
  accessPage: {
    eyebrow: "ACCESS",
    title: "ACCESS",
    lead: "Funaba-nishi, Minoh, Osaka. Please check NEWS for the latest opening information.",
    addressLabel: "Address",
    hoursLabel: "Hours",
    closedLabel: "Closed",
    telLabel: "Tel",
    emailLabel: "Email",
    mapLabel: "MAP",
    mapNote: "* This site is a fictional café made for a portfolio. The map is a demo view of the Minoh area.",
    directions: "Directions"
  },
  business: {
    hours: "11:00 – 18:00",
    closed: "Wednesday",
    closedShort: "Wed",
    addressPostal: "〒562-0000",
    address: "0-0-0 Funaba-nishi, Minoh, Osaka, CHIRO 1F",
    tel: "000-0000-0000",
    email: "hello@cafechiro.example"
  },
  footer: {
    tagline: "A café, with cats.",
    siteNav: "SITE",
    contactNav: "CONTACT",
    followNav: "FOLLOW",
    langNav: "LANGUAGE",
    disclaimer: "* This website is a fictional café created for a portfolio.",
    rights: "© 2026 CAFE CHIRO. Portfolio work.",
    backToTop: "TO TOP"
  },
  admin: {
    title: "ADMIN",
    subtitle: "CAFE CHIRO admin",
    login: {
      heading: "Admin login",
      passcode: "Passcode",
      enter: "Log in",
      error: "That passcode is incorrect.",
      demoHint: "Demo passcode: chiro-admin"
    },
    logout: "Log out",
    tabs: {
      news: "News",
      reservations: "Reservations"
    },
    news: {
      new: "New post",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Delete this article?",
      title: "Title",
      slug: "Slug",
      category: "Category",
      status: "Status",
      statusDraft: "Draft",
      statusPublished: "Published",
      publishedAt: "Published at",
      thumbnail: "Thumbnail URL",
      content: "Content",
      langJa: "日本語",
      langEn: "English",
      langKo: "한국어",
      save: "Save",
      cancel: "Cancel",
      empty: "No articles.",
      updated: "Updated.",
      created: "Created.",
      deleted: "Deleted.",
      resetSeed: "Reset to seed data"
    },
    reservations: {
      code: "Code",
      date: "Date",
      time: "Time",
      duration: "Stay",
      party: "Guests",
      name: "Name",
      email: "Email",
      phone: "Phone",
      note: "Notes",
      createdAt: "Created",
      empty: "No reservations yet.",
      count: ""
    },
    storageNote: "* This demo's data is stored only in this browser (localStorage). In production it is stored in Supabase."
  },
  states: {
    notFoundTitle: "Page not found.",
    notFoundBody: "The page you're looking for may have moved or been removed.",
    errorTitle: "Something went wrong.",
    errorBody: "Please wait a moment and try again.",
    retry: "Reload",
    backHome: "Back to home",
    loading: "Loading…",
    emptyNews: "No news yet."
  }
};

export default en;
