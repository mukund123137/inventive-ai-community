/* @ds-bundle: {"format":3,"namespace":"InventiveAIDesignSystem_6f2f88","components":[],"sourceHashes":{"collateral-app.jsx":"38a2615bc4ee","collateral-atoms.jsx":"71e8351c61f0","collateral-comparison-carousel.jsx":"705ff8b2adfc","collateral-pieces.jsx":"74d31417766f","design-canvas.jsx":"bd8746af6e58","ui_kits/inventive-app/atoms.jsx":"33a97fad3c02","ui_kits/inventive-app/chrome.jsx":"c80fead0d97c","ui_kits/inventive-app/composites.jsx":"c145df157d26"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.InventiveAIDesignSystem_6f2f88 = window.InventiveAIDesignSystem_6f2f88 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// collateral-app.jsx
try { (() => {
/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
   Hero, LinkedIn, Square, PullQuote, StatCard,
   Comparison, Carousel1, Carousel2, Carousel3, Carousel4, Carousel5 */

function App() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "hero-social",
    title: "Hero & Social",
    subtitle: "Blog cover + share cards"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "hero",
    label: "Blog hero \xB7 1200\xD7630",
    width: 1200,
    height: 630
  }, /*#__PURE__*/React.createElement(Hero, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "linkedin",
    label: "LinkedIn share \xB7 1200\xD7627",
    width: 1200,
    height: 627
  }, /*#__PURE__*/React.createElement(LinkedIn, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "square",
    label: "Square social \xB7 1080\xD71080",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Square, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "quote",
    label: "Pull-quote \xB7 1080\xD71080",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(PullQuote, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "stats",
    title: "Stat Callouts",
    subtitle: "Drop-in numbers for posts & ads \xB7 540\xD7360"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s1",
    label: "10\xD7 faster",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "10",
    unit: "\xD7",
    label: "First-draft speed",
    caption: "Drafts produced up to ten times faster than manual responses."
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s2",
    label: "95% accuracy",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "95",
    unit: "%",
    label: "Draft accuracy",
    caption: "Context-aware answers drawn from your own approved content."
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s3",
    label: "90% faster",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "90",
    unit: "%",
    label: "Faster responses",
    caption: "AI-native platforms report up to 90% faster RFP turnaround.",
    accent: "var(--i-mandarin)"
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s4",
    label: "70% efficiency",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "70",
    unit: "%+",
    label: "Efficiency gains",
    caption: "Customers cite more than 70% efficiency gains in their workflows.",
    accent: "var(--i-forest)"
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s5",
    label: "50% win rate",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "50",
    unit: "%",
    label: "Higher win rates",
    caption: "Up to 50% higher win rates reported across reviewing teams."
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "s6",
    label: "4.5 on G2",
    width: 540,
    height: 360
  }, /*#__PURE__*/React.createElement(StatCard, {
    num: "4.5",
    unit: "/5",
    label: "Rated on G2",
    caption: "#1 for ease of use, with a 100% adoption rate among reviewers.",
    accent: "var(--i-sky)"
  }))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comparison",
    title: "Comparison",
    subtitle: "AI-native vs. legacy tools"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "cmp",
    label: "Comparison table \xB7 1240\xD7880",
    width: 1240,
    height: 880
  }, /*#__PURE__*/React.createElement(Comparison, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "carousel",
    title: "LinkedIn Carousel",
    subtitle: "5-slide swipe deck \xB7 1080\xD71080"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c1",
    label: "01 \xB7 Hook",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Carousel1, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c2",
    label: "02 \xB7 What it does",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Carousel2, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c3",
    label: "03 \xB7 The numbers",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Carousel3, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c4",
    label: "04 \xB7 Governance",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Carousel4, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c5",
    label: "05 \xB7 How to choose",
    width: 1080,
    height: 1080
  }, /*#__PURE__*/React.createElement(Carousel5, null))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "collateral-app.jsx", error: String((e && e.message) || e) }); }

// collateral-atoms.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

/* ---------------------------------------------------------------
   Shared atoms / motifs for the Inventive AI blog collateral
   Simple shapes only — no hand-drawn illustration.
----------------------------------------------------------------*/

function Wordmark({
  size = 20,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "wm",
    style: {
      fontSize: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "The\xA0Buyer's\xA0", /*#__PURE__*/React.createElement("span", {
    className: "ai"
  }, "Guide"));
}
function Line({
  w = "100%",
  h = 9,
  c = "var(--gray-200)",
  r = 4,
  mb = 9
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      background: c,
      borderRadius: r,
      marginBottom: mb
    }
  });
}

