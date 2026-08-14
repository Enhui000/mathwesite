export const conference = {
  name: "2026年大连数论与算术几何研讨会",
  englishName: "Dalian Number Theory and Arithmetic Geometry Conference",
  dates: "2026年8月16日 - 8月21日",
  shortDates: "Aug 16-21, 2026",
  registration: "8月16日（周日）14:00-21:00",
  registrationVenue:
    "报到地点：大连理工国际会议中心酒店大堂 · 早餐：酒店1楼 · 午餐 / 晚餐 / 晚宴：酒店2楼；8月16日17:30-20:00酒店一楼可点餐",
  venueName: "大连理工大学综合教学1号楼 153教室",
  campus: "凌水主校区",
  city: "大连",
  address: "大连理工大学凌水主校区 · 综合教学1号楼",
  venueKeyword: "大连理工大学综合教学1号楼",
  handbookUrl: "/dalian-number-theory-arithmetic-geometry-handbook-final.pdf",
  handbookPreviewUrl: "/handbook-view.html",
  posterUrl: "/handbook-final/page-01.png",
  campusMapUrl: "/handbook-final/page-10.png",
  travelGuideUrl: "/handbook-final/page-09.png",
};

export const stats = [
  ["5 days", "学术交流"],
  ["16", "邀请报告"],
  ["DUT", "大连理工大学"],
  ["NT / AG", "数论与算术几何"],
];

export const schedule = [
  {
    day: "08.17",
    label: "开幕日 · MON",
    events: [
      ["09:20", "开幕式 · 柳振鑫主持"],
      ["09:30", "Talk 1 · 刘若川，北京大学"],
      ["10:30", "茶歇及合影"],
      ["11:00", "Talk 2 · 范洋宇，北京理工大学"],
      ["12:00", "午餐"],
      ["14:30", "Talk 3 · 闵钰，香港科技大学"],
      ["15:30", "茶歇"],
      ["16:00", "Talk 4 · 杜衡，清华大学"],
      ["17:30", "晚餐"],
    ],
  },
  {
    day: "08.18",
    label: "学术日 I · TUE",
    events: [
      ["09:30", "Talk 1 · 扶磊，清华大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 丁一文，北京大学"],
      ["12:00", "午餐"],
      ["14:30", "Talk 3 · 胡永泉，中国科学院数学与系统科学研究院"],
      ["15:30", "茶歇"],
      ["16:00", "Talk 4 · 王善文，中国人民大学"],
      ["18:00", "会议晚宴"],
    ],
  },
  {
    day: "08.19",
    label: "学术日 II · WED",
    events: [
      ["09:30", "Talk 1 · 陈柯，南京大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 盛茂，清华大学"],
      ["12:00", "午餐"],
      ["14:30", "自由讨论"],
      ["17:30", "晚餐"],
    ],
  },
  {
    day: "08.20",
    label: "学术日 III · THU",
    events: [
      ["09:30", "Talk 1 · 肖梁，北京大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 许大昕，中国科学院数学与系统科学研究院"],
      ["12:00", "午餐"],
      ["14:30", "Talk 3 · 胡昊宇，南京大学"],
      ["15:30", "茶歇"],
      ["16:00", "Talk 4 · 赵和耳，哈尔滨工业大学"],
      ["17:30", "晚餐"],
    ],
  },
  {
    day: "08.21",
    label: "闭幕日 · FRI",
    events: [
      ["09:30", "Talk 1 · 秦厚荣，南京大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 欧阳毅，中国科学技术大学"],
      ["12:00", "午餐"],
      ["14:30", "离会"],
    ],
  },
];

export type Speaker = {
  id: string;
  name: string;
  affiliation: string;
  session: string;
  talkNo: string;
  talkTitle: string;
  keywords: string[];
  photo: string;
  bio: string;
  abstract: string;
};

const defaultBio =
  "个人简介待报告人补充。可填写研究方向、任职经历与代表性工作。";

