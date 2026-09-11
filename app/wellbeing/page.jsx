"use client";

import Link from "next/link";
import ShowcaseSection from "../../components/detail/ShowcaseSection";
import PillarsSection from "../../components/detail/PillarsSection";
import StatsSection from "../../components/detail/StatsSection";
import MethodologyCarousel from "../../components/detail/MethodologyCarousel";
import FeaturedProjects from "../../components/detail/FeaturedProjects";
import "../../components/detail/detail.css";
import "./wellbeing.css";

const SOLACE_APP_FEATURES = [
  {
    title: "24/7 AI Wellbeing Chatbot & Smart Home Dashboard",
    items: [
      "Interactive Home Dashboard with daily greetings, quotes & streak counters",
      "Floating 24/7 AI Assistant available across all screens for instant guidance",
      "Personalized health tips, workout recommendations & quick tool shortcuts",
      "Universal access across Mobile (iOS / Android) & Web browsers",
    ],
  },
  {
    title: "Smart Vitals Logger & Health Risk Score Engine",
    items: [
      "Interactive wheel-picker to log Heart Rate, Blood Pressure & Blood Sugar",
      "Real-time Weight, Water Intake, Sleep & Mood tracking",
      "Automated BMI Engine & personalized Health Risk Score calculations",
      "Dynamic daily, weekly & monthly health trend history charts",
    ],
  },
  {
    title: "Background Audio Meditation & Global Mini-Player",
    items: [
      "High-quality audio streaming for Meditation, Calming Waves & Sleep Aids",
      "Ambient White Noise & deep relaxation soundscapes",
      "Persistent Global Floating Mini-Player banner across all screens",
      "Listen seamlessly while browsing workouts, vitals, or recipes",
    ],
  },
  {
    title: "Guided Pilates & Interactive Workout Player",
    items: [
      "Categorized fitness library covering Core, Reformer & Mat routines",
      "Step-guided workout video player with built-in timers & controls",
      "Comprehensive exercise completion tracking & fitness history",
      "Suitable for all fitness levels from beginners to advanced users",
    ],
  },
  {
    title: "Nutrition, Macro Tracker & Recipe Guide",
    items: [
      "Daily Calorie Counter with Carbohydrate, Protein & Fat breakdowns",
      "Meal Logger for Breakfast, Lunch, Dinner, Snacks & Hydration goals",
      "Curated library of delicious, healthy chef-crafted recipes",
      "Smart dietary goal tracking for weight management & vitality",
    ],
  },
  {
    title: "1-on-1 Certified Coach Booking & Live Events",
    items: [
      "Search certified wellness experts & schedule 1-on-1 consultations",
      "Integrated calendar for live yoga sessions & wellness webinars",
      "1-Click Event RSVP system with automated reminders",
      "Corporate benefits perks catalogue & support ticketing desk",
    ],
  },
];

const TRAINING_CONSULTATION_MODULES = [
  {
    badge: "GUIDED WORKSHOP",
    title: "Mental Wellbeing & Emotional Resilience Masterclass",
    description: "Interactive live training empowering individuals and groups to manage daily stress triggers, build psychological resilience, and master relaxation techniques.",
    bullets: [
      "Guided Stress Reduction & Anxiety Relief Protocols",
      "Early Burnout Prevention & Daily Energy Management",
      "Interactive Mindful Meditation & Focus Exercises",
    ],
  },
  {
    badge: "1-ON-1 COACHING",
    title: "Personalized Specialist & Wellness Consultations",
    description: "Private 1-on-1 advisory sessions with certified wellness coaches, licensed counselors, and nutrition specialists for tailored health guidance.",
    bullets: [
      "Private 1-on-1 Stress Relief & Mental Clarity Counseling",
      "Personalized Work-Life Balance & Vitality Coaching",
      "Tailored Physical Fitness & Daily Habits Assessment",
    ],
  },
  {
    badge: "MINDFULNESS & BALANCE",
    title: "Mindfulness, Stress Reduction & Inner Harmony",
    description: "Comprehensive guided workshops focusing on deep breathing exercises, mindfulness habits, sleep optimization, and emotional regulation.",
    bullets: [
      "Targeted Stress Management & Calm Mind Protocols",
      "Daily Mindfulness & Emotional Regulation Habits",
      "Holistic Sleep Improvement & Deep Rest Techniques",
    ],
  },
  {
    badge: "POSTURE & MOVEMENT",
    title: "Posture Correction & Active Mobility Workshops",
    description: "Hands-on virtual or live workshops covering daily desk posture correction, movement routines, micro-stretches, and healthy physical habits.",
    bullets: [
      "Personalized Ergonomic & Home Desk Setup Coaching",
      "5-Minute Guided Daily Stretch & Mobility Routines",
      "Active Movement & Daily Energy Management Protocols",
    ],
  },
];