/* Abstract "reads the RFP → drafts answers" motif. */
function DocFlow({
  scale = 1
}) {
  const s = n => n * scale;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: s(26),
      transform: "rotate(-1.5deg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "paper",
    style: {
      width: s(190),
      padding: s(18),
      borderRadius: s(12)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: s(9),
      marginBottom: s(16)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "chip rfp",
    style: {
      width: s(30),
      height: s(30),
      borderRadius: s(7),
      fontSize: s(10)
    }
  }, "RFP"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: s(12),
      color: "var(--gray-800)"
    }
  }, "Security Review"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: s(10),
      color: "var(--gray-500)",
      fontFamily: "var(--font-mono)"
    }
  }, "42 questions"))), /*#__PURE__*/React.createElement(Line, {
    w: "92%",
    h: s(7),
    mb: s(8)
  }), /*#__PURE__*/React.createElement(Line, {
    w: "100%",
    h: s(7),
    mb: s(8)
  }), /*#__PURE__*/React.createElement(Line, {
    w: "74%",
    h: s(7),
    c: "var(--i-mandarin-200)",
    mb: s(8)
  }), /*#__PURE__*/React.createElement(Line, {
    w: "88%",
    h: s(7),
    mb: s(8)
  }), /*#__PURE__*/React.createElement(Line, {
    w: "60%",
    h: s(7),
    mb: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: s(8)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grad-copilot",
    style: {
      width: s(46),
      height: s(46),
      borderRadius: s(13),
      display: "grid",
      placeItems: "center",
      boxShadow: "0 8px 20px -6px rgba(160,132,232,.55)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: s(22),
    height: s(22),
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: s(9),
      letterSpacing: ".08em",
      color: "var(--gray-500)",
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, "Context\xA0Engine")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: s(12)
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "paper",
    style: {
      width: s(216),
      padding: `${s(13)}px ${s(14)}px`,
      borderRadius: s(11),
      display: "flex",
      gap: s(11),
      alignItems: "flex-start",
      marginLeft: i === 1 ? s(14) : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tick",
    style: {
      width: s(22),
      height: s(22),
      fontSize: s(12)
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingTop: s(2)
    }
  }, /*#__PURE__*/React.createElement(Line, {
    w: "100%",
    h: s(6),
    mb: s(7)
  }), /*#__PURE__*/React.createElement(Line, {
    w: "70%",
    h: s(6),
    mb: 0,
    c: "var(--gray-100)"
  }))))));
}

/* Small label used above stat numbers */
function MicroLabel({
  children,
  color = "var(--gray-500)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".12em",
      fontWeight: 600,
      fontSize: 12,
      color
    }
  }, children);
}
Object.assign(window, {
  Wordmark,
  Line,
  DocFlow,
  MicroLabel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "collateral-atoms.jsx", error: String((e && e.message) || e) }); }

// collateral-comparison-carousel.jsx
try { (() => {
/* global React, Wordmark, MicroLabel */

/* ===================== COMPARISON GRAPHIC (1240×880) ===================== */
function Comparison() {
  const rows = [["Core approach", "Content library with AI plug-ins bolted on top", "AI-native, built around an autonomous Context Engine"], ["Drafting speed", "Faster than manual, but still heavy editing", "10× faster drafts at around 95% accuracy"], ["Document intake", "Manual import and tagging", "Auto-\u201Cshreds\u201D RFPs & security questionnaires for requirements"], ["Content governance", "Scheduled reviews — finding conflicts stays manual", "AI auto-detects conflicts & stale answers, with human approval"], ["Best fit", "Large enterprises with a dedicated content manager", "Teams that want speed without library maintenance"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1240,
      height: 880,
      padding: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 38
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 13,
      marginBottom: 18
    }
  }, "At a glance"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 46
    }
  }, "AI-native vs. legacy RFP tools")), /*#__PURE__*/React.createElement(Wordmark, {
    size: 18,
    style: {
      marginBottom: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "250px 1fr 1fr",
      gap: 0,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 19,
      color: "var(--gray-700)"
    }
  }, "Legacy tools"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--gray-400)",
      marginTop: 3,
      fontWeight: 500
    }
  }, "Responsive \xB7 Loopio")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 26px",
      background: "var(--primary-500)",
      borderRadius: "12px 12px 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 19,
      color: "#fff"
    }
  }, "AI-native platforms"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--primary-100)",
      marginTop: 3,
      fontWeight: 500
    }
  }, "AI-native Context Engine"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border)"
    }
  }, rows.map(([cap, legacy, inv], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "250px 1fr 1fr",
      alignItems: "stretch",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 0",
      display: "flex",
      alignItems: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 17,
      color: "var(--gray-900)"
    }
  }, cap), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 26px",
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      color: "var(--gray-500)",
      lineHeight: 1.4
    }
  }, legacy), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 26px",
      display: "flex",
      alignItems: "center",
      gap: 13,
      fontSize: 16,
      color: "var(--gray-800)",
      lineHeight: 1.4,
      background: "var(--primary-50)",
      borderLeft: "1px solid var(--primary-100)",
      borderRight: "1px solid var(--primary-100)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick",
    style: {
      width: 24,
      height: 24,
      fontSize: 13
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, inv))))));
}

