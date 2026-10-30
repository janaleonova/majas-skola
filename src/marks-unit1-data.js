// Marks · Unit 1: be (Present Simple), objects, countries and nationalities.

// User-provided NPD rubric: 3.5 + 4 + 8 + 3.5 + 4 + 8 + 6 + 6 + 9 = 52 points.

// The textbook's Teen Forum was not provided. Reading and listening below are ORIGINAL training texts.

export const UNIT1_DAYS = [
  {
    "date": "2026-10-30",
    "title": "Vārdu medības",
    "icon": "🎒",
    "focus": "15 priekšmeti: atpazīšana, pareiza rakstība un angļu izruna",
    "intro": "Atver kartītes, noklausies izrunu un uzraksti priekšmetu vārdus patstāvīgi.",
    "min": 80,
    "bonus": 10,
    "materials": "Darba burtnīca 9. lpp., 5. un 6. uzdevums; 15 priekšmetu vārdi."
  },
  {
    "date": "2026-10-31",
    "title": "Valstu pase",
    "icon": "🌍",
    "focus": "Valstis un tautības",
    "intro": "Iemācies rakstīt valstu un tautību nosaukumus. Pievērs uzmanību lielajiem sākuma burtiem.",
    "min": 80,
    "bonus": 10,
    "materials": "Valstu un tautību pieraksti; mācies rakstību un izrunu."
  },
  {
    "date": "2026-11-01",
    "title": "Be laboratorija",
    "icon": "🧪",
    "focus": "am/is/are — apgalvojums un noliegums ar visām personām",
    "intro": "I am, you are, he/she/it is, we are, you are, they are. Pārveido arī noliegumā.",
    "min": 80,
    "bonus": 10,
    "materials": "Grāmata 13. lpp., 6. un 7. uzdevums: be tagadnē."
  },
  {
    "date": "2026-11-02",
    "title": "Jautājumu detektīvs",
    "icon": "🔎",
    "focus": "Jautājumi, īsās atbildes un dialogs",
    "intro": "Ievieto be teikuma sākumā un lieto Yes/No īsās atbildes.",
    "min": 80,
    "bonus": 10,
    "materials": "Grāmata 15. lpp., 6. uzdevums; darba burtnīca 9. lpp., 5. uzdevums; darba lapa; WB 12. lpp., 2. uzdevums."
  },
  {
    "date": "2026-11-03",
    "title": "Pirms NPD — 52 punktu simulācija",
    "icon": "🏆",
    "focus": "Lasīšana, klausīšanās, 8 objektīvo uzdevumu grupas un 7 teikumu rakstīšana",
    "intro": "Izmēģinājuma pārbaudes darbā ir 43 automātiski pārbaudāmi punkti un 9 punkti rakstīšanai, ko pārskata pieaugušais.",
    "min": 80,
    "bonus": 10,
    "materials": "Student's Book 19. lpp. “Teen Forum”; Project Log 6. lpp. (write); kladē 7 teikumi par svarīgu cilvēku vai lietu."
  }
];

export const UNIT1_COUNTRIES = [
  [
    "Latvija",
    "Latvia",
    "Latvian",
    "🇱🇻"
  ],
  [
    "Lielbritānija",
    "the UK",
    "British",
    "🇬🇧"
  ],
  [
    "ASV",
    "the USA",
    "American",
    "🇺🇸"
  ],
  [
    "Vācija",
    "Germany",
    "German",
    "🇩🇪"
  ],
  [
    "Francija",
    "France",
    "French",
    "🇫🇷"
  ],
  [
    "Itālija",
    "Italy",
    "Italian",
    "🇮🇹"
  ],
  [
    "Spānija",
    "Spain",
    "Spanish",
    "🇪🇸"
  ],
  [
    "Polija",
    "Poland",
    "Polish",
    "🇵🇱"
  ],
  [
    "Japāna",
    "Japan",
    "Japanese",
    "🇯🇵"
  ],
  [
    "Kanāda",
    "Canada",
    "Canadian",
    "🇨🇦"
  ]
];