const LANDING_STATS = [
  { number: "20+", label: "Key Health & Fitness Features" },
  { number: "24/7", label: "AI Wellbeing Chatbot Assistant" },
  { number: "100%", label: "Cross-Platform (iOS, Android, Web)" },
  { number: "Vitals Logger", label: "Smart Wheel-Picker & BMI Engine" },
  { number: "Audio Streaming", label: "Meditation & Sleep Mini-Player" },
  { number: "Pilates Studio", label: "Video Routines & Timer Control" },
  { number: "Macro Tracker", label: "Calorie Counter & Healthy Recipes" },
  { number: "1-on-1 Coaches", label: "Certified Expert Consultations" },
];

const ONBOARDING_STEPS = [
  { num: "01", title: "Explore Home Dashboard", desc: "Access daily motivational quotes, streak counters, and quick shortcuts across iOS, Android, or Web." },
  { num: "02", title: "Log Vitals & Calculate BMI", desc: "Use the smart wheel-picker to log Heart Rate, BP, Sugar, Weight, Water & Sleep for your instant Health Risk Score." },
  { num: "03", title: "24/7 AI Wellbeing Assistance", desc: "Ask the floating AI chatbot for instant health advice, workout recommendations, and nutrition guidance anytime." },
  { num: "04", title: "Stream Audio & Pilates", desc: "Play background meditation audio via the global mini-player while following video-guided Pilates workouts." },
  { num: "05", title: "Track Macros & Recipes", desc: "Log your daily meals, monitor Carbs/Protein/Fats, and explore curated healthy recipes." },
  { num: "06", title: "Book Certified Coaches", desc: "Schedule 1-on-1 sessions with wellness experts and RSVP for live webinars & health events with 1 click." },
];

const FEATURED_MODULES = [
  {
    tag: "Mindfulness & Sleep",
    title: "Guided Audio Meditation & Mindfulness Soundscapes",
    desc: "Stream soothing meditation tracks, ambient white noise, and guided breathwork routines via the global floating mini-player.",
    image: "/Wellbeing/smiling-woman-meditates-on-exercise-mat-at-home-2026-03-24-13-58-42-utc.jpg.jpeg",
    link: "/contact-us/",
  },
  {
    tag: "Fitness & Mobility",
    title: "Outdoor Workouts, Pilates & Core Stability Routines",
    desc: "Follow video-guided Core, Reformer, and Mat workouts with interactive timers, kettlebell exercises, and completion tracking.",
    image: "/Wellbeing/woman-doing-push-ups-with-kettlebell-in-sunny-park-2026-03-26-10-32-59-utc.jpg.jpeg",
    link: "/contact-us/",
  },
  {
    tag: "Vitals & Nutrition",
    title: "Heart Health, Smart Vitals & Macro Calorie Engine",
    desc: "Log Heart Rate, Blood Pressure, Blood Sugar, and daily meals to generate real-time Health Risk Scores and personalized dietary guides.",
    image: "/Wellbeing/overhead-view-of-vegetables-and-fruits-on-heart-sh-2026-03-09-01-55-06-utc.jpg.jpeg",
    link: "/contact-us/",
  },
  {
    tag: "Social & Community",
    title: "Healthy Dining, Community Events & Group Webinars",
    desc: "Connect with certified wellness specialists, join live healthy cooking workshops, RSVP for team webinars, and build healthy social habits.",
    image: "/Wellbeing/friends-enjoying-dinner-at-restaurant-together-2026-03-15-23-34-54-utc.jpg.jpeg",
    link: "/contact-us/",
  },
  {
    tag: "Sound Therapy & Focus",
    title: "Binaural Beats, Acoustic Frequency & Deep Focus Music",
    desc: "Immerse yourself in acoustic frequency soundscapes, orchestral relaxation tracks, and binaural beats engineered to improve sleep and focus.",
    image: "/Wellbeing/orchestra-band-practice-in-studio-with-musicians-2026-03-25-09-40-48-utc.jpg.jpeg",
    link: "/contact-us/",
  },
];