/* ===================== LINKEDIN CAROUSEL (1080×1080 ×5) ===================== */
function Slide({
  idx,
  children,
  bg = "#fff",
  footerLight
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1080,
      height: 1080,
      padding: 88,
      display: "flex",
      flexDirection: "column",
      background: bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      zIndex: 1
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 1
    }
  }, footerLight ? /*#__PURE__*/React.createElement("span", {
    className: "wm",
    style: {
      fontSize: 18,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "The\xA0Buyer's\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-400)"
    }
  }, "Guide")) : /*#__PURE__*/React.createElement(Wordmark, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      letterSpacing: ".1em",
      color: footerLight ? "var(--primary-200)" : "var(--gray-400)",
      fontWeight: 600
    }
  }, String(idx).padStart(2, "0"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, " / 05"))));
}
function NumberPoint({
  n,
  title,
  body
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      color: "var(--primary-500)",
      width: 44,
      flex: "none"
    }
  }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 28,
      color: "var(--gray-900)",
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "lede",
    style: {
      fontSize: 19
    }
  }, body)));
}
function Carousel1() {
  return /*#__PURE__*/React.createElement(Slide, {
    idx: 1
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 440,
      height: 440,
      background: "var(--i-perrywinkle)",
      top: -120,
      right: -130,
      opacity: 0.32
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 15,
      marginBottom: 28
    }
  }, "RFP automation in 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "disp",
    style: {
      fontSize: 76
    }
  }, "Stop rewriting", /*#__PURE__*/React.createElement("br", null), "the ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-500)"
    }
  }, "same answers.")), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 24,
      marginTop: 30,
      maxWidth: 640
    }
  }, "Responding to RFPs has always been one of sales' biggest time sinks. It no longer has to be. Here's how the best tools change the math. \u2192"));
}
function Carousel2() {
  return /*#__PURE__*/React.createElement(Slide, {
    idx: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 15,
      marginBottom: 34
    }
  }, "What the software actually does"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(NumberPoint, {
    n: "1",
    title: "Reads the document",
    body: "Shreds an incoming RFP or security questionnaire to pull out every requirement, question, and deadline \u2014 before anyone opens the file."
  }), /*#__PURE__*/React.createElement(NumberPoint, {
    n: "2",
    title: "Drafts from your content",
    body: "Writes first-pass answers using your previously approved responses, documents, and trusted sources \u2014 in your voice, not boilerplate."
  }), /*#__PURE__*/React.createElement(NumberPoint, {
    n: "3",
    title: "Keeps answers accurate",
    body: "Flags responses that have grown outdated or contradict each other, so the knowledge base stays trustworthy over time."
  })));
}
function Carousel3() {
  const stats = [["10×", "faster first drafts"], ["~95%", "draft accuracy"], ["90%", "faster responses"], ["50%", "higher win rates"]];
  return /*#__PURE__*/React.createElement(Slide, {
    idx: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 420,
      height: 420,
      background: "var(--i-mandarin)",
      bottom: -160,
      left: -140,
      opacity: 0.16
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 15,
      marginBottom: 30
    }
  }, "The numbers"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 50,
      marginBottom: 44,
      maxWidth: 640
    }
  }, "What AI-native automation delivers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: "paper",
    style: {
      padding: "30px 32px",
      borderRadius: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat",
    style: {
      fontSize: 76
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      color: "var(--gray-600)",
      marginTop: 10,
      fontWeight: 500
    }
  }, l)))));
}
function Carousel4() {
  return /*#__PURE__*/React.createElement(Slide, {
    idx: 4,
    bg: "var(--primary-900)",
    footerLight: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 500,
      height: 500,
      background: "var(--i-perrywinkle)",
      top: -180,
      right: -160,
      opacity: 0.26
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 15,
      marginBottom: 28,
      color: "var(--primary-300)"
    }
  }, "The real differentiator"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 58,
      color: "#fff",
      maxWidth: 720
    }
  }, "Governance is what", /*#__PURE__*/React.createElement("br", null), "separates the leaders."), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 22,
      marginTop: 26,
      marginBottom: 44,
      color: "var(--primary-100)",
      maxWidth: 700
    }
  }, "Most tools remind you to review your content. The best ones tell you what to review."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "26px 28px",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,.16)",
      background: "rgba(255,255,255,.04)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--primary-300)",
      marginBottom: 12,
      fontWeight: 600
    }
  }, "Legacy"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      color: "#fff",
      fontWeight: 500,
      lineHeight: 1.35
    }
  }, "Reminds you a review is due \u2014 a person still hunts for what's stale.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "26px 28px",
      borderRadius: 16,
      background: "var(--grad-copilot)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.85)",
      marginBottom: 12,
      fontWeight: 600
    }
  }, "AI-native"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      color: "#fff",
      fontWeight: 600,
      lineHeight: 1.35
    }
  }, "Surfaces conflicts & outdated answers automatically \u2014 you keep the sign-off."))));
}
function Carousel5() {
  const items = [["Speed of turnaround", "If response time is the bottleneck, AI-native drafting wins."], ["Content ownership", "No dedicated manager? Pick a tool that detects stale answers for you."], ["Integrations", "It should connect to your CRM, docs, and chat to stay current at the source."], ["Bid complexity", "Compliance-heavy proposals benefit most from automatic analysis."]];
  return /*#__PURE__*/React.createElement(Slide, {
    idx: 5
  }, /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 15,
      marginBottom: 28
    }
  }, "How to choose"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 50,
      marginBottom: 38,
      maxWidth: 640
    }
  }, "Four questions before you commit"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, items.map(([t, b]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick",
    style: {
      width: 28,
      height: 28,
      fontSize: 14,
      marginTop: 2
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 22,
      color: "var(--gray-900)"
    }
  }, t, ". "), /*#__PURE__*/React.createElement("span", {
    className: "lede",
    style: {
      fontSize: 20
    }
  }, b))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      padding: "22px 28px",
      borderRadius: 16,
      background: "var(--primary-50)",
      border: "1px solid var(--primary-100)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 22,
      color: "var(--primary-700)"
    }
  }, "Read the full 2026 buyer's guide"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 16,
      color: "var(--primary-500)",
      fontWeight: 600
    }
  }, "Read the full guide \u2192")));
}
Object.assign(window, {
  Comparison,
  Carousel1,
  Carousel2,
  Carousel3,
  Carousel4,
  Carousel5
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "collateral-comparison-carousel.jsx", error: String((e && e.message) || e) }); }