export const UNIT1_DAY2 = [
  {
    "id": "country-0",
    "prompt": "🇱🇻 Latvija: ieraksti tautību angliski.",
    "answer": "Latvian",
    "options": null,
    "points": 1,
    "hint": "Valsts: Latvia"
  },
  {
    "id": "country-1",
    "prompt": "🇬🇧 Lielbritānija: ieraksti tautību angliski.",
    "answer": "British",
    "options": null,
    "points": 1,
    "hint": "Valsts: the UK"
  },
  {
    "id": "country-2",
    "prompt": "🇺🇸 ASV: ieraksti tautību angliski.",
    "answer": "American",
    "options": null,
    "points": 1,
    "hint": "Valsts: the USA"
  },
  {
    "id": "country-3",
    "prompt": "🇩🇪 Vācija: ieraksti tautību angliski.",
    "answer": "German",
    "options": null,
    "points": 1,
    "hint": "Valsts: Germany"
  },
  {
    "id": "country-4",
    "prompt": "🇫🇷 Francija: ieraksti tautību angliski.",
    "answer": "French",
    "options": null,
    "points": 1,
    "hint": "Valsts: France"
  },
  {
    "id": "country-5",
    "prompt": "🇮🇹 Itālija: ieraksti tautību angliski.",
    "answer": "Italian",
    "options": null,
    "points": 1,
    "hint": "Valsts: Italy"
  },
  {
    "id": "country-6",
    "prompt": "🇪🇸 Spānija: ieraksti tautību angliski.",
    "answer": "Spanish",
    "options": null,
    "points": 1,
    "hint": "Valsts: Spain"
  },
  {
    "id": "country-7",
    "prompt": "🇵🇱 Polija: ieraksti tautību angliski.",
    "answer": "Polish",
    "options": null,
    "points": 1,
    "hint": "Valsts: Poland"
  },
  {
    "id": "country-8",
    "prompt": "🇯🇵 Japāna: ieraksti tautību angliski.",
    "answer": "Japanese",
    "options": null,
    "points": 1,
    "hint": "Valsts: Japan"
  },
  {
    "id": "country-9",
    "prompt": "🇨🇦 Kanāda: ieraksti tautību angliski.",
    "answer": "Canadian",
    "options": null,
    "points": 1,
    "hint": "Valsts: Canada"
  },
  {
    "id": "country-name-0",
    "prompt": "🇱🇻 Latvija: ieraksti valsts nosaukumu angliski.",
    "answer": "Latvia",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-1",
    "prompt": "🇬🇧 Lielbritānija: ieraksti valsts nosaukumu angliski.",
    "answer": "the UK",
    "options": null,
    "points": 1,
    "accepted": [
      "UK",
      "the United Kingdom",
      "United Kingdom"
    ]
  },
  {
    "id": "country-name-2",
    "prompt": "🇺🇸 ASV: ieraksti valsts nosaukumu angliski.",
    "answer": "the USA",
    "options": null,
    "points": 1,
    "accepted": [
      "USA",
      "United States",
      "the United States",
      "United States of America"
    ]
  },
  {
    "id": "country-name-3",
    "prompt": "🇩🇪 Vācija: ieraksti valsts nosaukumu angliski.",
    "answer": "Germany",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-4",
    "prompt": "🇫🇷 Francija: ieraksti valsts nosaukumu angliski.",
    "answer": "France",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-5",
    "prompt": "🇮🇹 Itālija: ieraksti valsts nosaukumu angliski.",
    "answer": "Italy",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-6",
    "prompt": "🇪🇸 Spānija: ieraksti valsts nosaukumu angliski.",
    "answer": "Spain",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-7",
    "prompt": "🇵🇱 Polija: ieraksti valsts nosaukumu angliski.",
    "answer": "Poland",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-8",
    "prompt": "🇯🇵 Japāna: ieraksti valsts nosaukumu angliski.",
    "answer": "Japan",
    "options": null,
    "points": 1
  },
  {
    "id": "country-name-9",
    "prompt": "🇨🇦 Kanāda: ieraksti valsts nosaukumu angliski.",
    "answer": "Canada",
    "options": null,
    "points": 1
  }
];

