import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import academyLogo from "./assets/logo.png";
import mayankPhoto from "./assets/mayank.jpg";
import himanshuPhoto from "./assets/himanshu.jpg";
import "./App.css";

const academy = {
  name: "Stithpragya Music Academy",
  tagline: "Learn • Practice • Perform",
  founder: "Mayank Soni",
  coFounder: "Himanshu Sharma",
  phone1: "+91 6377648387",
  phone2: "+91 8890725368",
  email: "stithpragyasangeetsansthan7@gmail.com",
  address:
    "1891, Sukhlal Vyas Ki Gali, Natanio Ka Rasta, Vidhyadhar Ka Rasta, Chaura Rasta, Jaipur, Rajasthan 302003",
  whatsapp: "919024225368",
  instagram:
    "https://www.instagram.com/stithpragyamusic?igsh=NDQ2eTlkcTg3MnZh",
  youtube:
    "https://youtube.com/@stithpragyasangeetsansthan7?si=fRNVZuZRQVW-o6ij",
};

const studentFormLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSfwE8vrdDvcn7r0vN2m5EEqw_zn3Bx0baZLeiPIDvCNBCAVWg/viewform?usp=dialog";

const teacherFormLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSejeR3g7s_AT0TrYE7z8ijcN4Z8kGyEmkUe-GYoXvs_oH8R0A/viewform?usp=dialog";

const studentSheetLink =
  "https://docs.google.com/spreadsheets/d/1Q7EbLBkHK4niMw8b6oXNosbl6UmPPKeO19qxwv2O23w/edit?usp=sharing";

const teacherSheetLink =
  "https://docs.google.com/spreadsheets/d/1Q7EbLBkHK4niMw8b6oXNosbl6UmPPKeO19qxwv2O23w/edit?usp=sharing";

const googleLocationLink =
  "https://www.google.com/maps/search/?api=1&query=1891,+Sukhlal+Vyas+Ki+Gali,+Natanio+Ka+Rasta,+Vidhyadhar+Ka+Rasta,+Chaura+Rasta,+Jaipur,+Rajasthan+302003";

const HIDDEN_PORTAL_PASSWORD = "stith123";
const SHEET_ID = "1Q7EbLBkHK4niMw8b6oXNosbl6UmPPKeO19qxwv2O23w";
const STUDENT_TAB_NAME = "Student Responses 1";
const TEACHER_TAB_NAME = "Teacher Responses";
const AUTO_REFRESH_MS = 45000;
const API_BASE = "https://stithpragya-backend.onrender.com";

const courses = [
  {
    icon: "🎤",
    title: "Singing & Vocal Training",
    desc: "Build voice control, sur, expression, confidence, and performance quality through guided vocal practice.",
    points: [
      "Beginner to Advanced",
      "Breathing & Voice Control",
      "Bollywood / Semi-Classical",
      "Stage Performance Practice",
    ],
    duration: "3–6 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎸",
    title: "Guitar Training",
    desc: "Learn chords, rhythm, strumming, and practical song playing in a structured way.",
    points: [
      "Beginner Friendly",
      "Chord Progressions",
      "Strumming Patterns",
      "Song Practice",
    ],
    duration: "3–5 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🥁",
    title: "Tabla Training",
    desc: "Develop rhythm sense, hand control, taal understanding, and accompaniment skills.",
    points: [
      "Basic to Advanced",
      "Taal Practice",
      "Hand Techniques",
      "Accompaniment Skills",
    ],
    duration: "4–6 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎶",
    title: "Flute Training",
    desc: "Improve breath control, melody flow, and expressive playing with regular guided training.",
    points: [
      "Breath Control",
      "Melody Practice",
      "Classical Basics",
      "Performance Training",
    ],
    duration: "3–5 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "💃",
    title: "Kathak Dance",
    desc: "Learn grace, rhythm, expressions, and classical movement with traditional practice.",
    points: [
      "Footwork",
      "Expressions",
      "Classical Movement",
      "Stage Presentation",
    ],
    duration: "6 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🕺",
    title: "Bollywood Dance",
    desc: "Energetic choreography, movement training, and performance confidence for all levels.",
    points: [
      "Basic Steps",
      "Choreography",
      "Freestyle Movement",
      "Performance Practice",
    ],
    duration: "2–4 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎼",
    title: "Harmonium Training",
    desc: "Understand melody, notes, support vocals, and strengthen musical basics.",
    points: [
      "Note Practice",
      "Sur & Scale Basics",
      "Accompaniment",
      "Bhajan / Classical Support",
    ],
    duration: "3–5 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎙️",
    title: "Stage Performance Training",
    desc: "Improve stage confidence, mic handling, body language, and live presentation skills.",
    points: [
      "Mic Handling",
      "Audience Confidence",
      "Stage Presence",
      "Live Practice",
    ],
    duration: "Ongoing",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎹",
    title: "Synthesizer Training",
    desc: "Learn keys, chords, melodies, rhythm flow, and performance basics in a structured way.",
    points: [
      "Keyboard Basics",
      "Chords and Melodies",
      "Song Practice",
      "Performance Skills",
    ],
    duration: "3–5 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🪘",
    title: "Dholak Training",
    desc: "Develop rhythm accuracy, hand coordination, and accompaniment techniques for traditional music.",
    points: [
      "Basic Rhythms",
      "Hand Coordination",
      "Traditional Patterns",
      "Accompaniment Practice",
    ],
    duration: "3–5 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "🎵",
    title: "Ukulele Training",
    desc: "Learn chords, strumming, rhythm, and easy song-playing techniques with a fun instrument.",
    points: [
      "Basic Chords",
      "Strumming Patterns",
      "Song Practice",
      "Beginner Friendly",
    ],
    duration: "2–4 Months",
    mode: "Online / Offline / Home Tuition",
  },
  {
    icon: "👏",
    title: "Clapbox Training",
    desc: "Improve beat sense, percussion timing, coordination, and performance rhythm using clapbox techniques.",
    points: [
      "Beat Control",
      "Timing Practice",
      "Percussion Basics",
      "Live Rhythm Support",
    ],
    duration: "2–4 Months",
    mode: "Online / Offline / Home Tuition",
  },
];

const courseOptions = [
  "Guitar",
  "Harmonium",
  "Tabla",
  "Synthesizer",
  "Dholak",
  "Vocal",
  "Kathak",
  "Dance Western",
  "Ukulele",
  "Clapbox",
];

const gallery = [
  {
    title: "Stage Performances",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Studio Sessions",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Instrument Practice",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Live Rehearsals",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    name: "Focused Learning",
    text: "Students get practical guidance, regular practice support, and a disciplined environment to improve step by step.",
  },
  {
    name: "Performance Confidence",
    text: "Training is not limited to classroom learning. The academy also helps students become confident performers.",
  },
  {
    name: "Creative Growth",
    text: "Music and dance learning here focuses on skill, expression, consistency, and overall artistic development.",
  },
];