export default function WellbeingLandingPage() {
  return (
    <div className="detail-page-wrapper">
      {/* 1. Video Hero Banner */}
      <section className="wellbeing-hero-section">
        <video
          className="wellbeing-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/Woman-Meditating-At-Home.mp4"
        />
        <div className="wellbeing-hero-overlay" />

        <div className="wellbeing-hero-content">
          <span className="wellbeing-subtitle-pill">
            <span style={{ color: "#FFBF43" }}>●</span> SOLACE WELLBEING • COMPLETE HEALTH, FITNESS &amp; MINDFULNESS PLATFORM
          </span>
          <h1 className="wellbeing-hero-title-solid">YOUR PERSONAL WELLBEING</h1>
          <h2 className="wellbeing-hero-title-outlined">Available Anywhere, Anytime</h2>
          
          <p className="wellbeing-hero-description">
            Empowering individuals, families, and organizations with 24/7 AI health advice, smart vitals tracking, 
            background audio meditation, guided Pilates workouts, macro nutrition, and certified coach consultations.
          </p>

          <div className="wellbeing-hero-actions">
            <Link href="/contact-us/" className="wellbeing-hero-btn">
              <span>GET STARTED TODAY</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
            <a href="#app-features" className="wellbeing-hero-secondary-btn">
              EXPLORE ALL 20 FEATURES ↓
            </a>
          </div>
        </div>

        <div className="wellbeing-rotating-badge">
          <a href="#app-features">
            <img src="/gasco/epc-badge.svg" alt="Solace Wellbeing Platform" />
          </a>
        </div>
      </section>

      {/* 2. Core Value Proposition Showcase */}
      <ShowcaseSection
        id="app-features"
        pill="100% PRIVATE • ACCESSIBLE TO EVERYONE • CROSS-PLATFORM (iOS/ANDROID/WEB)"
        title="All-in-One Digital Health & Wellness for Everyone"
        paragraphs={[
          "Solace Wellbeing is a comprehensive digital health ecosystem built for anyone—whether you are an individual pursuing daily mindfulness, a fitness enthusiast tracking macros, or a team building a healthy lifestyle.",
          "Seamlessly available across iOS, Android, and Web, Solace combines a 24/7 floating AI chatbot, interactive vitals logger, BMI risk calculator, background audio meditation, and step-guided Pilates video routines.",
          "From daily meal logging and curated healthy recipes to 1-on-1 certified coach consultations and live wellness webinars, Solace gives you everything you need to thrive in one secure platform.",
        ]}
        image="/Wellbeing/friends-enjoying-dinner-at-restaurant-together-2026-03-15-23-34-54-utc.jpg.jpeg"
        imageAlt="Solace Wellbeing Accessible To Everyone"
        ctaText="Explore All Capabilities ↗"
        ctaLink="/contact-us/"
      />

      {/* 3. 6 Core Platform Capabilities */}
      <PillarsSection
        eyebrow="PLATFORM CAPABILITIES"
        title="20 Live Modules & Features in Solace Wellbeing"
        pillars={SOLACE_APP_FEATURES}
      />

      {/* 4. High-Impact Stats Marquee */}
      <StatsSection
        statementHtml={`Solace Wellbeing brings together <span class="highlight">24/7 AI health advice</span>, <span class="highlight">smart vitals logging</span>, <span class="highlight">background meditation audio</span>, and <span class="highlight">guided Pilates workouts</span> in one accessible app.`}
        stats={LANDING_STATS}
      />

      {/* 5. Expert Training & Consultation Section */}
      <section className="wellbeing-training-section">
        <div className="wellbeing-training-container">
          <div className="wellbeing-training-header">
            <span className="wellbeing-training-eyebrow">EXPERT ADVISORY &amp; CAPACITY BUILDING</span>
            <h2 className="wellbeing-training-title">Professional Training &amp; Specialist Consultations</h2>
            <p className="wellbeing-training-subtitle">
              Combine the 24/7 power of the Solace Wellbeing app with live, expert-led workshops, 1-on-1 specialist consultations, and personalized health guidance delivered by certified wellness coaches.
            </p>
          </div>

          <div className="wellbeing-training-grid">
            {TRAINING_CONSULTATION_MODULES.map((item, idx) => (
              <div key={idx} className="wellbeing-training-card">
                <div className="wellbeing-training-card-header">
                  <span className="wellbeing-training-card-badge">{item.badge}</span>
                </div>
                <h3 className="wellbeing-training-card-title">{item.title}</h3>
                <p className="wellbeing-training-card-desc">{item.description}</p>
                <ul className="wellbeing-training-bullets">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <span className="bullet-check">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="wellbeing-training-cta-box">
            <div className="wellbeing-training-cta-content">
              <h3>Ready to Book a Custom Training or Consultation Session?</h3>
              <p>Our certified wellness, fitness, and nutrition experts deliver tailored virtual and live masterclasses worldwide.</p>
            </div>
            <Link href="/contact-us/" className="wellbeing-training-cta-btn">
              <span>SCHEDULE CONSULTATION</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. How It Works - User Journey */}
      <MethodologyCarousel
        eyebrow="EASY USER JOURNEY"
        title="How Solace Wellbeing Works for You"
        desc="Experience a seamless health journey from daily morning check-ins to evening relaxation and expert coaching."
        steps={ONBOARDING_STEPS}
      />

      {/* 7. Featured Modules Showcase */}
      <FeaturedProjects
        eyebrow="CORE MODULE HIGHLIGHTS"
        title="Featured App Capabilities"
        projects={FEATURED_MODULES}
      />
    </div>
  );
}
