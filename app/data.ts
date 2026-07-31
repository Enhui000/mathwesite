export const conference = {
  name: "大连数论与算术几何研讨会",
  englishName: "Dalian Number Theory and Arithmetic Geometry Conference",
  dates: "2026年8月16日 - 8月21日",
  shortDates: "Aug 16-21, 2026",
  registration: "8月16日 12:00-21:00",
  registrationVenue: "大连理工国际会议中心",
  venueName: "大连理工大学数学与科学学院",
  campus: "凌水主校区",
  city: "大连",
  address: "辽宁省大连市甘井子区凌工路2号 大连理工大学数学与科学学院",
  venueKeyword: "大连理工大学 数学与科学学院",
  handbookUrl: "/dalian-number-theory-arithmetic-geometry-handbook-v2.pptx",
  handbookPreviewUrl: "/handbook-view.html",
  posterUrl: "/handbook-slides/slide-1.png",
  campusMapUrl: "/handbook-slides/slide-12.png",
  travelGuideUrl: "/handbook-slides/slide-13.png",
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
      ["09:00", "开幕式与合影"],
      ["09:30", "Talk 1 · 秦厚荣，南京大学"],
      ["11:00", "Talk 2 · 范洋宇，北京理工大学"],
      ["14:00", "Talk 3 · 胡昊宇，南京大学"],
      ["15:30", "Talk 4 · 赵和耳，哈尔滨工业大学"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.18",
    label: "学术日 I · TUE",
    events: [
      ["09:30", "Talk 1 · 肖梁，北京大学"],
      ["11:00", "Talk 2 · 丁一文，北京大学"],
      ["14:00", "Talk 3 · 胡永泉，中国科学院数学与系统科学研究院"],
      ["15:30", "Talk 4 · 王善文，中国人民大学"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.19",
    label: "学术日 II · WED",
    events: [
      ["09:30", "Talk 1 · 陈柯，南京大学"],
      ["11:00", "Talk 2 · 盛茂，清华大学"],
      ["14:00", "自由讨论"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.20",
    label: "学术日 III · THU",
    events: [
      ["09:30", "Talk 1 · 扶磊，清华大学"],
      ["11:00", "Talk 2 · 许大昕，中国科学院数学与系统科学研究院"],
      ["14:00", "Talk 3 · 闵钰，香港科技大学"],
      ["15:30", "Talk 4 · 杜衡，清华大学"],
      ["17:00", "晚餐"],
    ],
  },
  {
    day: "08.21",
    label: "闭幕日 · FRI",
    events: [
      ["09:30", "Talk 1 · 欧阳毅，中国科学技术大学"],
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
    session: "08.17 上午",
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
    session: "08.17 上午",
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
    session: "08.17 下午",
    talkNo: "Talk 3",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "zhao-heer",
    name: "赵和耳",
    affiliation: "哈尔滨工业大学",
    session: "08.17 下午",
    talkNo: "Talk 4",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "xiao-liang",
    name: "肖梁",
    affiliation: "北京大学",
    session: "08.18 上午",
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
    session: "08.18 上午",
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
    session: "08.18 下午",
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
    session: "08.18 下午",
    talkNo: "Talk 4",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "chen-ke",
    name: "陈柯",
    affiliation: "南京大学",
    session: "08.19 上午",
    talkNo: "Talk 1",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "sheng-mao",
    name: "盛茂",
    affiliation: "清华大学",
    session: "08.19 上午",
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
    session: "08.20 上午",
    talkNo: "Talk 1",
    talkTitle: "报告题目待更新",
    keywords: ["Arithmetic Geometry", "Cohomology"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "xu-daxin",
    name: "许大昕",
    affiliation: "中国科学院数学与系统科学研究院",
    session: "08.20 上午",
    talkNo: "Talk 2",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "min-yu",
    name: "闵钰",
    affiliation: "香港科技大学",
    session: "08.20 下午",
    talkNo: "Talk 3",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "du-heng",
    name: "杜衡",
    affiliation: "清华大学",
    session: "08.20 下午",
    talkNo: "Talk 4",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "ouyang-yi",
    name: "欧阳毅",
    affiliation: "中国科学技术大学",
    session: "08.21 上午",
    talkNo: "Talk 1",
    talkTitle: "报告题目待更新",
    keywords: ["Number Theory", "Arithmetic Geometry"],
    photo: "",
    bio: defaultBio,
    abstract: defaultAbstract,
  },
  {
    id: "liu-ruochuan",
    name: "刘若川",
    affiliation: "北京大学",
    session: "08.21 上午",
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
    transit: "地铁2号线至西安路站，换乘地铁1号线至学苑广场站，再换乘公交。",
  },
  {
    title: "大连北站",
    distance: "约20公里",
    taxi: "约30-40分钟，50-60元",
    transit: "地铁1号线河口方向至学苑广场站，再换乘公交或步行至校园。",
  },
  {
    title: "大连站",
    distance: "约13公里",
    taxi: "约25-30分钟，35-45元",
    transit: "901路公交可至大连理工大学附近，也可地铁换乘至学苑广场站。",
  },
];

export function speakerInitials(name: string) {
  return name.slice(0, 2);
}

export function amapSearchUrl() {
  const params = new URLSearchParams({
    keyword: `${conference.venueKeyword} ${conference.address}`,
    city: conference.city,
    view: "map",
    src: "dalian-nt-ag-2026",
    callnative: "1",
  });

  return `https://uri.amap.com/search?${params.toString()}`;
}

export function googleMapsUrl() {
  const params = new URLSearchParams({
    api: "1",
    query: `${conference.venueName}, ${conference.address}`,
  });

  return `https://www.google.com/maps/search/?${params.toString()}`;
}