const founderCards = [
  {
    role: "Founder",
    name: academy.founder,
    photo: mayankPhoto,
    bio: "Mayank Soni leads the academy with a strong vision of disciplined learning, quality training, and meaningful artistic growth. His focus is to build an academy where students do not just learn music or dance, but also develop confidence, dedication, and stage readiness.",
    highlight: "Vision • Discipline • Premium Training",
  },
  {
    role: "Co-Founder",
    name: academy.coFounder,
    photo: himanshuPhoto,
    bio: "Himanshu Sharma is a singer, guitarist, performer, and creative leader whose passion for music, stage performance, and artistic growth brings a dynamic identity to Stithpragya Music Academy. With strong experience in performance, creative presentation, leadership, event execution, and audience engagement, he plays an important role in shaping an academy culture that balances discipline with creativity. His vision is to help students grow not only as learners, but also as confident performers with strong expression, stage presence, and artistic personality.",
    highlight: "Singer • Guitarist • Performer • Creative Leadership",
  },
];

const pages = [
  "home",
  "about",
  "founders",
  "courses",
  "gallery",
  "media",
  "teachers",
  "contact",
  "admin-media",
  "admin-portal",
];

const normalizeKey = (key) =>
  String(key || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.*:()\-?]/g, "");

const getCellValue = (row, possibleKeys) => {
  for (const key of possibleKeys) {
    const normalized = normalizeKey(key);
    const match = Object.keys(row).find(
      (rowKey) => normalizeKey(rowKey) === normalized
    );
    if (match && row[match] !== undefined && row[match] !== null) {
      return String(row[match]).trim();
    }
  }
  return "";
};

const parseGoogleSheetResponse = (text) => {
  const jsonText = text
    .replace("/*O_o*/", "")
    .replace(/google\.visualization\.Query\.setResponse\(/, "")
    .replace(/\);$/, "");

  const data = JSON.parse(jsonText);
  const table = data.table;

  if (!table || !table.cols || !table.rows) return [];
  const headers = table.cols.map((col) => col.label || col.id || "");

  return table.rows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      const cell = row.c[index];
      obj[header] = cell ? cell.v ?? "" : "";
    });
    return obj;
  });
};

