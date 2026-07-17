// ---------------------------------------------------------------------------
// Central content source for the OASIS Foundation site.
// Kept separate from components so copy can be edited by non-developers
// (or swapped for a CMS fetch later) without touching layout code.
// ---------------------------------------------------------------------------

export const site = {
  name: "OASIS",
  fullName: "OASIS Foundation",
  tagline: "Empowering Pakistan's Next Generation",
  description:
    "OASIS is a volunteer-driven student movement connecting Pakistani youth, teaching free skills, and empowering the next generation of Pakistan.",
  founded: "May 24, 2026",
  url: "https://oasisfoundation.net",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Mission", href: "#mission" },
  { label: "Approach", href: "#approach" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export const heroCopy = {
  eyebrow: "Igniting the next generation",
  headline: ["Empower.", "Lead.", "Serve."],
  sub: "Oasis Foundation gives you the ultimate platform to shape the programs and conversations that affect your life. Step up, take charge, and transform your community.",
  primaryCta: { label: "Join the community", href: "#join" },
  secondaryCta: { label: "Discover OASIS", href: "#about" },
  quote:
    "We saw a gap in the system and decided to fill it ourselves. Now we're building a generation that leads, not follows.",
};

export const impactStats = [
  { value: 4, suffix: "", label: "Cities reached", note: "and counting every quarter" },
  { value: 0, prefix: "", suffix: "%", label: "Cost to students", note: "zero fees, ever" },
  { value: 8, suffix: "", label: "Core programs", note: "across skills, ethics & career" },
  { value: 3, suffix: "", label: "Volunteer tracks", note: "mentor, ambassador, creator" },
];

export const pillars = [
  {
    n: "01",
    title: "Youth Empowerment",
    body: "Equipping young people with the confidence, voice, and platforms to take initiative in their own communities and institutes, encouraging active participation.",
    accent: "ember",
  },
  {
    n: "02",
    title: "Women Empowerment",
    body: "Creating dedicated spaces, mentorship opportunities, and programs that support young women in pursuing their education, ambitions, and leadership potential.",
    accent: "bloom",
  },
  {
    n: "03",
    title: "Patriotism",
    body: "Fostering a genuine sense of national pride, civic responsibility, and constructive engagement with our country among the student community.",
    accent: "signal",
  },
  {
    n: "04",
    title: "Youth Welfare",
    body: "Designing and delivering welfare-focused initiatives that address the practical, social, and emotional needs of students across partner institutes.",
    accent: "ember",
  },
  {
    n: "05",
    title: "Skills Development",
    body: "Offering practical training and workshops that build real-world competencies — from communication and leadership to technical and career-oriented skills.",
    accent: "signal",
  },
  {
    n: "06",
    title: "Character & Ethics",
    body: "Providing guidance on ethics, personal integrity, and character development, helping young people navigate the moral and everyday challenges of student life.",
    accent: "bloom",
  },
] as const;

export const tickerItems = [
  "Youth Empowerment",
  "Women Empowerment",
  "Skills Development",
  "Character & Ethics",
  "Patriotism",
  "Community Service",
  "Career Guidance",
  "Tech Literacy",
];

export const approach = {
  intro:
    "Oasis Foundation brings its mission to life through a strategic, two-pronged engagement model: direct learning inside educational institutes and public-facing civic awareness campaigns.",
  tracks: [
    {
      title: "In-Institute Lectures & Sessions",
      body: "We deliver highly interactive lectures, seminars, and practical workshops directly inside schools, colleges, and universities. Tailored collaboratively to the unique requirements of each partner institute, sessions stay timely, relevant, and directly applicable to students' lives.",
    },
    {
      title: "Public Awareness Campaigns",
      body: "Beyond the walls of partner campuses, we launch and manage public-facing awareness campaigns — extending our core messages to drive civic engagement, digital literacy, and community welfare solutions throughout the broader society.",
    },
  ],
  activityAreas: [
    {
      title: "Personal Reflection",
      body: "Sessions that nurture self-awareness, personal growth, emotional maturity, and value-based grounding.",
    },
    {
      title: "Character & Integrity",
      body: "Interactive discussions focused on ethics, personal responsibility, leadership qualities, and personal integrity.",
    },
    {
      title: "Life Lessons",
      body: "Practical wisdom, mental models, and real-world strategies for navigating student life, relationships, and challenges.",
    },
    {
      title: "Career Counseling & Education",
      body: "Comprehensive guidance on academic pathways, professional options, and career planning.",
    },
    {
      title: "Tech Literacy & Opportunities",
      body: "Building digital skills relevant to today's landscape and connecting students with internships, networks, and opportunities.",
    },
  ],
};

export const proofStories = [
  {
    quote:
      "The mentorship track gave me a real project for my portfolio, not just a certificate. That's what got me my first internship interview.",
    name: "Campus Ambassador",
    place: "Lahore",
  },
  {
    quote:
      "I'd never spoken in front of a room before an OASIS workshop. Now I run sessions myself in my own college.",
    name: "Student Volunteer",
    place: "Karachi",
  },
  {
    quote:
      "It's free, it's online-friendly, and nobody is trying to sell me anything. That's rare enough that I stayed.",
    name: "Program Graduate",
    place: "Islamabad",
  },
];

export const founder = {
  name: "Sahibzada Ahmed Raza",
  role: "Founder",
  linkedin: "https://www.linkedin.com/in/ahmed-raza-b79784228/",
  image: "/images/founder.jpg",
};

export const councils = [
  {
    title: "Board of Directors",
    body: "Composed of expert professionals specializing in student affairs, providing institutional guidance, program oversight, and strategic direction for the Foundation's initiatives.",
  },
  {
    title: "Board of Community Leaders",
    body: "Composed of respected community figures and industry leaders, lending real-world credibility, professional networks, and valuable mentorship to the Foundation's work.",
  },
];

export const differentiators = [
  {
    kicker: "Zero",
    title: "Fees. Ever.",
    body: "Every workshop, lecture, and mentorship session is completely free. No premium tiers, no hidden costs.",
    accent: "good",
  },
  {
    kicker: "Direct",
    title: "Campus Access",
    body: "We go where students are. Our sessions happen inside schools, colleges, and universities — not behind a screen.",
    accent: "signal",
  },
  {
    kicker: "Student",
    title: "Led & Owned",
    body: "This isn't a top-down initiative. Students design the programs, run the sessions, and shape the direction.",
    accent: "ember",
  },
];

export const volunteerRoles = [
  {
    title: "Mentor",
    body: "Share your expertise. Teach a skill you're passionate about — from coding to communication. Flexible schedule, massive impact.",
    time: "5 hrs/week",
    load: 45,
  },
  {
    title: "Campus Ambassador",
    body: "Represent OASIS at your university. Organize local meetups, recruit students, and be the face of the movement on your campus.",
    time: "3 hrs/week",
    load: 28,
  },
  {
    title: "Content Creator",
    body: "Design graphics, write blogs, shoot reels, and manage our social media. Help us spread the word and inspire more students.",
    time: "4 hrs/week",
    load: 36,
  },
];

export const cities = [
  { name: "Islamabad", x: 54, y: 34 },
  { name: "Lahore", x: 62, y: 42 },
  { name: "Karachi", x: 32, y: 78 },
  { name: "Peshawar", x: 42, y: 24 },
];

export const faq = [
  {
    q: "Is it really free? What's the catch?",
    a: "Yes, 100% free — no hidden fees, no upsells, no \"premium tier.\" OASIS is funded by volunteer time and occasional sponsors. We believe education is a right, not a product. The only \"catch\" is that we ask graduates to pay it forward by mentoring future cohorts.",
  },
  {
    q: "Do I get a certificate after completing a program?",
    a: "Yes! Every student who completes a program receives a digital certificate of completion. More importantly, you'll have a portfolio of real projects and skills that employers actually care about. Our certificates are recognized by our partner organizations across Pakistan.",
  },
  {
    q: "How can I volunteer or become a mentor?",
    a: "We'd love to have you! Fill out the join form on this page or email us directly. We're looking for mentors (any skill level), campus ambassadors, content creators, and event organizers. No minimum experience required — just a genuine desire to help Pakistan's youth grow.",
  },
  {
    q: "Can I join from any city in Pakistan?",
    a: "Absolutely! All our workshops are conducted online via Zoom/Discord, so you can join from anywhere in Pakistan — or even abroad. We also host in-person events in Islamabad, Lahore, Karachi, and Peshawar, with more cities being added every quarter.",
  },
];

export const joinCta = {
  eyebrow: "Applications open",
  headline: "Ready to start learning?",
  sub: "Join our community, grab some free resources, and start building your skills today.",
  cta: { label: "Join OASIS", href: "#" },
  reassurance: "100% free. No spam. Join a growing community of Pakistani students.",
};

export const footerLinks = {
  programs: [
    { label: "Character & Integrity", href: "#approach" },
    { label: "Life Lessons", href: "#approach" },
    { label: "Tech Education", href: "#approach" },
    { label: "Career Opportunities", href: "#approach" },
  ],
  community: [
    { label: "About Us", href: "#about" },
    { label: "Our Mission", href: "#mission" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Leadership", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  connect: [
    { label: "Instagram", href: "https://www.instagram.com/oasis_foundationn" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-raza-b79784228/" },
    { label: "Twitter / X", href: "https://x.com/oasisfound22" },
    { label: "Discord", href: "https://discord.com/invite/6jucgYMpZ" },
    { label: "Facebook", href: "https://www.facebook.com/people/Oasis-Foundation/61590852688772/" },
    { label: "TikTok", href: "https://www.tiktok.com/@oasisfoundation22" },
  ],
};