// collateral-pieces.jsx
try { (() => {
/* global React, Wordmark, Line, DocFlow, MicroLabel */

/* ============================ BLOG HERO (1200×630) ============================ */
function Hero() {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1200,
      height: 630,
      padding: 72,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 380,
      height: 380,
      background: "var(--i-perrywinkle)",
      top: -150,
      right: -110,
      opacity: 0.35
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 600px",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 19,
    style: {
      marginBottom: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 13,
      marginBottom: 22
    }
  }, "The 2026 Buyer's Guide"), /*#__PURE__*/React.createElement("h1", {
    className: "disp",
    style: {
      fontSize: 64
    }
  }, "The best tools to", /*#__PURE__*/React.createElement("br", null), "automate ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-500)"
    }
  }, "RFPs")), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 20,
      marginTop: 24,
      maxWidth: 500
    }
  }, "AI-native software reads the document, drafts accurate answers from your own content, and keeps it trustworthy \u2014 cutting response time by up to 90%."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      letterSpacing: ".06em",
      color: "var(--gray-400)"
    }
  }, "2026 \xB7 RFP Buyer's Guide")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(DocFlow, {
    scale: 0.92
  })));
}

/* ====================== LINKEDIN SHARE CARD (1200×627) ====================== */
function LinkedIn() {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1200,
      height: 627,
      padding: 76,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: "var(--gray-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 96,
      bottom: 96,
      width: 6,
      background: "var(--primary-500)",
      borderRadius: "0 4px 4px 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "k",
    style: {
      fontSize: 14,
      marginBottom: 26
    }
  }, "Governance > Speed"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 58,
      maxWidth: 920,
      lineHeight: 1.06
    }
  }, "Speed without accuracy just lets you send the\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-500)"
    }
  }, "wrong answer faster.")), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 21,
      marginTop: 28,
      maxWidth: 780
    }
  }, "The RFP tool that wins in 2026 isn't the one that drafts fastest \u2014 it's the one that flags stale and conflicting answers before you send them."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  })));
}