export const UNIT1_DAY3 = [
  {
    "id": "be1",
    "prompt": "I ___ happy today.",
    "answer": "am",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be2",
    "prompt": "You ___ my friend.",
    "answer": "are",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be3",
    "prompt": "He ___ from Latvia.",
    "answer": "is",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be4",
    "prompt": "She ___ British.",
    "answer": "is",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be5",
    "prompt": "It ___ a new bike.",
    "answer": "is",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be6",
    "prompt": "We ___ in class four.",
    "answer": "are",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be7",
    "prompt": "You ___ very kind. (jūs)",
    "answer": "are",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be8",
    "prompt": "They ___ ready.",
    "answer": "are",
    "options": [
      "am",
      "is",
      "are"
    ],
    "points": 1
  },
  {
    "id": "be9",
    "prompt": "Pārveido noliegumā: I am tired.",
    "answer": "I am not tired.",
    "options": null,
    "points": 1
  },
  {
    "id": "be10",
    "prompt": "Pārveido noliegumā: She is American.",
    "answer": "She is not American.",
    "options": null,
    "points": 1,
    "accepted": [
      "She isn't American."
    ]
  },
  {
    "id": "be11",
    "prompt": "Pārveido noliegumā: We are late.",
    "answer": "We are not late.",
    "options": null,
    "points": 1,
    "accepted": [
      "We aren't late."
    ]
  },
  {
    "id": "be12",
    "prompt": "Pārveido noliegumā: It is a laptop.",
    "answer": "It is not a laptop.",
    "options": null,
    "points": 1,
    "accepted": [
      "It isn't a laptop."
    ]
  }
];

export const UNIT1_DAY4 = [
  {
    "id": "question1",
    "prompt": "Pārveido par jautājumu: You are ready.",
    "answer": "Are you ready?",
    "options": null,
    "points": 1
  },
  {
    "id": "question2",
    "prompt": "Pārveido par jautājumu: She is from Spain.",
    "answer": "Is she from Spain?",
    "options": null,
    "points": 1
  },
  {
    "id": "question3",
    "prompt": "Pārveido par jautājumu: They are in the park.",
    "answer": "Are they in the park?",
    "options": null,
    "points": 1
  },
  {
    "id": "question4",
    "prompt": "Pārveido par jautājumu: I am your friend.",
    "answer": "Am I your friend?",
    "options": null,
    "points": 1
  },
  {
    "id": "question5",
    "prompt": "___ he your brother?",
    "answer": "Is",
    "options": [
      "Am",
      "Is",
      "Are"
    ],
    "points": 1
  },
  {
    "id": "question6",
    "prompt": "___ we late?",
    "answer": "Are",
    "options": [
      "Am",
      "Is",
      "Are"
    ],
    "points": 1
  },
  {
    "id": "short1",
    "prompt": "Is he French? (jā) — ieraksti īso atbildi.",
    "answer": "Yes, he is.",
    "options": null,
    "points": 1
  },
  {
    "id": "short2",
    "prompt": "Are they British? (nē) — ieraksti īso atbildi.",
    "answer": "No, they aren't.",
    "options": null,
    "points": 1,
    "accepted": [
      "No, they are not."
    ]
  },
  {
    "id": "short3",
    "prompt": "Am I right? (jā) — ieraksti īso atbildi.",
    "answer": "Yes, you are.",
    "options": null,
    "points": 1
  },
  {
    "id": "short4",
    "prompt": "Is your bike red? (nē) — ieraksti īso atbildi.",
    "answer": "No, it isn't.",
    "options": null,
    "points": 1,
    "accepted": [
      "No, it is not."
    ]
  },
  {
    "id": "dialog1",
    "prompt": "Dialoga turpinājums: A: ___ you from Italy? B: Yes, I am.",
    "answer": "Are",
    "options": [
      "Are",
      "Is",
      "Am"
    ],
    "points": 1
  },
  {
    "id": "dialog2",
    "prompt": "Dialoga turpinājums: A: Is she Spanish? B: No, she ___.",
    "answer": "isn't",
    "options": [
      "isn't",
      "aren't",
      "am not"
    ],
    "points": 1
  }
];

export const UNIT1_READING = [
  "Hello! I'm Leo, and I'm twelve. I'm from England. My favourite thing is my skateboard. It is blue, and it is not new. My friend Maya is from Poland.",
  "Hi! I'm Maya. I am Polish, and my friend Leo is English. We are in the same class. My favourite things are my headphones and my guitar.",
  "My name is Nia. I'm from Canada, and I am Canadian. My laptop is old, but my phone is new. I am not a big fan of basketball.",
  "I'm Tom. I am German. My friends are from Spain and Italy. They are Spanish and Italian. We are all students, and we are happy."
];

export const UNIT1_LISTENING = "Hi, I'm Ella. I'm from Latvia, and I am Latvian. My friend Ben is British. He is eleven. We are in the same class. My favourite things are my red bike and my headphones. Ben's favourite thing is his basketball. It is orange. We are not from the same country, but we are good friends.";

