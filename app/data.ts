export const conference = {
  name: "大连数论与算术几何研讨会",
  englishName: "Dalian Number Theory and Arithmetic Geometry Conference",
  dates: "2026年8月16日 - 8月21日",
  shortDates: "Aug 16-21, 2026",
  registration: "8月16日 14:00-21:00",
  registrationVenue: "大连理工国际会议中心（17:30-20:00 一楼晚餐）",
  venueName: "大连理工大学数学科学学院",
  campus: "凌水主校区",
  city: "大连",
  address: "辽宁省大连市甘井子区凌工路2号 大连理工大学数学科学学院",
  venueKeyword: "大连理工大学数学科学学院",
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
      ["09:30", "Talk 1 · 秦厚荣，南京大学"],
      ["10:30", "茶歇及合影"],
      ["11:00", "Talk 2 · 范洋宇，北京理工大学"],
      ["12:00", "午餐"],
      ["14:00", "Talk 3 · 胡昊宇，南京大学"],
      ["15:00", "茶歇"],
      ["15:30", "Talk 4 · 赵和耳，哈尔滨工业大学"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.18",
    label: "学术日 I · TUE",
    events: [
      ["09:30", "Talk 1 · 肖梁，北京大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 丁一文，北京大学"],
      ["12:00", "午餐"],
      ["14:00", "Talk 3 · 胡永泉，中国科学院数学与系统科学研究院"],
      ["15:00", "茶歇"],
      ["15:30", "Talk 4 · 王善文，中国人民大学"],
      ["17:00", "会议晚宴"],
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
      ["14:00", "自由讨论"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.20",
    label: "学术日 III · THU",
    events: [
      ["09:30", "Talk 1 · 扶磊，清华大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 许大昕，中国科学院数学与系统科学研究院"],
      ["12:00", "午餐"],
      ["14:00", "Talk 3 · 闵钰，香港科技大学"],
      ["15:00", "茶歇"],
      ["15:30", "Talk 4 · 杜衡，清华大学"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.21",
    label: "闭幕日 · FRI",
    events: [
      ["09:30", "Talk 1 · 欧阳毅，中国科学技术大学"],
      ["10:30", "茶歇"],
      ["11:00", "Talk 2 · 刘若川，北京大学"],
      ["12:00", "午餐"],
      ["14:00", "离会"],
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

const defaultAbstract =
  "报告摘要待报告人补充。";

export const speakers: Speaker[] = [
  {
    id: "qin-hourong",
    name: "秦厚荣",
    affiliation: "南京大学",
    session: "08.17 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "fan-yangyu",
    name: "范洋宇",
    affiliation: "北京理工大学",
    session: "08.17 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "hu-haoyu",
    name: "胡昊宇",
    affiliation: "南京大学",
    session: "08.17 14:00-15:00",
    talkNo: "Talk 3",
    talkTitle: "A Generalization of Deligne's Finiteness Theorem",
    keywords: ["Etale Cohomology", "l-adic Sheaves"],
    photo: "",
    bio: defaultBio,
    abstract:
      "In 2012, Esnault and Kerz proved Deligne's finiteness theorem for l-adic sheaves, which says that the number of geometrically irreducible l-adic local systems on a smooth variety over a finite field, with bounded ramification along a normal compactification and bounded ranks, is finite. In this lecture, I will present a generalization and a new proof of this theorem. The new ingredient is a universal bound of Betti numbers for etale sheaves with wild ramifications. This is a joint work with Jean-Baptiste Teyssier.",
  },
  {
    id: "zhao-heer",
    name: "赵和耳",
    affiliation: "哈尔滨工业大学",
    session: "08.17 15:30-16:30",
    talkNo: "Talk 4",
    talkTitle: "Reduction Types of Rigid 1-Motives via Galois Representation",
    keywords: ["1-Motives", "Galois Representations"],
    photo: "",
    bio: defaultBio,
    abstract:
      "We introduce rigid 1-motives, formal 1-motives, log formal 1-motives, study relations among them, define reduction types of rigid 1-motives, as well as l-adic realizations (l can be p) of various 1-motives. In the end, we give a Neron-Ogg-Shafarevich criterion of the reduction types of rigid 1-motives via l-adic realizations (l can be p). This is based on part of a joint work with Xu Shen and Khai-Hoan Nguyen-Dang.",
  },
  {
    id: "xiao-liang",
    name: "肖梁",
    affiliation: "北京大学",
    session: "08.18 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "报告题目待更新",
    keywords: ["Arithmetic Geometry", "p-adic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "ding-yiwen",
    name: "丁一文",
    affiliation: "北京大学",
    session: "08.18 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "hu-yongquan",
    name: "胡永泉",
    affiliation: "中国科学院数学与系统科学研究院",
    session: "08.18 14:00-15:00",
    talkNo: "Talk 3",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "wang-shanwen",
    name: "王善文",
    affiliation: "中国人民大学",
    session: "08.18 15:30-16:30",
    talkNo: "Talk 4",
    talkTitle: "P-adic Hahn Series with Sparse Support",
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
    talkTitle: "报告题目待更新",
    keywords: ["Arithmetic Geometry", "Algebraic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "fu-lei",
    name: "扶磊",
    affiliation: "清华大学",
    session: "08.20 09:30-10:30",
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
    talkTitle: "Comparison between Algebraic and Arithmetic D-Modules",
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
    session: "08.20 14:00-15:00",
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
    session: "08.20 15:30-16:30",
    talkNo: "Talk 4",
    talkTitle: "P-adic Monodromy and Newton Polygons",
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
    session: "08.21 09:30-10:30",
    talkNo: "Talk 1",
    talkTitle: "Isogeny-based Cryptography",
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
    session: "08.21 11:00-12:00",
    talkNo: "Talk 2",
    talkTitle: "报告题目待更新",
    keywords: ["p-adic Hodge Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
];

export const travel = [
  {
    title: "大连周水子国际机场",
    distance: "约13公里",
    taxi: "约25-30分钟，35-50元",
    transit: "公共交通全程约60分钟，票价约5-7元。",
  },
  {
    title: "大连北站",
    distance: "约20公里",
    taxi: "约30-40分钟，50-60元",
    transit: "公共交通全程约60-70分钟，票价约5-7元。",
  },
  {
    title: "大连站",
    distance: "约13公里",
    taxi: "约25-30分钟，35-45元",
    transit: "公共交通全程约50-60分钟，票价约5-7元。",
  },
];

export const campusWalkingRoute = {
  startName: "大连理工国际会议中心",
  start: [121.53261, 38.875773] as const,
  endName: "大连理工大学综合教学1号楼",
  end: [121.525613, 38.882665] as const,
  distance: "约1.36公里",
  duration: "约18分钟",
  roads: "弘远南路 → 汇英路 → 凌水路 → 修齐路",
};

export function speakerInitials(name: string) {
  return name.slice(0, 2);
}

export function amapSearchUrl() {
  const params = new URLSearchParams({
    keyword: conference.venueKeyword,
    city: conference.city,
    view: "map",
    src: "dalian-nt-ag-2026",
    callnative: "1",
  });

  return `https://uri.amap.com/search?${params.toString()}`;
}

export function amapWebUrl() {
  const params = new URLSearchParams({
    query: conference.venueKeyword,
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