/* ========================= SQUARE SOCIAL (1080×1080) ========================= */
function Square() {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1080,
      height: 1080,
      padding: 84,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 460,
      height: 460,
      background: "var(--i-mandarin)",
      bottom: -180,
      right: -150,
      opacity: 0.18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    className: "k plain",
    style: {
      fontSize: 14
    }
  }, "2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(MicroLabel, null, "AI-native RFP automation"), /*#__PURE__*/React.createElement("div", {
    className: "stat",
    style: {
      fontSize: 280,
      marginTop: 8
    }
  }, "10", /*#__PURE__*/React.createElement("span", {
    className: "unit",
    style: {
      fontSize: 150
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("h3", {
    className: "disp",
    style: {
      fontSize: 52,
      marginTop: 4
    }
  }, "faster first drafts."), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 22,
      marginTop: 22,
      maxWidth: 560
    }
  }, "A Context Engine reads your RFP and writes tailored answers from your own documents \u2014 at around 95% accuracy.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(MiniStat, {
    n: "~95%",
    l: "accuracy"
  }), /*#__PURE__*/React.createElement(MiniStat, {
    n: "90%",
    l: "faster responses"
  }), /*#__PURE__*/React.createElement(MiniStat, {
    n: "50%",
    l: "higher win rates"
  })));
}
function MiniStat({
  n,
  l
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "paper",
    style: {
      flex: 1,
      padding: "18px 22px",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat",
    style: {
      fontSize: 38
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--gray-500)",
      marginTop: 6,
      fontWeight: 500
    }
  }, l));
}

/* ========================= PULL QUOTE (1080×1080) ========================= */
function PullQuote() {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 1080,
      height: 1080,
      padding: 92,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: "var(--primary-900)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb",
    style: {
      width: 520,
      height: 520,
      background: "var(--i-perrywinkle)",
      top: -160,
      left: -160,
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 200,
      lineHeight: 0.6,
      color: "var(--primary-400)",
      height: 110,
      position: "relative",
      zIndex: 1
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 60,
      color: "#fff",
      position: "relative",
      zIndex: 1,
      maxWidth: 880
    }
  }, "The teams winning more bids automated the repetitive work \u2014 and ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--i-peach)"
    }
  }, "protected the decisions that need human judgment.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: "flex",
      alignItems: "center",
      gap: 14,
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm",
    style: {
      fontSize: 20,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "The\xA0Buyer's\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-400)"
    }
  }, "Guide")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary-400)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: "var(--primary-200)",
      letterSpacing: ".04em"
    }
  }, "The 2026 Buyer's Guide")));
}