export const UNIT1_MOCK = [
  {
    "key": "fill",
    "title": "1. Ievieto be formu",
    "max": 3.5,
    "description": "7 teikumi × 0,5 p.",
    "items": [
      {
        "id": "f1",
        "prompt": "I ___ Latvian.",
        "answer": "am",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f2",
        "prompt": "She ___ my sister.",
        "answer": "is",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f3",
        "prompt": "They ___ from Spain.",
        "answer": "are",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f4",
        "prompt": "We ___ happy.",
        "answer": "are",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f5",
        "prompt": "You ___ my friend.",
        "answer": "are",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f6",
        "prompt": "He ___ not British.",
        "answer": "is",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      },
      {
        "id": "f7",
        "prompt": "It ___ my new bag.",
        "answer": "is",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 0.5
      }
    ]
  },
  {
    "key": "correct-form",
    "title": "2. Pasvītro jeb izvēlies pareizo formu",
    "max": 4,
    "description": "4 izvēles × 1 p.",
    "items": [
      {
        "id": "c1",
        "prompt": "She (am / is / are) French.",
        "answer": "is",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 1
      },
      {
        "id": "c2",
        "prompt": "My jeans (am / is / are) blue.",
        "answer": "are",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 1
      },
      {
        "id": "c3",
        "prompt": "I (am / is / are) twelve.",
        "answer": "am",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 1
      },
      {
        "id": "c4",
        "prompt": "The phone (am / is / are) new.",
        "answer": "is",
        "options": [
          "am",
          "is",
          "are"
        ],
        "points": 1
      }
    ]
  },
  {
    "key": "errors",
    "title": "3. Izlabo kļūdas",
    "max": 8,
    "description": "8 teikumi × 1 p. Uzraksti visu pareizo teikumu.",
    "items": [
      {
        "id": "e1",
        "prompt": "He are German.",
        "answer": "He is German.",
        "options": null,
        "points": 1
      },
      {
        "id": "e2",
        "prompt": "I is from Latvia.",
        "answer": "I am from Latvia.",
        "options": null,
        "points": 1
      },
      {
        "id": "e3",
        "prompt": "We am students.",
        "answer": "We are students.",
        "options": null,
        "points": 1
      },
      {
        "id": "e4",
        "prompt": "She isn't are happy.",
        "answer": "She isn't happy.",
        "options": null,
        "points": 1,
        "accepted": [
          "She is not happy."
        ]
      },
      {
        "id": "e5",
        "prompt": "They is in the park.",
        "answer": "They are in the park.",
        "options": null,
        "points": 1
      },
      {
        "id": "e6",
        "prompt": "You am my friend.",
        "answer": "You are my friend.",
        "options": null,
        "points": 1
      },
      {
        "id": "e7",
        "prompt": "Are she Italian?",
        "answer": "Is she Italian?",
        "options": null,
        "points": 1
      },
      {
        "id": "e8",
        "prompt": "Is they from Spain?",
        "answer": "Are they from Spain?",
        "options": null,
        "points": 1
      }
    ]
  },
  {
    "key": "nationalities",
    "title": "4. Tautību rakstība",
    "max": 3.5,
    "description": "7 tautības × 0,5 p. Vārdu rakstība.",
    "items": [
      {
        "id": "n1",
        "prompt": "Latvia → L_tvi_n",
        "answer": "Latvian",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n2",
        "prompt": "Germany → G_rm_n",
        "answer": "German",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n3",
        "prompt": "France → Fr_nch",
        "answer": "French",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n4",
        "prompt": "Italy → It_lian",
        "answer": "Italian",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n5",
        "prompt": "Spain → Sp_nish",
        "answer": "Spanish",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n6",
        "prompt": "Poland → P_lish",
        "answer": "Polish",
        "options": null,
        "points": 0.5
      },
      {
        "id": "n7",
        "prompt": "Japan → J_pan_se",
        "answer": "Japanese",
        "options": null,
        "points": 0.5
      }
    ]
  },
  {
    "key": "odd",
    "title": "5. Atrodi lieko vārdu",
    "max": 4,
    "description": "Katrā rindā tieši viens liekais vārds.",
    "items": [
      {
        "id": "o1",
        "prompt": "Latvian / German / guitar / Spanish",
        "answer": "guitar",
        "options": [
          "German",
          "guitar",
          "Latvian",
          "Spanish"
        ],
        "points": 1
      },
      {
        "id": "o2",
        "prompt": "bag / phone / laptop / French",
        "answer": "French",
        "options": [
          "laptop",
          "French",
          "phone",
          "bag"
        ],
        "points": 1
      },
      {
        "id": "o3",
        "prompt": "we / she / they / Germany",
        "answer": "Germany",
        "options": [
          "they",
          "Germany",
          "we",
          "she"
        ],
        "points": 1
      },
      {
        "id": "o4",
        "prompt": "am / is / Italy / are",
        "answer": "Italy",
        "options": [
          "Italy",
          "are",
          "is",
          "am"
        ],
        "points": 1
      }
    ]
  },
  {
    "key": "reading",
    "title": "6. Lasīšana — oriģināls foruma teksts",
    "max": 8,
    "description": "4 paragrāfu tēmas + 4 patiess/aplams.",
    "content": "Hello! I'm Leo, and I'm twelve. I'm from England. My favourite thing is my skateboard. It is blue, and it is not new. My friend Maya is from Poland.\n\nHi! I'm Maya. I am Polish, and my friend Leo is English. We are in the same class. My favourite things are my headphones and my guitar.\n\nMy name is Nia. I'm from Canada, and I am Canadian. My laptop is old, but my phone is new. I am not a big fan of basketball.\n\nI'm Tom. I am German. My friends are from Spain and Italy. They are Spanish and Italian. We are all students, and we are happy.",
    "items": [
      {
        "id": "r1",
        "prompt": "Par ko galvenokārt ir 1. paragrāfs?",
        "answer": "Leo and his skateboard",
        "options": [
          "Leo and his skateboard",
          "Maya's new bike",
          "Nia and her brother"
        ],
        "points": 1
      },
      {
        "id": "r2",
        "prompt": "Par ko galvenokārt ir 2. paragrāfs?",
        "answer": "Maya and her favourite things",
        "options": [
          "Tom and his friends",
          "Maya and her favourite things",
          "Ella and her basketball"
        ],
        "points": 1
      },
      {
        "id": "r3",
        "prompt": "Par ko galvenokārt ir 3. paragrāfs?",
        "answer": "Nia and her things",
        "options": [
          "Nia and her things",
          "Leo's country",
          "Maya's family"
        ],
        "points": 1
      },
      {
        "id": "r4",
        "prompt": "Par ko galvenokārt ir 4. paragrāfs?",
        "answer": "Tom and his international friends",
        "options": [
          "Tom and his international friends",
          "Nia's guitar",
          "Leo's laptop"
        ],
        "points": 1
      },
      {
        "id": "r5",
        "prompt": "Leo is from England. True or false?",
        "answer": "True",
        "options": [
          "True",
          "False"
        ],
        "points": 1
      },
      {
        "id": "r6",
        "prompt": "Maya is Spanish. True or false?",
        "answer": "False",
        "options": [
          "True",
          "False"
        ],
        "points": 1
      },
      {
        "id": "r7",
        "prompt": "Nia's laptop is new. True or false?",
        "answer": "False",
        "options": [
          "True",
          "False"
        ],
        "points": 1
      },
      {
        "id": "r8",
        "prompt": "Tom's friends are from Spain and Italy. True or false?",
        "answer": "True",
        "options": [
          "True",
          "False"
        ],
        "points": 1
      }
    ]
  },
  {
    "key": "listening",
    "title": "7. Klausīšanās — oriģināls audio stāsts",
    "max": 6,
    "description": "Noklausies un izvēlies atbildes (6 p.). Ja audio ierīcē nav pieejams, izmanto transkriptu mācībām.",
    "audio": "Hi, I'm Ella. I'm from Latvia, and I am Latvian. My friend Ben is British. He is eleven. We are in the same class. My favourite things are my red bike and my headphones. Ben's favourite thing is his basketball. It is orange. We are not from the same country, but we are good friends.",
    "items": [
      {
        "id": "l1",
        "prompt": "Where is Ella from?",
        "answer": "Latvia",
        "options": [
          "Latvia",
          "Germany",
          "England"
        ],
        "points": 1
      },
      {
        "id": "l2",
        "prompt": "What is Ben's nationality?",
        "answer": "British",
        "options": [
          "Latvian",
          "British",
          "Polish"
        ],
        "points": 1
      },
      {
        "id": "l3",
        "prompt": "How old is Ben?",
        "answer": "eleven",
        "options": [
          "twelve",
          "eleven",
          "ten"
        ],
        "points": 1
      },
      {
        "id": "l4",
        "prompt": "What colour is Ella's bike?",
        "answer": "red",
        "options": [
          "green",
          "blue",
          "red"
        ],
        "points": 1
      },
      {
        "id": "l5",
        "prompt": "What is Ben's favourite thing?",
        "answer": "basketball",
        "options": [
          "guitar",
          "basketball",
          "laptop"
        ],
        "points": 1
      },
      {
        "id": "l6",
        "prompt": "Are Ella and Ben good friends?",
        "answer": "Yes",
        "options": [
          "No",
          "Yes"
        ],
        "points": 1
      }
    ]
  },
  {
    "key": "dialog",
    "title": "8. Pabeidz dialogu",
    "max": 6,
    "description": "Izvēlies vai ieraksti pareizo fragmentu.",
    "items": [
      {
        "id": "dia1",
        "prompt": "A: ___ you from Canada? B: Yes, I am.",
        "answer": "Are",
        "options": [
          "Are",
          "Is",
          "Am"
        ],
        "points": 1
      },
      {
        "id": "dia2",
        "prompt": "A: Is he British? B: Yes, he ___.",
        "answer": "is",
        "options": [
          "are",
          "am",
          "is"
        ],
        "points": 1
      },
      {
        "id": "dia3",
        "prompt": "A: ___ she from Italy? B: No, she isn't.",
        "answer": "Is",
        "options": [
          "Am",
          "Is",
          "Are"
        ],
        "points": 1
      },
      {
        "id": "dia4",
        "prompt": "A: Are they your friends? B: No, they ___.",
        "answer": "aren't",
        "options": [
          "isn't",
          "aren't",
          "am not"
        ],
        "points": 1
      },
      {
        "id": "dia5",
        "prompt": "A: ___ your bag blue? B: Yes, it is.",
        "answer": "Is",
        "options": [
          "Is",
          "Are",
          "Am"
        ],
        "points": 1
      },
      {
        "id": "dia6",
        "prompt": "A: Are we late? B: No, we ___.",
        "answer": "aren't",
        "options": [
          "aren't",
          "isn't",
          "am not"
        ],
        "points": 1
      }
    ]
  }
];