const formatDate = (value) => {
  if (!value) return "";

  if (typeof value === "string" && value.startsWith("Date(")) {
    const parts = value
      .replace("Date(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    const date = new Date(
      parts[0],
      parts[1],
      parts[2],
      parts[3] || 0,
      parts[4] || 0,
      parts[5] || 0
    );

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const parsedDate = new Date(value);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return value;
};

const getNumericRating = (value) => {
  const num = Number(String(value || "").trim());
  return Number.isFinite(num) && num >= 1 && num <= 5 ? num : null;
};

function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Submitted Successfully");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoBroken, setLogoBroken] = useState(false);
  const [mayankBroken, setMayankBroken] = useState(false);
  const [himanshuBroken, setHimanshuBroken] = useState(false);
  const [hiddenPortalUnlocked, setHiddenPortalUnlocked] = useState(false);

  const [mediaItems, setMediaItems] = useState([]);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminForm, setAdminForm] = useState({
    type: "youtube",
    title: "",
    url: "",
  });

  const [studentRows, setStudentRows] = useState([]);
  const [teacherRows, setTeacherRows] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [lastDashboardSync, setLastDashboardSync] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    course: "",
    rating: 5,
    review: "",
    image: "",
  });

  const navRef = useRef(null);
  const himanshuTapCountRef = useRef(0);
  const himanshuTapTimerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 22;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return undefined;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      elements.forEach((el) => el.classList.add("active"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [
    activePage,
    mediaItems,
    adminUnlocked,
    hiddenPortalUnlocked,
    studentRows,
    teacherRows,
    reviews,
  ]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [activePage]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${API_BASE}/media`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Media fetch failed");
        if (data?.success && Array.isArray(data.media)) {
          setMediaItems(data.media);
        } else {
          setMediaItems([]);
        }
      } catch (err) {
        console.log("Backend not running or media endpoint unavailable:", err);
        setMediaItems([]);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const res = await fetch(`${API_BASE}/reviews`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Review fetch failed");
        if (data?.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.log("Review fetch error:", error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timer = setTimeout(() => setShowSuccess(false), 2500);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  useEffect(() => {
    return () => {
      if (himanshuTapTimerRef.current) {
        clearTimeout(himanshuTapTimerRef.current);
      }
    };
  }, []);

  const fetchSheetTab = useCallback(async (sheetName) => {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(
      sheetName
    )}&tqx=out:json`;

    const res = await fetch(url);
    const text = await res.text();
    return parseGoogleSheetResponse(text);
  }, []);

  const refreshDashboardData = useCallback(async () => {
    try {
      setDashboardLoading(true);

      const [students, teachers] = await Promise.all([
        fetchSheetTab(STUDENT_TAB_NAME),
        fetchSheetTab(TEACHER_TAB_NAME),
      ]);

      setStudentRows(students);
      setTeacherRows(teachers);
      setLastDashboardSync(new Date().toLocaleString());
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
      setStudentRows([]);
      setTeacherRows([]);
    } finally {
      setDashboardLoading(false);
    }
  }, [fetchSheetTab]);

  useEffect(() => {
    if (hiddenPortalUnlocked) {
      refreshDashboardData();
    }
  }, [hiddenPortalUnlocked, refreshDashboardData]);

  useEffect(() => {
    if (!hiddenPortalUnlocked) return undefined;

    const interval = setInterval(() => {
      refreshDashboardData();
    }, AUTO_REFRESH_MS);

    return () => clearInterval(interval);
  }, [hiddenPortalUnlocked, refreshDashboardData]);

  const countByField = (rows, keys) => {
    const counts = {};
    rows.forEach((row) => {
      const value = getCellValue(row, keys);
      if (!value) return;
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };

  const getRecentEntries = (
    rows,
    nameKeys,
    timeKeys,
    extraKeys = [],
    limit = 5
  ) =>
    rows
      .map((row) => ({
        name: getCellValue(row, nameKeys) || "Unnamed",
        timestamp: getCellValue(row, timeKeys) || "",
        extra: getCellValue(row, extraKeys) || "",
        rating: getCellValue(row, [
          "Rating",
          "Experience Rating",
          "Teacher Rating",
          "Student Rating",
        ]),
      }))
      .slice(-limit)
      .reverse();

  const enquiryText = useMemo(() => {
    return `Hello ${academy.name},
I want to know more about courses and admissions.`;
  }, []);

  const studentCourseCounts = countByField(studentRows, [
    "Participation in music",
  ]);
  const teacherSkillCounts = countByField(teacherRows, ["Teaching Skill"]);

  const combinedCourseCounts = {};
  Object.entries(studentCourseCounts).forEach(([key, value]) => {
    combinedCourseCounts[key] = (combinedCourseCounts[key] || 0) + value;
  });
  Object.entries(teacherSkillCounts).forEach(([key, value]) => {
    combinedCourseCounts[key] = (combinedCourseCounts[key] || 0) + value;
  });

  const studentModeCounts = countByField(studentRows, [
    "Apply for Online and Offline",
  ]);
  const teacherModeCounts = countByField(teacherRows, ["Apply for Mode"]);

  const combinedModeCounts = {};
  Object.entries(studentModeCounts).forEach(([key, value]) => {
    combinedModeCounts[key] = (combinedModeCounts[key] || 0) + value;
  });
  Object.entries(teacherModeCounts).forEach(([key, value]) => {
    combinedModeCounts[key] = (combinedModeCounts[key] || 0) + value;
  });

  const recentStudents = getRecentEntries(
    studentRows,
    ["Name"],
    ["Timestamp"],
    ["Participation in music"],
    5
  );

  const recentTeachers = getRecentEntries(
    teacherRows,
    ["Name"],
    ["Timestamp"],
    ["Teaching Skill"],
    5
  );

  const studentRatings = studentRows
    .map((row) =>
      getCellValue(row, [
        "Rating",
        "Experience Rating",
        "Teacher Rating",
        "Student Rating",
      ])
    )
    .map(getNumericRating)
    .filter((value) => value !== null);

  const teacherRatings = teacherRows
    .map((row) =>
      getCellValue(row, [
        "Rating",
        "Experience Rating",
        "Teacher Rating",
        "Student Rating",
      ])
    )
    .map(getNumericRating)
    .filter((value) => value !== null);

  const calculateAverage = (arr) =>
    arr.length
      ? (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1)
      : "0.0";

  const avgStudentRating = calculateAverage(studentRatings);
  const avgTeacherRating = calculateAverage(teacherRatings);
  const overallRating = calculateAverage([
    ...studentRatings,
    ...teacherRatings,
  ]);

  const publicReviewRatings = reviews
    .map((item) => getNumericRating(item.rating))
    .filter((value) => value !== null);

  const publicReviewAverage = calculateAverage(publicReviewRatings);

  const maxCourseCount = Math.max(1, ...Object.values(combinedCourseCounts));
  const maxModeCount = Math.max(1, ...Object.values(combinedModeCounts));

  const goToPage = (page) => {
    if (
      (page === "admin-media" || page === "admin-portal") &&
      !hiddenPortalUnlocked
    ) {
      alert("Access denied");
      return;
    }

    setActivePage(page);
    setMobileMenuOpen(false);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openHiddenPortal = () => {
    const entered = window.prompt("Enter hidden portal password");
    if (!entered) return;

    if (entered === HIDDEN_PORTAL_PASSWORD) {
      setHiddenPortalUnlocked(true);
      setAdminUnlocked(false);
      setAdminPassword("");
      setActivePage("admin-portal");
      setMobileMenuOpen(false);
      himanshuTapCountRef.current = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Wrong hidden portal password");
    }
  };

  const handleHimanshuSecretTap = () => {
    himanshuTapCountRef.current += 1;

    if (himanshuTapTimerRef.current) {
      clearTimeout(himanshuTapTimerRef.current);
    }

    himanshuTapTimerRef.current = setTimeout(() => {
      himanshuTapCountRef.current = 0;
    }, 1800);

    if (himanshuTapCountRef.current >= 5) {
      himanshuTapCountRef.current = 0;
      openHiddenPortal();
    }
  };

  const closeHiddenPortal = () => {
    setHiddenPortalUnlocked(false);
    setAdminUnlocked(false);
    setAdminPassword("");
    himanshuTapCountRef.current = 0;
    setActivePage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const verifyAdminPassword = async () => {
    if (!adminPassword) {
      alert("Enter admin password");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Admin verification failed");
      }

      if (data?.success) {
        setAdminUnlocked(true);
      } else {
        alert(data?.message || "Wrong password ❌");
        setAdminPassword("");
      }
    } catch (err) {
      console.log(err);
      alert(err.message || "Server error ❌");
    }
  };

  const lockAdminPortal = () => {
    setAdminUnlocked(false);
    setAdminPassword("");
    setAdminForm({
      type: "youtube",
      title: "",
      url: "",
    });
    setActivePage("admin-portal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addMediaItem = async (e) => {
    e.preventDefault();

    if (!adminForm.type || !adminForm.title || !adminForm.url) {
      alert("Please fill all media fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/add-media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: adminPassword,
          type: adminForm.type,
          title: adminForm.title,
          url: adminForm.url,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Add media failed");
      }

      if (data?.success && data.media) {
        setMediaItems((prev) => [data.media, ...prev]);
        setAdminForm({ type: "youtube", title: "", url: "" });
        setSuccessText("Media Added Successfully");
        setShowSuccess(true);
      } else {
        alert(data?.message || "Failed to add media ❌");
      }
    } catch (err) {
      console.log(err);
      alert(err.message || "Server error ❌");
    }
  };

  const deleteMediaItem = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/delete-media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword, id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Delete media failed");
      }

      if (data?.success) {
        setMediaItems((prev) => prev.filter((item) => item.id !== id));
        setSuccessText("Media Deleted Successfully");
        setShowSuccess(true);
      } else {
        alert(data?.message || "Delete failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert(err.message || "Server error ❌");
    }
  };

  const handleReviewImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setReviewForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (
      !reviewForm.name.trim() ||
      !reviewForm.course.trim() ||
      !reviewForm.review.trim()
    ) {
      alert("Please fill all review fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Review submit failed");
      }

      if (data?.success && data.review) {
        setReviews((prev) => [data.review, ...prev]);
        setReviewForm({
          name: "",
          course: "",
          rating: 5,
          review: "",
          image: "",
        });
        setSuccessText("Review Submitted Successfully");
        setShowSuccess(true);
      } else {
        alert(data?.message || "Failed to submit review");
      }
    } catch (error) {
      console.log("Submit review error:", error);
      alert(error.message || "Server error ❌");
    }
  };

  const getYouTubeVideoId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }
      if (parsed.hostname.includes("youtube.com")) {
        return parsed.searchParams.get("v");
      }
      return null;
    } catch {
      return null;
    }
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  };

  const getInstagramEmbedUrl = (url) => {
    try {
      const cleanUrl = url.split("?")[0];
      if (cleanUrl.includes("/reel/") || cleanUrl.includes("/p/")) {
        return `${cleanUrl}embed`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const getPageLabel = (page) => {
    if (page === "admin-media") return "Admin Media";
    if (page === "admin-portal") return "Admin Portal";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  const renderLogo = (className, altText) => {
    if (logoBroken) {
      return <div className={`${className} logo-fallback`}>🎵</div>;
    }

    return (
      <img
        src={academyLogo}
        alt={altText}
        className={className}
        onError={() => setLogoBroken(true)}
      />
    );
  };

  const renderFounderImage = (person, index) => {
    const isBroken = index === 0 ? mayankBroken : himanshuBroken;

    if (isBroken) {
      return (
        <div className="founder-image founder-image-fallback">
          <span>{person.name}</span>
        </div>
      );
    }

    return (
      <img
        src={person.photo}
        alt={person.name}
        className={`founder-image ${
          index === 0 ? "mayank-photo" : "himanshu-photo"
        }`}
        onClick={() => {
          if (index === 1) handleHimanshuSecretTap();
        }}
        onError={() => {
          if (index === 0) setMayankBroken(true);
          else setHimanshuBroken(true);
        }}
      />
    );
  };

  const exportCsv = (rows, fileName) => {
    if (!rows.length) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(rows[0]);
    const escapeCsv = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) =>
        headers.map((header) => escapeCsv(row[header])).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderMiniBarChart = (data, maxValue) => {
    const entries = Object.entries(data);
    if (!entries.length) {
      return <div className="feature-item">No data found</div>;
    }

    return entries.map(([label, value]) => (
      <div key={label} style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "6px",
            fontSize: "14px",
          }}
        >
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
        <div
          style={{
            width: "100%",
            height: "10px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(value / maxValue) * 100}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(240,190,90,0.95), rgba(255,225,160,0.95))",
            }}
          />
        </div>
      </div>
    ));
  };

  const renderStars = (rating) =>
    "★".repeat(Number(rating || 0)) + "☆".repeat(5 - Number(rating || 0));

  return (
    <div
      className="app"
      style={{
        "--mx": `${mousePosition.x}px`,
        "--my": `${mousePosition.y}px`,
      }}
    >
      <div
        className="cursor-glow"
        style={{
          left: `calc(50% + ${mousePosition.x * 5}px)`,
          top: `calc(24% + ${mousePosition.y * 5}px)`,
        }}
      />
      <div
        className="cursor-glow-small"
        style={{
          left: `calc(74% + ${mousePosition.x * 6}px)`,
          top: `calc(68% + ${mousePosition.y * 6}px)`,
        }}
      />

      <div className="floating-notes" aria-hidden="true">
        <span className="note note-1">♪</span>
        <span className="note note-2">♫</span>
        <span className="note note-3">♬</span>
        <span className="note note-4">♩</span>
      </div>

      <header className="navbar">
        <div className="nav-shell" ref={navRef}>
          <button
            type="button"
            className="brand-button"
            onClick={(e) => {
              if (e.shiftKey) {
                e.preventDefault();
                openHiddenPortal();
                return;
              }
              goToPage("home");
            }}
          >
            <div className="brand">
              <div className="brand-logo-image-wrap">
                {renderLogo(
                  "brand-logo-image",
                  "Stithpragya Sangeet Sansthan Logo"
                )}
              </div>

              <div className="brand-text">
                <h1>{academy.name}</h1>
                <p>{academy.tagline}</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            {pages
              .filter(
                (page) => page !== "admin-portal" && page !== "admin-media"
              )
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`nav-btn ${activePage === page ? "active" : ""}`}
                  onClick={() => goToPage(page)}
                >
                  <span>{getPageLabel(page)}</span>
                  <i className="nav-indicator" />
                </button>
              ))}
          </nav>
        </div>
      </header>

      <div className="scroll-progress-wrap">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="container">
        <div className="page-transition" key={activePage}>
          {activePage === "home" && (
            <>
              <section className="hero reveal">
                <div className="hero-copy premium-panel panel-tilt">
                  <div className="hero-bg-shape shape-1" />
                  <div className="hero-bg-shape shape-2" />
                  <div className="hero-copy-3d-glow hero-copy-3d-glow-1" />
                  <div className="hero-copy-3d-glow hero-copy-3d-glow-2" />

                  <span className="pill">
                    Professional Training in Music & Dance
                  </span>

                  <div className="hero-brand-chip">
                    {renderLogo("chip-logo-image", "Academy Logo")}
                    <div className="chip-text">
                      <small>Welcome To</small>
                      <strong>Stithpragya Music Academy</strong>
                    </div>
                  </div>

                  <h2>
                    Learn with discipline.
                    <span className="gold-text"> Perform with confidence.</span>
                  </h2>

                  <p>
                    Stithpragya Music Academy provides structured training in
                    music and dance for students who want to improve their
                    skills, creativity, and stage performance in a guided and
                    inspiring environment.
                  </p>

                  <div className="button-row">
                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() => goToPage("contact")}
                    >
                      Book Demo
                    </button>
                    <button
                      type="button"
                      className="btn btn-glass"
                      onClick={() => goToPage("courses")}
                    >
                      Explore Courses
                    </button>
                    <a
                      href={`https://wa.me/${academy.whatsapp}?text=${encodeURIComponent(
                        enquiryText
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-glass"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="hero-tags">
                    <span>Singing</span>
                    <span>Instruments</span>
                    <span>Dance</span>
                    <span>Performance Training</span>
                  </div>

                  <div className="stats-grid">
                    <div className="glass-card stat-card reveal">
                      <strong>Music</strong>
                      <span>Vocal and Instrument Training</span>
                    </div>
                    <div className="glass-card stat-card reveal">
                      <strong>Dance</strong>
                      <span>Kathak and Bollywood Classes</span>
                    </div>
                    <div className="glass-card stat-card reveal">
                      <strong>Stage</strong>
                      <span>Performance Confidence Building</span>
                    </div>
                    <div className="glass-card stat-card reveal">
                      <strong>Learning</strong>
                      <span>Online and Offline Guidance</span>
                    </div>
                  </div>
                </div>

                <div className="hero-visual premium-panel panel-tilt hero-visual-3d">
                  <div className="hero-badge">Music • Dance • Performance</div>

                  <div className="hero-3d-stage" aria-hidden="true">
                    <div className="hero-3d-orb hero-3d-orb-1" />
                    <div className="hero-3d-orb hero-3d-orb-2" />
                    <div className="hero-3d-orb hero-3d-orb-3" />
                    <div className="hero-3d-ring hero-3d-ring-1" />
                    <div className="hero-3d-ring hero-3d-ring-2" />
                    <div className="hero-3d-note hero-3d-note-1">♪</div>
                    <div className="hero-3d-note hero-3d-note-2">♫</div>
                    <div className="hero-3d-note hero-3d-note-3">♬</div>
                    <div className="hero-3d-platform" />
                    <div className="hero-3d-beam hero-3d-beam-1" />
                    <div className="hero-3d-beam hero-3d-beam-2" />
                  </div>

                  <div className="hero-image-shell hero-image-shell-3d">
                    <img
                      className="hero-image"
                      src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80"
                      alt="Stithpragya Music Academy showcase"
                    />
                    <div className="hero-image-overlay" />
                    <div className="hero-image-shine" />
                    <div className="hero-image-edge-glow" />
                  </div>

                  <div className="hero-mini-grid">
                    <div className="mini-card">
                      <h4>Skill Development</h4>
                      <p>
                        Focused classes that help students improve technique,
                        rhythm, expression, and confidence.
                      </p>
                    </div>
                    <div className="mini-card">
                      <h4>Performance Exposure</h4>
                      <p>
                        Training designed to prepare students for stage
                        presence, live presentation, and artistic growth.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section reveal">
                <div className="section-head">
                  <span className="pill">Why Choose Us</span>
                  <h2>Training that builds skill and confidence</h2>
                  <p>
                    The academy focuses on proper learning, regular practice,
                    guided improvement, and performance readiness.
                  </p>
                </div>

                <div className="grid-3">
                  <article className="glass-card info-card panel-tilt reveal">
                    <h3>Structured Learning</h3>
                    <p>
                      Classes are planned to help students improve step by step,
                      with attention to basics, practice, and consistency.
                    </p>
                  </article>

                  <article className="glass-card info-card panel-tilt reveal">
                    <h3>Creative Growth</h3>
                    <p>
                      Students are encouraged to develop expression, confidence,
                      and artistic individuality along with technical skill.
                    </p>
                  </article>

                  <article className="glass-card info-card panel-tilt reveal">
                    <h3>Performance Focus</h3>
                    <p>
                      Training also supports stage confidence, presentation, and
                      real performance preparation.
                    </p>
                  </article>
                </div>
              </section>

              <section className="section reveal">
                <div className="section-head">
                  <span className="pill">Learning Experience</span>
                  <h2>What makes the academy experience valuable</h2>
                  <p>
                    Students grow here through disciplined practice, support,
                    and performance-oriented guidance.
                  </p>
                </div>

                <div className="grid-3">
                  {testimonials.map((item) => (
                    <article
                      className="glass-card testimonial-card panel-tilt reveal"
                      key={item.name}
                    >
                      <div className="stars">★★★★★</div>
                      <p>{item.text}</p>
                      <h4>{item.name}</h4>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section reveal">
                <div className="section-head">
                  <span className="pill">Student Reviews</span>
                  <h2>Public Rating & Review Section</h2>
                  <p>
                    Students can rate their learning experience, share feedback,
                    and upload their photo for the home page review section.
                  </p>
                </div>

                <div className="grid-2 review-overview-grid">
                  <article className="glass-card content-card panel-tilt reveal">
                    <h3>Review Summary</h3>
                    <div className="review-summary-row">
                      <div className="review-summary-box">
                        <strong>{publicReviewAverage}</strong>
                        <span>Average Rating</span>
                      </div>
                      <div className="review-summary-box">
                        <strong>{reviews.length}</strong>
                        <span>Total Reviews</span>
                      </div>
                    </div>
                    <div className="public-stars-display">
                      {renderStars(Math.round(Number(publicReviewAverage) || 0))}
                    </div>
                  </article>

                  <article className="contact-card reveal">
                    <div className="contact-card-glow" />
                    <div className="contact-inner">
                      <span className="contact-label">Submit Review</span>
                      <h3>Share Your Experience</h3>

                      <form onSubmit={submitReview}>
                        <input
                          className="field"
                          type="text"
                          placeholder="Your Name"
                          value={reviewForm.name}
                          onChange={(e) =>
                            setReviewForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />

                        <input
                          className="field"
                          type="text"
                          placeholder="Course Name"
                          value={reviewForm.course}
                          onChange={(e) =>
                            setReviewForm((prev) => ({
                              ...prev,
                              course: e.target.value,
                            }))
                          }
                        />

                        <div className="review-rating-wrap">
                          <label className="review-label">
                            Select Rating
                          </label>
                          <div className="rating-stars-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`star-btn ${
                                  Number(reviewForm.rating) >= star
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setReviewForm((prev) => ({
                                    ...prev,
                                    rating: star,
                                  }))
                                }
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          className="field textarea"
                          placeholder="Write your review"
                          value={reviewForm.review}
                          onChange={(e) =>
                            setReviewForm((prev) => ({
                              ...prev,
                              review: e.target.value,
                            }))
                          }
                        />

                        <div className="review-upload-wrap">
                          <label className="review-label">
                            Upload Student Image
                          </label>
                          <input
                            className="field"
                            type="file"
                            accept="image/*"
                            onChange={handleReviewImageUpload}
                          />
                        </div>

                        {reviewForm.image ? (
                          <div className="review-preview-box">
                            <img
                              src={reviewForm.image}
                              alt="Review Preview"
                              className="review-preview-image"
                            />
                          </div>
                        ) : null}

                        <div className="contact-submit-row">
                          <button type="submit" className="btn btn-gold">
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </article>
                </div>

                <div className="course-grid" style={{ marginTop: "24px" }}>
                  {reviewsLoading ? (
                    <article className="glass-card content-card reveal">
                      <h3>Loading reviews...</h3>
                    </article>
                  ) : reviews.length === 0 ? (
                    <article className="glass-card content-card reveal">
                      <h3>No reviews added yet</h3>
                      <p>
                        Be the first student to share a rating and review.
                      </p>
                    </article>
                  ) : (
                    reviews.map((item) => (
                      <article
                        className="review-card glass-card panel-tilt reveal"
                        key={item.id}
                      >
                        <div className="review-card-top">
                          <div className="review-avatar-wrap">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="review-avatar"
                              />
                            ) : (
                              <div className="review-avatar review-avatar-fallback">
                                {String(item.name || "S").charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>

                          <div className="review-head-content">
                            <h3>{item.name}</h3>
                            <div className="review-course">{item.course}</div>
                            <div className="review-stars">
                              {renderStars(item.rating)}
                            </div>
                          </div>
                        </div>

                        <p className="review-text">{item.review}</p>

                        <div className="review-date">
                          {item.createdAt ? formatDate(item.createdAt) : ""}
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </>
          )}

          {activePage === "about" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">About Academy</span>
                <h2>About Stithpragya Music Academy</h2>
                <p>
                  Stithpragya Music Academy is a place for students who want to
                  learn music and dance with proper guidance, regular practice,
                  and performance-focused training.
                </p>
              </div>

              <div className="grid-2">
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>What students can learn here</h3>
                  <div className="feature-grid">
                    {[
                      "Vocal Training",
                      "Instrument Learning",
                      "Kathak Dance",
                      "Bollywood Dance",
                      "Stage Performance Practice",
                      "Rhythm & Music Basics",
                      "Confidence Building",
                      "Personal Guidance",
                    ].map((item) => (
                      <div className="feature-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Our approach</h3>
                  <p>
                    The academy believes in disciplined training, practical
                    improvement, and creative development. The goal is to help
                    each student become more confident, expressive, and capable
                    in their chosen form of music or dance.
                  </p>
                </article>
              </div>
            </section>
          )}

          {activePage === "founders" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Founders</span>
                <h2>The people behind the academy vision</h2>
                <p>
                  The academy is built on discipline, creativity, performance,
                  and genuine commitment to student growth.
                </p>
              </div>

              <div className="founder-grid">
                {founderCards.map((person, index) => (
                  <article className="founder-card reveal" key={person.name}>
                    <div className="founder-image-wrap">
                      <div className="founder-image-frame">
                        {renderFounderImage(person, index)}
                      </div>
                    </div>

                    <div className="founder-content">
                      <span className="role-pill">{person.role}</span>
                      <h3>{person.name}</h3>
                      <div className="founder-highlight">
                        {person.highlight}
                      </div>
                      <p>{person.bio}</p>

                      <div className="founder-tags">
                        {index === 0 ? (
                          <>
                            <span>Leadership</span>
                            <span>Vision</span>
                            <span>Discipline</span>
                          </>
                        ) : (
                          <>
                            <span>Singer</span>
                            <span>Guitarist</span>
                            <span>Performer</span>
                            <span>Creative Leadership</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activePage === "courses" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Courses</span>
                <h2>Courses for music, dance, and performance</h2>
                <p>
                  Choose from vocal, instrument, dance, and stage performance
                  programs designed for practical improvement.
                </p>
              </div>

              <div className="course-grid">
                {courses.map((course) => (
                  <article className="course-card reveal" key={course.title}>
                    <div className="course-card-glow" />
                    <div className="course-icon">{course.icon}</div>
                    <h3>{course.title}</h3>
                    <p className="course-desc">{course.desc}</p>

                    <ul className="course-list">
                      {course.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="course-meta">
                      <span>Duration: {course.duration}</span>
                      <span>Mode: {course.mode}</span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-gold small"
                      onClick={() => goToPage("contact")}
                    >
                      Enquire Now
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activePage === "gallery" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Gallery</span>
                <h2>Training, practice, and performance moments</h2>
                <p>
                  A visual look at the academy environment, learning sessions,
                  and performance-focused activities.
                </p>
              </div>

              <div className="gallery-grid">
                {gallery.map((item) => (
                  <article className="gallery-card reveal" key={item.title}>
                    <img src={item.image} alt={item.title} />
                    <div className="gallery-overlay">
                      <h3>{item.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activePage === "media" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Media</span>
                <h2>Academy Videos & Reels</h2>
                <p>
                  Watch academy content, performances, class highlights, and
                  social media updates.
                </p>
              </div>

              <div className="media-grid">
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Official Social Platforms</h3>
                  <p>
                    Follow our official pages for latest videos, reels,
                    performances, and academy updates.
                  </p>

                  <div className="social-cards">
                    <a
                      href={academy.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="social-card"
                    >
                      <span>Instagram</span>
                      <strong>Visit Instagram</strong>
                    </a>

                    <a
                      href={academy.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="social-card"
                    >
                      <span>YouTube</span>
                      <strong>Visit YouTube</strong>
                    </a>
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>What you can watch here</h3>
                  <p>
                    YouTube videos and Instagram reels added from the admin
                    panel will automatically appear here.
                  </p>

                  <div className="media-badges">
                    <span>YouTube Videos</span>
                    <span>Instagram Reels</span>
                    <span>Class Highlights</span>
                    <span>Performances</span>
                  </div>
                </article>
              </div>

              <div className="course-grid" style={{ marginTop: "24px" }}>
                {mediaItems.length === 0 ? (
                  <article className="glass-card content-card reveal">
                    <h3>No media added yet</h3>
                    <p>
                      Add media links from admin portal and they will appear
                      here.
                    </p>
                  </article>
                ) : (
                  mediaItems.map((item) => {
                    const youtubeThumbnail =
                      item.type === "youtube"
                        ? getYouTubeThumbnail(item.url)
                        : null;

                    const instagramEmbedUrl =
                      item.type === "instagram"
                        ? getInstagramEmbedUrl(item.url)
                        : null;

                    return (
                      <article className="media-show-card reveal" key={item.id}>
                        <div className="media-show-card-glow" />

                        <div className="media-preview-wrap">
                          {item.type === "youtube" && youtubeThumbnail ? (
                            <div className="media-thumbnail-box">
                              <img
                                src={youtubeThumbnail}
                                alt={item.title}
                                className="media-thumbnail-image"
                              />
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="media-play-badge"
                              >
                                ▶
                              </a>
                            </div>
                          ) : item.type === "instagram" &&
                            instagramEmbedUrl ? (
                            <div className="instagram-preview-box">
                              <iframe
                                src={instagramEmbedUrl}
                                title={item.title}
                                className="media-instagram-frame"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency="true"
                              />
                            </div>
                          ) : (
                            <div className="media-fallback-box">
                              <div className="course-icon">
                                {item.type === "youtube" ? "▶️" : "📸"}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="media-show-content">
                          <h3>{item.title}</h3>
                          <p className="course-desc">
                            {item.type === "youtube"
                              ? "YouTube video added from admin portal."
                              : "Instagram reel/post added from admin portal."}
                          </p>

                          <div className="course-meta">
                            <span>Type: {item.type}</span>
                          </div>

                          <div className="button-row">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-gold small"
                            >
                              Open Media
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {activePage === "teachers" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Teacher Careers</span>
                <h2>Join Music Academy as a Teacher</h2>
                <p>
                  We are looking for passionate, skilled, and dedicated teachers
                  who want to guide students in music, dance, and performance
                  training.
                </p>
              </div>

              <div className="grid-2">
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Who can apply</h3>
                  <div className="feature-grid">
                    {[
                      "Vocal / Singing Trainers",
                      "Guitar / Instrument Teachers",
                      "Tabla / Harmonium / Flute Teachers",
                      "Kathak / Dance Instructors",
                      "Performance Trainers",
                      "Creative Music Teachers",
                      "Discipline and consistency",
                      "Student-friendly teaching",
                    ].map((item) => (
                      <div className="feature-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>What we look for</h3>
                  <div className="feature-grid">
                    {[
                      "Strong teaching skills",
                      "Practical knowledge",
                      "Good communication",
                      "Performance experience",
                      "Student guidance",
                      "Consistency",
                      "Professional attitude",
                      "Passion for teaching",
                    ].map((item) => (
                      <div className="feature-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="contact-grid" style={{ marginTop: "24px" }}>
                <article className="contact-card reveal">
                  <div className="contact-card-glow" />
                  <div className="contact-inner">
                    <span className="contact-label">Work With Us</span>
                    <h3>Teacher Opportunities</h3>
                    <p className="contact-intro">
                      If you have strong knowledge, performance experience, and
                      the ability to teach students in a practical and inspiring
                      way, we would love to hear from you.
                    </p>

                    <div className="feature-grid" style={{ marginTop: "18px" }}>
                      {courseOptions.map((item) => (
                        <div className="feature-item" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>

                    <div
                      className="contact-lines"
                      style={{ marginTop: "20px" }}
                    >
                      <div>
                        <strong>Email:</strong> {academy.email}
                      </div>
                      <div>
                        <strong>Phone 1:</strong> {academy.phone1}
                      </div>
                      <div>
                        <strong>Phone 2:</strong> {academy.phone2}
                      </div>
                      <div>
                        <strong>Location:</strong> {academy.address}
                      </div>
                    </div>

                    <div className="contact-submit-row" style={{ marginTop: "20px" }}>
                      <a
                        href={googleLocationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-glass"
                      >
                        Open Google Location
                      </a>
                    </div>
                  </div>
                </article>

                <article className="contact-card reveal">
                  <div className="contact-card-glow" />
                  <div className="contact-inner">
                    <span className="contact-label">Teacher Application</span>
                    <h3>Apply as Teacher</h3>
                    <p className="contact-intro">
                      Fill the official teacher application form to apply for
                      teaching opportunities at Stithpragya Music Academy.
                    </p>

                    <div className="contact-submit-row">
                      <a
                        href={teacherFormLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-gold"
                      >
                        Apply as Teacher
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {activePage === "contact" && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Contact</span>
                <h2>Get course details and admission guidance</h2>
                <p>
                  Contact Stithpragya Music Academy for admissions, course
                  information, demo classes, and learning guidance.
                </p>
              </div>

              <div className="contact-grid">
                <article className="contact-card reveal">
                  <div className="contact-card-glow" />
                  <div className="contact-inner">
                    <span className="contact-label">Get in touch</span>
                    <h3>Stithpragya Music Academy</h3>
                    <p className="contact-intro">
                      Reach out for class details, course guidance, or admission
                      support. We will help you choose the right program.
                    </p>

                    <div className="contact-lines">
                      <div>
                        <strong>Phone 1:</strong> {academy.phone1}
                      </div>
                      <div>
                        <strong>Phone 2:</strong> {academy.phone2}
                      </div>
                      <div>
                        <strong>Email:</strong> {academy.email}
                      </div>
                      <div>
                        <strong>Location:</strong> {academy.address}
                      </div>
                    </div>

                    <div className="contact-action-grid">
                      <a
                        href={`tel:${academy.phone1.replace(/\s+/g, "")}`}
                        className="contact-action-btn"
                      >
                        Call Now
                      </a>
                      <a
                        href={`https://wa.me/${academy.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-action-btn"
                      >
                        Open WhatsApp
                      </a>
                      <a
                        href={academy.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-action-btn"
                      >
                        Instagram
                      </a>
                      <a
                        href={academy.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-action-btn"
                      >
                        YouTube
                      </a>
                      <a
                        href={googleLocationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-action-btn"
                      >
                        Google Location
                      </a>
                    </div>
                  </div>
                </article>

                <article className="contact-card reveal">
                  <div className="contact-card-glow" />
                  <div className="contact-inner">
                    <span className="contact-label">Admission Form</span>
                    <h3>Apply for Admission</h3>
                    <p className="contact-intro">
                      Fill the official student admission form to enroll in your
                      preferred course and learning mode.
                    </p>

                    <div className="contact-submit-row">
                      <a
                        href={studentFormLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-gold"
                      >
                        Fill Student Form
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {activePage === "admin-media" && hiddenPortalUnlocked && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Admin Media Panel</span>
                <h2>Manage Media Links</h2>
                <p>
                  Add YouTube videos and Instagram reels/posts from here. This
                  portal is password protected.
                </p>
              </div>

              {!adminUnlocked ? (
                <div className="contact-grid">
                  <article className="contact-card reveal">
                    <div className="contact-card-glow" />
                    <div className="contact-inner">
                      <span className="contact-label">Protected Access</span>
                      <h3>Enter Admin Password</h3>

                      <input
                        className="field"
                        type="password"
                        placeholder="Enter Password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />

                      <div className="contact-submit-row">
                        <button
                          type="button"
                          className="btn btn-gold"
                          onClick={verifyAdminPassword}
                        >
                          Open Admin Portal
                        </button>

                        <button
                          type="button"
                          className="btn btn-glass"
                          onClick={lockAdminPortal}
                        >
                          Back to Hidden Portal
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ) : (
                <div className="contact-grid">
                  <article className="contact-card reveal">
                    <div className="contact-card-glow" />
                    <div className="contact-inner">
                      <span className="contact-label">Add Media</span>
                      <h3>New Media Link</h3>

                      <form onSubmit={addMediaItem}>
                        <select
                          className="field"
                          value={adminForm.type}
                          onChange={(e) =>
                            setAdminForm({ ...adminForm, type: e.target.value })
                          }
                        >
                          <option value="youtube">YouTube</option>
                          <option value="instagram">Instagram</option>
                        </select>

                        <input
                          className="field"
                          type="text"
                          placeholder="Media Title"
                          value={adminForm.title}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              title: e.target.value,
                            })
                          }
                        />

                        <input
                          className="field"
                          type="text"
                          placeholder="Paste YouTube / Instagram Link"
                          value={adminForm.url}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              url: e.target.value,
                            })
                          }
                        />

                        <div className="contact-submit-row">
                          <button type="submit" className="btn btn-gold">
                            Add Media
                          </button>

                          <button
                            type="button"
                            className="btn btn-glass"
                            onClick={lockAdminPortal}
                          >
                            Lock Portal
                          </button>
                        </div>
                      </form>
                    </div>
                  </article>

                  <article className="contact-card reveal">
                    <div className="contact-card-glow" />
                    <div className="contact-inner">
                      <span className="contact-label">Added Media</span>
                      <h3>Manage Existing Items</h3>

                      <div className="social-cards">
                        {mediaItems.length === 0 ? (
                          <div className="social-card">
                            <span>Status</span>
                            <strong>No media added yet</strong>
                          </div>
                        ) : (
                          mediaItems.map((item) => (
                            <div className="social-card" key={item.id}>
                              <span>{item.type}</span>
                              <strong>{item.title}</strong>

                              <div className="button-row">
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-glass small"
                                >
                                  Open
                                </a>
                                <button
                                  type="button"
                                  className="btn btn-gold small"
                                  onClick={() => deleteMediaItem(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              )}
            </section>
          )}

          {activePage === "admin-portal" && hiddenPortalUnlocked && (
            <section className="section reveal">
              <div className="section-head">
                <span className="pill">Hidden Admin Portal</span>
                <h2>Stithpragya Control Dashboard</h2>
                <p>
                  This private portal is for managing student forms, teacher
                  forms, sheets, media controls, and live dashboard analytics.
                </p>
              </div>

              <div className="grid-2">
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Student Controls</h3>
                  <div className="button-row">
                    <a
                      href={studentFormLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-gold"
                    >
                      Open Student Form
                    </a>

                    <a
                      href={studentSheetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-glass"
                    >
                      Open Student Sheet
                    </a>
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Teacher Controls</h3>
                  <div className="button-row">
                    <a
                      href={teacherFormLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-gold"
                    >
                      Open Teacher Form
                    </a>

                    <a
                      href={teacherSheetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-glass"
                    >
                      Open Teacher Sheet
                    </a>
                  </div>
                </article>
              </div>

              <div className="grid-2" style={{ marginTop: "24px" }}>
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Admin Media Control</h3>
                  <p>
                    Use this panel to manage YouTube videos, Instagram media,
                    and admin media controls.
                  </p>

                  <div className="button-row">
                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() => goToPage("admin-media")}
                    >
                      Open Admin Media
                    </button>

                    <button
                      type="button"
                      className="btn btn-glass"
                      onClick={refreshDashboardData}
                    >
                      Refresh Data
                    </button>
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Dashboard Overview</h3>
                  <p>
                    Student and teacher sheets are connected. Auto refresh is
                    enabled.
                  </p>
                  <div className="feature-grid" style={{ marginTop: "18px" }}>
                    <div className="feature-item">
                      {dashboardLoading
                        ? "Loading data..."
                        : "Dashboard connected"}
                    </div>
                    <div className="feature-item">
                      Student Tab: {STUDENT_TAB_NAME}
                    </div>
                    <div className="feature-item">
                      Teacher Tab: {TEACHER_TAB_NAME}
                    </div>
                    <div className="feature-item">
                      Last Sync: {lastDashboardSync || "Not synced yet"}
                    </div>
                  </div>
                </article>
              </div>

              <div className="grid-3" style={{ marginTop: "24px" }}>
                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Total Students</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {studentRows.length}
                  </p>
                </article>

                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Total Teachers</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {teacherRows.length}
                  </p>
                </article>

                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Total Responses</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {studentRows.length + teacherRows.length}
                  </p>
                </article>
              </div>

              <div className="grid-3" style={{ marginTop: "24px" }}>
                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Student Rating</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {avgStudentRating} / 5
                  </p>
                </article>

                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Teacher Rating</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {avgTeacherRating} / 5
                  </p>
                </article>

                <article className="glass-card info-card panel-tilt reveal">
                  <h3>Overall Rating</h3>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginTop: "12px",
                    }}
                  >
                    {overallRating} / 5
                  </p>
                </article>
              </div>

              <div className="grid-2" style={{ marginTop: "24px" }}>
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Course Analytics</h3>
                  <div style={{ marginTop: "18px" }}>
                    {renderMiniBarChart(combinedCourseCounts, maxCourseCount)}
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Mode-wise Counts</h3>
                  <div style={{ marginTop: "18px" }}>
                    {renderMiniBarChart(combinedModeCounts, maxModeCount)}
                  </div>
                </article>
              </div>

              <div className="grid-2" style={{ marginTop: "24px" }}>
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Recent Student Submissions</h3>
                  <div className="feature-grid" style={{ marginTop: "18px" }}>
                    {recentStudents.length === 0 ? (
                      <div className="feature-item">
                        No student submissions found
                      </div>
                    ) : (
                      recentStudents.map((entry, index) => (
                        <div
                          className="feature-item"
                          key={`${entry.name}-${index}`}
                        >
                          {entry.name}
                          {entry.extra ? ` - ${entry.extra}` : ""}
                          {entry.rating ? ` - Rating: ${entry.rating}` : ""}
                          {entry.timestamp
                            ? ` - ${formatDate(entry.timestamp)}`
                            : ""}
                        </div>
                      ))
                    )}
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Recent Teacher Submissions</h3>
                  <div className="feature-grid" style={{ marginTop: "18px" }}>
                    {recentTeachers.length === 0 ? (
                      <div className="feature-item">
                        No teacher submissions found
                      </div>
                    ) : (
                      recentTeachers.map((entry, index) => (
                        <div
                          className="feature-item"
                          key={`${entry.name}-${index}`}
                        >
                          {entry.name}
                          {entry.extra ? ` - ${entry.extra}` : ""}
                          {entry.rating ? ` - Rating: ${entry.rating}` : ""}
                          {entry.timestamp
                            ? ` - ${formatDate(entry.timestamp)}`
                            : ""}
                        </div>
                      ))
                    )}
                  </div>
                </article>
              </div>

              <div className="grid-2" style={{ marginTop: "24px" }}>
                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Export Data</h3>
                  <p>Download CSV files that can be opened in Excel.</p>
                  <div className="button-row" style={{ marginTop: "18px" }}>
                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() => exportCsv(studentRows, "students.csv")}
                    >
                      Export Students
                    </button>
                    <button
                      type="button"
                      className="btn btn-glass"
                      onClick={() => exportCsv(teacherRows, "teachers.csv")}
                    >
                      Export Teachers
                    </button>
                  </div>
                </article>

                <article className="glass-card content-card panel-tilt reveal">
                  <h3>Portal Status</h3>
                  <div className="feature-grid" style={{ marginTop: "18px" }}>
                    <div className="feature-item">Student Form Linked</div>
                    <div className="feature-item">Teacher Form Linked</div>
                    <div className="feature-item">Spreadsheet Linked</div>
                    <div className="feature-item">Admin Media Protected</div>
                    <div className="feature-item">
                      Auto Refresh: {AUTO_REFRESH_MS / 1000}s
                    </div>
                  </div>
                </article>
              </div>

              <div
                className="contact-submit-row"
                style={{ marginTop: "24px" }}
              >
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={closeHiddenPortal}
                >
                  Close Hidden Portal
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      {showSuccess && (
        <div className="success-popup">
          <div className="success-popup-inner">
            <div className="success-icon">✓</div>
            <div>
              <strong>{successText}</strong>
              <p>Your request has been completed.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              {renderLogo("footer-logo-image", "Academy Logo")}
            </div>

            <div>
              <p>{academy.name}</p>
              <div className="footer-sub">Learn • Practice • Perform</div>
            </div>
          </div>

          <div className="footer-links">
            {pages
              .filter(
                (page) => page !== "admin-portal" && page !== "admin-media"
              )
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                >
                  {getPageLabel(page)}
                </button>
              ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;