/* ======================= STAT CALLOUT CARD (540×360) ======================= */
function StatCard({
  num,
  unit,
  label,
  caption,
  accent = "var(--primary-500)",
  chip,
  chipColor
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      width: 540,
      height: 360,
      padding: 44,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(MicroLabel, null, label), chip ? /*#__PURE__*/React.createElement("div", {
    className: "chip",
    style: {
      width: 36,
      height: 36,
      background: chipColor,
      fontSize: 11
    }
  }, chip) : null), /*#__PURE__*/React.createElement("div", {
    className: "stat",
    style: {
      fontSize: 132,
      color: accent
    }
  }, num, /*#__PURE__*/React.createElement("span", {
    className: "unit",
    style: {
      fontSize: 64,
      color: "var(--gray-900)"
    }
  }, unit)), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      fontSize: 17,
      maxWidth: 420
    }
  }, caption));
}
Object.assign(window, {
  Hero,
  LinkedIn,
  Square,
  MiniStat,
  PullQuote,
  StatCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "collateral-pieces.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventive-app/atoms.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inventive AI — shared UI atoms for the product kit.
// Exports to window at bottom so sibling Babel scripts can use them.

const {
  useState
} = React;

/* ───────── Icons (Fluent-style outline, hand-drawn SVG stand-ins) ───────── */
const Icon = ({
  d,
  size = 16,
  stroke = 1.6,
  fill,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 20 20",
  fill: fill || "none",
  stroke: fill ? "none" : "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: style
}, typeof d === 'string' ? /*#__PURE__*/React.createElement("path", {
  d: d
}) : d);
const I = {
  home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l7-6 7 6v8a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1V9z"
  })),
  folder: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6a1 1 0 011-1h3.5l2 2H16a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
  })),
  doc: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 3h7l3 3v11a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3v4h3"
  })),
  sparkle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 3l1.4 3.6L15 8l-3.6 1.4L10 13l-1.4-3.6L5 8l3.6-1.4L10 3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 13l.7 1.6L18 15l-1.3.7L16 17l-.7-1.3L14 15l1.3-.4L16 13z"
  })),
  book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h5a3 3 0 013 3v10a2 2 0 00-2-2H4V4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 4h-5a3 3 0 00-3 3v10a2 2 0 012-2h6V4z"
  })),
  users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "8",
    r: "2.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17a5 5 0 0110 0M12 17a4 4 0 016 0"
  })),
  chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 17V9M8 17V5M13 17v-6M18 17V8"
  })),
  gear: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 2v2M10 16v2M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M2 10h2M16 10h2M4.2 15.8l1.5-1.5M14.3 5.7l1.5-1.5"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 13l4 4"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 4v12M4 10h12"
  })),
  chev: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M7 5l5 5-5 5"
  })),
  chevD: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 8l5 5 5-5"
  })),
  send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 10l14-6-6 14-2-6-6-2z"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 15V9a5 5 0 0110 0v6h1l-1 2H5l-1-2h1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 17a2 2 0 004 0"
  })),
  dots: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "10",
    r: "1.2",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "1.2",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "10",
    r: "1.2",
    fill: "currentColor"
  })),
  check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 10l4 4 8-8"
  })),
  star: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 3l2.3 4.7L17 8.5l-3.5 3.4.8 4.8L10 14.5 5.7 16.7l.8-4.8L3 8.5l4.7-.8L10 3z"
  })),
  link: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 12l4-4M7 13a3 3 0 01-4-4l2-2a3 3 0 014 0M13 7a3 3 0 014 4l-2 2a3 3 0 01-4 0"
  })),
  upload: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 13V4M6 8l4-4 4 4M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2"
  }))
};

/* ───────── Button ───────── */
const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  style,
  ...rest
}) => {
  const base = {
    fontFamily: 'Figtree, sans-serif',
    fontWeight: 500,
    borderRadius: 4,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all .15s',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    letterSpacing: '.01em'
  };
  const sizes = {
    sm: {
      padding: '4px 10px',
      fontSize: 12
    },
    md: {
      padding: '8px 14px',
      fontSize: 14
    },
    lg: {
      padding: '10px 18px',
      fontSize: 14
    }
  };
  const variants = {
    primary: {
      background: 'linear-gradient(180deg,#047A9F,#035E7B)',
      color: '#fff',
      borderColor: '#035E7B',
      boxShadow: '0 1px 2px rgba(16,24,40,.05)'
    },
    default: {
      background: 'linear-gradient(180deg,#fff -75%,#f3f4f6 100%)',
      color: '#323739',
      borderColor: '#E5E7EB',
      boxShadow: '0 1px 2px rgba(16,24,40,.05)'
    },
    light: {
      background: '#E0EDF1',
      color: '#047A9F',
      borderColor: '#B7D5DF'
    },
    text: {
      background: 'transparent',
      color: '#047A9F'
    },
    danger: {
      background: '#C2185B',
      color: '#fff',
      borderColor: '#C2185B'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(Icon, {
    d: I[icon],
    size: size === 'sm' ? 14 : 16
  }), children);
};

/* ───────── Badge / Pill ───────── */
const Badge = ({
  tone = 'gray',
  children,
  dot
}) => {
  const tones = {
    gray: ['#F3F5F6', '#636B6E', '#7C8588'],
    review: ['#FFF8E1', '#B37800', '#FFA000'],
    done: ['#E8F5E9', '#2E7D39', '#4CAF59'],
    err: ['#FCE4EC', '#C2185B', '#E91E63'],
    info: ['#EDF5FF', '#326DB5', '#4699FF'],
    ai: ['linear-gradient(90deg,#F1EDFB,#FFEEE7)', '#61508C', '#A084E8']
  };
  const [bg, fg, d] = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 10px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 500,
      background: bg,
      color: fg
    }
  }, dot !== false && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: d
    }
  }), children);
};

/* ───────── Avatar ───────── */
const Avatar = ({
  name = 'AA',
  tone = '#047A9F',
  size = 32
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: size,
    height: size,
    borderRadius: '50%',
    background: tone,
    color: '#fff',
    fontFamily: 'Figtree, sans-serif',
    fontWeight: 600,
    fontSize: size * 0.38,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none'
  }
}, name);