export const UNIT1_RUBRIC = [
  {
    "name": "Ievieto be formas",
    "points": 3.5
  },
  {
    "name": "Izvēlies pareizo formu",
    "points": 4
  },
  {
    "name": "Izlabo teikumos kļūdas",
    "points": 8
  },
  {
    "name": "Tautību rakstība",
    "points": 3.5
  },
  {
    "name": "Liekais vārds",
    "points": 4
  },
  {
    "name": "Lasīšana",
    "points": 8
  },
  {
    "name": "Klausīšanās",
    "points": 6
  },
  {
    "name": "Dialogs",
    "points": 6
  },
  {
    "name": "Rakstīšana: 7 teikumi (~50 vārdi)",
    "points": 9,
    "manual": true
  }
];

export const UNIT1_BONUS_DEADLINE='2026-11-03';

export const UNIT1_NPD_DATE='2026-11-04';

export const unit1MissionId=date=>'unit1-'+date;

export const unit1TopicId=date=>'unit1-day-'+date;

export const unit1AutoTotal=UNIT1_MOCK.reduce((sum,s)=>sum+s.max,0);

export const normaliseUnit1=s=>String(s||'').toLowerCase().replace(/[’]/g,"'").replace(/[.,?!;:]/g,' ').replace(/\s+/g,' ').trim();

export const isUnit1Correct=(item,value)=>[item.answer,...(item.accepted||[])].some(s=>normaliseUnit1(s)===normaliseUnit1(value));

export const scoreUnit1=(items,answers)=>{const max=items.reduce((n,q)=>n+q.points,0);const earned=items.reduce((n,q)=>n+(isUnit1Correct(q,answers[q.id])?q.points:0),0);return {earned,max,percent:max?Math.round(100*earned/max):0};};

export const countUnit1Words=text=>String(text||'').trim().split(/\s+/).filter(Boolean).length;

export const unit1DailyCanBonus=(date,completedAt,score,writingSentences,writingWordCount=0)=>completedAt>=date&&completedAt<=UNIT1_BONUS_DEADLINE&&score>=80&&(date!==UNIT1_BONUS_DEADLINE||(writingSentences===7&&writingWordCount>=35));