const speakerRecords: Speaker[] = [
  {
    id: "qin-hourong",
    name: "秦厚荣",
    affiliation: "南京大学",
    session: "08.21 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle:
      "The CM Conductor and the Lang-Trotter Conjecture for CM Elliptic Curves",
    keywords: ["CM Elliptic Curves", "Lang-Trotter Conjecture"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Whether a quadratic polynomial can represent primes infinitely often - for example, Euler's conjecture that x² + 1 can represent primes infinitely often - is notoriously difficult and remains wide open. More generally, the Hardy-Littlewood conjecture gives an asymptotic formula for the count of such primes. In parallel, for an elliptic curve E over Q with complex multiplication (CM) and a fixed nonzero integer r, the Lang-Trotter conjecture predicts an asymptotic formula for π_E,r(x) = #{p ≤ x : a_p = r}, where a_p is the Frobenius trace. We introduce a new invariant, the CM conductor K_E, which refines the Serre conductor in the CM case. Using K_E, we give a corrected formula for the Lang-Trotter constant c_E,r, differing from the previous one by Baier and Jones. Assuming the Hardy-Littlewood conjecture on quadratic polynomial primes, we prove that our version of the Lang-Trotter conjecture holds for every CM elliptic curve over Q. We compute the constants explicitly for each imaginary quadratic field of class number one, characterize exactly when the constant vanishes, and prove the conjecture unconditionally in the vanishing case. Numerical evidence strongly supports our formulation. This is joint work with Longxi Hu and Kaisheng Lei.",
  },
  {
    id: "fan-yangyu",
    name: "范洋宇",
    affiliation: "北京理工大学",
    session: "08.17 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "Syntomic Formalism and p-adic Logarithms of Heegner Classes",
    keywords: ["Syntomic Cohomology", "p-adic L-functions"],
    photo: "",
    bio: defaultBio,
    abstract:
      "The Birch-Swinnerton-Dyer conjecture predicts a precise relation between the behavior of an L-function at its central point and the arithmetic of an elliptic curve. In the rank-one setting, Heegner classes provide a fundamental bridge between the analytic and arithmetic sides. I will explain a p-adic Waldspurger formula, valid also when p is non-split in the CM field, which relates the p-adic logarithms of generalized Heegner classes to special values of anticyclotomic p-adic L-functions. The main geometric input is syntomic formalism with coefficients, which allows the relevant Abel-Jacobi calculation to be carried out on semistable Shimura curves. Combined with anticyclotomic Iwasawa theory, this yields a p-converse theorem for self-dual CM characters, with applications to Sylvester's conjecture on sums of two rational cubes and to Goldfeld's conjecture for CM elliptic curves.",
  },
  {
    id: "hu-haoyu",
    name: "胡昊宇",
    affiliation: "南京大学",
    session: "08.20 14:30-15:30",
    talkNo: "Talk 3",
    talkTitle: "A Generalization of Deligne's Finiteness Theorem",
    keywords: ["Etale Cohomology", "l-adic Sheaves"],
    photo: "",
    bio: defaultBio,
    abstract:
      "In 2012, Esnault and Kerz proved Deligne's finiteness theorem for ℓ-adic sheaves, which says that the number of geometrically irreducible ℓ-adic local systems on a smooth variety over a finite field, with bounded ramification along a normal compactification and bounded rank, is finite. In this lecture, I will present a generalization and a new proof of this theorem. The new ingredient is a universal bound of Betti numbers for étale sheaves with wild ramifications. This is joint work with Jean-Baptiste Teyssier.",
  },
  {
    id: "zhao-heer",
    name: "赵和耳",
    affiliation: "哈尔滨工业大学",
    session: "08.20 16:00-17:00",
    talkNo: "Talk 4",
    talkTitle: "Reduction Types of Rigid 1-motives via Galois Representation",
    keywords: ["1-Motives", "Galois Representations"],
    photo: "",
    bio: defaultBio,
    abstract:
      "We introduce rigid 1-motives, formal 1-motives and log formal 1-motives, study relations among them, define reduction types of rigid 1-motives, as well as ℓ-adic realizations (ℓ can be p) of various 1-motives. In the end, we give a Néron–Ogg–Shafarevich criterion for the reduction types of rigid 1-motives via ℓ-adic realizations (ℓ can be p). This is based on part of a joint work with Xu Shen and Khai-Hoan Nguyen-Dang.",
  },
  {
    id: "xiao-liang",
    name: "肖梁",
    affiliation: "北京大学",
    session: "08.20 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "TBA",
    keywords: ["Arithmetic Geometry", "p-adic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: "TBA",
  },
  {
    id: "ding-yiwen",
    name: "丁一文",
    affiliation: "北京大学",
    session: "08.18 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "Classicality of Weight One Modular Forms",
    keywords: ["Modular Forms", "Classicality"],
    photo: "",
    bio: defaultBio,
    abstract:
      "We give a new proof of the classicality of weight one modular forms. This is joint work with Tian Qiu and Zhixiang Wu.",
  },
  {
    id: "hu-yongquan",
    name: "胡永泉",
    affiliation: "中国科学院数学与系统科学研究院",
    session: "08.18 14:30-15:30",
    talkNo: "Talk 3",
    talkTitle:
      "Multivariable (φ, Γ)-modules and the locality question for GL₂",
    keywords: ["Mod p Langlands", "Galois Representations"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Let K be a finite unramified extension of Q_p and let ρ be a 2-dimensional mod p Galois representation of Gal_K. In the mod p Langlands program we aim to associate to ρ a smooth mod p representation π(ρ) of GL₂(K). If ρ arises globally from automorphic forms, there exists a non-canonical global candidate for π(ρ). In this talk, we will survey known results concerning π(ρ) and its attached multivariable (φ, Γ)-modules, and address the locality question. This is joint work with Breuil, Herzig, Koziol, Morra, Schraen and Shin.",
  },
  {
    id: "wang-shanwen",
    name: "王善文",
    affiliation: "中国人民大学",
    session: "08.18 16:00-17:00",
    talkNo: "Talk 4",
    talkTitle: "p-adic Hahn Series with Sparse Support",
    keywords: ["p-adic Hahn Series", "Transcendence"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Let p be a prime number. We introduce a sparseness condition on the supports of p-adic Hahn series, and prove that this condition implies transcendence over the completion of the maximal unramified extension of Q_p. As an application, we prove our order type conjecture for algebraic p-adic Hahn series with bounded support under the condition that the support has only finitely many accumulation points. This is joint work with Yijun Yuan.",
  },
  {
    id: "chen-ke",
    name: "陈柯",
    affiliation: "南京大学",
    session: "08.19 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "On Images of Galois Representations Associated to One-motives",
    keywords: ["Galois Representations", "One-Motives"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Galois representations associated to abelian varieties over a field in characteristic zero are expected to have nice properties, including variants of open image in suitable l-adic or adelic Lie groups. We discuss similar properties for one-motives and related results.",
  },
  {
    id: "sheng-mao",
    name: "盛茂",
    affiliation: "清华大学",
    session: "08.19 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "Nonlinear Hodge Correspondence in Positive Characteristic",
    keywords: ["Nonlinear Hodge Theory", "Positive Characteristic"],
    photo: "",
    bio: defaultBio,
    abstract:
      "I shall report on my recent work on nonlinear Hodge correspondence in positive characteristic. It is a correspondence between a certain category of nonlinear connections with nilpotent p-curvatures and a certain category of nonlinear Higgs fields with a nilpotency condition. I shall also introduce the notion of a nonlinear Fontaine module, and explain that the relative nilpotent de Rham moduli, equipped with the nonabelian Gauss–Manin connection, the nonabelian Hodge filtration and the nonabelian Frobenius structure induced by the Ogus–Vologodsky correspondence, is naturally a nonlinear Fontaine module.",
  },
  {
    id: "fu-lei",
    name: "扶磊",
    affiliation: "清华大学",
    session: "08.18 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle:
      "Arithmetic Hypergeometric D-modules and Exponential Sums for Reductive Groups",
    keywords: ["D-Modules", "Exponential Sums"],
    photo: "",
    bio: defaultBio,
    abstract:
      "For a family of representations of a reductive group, we define a Laurent polynomial on the group. The exponential sum associated to this Laurent polynomial is called the hypergeometric exponential sum. We introduce an arithmetic hypergeometric D-module to study the exponential sum. We show it is overholonomic, determine the open set where it is an overconvergent F-isocrystal, and estimate its rank. We apply these results to the estimation of the exponential sum. This is a joint work with Xuanyou Li and Chenhan Liu.",
  },
  {
    id: "xu-daxin",
    name: "许大昕",
    affiliation: "中国科学院数学与系统科学研究院",
    session: "08.20 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "Comparison between Algebraic and Arithmetic D-modules",
    keywords: ["Arithmetic D-Modules", "p-adic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Berthelot's theory of arithmetic D-modules provides a p-adic analogue of the sheaf-theoretic formalism on varieties of characteristic p. In this talk I will give a brief review of this theory. A central point will be the comparison between algebraic D-modules on the generic fiber and arithmetic D-modules on the special fiber. This comparison is the mechanism that allows one to put Frobenius structures on rigid algebraic connections.",
  },
  {
    id: "min-yu",
    name: "闵钰",
    affiliation: "香港科技大学",
    session: "08.17 14:30-15:30",
    talkNo: "Talk 3",
    talkTitle: "Congruences of Syntomic Cohomology",
    keywords: ["Syntomic Cohomology", "Galois Representations"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Let K be a finite extension of Q_p and G_K be its absolute Galois group. Given two crystalline Z_p representations of G_K, we are interested in the relation between congruences of the two representations and congruences of their Bloch-Kato Selmer groups. But mod p^n reductions of representations do not contain enough information in general. In this talk, we will consider the mod p^n reductions of the prismatic F-gauges attached to these crystalline representations and explain how these reductions might determine the reductions of their first syntomic cohomology groups, which can be regarded as a refinement of local Bloch-Kato Selmer groups.",
  },
  {
    id: "du-heng",
    name: "杜衡",
    affiliation: "清华大学",
    session: "08.17 16:00-17:00",
    talkNo: "Talk 4",
    talkTitle: "p-adic Monodromy and Newton Polygons",
    keywords: ["p-adic Monodromy", "Newton Polygons"],
    photo: "",
    bio: defaultBio,
    abstract:
      "Berger's theorem states that every de Rham Galois representation is potentially log-crystalline. I will discuss a relative version of this theorem, conjectured by Liu and Zhu, for de Rham local systems. The main new ingredient is the Newton polygon function attached to a de Rham local system. I will show that a relative p-adic monodromy theorem holds over Newton-constant loci. In particular, the Liu-Zhu conjecture holds on a dense open subset. Near rank-one adic points, our criterion is also sharp. I will also explain an application to a recent conjecture of Howe and Klevdal concerning potential good reduction for admissible pairs.",
  },
  {
    id: "ouyang-yi",
    name: "欧阳毅",
    affiliation: "中国科学技术大学",
    session: "08.21 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "Isogeny-Based Cryptography",
    keywords: ["Isogeny Cryptography", "Post-Quantum Cryptography"],
    photo: "",
    bio: defaultBio,
    abstract:
      "本报告将介绍基于超奇异椭圆曲线和阿贝尔簇同源的后量子密码体系，并介绍我们团队在这方面的一些工作，主要包括后量子密码签名方案 SQIsign2D^2 的设计。",
  },
  {
    id: "liu-ruochuan",
    name: "刘若川",
    affiliation: "北京大学",
    session: "08.17 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "Some Examples of Eigencurves",
    keywords: ["Eigencurves", "p-adic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract:
      "In joint work with Truong, Xiao and Zhao, we develop a theory on the geometry of eigencurves. In this talk, I will apply this framework to examine several concrete examples.",
  },
];

const speakerOrder = [
  "liu-ruochuan",
  "fan-yangyu",
  "min-yu",
  "du-heng",
  "fu-lei",
  "ding-yiwen",
  "hu-yongquan",
  "wang-shanwen",
  "chen-ke",
  "sheng-mao",
  "xiao-liang",
  "xu-daxin",
  "hu-haoyu",
  "zhao-heer",
  "qin-hourong",
  "ouyang-yi",
];

export const speakers = speakerOrder.map((id) => {
  const speaker = speakerRecords.find((record) => record.id === id);
  if (!speaker) {
    throw new Error(`Missing speaker record: ${id}`);
  }
  return speaker;
});

export const travel = [
  {
    title: "大连周水子国际机场",
    distance: "约13公里",
    taxi: "约25-30分钟，35-50元",
    transit: "公共交通全程约60分钟，票价约5-7元。",
  },
  {
    title: "大连站",
    distance: "约13公里",
    taxi: "约25-30分钟，35-45元",
    transit: "公共交通全程约50-60分钟，票价约5-7元。",
  },
  {
    title: "大连北站",
    distance: "约20公里",
    taxi: "约30-40分钟，50-60元",
    transit: "公共交通全程约60-70分钟，票价约5-7元。",
  },
];

export const dalianGuideSpots = [
  {
    title: "星海广场 · 星海湾",
    timeframe: "会议日晚间 · 1.5-2小时",
    keyword: "大连星海广场",
    image: "/dalian-guide/xinghai-bay.jpg",
    imageAlt: "星海湾游艇码头与跨海大桥",
    summary:
      "离会场相对近，适合报告结束后看海、沿广场散步，并顺路看星海湾跨海大桥。",
    notice:
      "2026年8月灯光秀：周日至周四 20:00、21:00；周五、周六 20:00、21:00、21:30。",
    practical:
      "星海湾大桥夏季灯光演绎每场约10分钟；如遇重大活动或恶劣天气，以当天通知为准（信息核对：2026-08-11）。",
    photoCredit: "Jerry Zhang / Unsplash",
    photoUrl: "https://unsplash.com/photos/Kwse8pSkjDk",
  },
  {
    title: "中山广场 · 东港海岸",
    timeframe: "城市夜景 · 2-3小时",
    keyword: "大连东港商务区",
    image: "/dalian-guide/dalian-harbor.jpg",
    imageAlt: "大连海岸附近的港口建筑",
    summary:
      "先看中山广场周边历史建筑，再到东港沿海步道散步，适合安排在同一个晚上。",
    notice: "",
    practical: "音乐喷泉和临时活动会随季节、天气调整，出发前以现场公告为准。",
    photoCredit: "zhou shen / Pexels",
    photoUrl: "https://www.pexels.com/photo/tower-in-dalian-habor-20016527/",
  },
  {
    title: "滨海路 · 棒棰岛",
    timeframe: "空闲半日 · 4-5小时",
    keyword: "大连棒棰岛宾馆景区",
    image: "/dalian-guide/coastal-harbor.jpg",
    imageAlt: "大连海岸与港湾远景",
    summary:
      "适合有半天空档时看山海景观。滨海路很长，建议只选东段，并与棒棰岛组合。",
    notice: "",
    practical: "景区开放和入园安排可能变化，购票或叫车前先查看当天信息。",
    photoCredit: "Zhu Qiankun / Unsplash",
    photoUrl: "https://unsplash.com/photos/o4gu82qUGpE",
  },
  {
    title: "白云山 · 滨海鹿",
    timeframe: "城市山林 · 遇见不保证",
    keyword: "大连白云山山体公园",
    image: "/dalian-guide/baiyun-sika-deer.jpg",
    imageAlt: "大连白云山山体公园内的野生梅花鹿",
    summary:
      "白云山山体公园是梅花鹿核心活动区域；滨海路和莲花山也有出没记录，是否遇见取决于鹿群当天活动情况。",
    notice:
      "较明确点位：莲花山寺等核心观鹿区域；白云山山体公园、滨海路沿线也有出没记录。",
    practical:
      "请保持距离，不追逐、不喧哗、不随意投喂；林缘草地注意防蜱。",
    photoCredit: "Photo / IC · China Daily",
    photoUrl:
      "https://govt.chinadaily.com.cn/s/202309/04/WS64fae61c498ed2d7b7e9a7db/wild-sika-deers-spotted-at-dalians-baiyun-mountain-park.html",
  },
] as const;

export const campusWalkingRoute = {
  startName: "大连理工国际会议中心",
  start: [121.53261, 38.875773] as const,
  endName: "大连理工大学综合教学1号楼",
  end: [121.525613, 38.882665] as const,
  distance: "校内步行",
  duration: "约17分钟",
  roads: "从酒店后门刷身份证进入校园，沿手册红色路线步行至综合教学1号楼。",
};

export function speakerInitials(name: string) {
  return name.slice(0, 2);
}

export function amapSearchUrl(keyword = conference.venueKeyword) {
  const params = new URLSearchParams({
    keyword,
    city: conference.city,
    view: "map",
    src: "dalian-nt-ag-2026",
    callnative: "1",
  });

  return `https://uri.amap.com/search?${params.toString()}`;
}

export function amapWebUrl(keyword = conference.venueKeyword) {
  const params = new URLSearchParams({
    query: keyword,
    city: conference.city,
  });

  return `https://ditu.amap.com/search?${params.toString()}`;
}

export function amapWalkingRouteUrl() {
  const params = new URLSearchParams({
    from: `${campusWalkingRoute.start.join(",")},${campusWalkingRoute.startName}`,
    to: `${campusWalkingRoute.end.join(",")},${campusWalkingRoute.endName}`,
    mode: "walk",
    policy: "0",
    src: "dalian-nt-ag-2026",
    callnative: "1",
  });

  return `https://uri.amap.com/navigation?${params.toString()}`;
}

export function amapWalkingRouteWebUrl() {
  const params = new URLSearchParams({
    type: "walk",
    "from[lnglat]": campusWalkingRoute.start.join(","),
    "from[name]": campusWalkingRoute.startName,
    "to[lnglat]": campusWalkingRoute.end.join(","),
    "to[name]": campusWalkingRoute.endName,
    src: "dalian-nt-ag-2026",
    callnative: "0",
    innersrc: "uriapi",
  });

  return `https://ditu.amap.com/dir?${params.toString()}`;
}

export function googleMapsUrl() {
  const params = new URLSearchParams({
    api: "1",
    origin: campusWalkingRoute.startName,
    destination: campusWalkingRoute.endName,
    travelmode: "walking",
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