/* ───────── Card shell ─────────
   Cards are flat white with a hairline border; the `tone` prop now only
   hints a solid accent color for icons/badges inside (see KindIcon below).
   Gradients are reserved for AI surfaces. */
const Card = ({
  children,
  style,
  ...rest
}) => {
  const t = {
    borderColor: '#e5e7eb',
    background: '#fff'
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      borderRadius: 4,
      border: '1px solid',
      padding: 16,
      boxShadow: '0 0 1px rgba(29,33,45,.2),0 0 2px rgba(29,33,45,.08),0 2px 4px rgba(29,33,45,.08)',
      ...t,
      ...style
    }
  }), children);
};
Object.assign(window, {
  Icon,
  I,
  Button,
  Badge,
  Avatar,
  Card
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventive-app/atoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventive-app/chrome.jsx
try { (() => {
// Inventive AI — product chrome: sidebar, top bar, and the app frame.

const Sidebar = () => {
  const nav = [{
    icon: 'home',
    label: 'Home'
  }, {
    icon: 'folder',
    label: 'Projects',
    active: true,
    badge: 4
  }, {
    icon: 'book',
    label: 'Knowledge Hub'
  }, {
    icon: 'sparkle',
    label: 'AI Agents'
  }, {
    icon: 'chart',
    label: 'Reports'
  }, {
    icon: 'users',
    label: 'Team'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 228,
      background: '#F9FBFB',
      borderRight: '1px solid #E6E9EA',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Figtree, sans-serif',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 10px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: 'linear-gradient(135deg,#047A9F,#035E7B)',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      fontFamily: 'Red Hat Display',
      fontWeight: 700
    }
  }, "I"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Red Hat Display',
      fontWeight: 700,
      fontSize: 15,
      color: '#191D1F'
    }
  }, "Inventive AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 10px 10px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus",
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, "New Project")), /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: '4px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 10px',
      borderRadius: 4,
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      background: n.active ? '#E0EDF1' : 'transparent',
      color: n.active ? '#035E7B' : '#4A5154'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: I[n.icon],
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, n.label), n.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#D8DDDE',
      color: '#323739',
      fontSize: 10,
      fontWeight: 600,
      padding: '1px 6px',
      borderRadius: 9999
    }
  }, n.badge)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 10,
      borderTop: '1px solid #E6E9EA',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "SK",
    tone: "#047A9F",
    size: 28
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#191D1F'
    }
  }, "Sarah Kim"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7C8588'
    }
  }, "Acme Security")), /*#__PURE__*/React.createElement(Icon, {
    d: I.gear,
    size: 14,
    style: {
      color: '#7C8588'
    }
  })));
};
const TopBar = ({
  title = 'Projects'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    height: 56,
    padding: '0 24px',
    borderBottom: '1px solid #E6E9EA',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#fff',
    flex: 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Red Hat Display',
    fontSize: 18,
    fontWeight: 600,
    color: '#323739',
    letterSpacing: '-.3px'
  }
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    maxWidth: 420,
    marginLeft: 16,
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: I.search,
  size: 14,
  style: {
    position: 'absolute',
    left: 10,
    top: 9,
    color: '#7C8588'
  }
}), /*#__PURE__*/React.createElement("input", {
  placeholder: "Search projects, docs, Q&A\u2026",
  style: {
    width: '100%',
    padding: '7px 10px 7px 30px',
    fontSize: 13,
    border: '1px solid #E5E7EB',
    borderRadius: 4,
    background: '#F9FBFB',
    outline: 'none',
    fontFamily: 'Figtree'
  }
})), /*#__PURE__*/React.createElement(Button, {
  variant: "default",
  size: "sm",
  icon: "upload"
}, "Import"), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: I.bell,
  size: 18,
  style: {
    color: '#4A5154'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#E91E63'
  }
})), /*#__PURE__*/React.createElement(Avatar, {
  name: "SK",
  tone: "#047A9F",
  size: 30
}));
Object.assign(window, {
  Sidebar,
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventive-app/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventive-app/composites.jsx
try { (() => {
// Inventive AI — Project cards, activity row, and Copilot panel.

const KIND_META = {
  rfp: {
    label: 'RFP',
    color: '#FF8800'
  },
  doc: {
    label: 'Document',
    color: '#31A2DA'
  },
  web: {
    label: 'Website',
    color: '#A084E8'
  },
  qna: {
    label: 'Q&A',
    color: '#419C4D'
  }
};
const KindIcon = ({
  tone = 'rfp'
}) => {
  const m = KIND_META[tone] || KIND_META.rfp;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 6,
      background: m.color,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      flex: 'none',
      fontFamily: 'Red Hat Display',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '.04em'
    }
  }, m.label.toUpperCase().slice(0, 3));
};
const ProjectCard = ({
  tone,
  kind,
  title,
  org,
  due,
  status,
  progress,
  people = []
}) => /*#__PURE__*/React.createElement(Card, {
  style: {
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(KindIcon, {
  tone: tone
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginBottom: 4
  }
}, kind), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Red Hat Display',
    fontSize: 15,
    fontWeight: 600,
    color: '#1f2937',
    lineHeight: 1.25
  }
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4
  }
}, org)), /*#__PURE__*/React.createElement(Icon, {
  d: I.dots,
  size: 18,
  style: {
    color: '#6b7280',
    cursor: 'pointer'
  }
})), progress != null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    height: 6,
    background: '#f3f4f6',
    borderRadius: 9999,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    height: '100%',
    width: `${progress}%`,
    background: '#047A9F',
    borderRadius: 9999
  }
})), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 5
  }
}, progress, "% complete")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex'
  }
}, people.map((p, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    marginLeft: i === 0 ? 0 : -8,
    border: '2px solid #fff',
    borderRadius: '50%'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  name: p.name,
  tone: p.tone,
  size: 24
})))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#636B6E'
  }
}, "Due ", due), /*#__PURE__*/React.createElement(Badge, {
  tone: status === 'Delivered' ? 'done' : status === 'In Review' ? 'review' : 'gray'
}, status))));
const ActivityRow = ({
  title,
  meta,
  kind,
  status
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '10px 14px',
    borderBottom: '1px solid #F3F5F6',
    fontFamily: 'Figtree'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: '#F3F5F6',
    display: 'grid',
    placeItems: 'center',
    color: '#636B6E'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: I[kind === 'doc' ? 'doc' : kind === 'web' ? 'link' : 'folder'],
  size: 16
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: '#191D1F'
  }
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7C8588'
  }
}, meta)), /*#__PURE__*/React.createElement(Badge, {
  tone: status === 'Verified' ? 'done' : status === 'Syncing' ? 'info' : 'gray'
}, status));
const CopilotPanel = () => /*#__PURE__*/React.createElement("div", {
  style: {
    width: 320,
    borderLeft: '1px solid #E6E9EA',
    background: 'linear-gradient(138deg,#F8F8FA 2%,#F0EDF8 76%)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Figtree',
    flex: 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderBottom: '1px solid rgba(0,0,0,.05)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: 'linear-gradient(180deg,#A084E8 41%,#FFB764 100%)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: I.sparkle,
  size: 15,
  fill: "#fff"
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Red Hat Display',
    fontSize: 14,
    fontWeight: 600,
    color: '#191D1F'
  }
}, "Copilot"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#61508C'
  }
}, "Drafting with your knowledge base"))), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflow: 'auto'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
    color: '#4A5154',
    lineHeight: 1.5,
    boxShadow: '0 1px 2px rgba(16,24,40,.04)'
  }
}, "I found 3 relevant controls from ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: '#035E7B'
  }
}, "SOC 2 Policies v4"), " that match question 12. Draft inserted \u2014 review the citations before you submit."), /*#__PURE__*/React.createElement("div", {
  style: {
    alignSelf: 'flex-end',
    background: '#047A9F',
    color: '#fff',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 12,
    maxWidth: '80%'
  }
}, "Can you expand the encryption-at-rest answer?"), /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
    color: '#4A5154',
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#A084E8',
    animation: 'pulse 1.2s ease-in-out infinite'
  }
}), "Generating\u2026")), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 12,
    borderTop: '1px solid rgba(0,0,0,.05)',
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    border: '1px solid #D1D5DB',
    borderRadius: 8,
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement("input", {
  placeholder: "Ask Copilot\u2026",
  style: {
    flex: 1,
    border: 0,
    outline: 'none',
    fontSize: 13,
    fontFamily: 'Figtree',
    background: 'transparent'
  }
}), /*#__PURE__*/React.createElement("button", {
  style: {
    width: 26,
    height: 26,
    borderRadius: 6,
    border: 0,
    background: 'linear-gradient(180deg,#A084E8,#FFB764)',
    color: '#fff',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: I.send,
  size: 13,
  fill: "#fff"
})))), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse{0%,100%{opacity:.3;transform:scale(.9)}50%{opacity:1;transform:scale(1.3)}}`));
Object.assign(window, {
  ProjectCard,
  ActivityRow,
  CopilotPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventive-app/composites.jsx", error: String((e && e.message) || e) }); }

})();
