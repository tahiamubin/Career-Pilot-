import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const SEED_JOBS = [
  {
    title: "Senior AI Research Engineer",
    company: "OpenAI",
    logo: "AI",
    logoBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    location: "San Francisco, CA (Hybrid)",
    salary: "$210k - $260k",
    salaryMin: 210000,
    salaryMax: 260000,
    type: "Full-time",
    matchScore: 98,
    tags: ["Python", "PyTorch", "LLMs", "Reinforcement Learning"],
    category: "AI / Machine Learning",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    description: "We are seeking a Senior AI Research Engineer to join our Frontier Model Team. In this role, you will lead the training, optimization, and scaling of next-generation large language models. You will work on the bleeding edge of reinforcement learning and model alignment, creating systems that are safer and more capable.",
    requirements: [
      "MS or PhD in Computer Science, Machine Learning, or related quantitative field.",
      "4+ years of industry experience training and fine-tuning large language models (10B+ parameters).",
      "Deep expertise in PyTorch, JAX, or deep learning frameworks at scale.",
      "Strong coding skills in Python and distributed systems programming."
    ],
    benefits: [
      "Top-tier health, dental, and vision insurance with 100% premium coverage.",
      "Unlimited PTO and flexible hybrid schedule (3 days in SF office).",
      "Annual growth budget of $5,000 for learning, conferences, and equipment.",
      "401(k) retirement plan with 4% employer matching contribution."
    ]
  },
  {
    title: "Frontend Architect",
    company: "Vercel",
    logo: "VC",
    logoBg: "bg-white/10 text-white border-white/20",
    location: "Remote (Global)",
    salary: "$180k - $220k",
    salaryMin: 180000,
    salaryMax: 220000,
    type: "Full-time",
    matchScore: 96,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    description: "Vercel is looking for a Frontend Architect to shape the future of rendering, performance, and developer experience. You will collaborate directly with the Next.js core team to design and refine framework APIs, define frontend engineering standards, and build world-class user experiences.",
    requirements: [
      "8+ years of experience in modern frontend development.",
      "Extensive contributions to Next.js or React open-source ecosystems.",
      "Expert knowledge of TypeScript, AST, bundlers (Webpack, Turbopack), and web standards.",
      "Demonstrated experience designing design systems and component libraries at scale."
    ],
    benefits: [
      "100% remote working options with home office stipend ($2,000).",
      "Generous equity package and competitive base salary.",
      "Unlimited wellness reimbursement program (gym, therapy, etc.).",
      "Co-working space pass coverage."
    ]
  },
  {
    title: "Platform Infrastructure Engineer",
    company: "HashiCorp",
    logo: "HC",
    logoBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    location: "Remote (US)",
    salary: "$160k - $190k",
    salaryMin: 160000,
    salaryMax: 190000,
    type: "Full-time",
    matchScore: 93,
    tags: ["Go", "Kubernetes", "AWS", "Terraform"],
    category: "Infrastructure",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    description: "Join the team powering cloud infrastructure enablement. You will build and scale the multi-tenant platform services backing HashiCorp Cloud Platform. You'll be using Go and Terraform to manage distributed systems across AWS and Azure, ensuring high reliability and developer productivity.",
    requirements: [
      "5+ years of software engineering experience focusing on platform tooling.",
      "Proficient in writing high-quality Go code for cloud environments.",
      "Expert level with Kubernetes (EKS, GKE) and Infrastructure-as-Code (Terraform).",
      "Strong understanding of networking, VPCs, and IAM controls."
    ],
    benefits: [
      "Comprehensive medical, dental, and vision insurance policies.",
      "Generous family leave (16 weeks fully paid parental leave).",
      "Work-from-home allowance for workspace setup.",
      "Mental health and wellness stipends."
    ]
  },
  {
    title: "Product Engineer (Full-Stack)",
    company: "Linear",
    logo: "LN",
    logoBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    location: "San Francisco, CA",
    salary: "$150k - $185k",
    salaryMin: 150000,
    salaryMax: 185000,
    type: "Full-time",
    matchScore: 91,
    tags: ["React", "Node.js", "PostgreSQL", "GraphQL"],
    category: "Full-Stack",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    description: "Linear is seeking a Product Engineer to lead implementation of key UI workflows and real-time synchronization features. You will work across React, GraphQL, and Node.js backend pipelines to build a highly responsive workspace, maintaining our rigorous standards for UI performance and simplicity.",
    requirements: [
      "3+ years of experience building product-focused full-stack web applications.",
      "Highly skilled with React, TypeScript, and database optimization (PostgreSQL).",
      "A keen eye for layout design, subtle transitions, and user interactions.",
      "Strong product sense and ability to own features end-to-end."
    ],
    benefits: [
      "Competitive salary and equity (early stage incentive).",
      "Fully covered medical, dental, and vision policies.",
      "Quarterly company retreats in beautiful global locations.",
      "Latest Apple equipment and home office setup budget."
    ]
  },
  {
    title: "Staff AI Engineer",
    company: "Google",
    logo: "G",
    logoBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    location: "Mountain View, CA",
    salary: "$250k - $310k",
    salaryMin: 250000,
    salaryMax: 310000,
    type: "Full-time",
    matchScore: 95,
    tags: ["TensorFlow", "Python", "JAX", "ML Ops"],
    category: "AI / Machine Learning",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    description: "We are looking for a Staff AI Engineer to drive integrations of Gemini capabilities into Google Cloud developer toolkits. You will research, fine-tune, and deploy models that assist millions of developers with syntax generation, troubleshooting, and code optimization.",
    requirements: [
      "6+ years of specialized experience in artificial intelligence and deep learning models.",
      "Proficient with model framework technologies such as JAX and TensorFlow.",
      "Experience deploying ML pipelines onto distributed Kubernetes computing environments.",
      "Excellent mentorship capabilities for junior research engineers."
    ],
    benefits: [
      "Industry-leading base compensation, bonus packages, and stock awards.",
      "On-site gourmet cafeterias, gyms, wellness clinics, and childcare.",
      "Comprehensive retirement savings program with generous company matching.",
      "Flexible hybrid model (3 days in-office)."
    ]
  },
  {
    title: "Senior React Developer",
    company: "Stripe",
    logo: "ST",
    logoBg: "bg-indigo-600/10 text-indigo-400 border-indigo-600/20",
    location: "Remote (US)",
    salary: "$165k - $195k",
    salaryMin: 165000,
    salaryMax: 195000,
    type: "Full-time",
    matchScore: 94,
    tags: ["React", "TypeScript", "CSS", "Design Systems"],
    category: "Frontend",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    description: "Stripe's Dashboard Infrastructure team is searching for a Senior React Developer to construct tools that empower thousands of merchants. You will build and scale internal UI frameworks and design system tokens to create consistent, bulletproof checkout dashboards.",
    requirements: [
      "5+ years of specialized focus on web interface design and architecture.",
      "Mastery of React, client state systems, and advanced styling technologies.",
      "Experience auditing components for accessibility compliance (WCAG).",
      "Stellar written communication skills for writing style guides."
    ],
    benefits: [
      "Competitive salary packages and quarterly equity grants.",
      "Paid family leave and health advocacy plans.",
      "Annual learning allowance of $3,000.",
      "State-of-the-art office equipment shipped to your door."
    ]
  },
  {
    title: "Lead DevOps Architect",
    company: "Netflix",
    logo: "NF",
    logoBg: "bg-red-500/10 text-red-500 border-red-500/20",
    location: "Los Gatos, CA",
    salary: "$220k - $280k",
    salaryMin: 220000,
    salaryMax: 280000,
    type: "Full-time",
    matchScore: 90,
    tags: ["Docker", "AWS", "Jenkins", "Spinnaker"],
    category: "Infrastructure",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    description: "We are seeking a Lead DevOps Architect to orchestrate high-availability global streaming pipelines. You will scale our multi-region delivery infrastructure, design automated rollbacks, and manage massive container orchestration grids using Docker, Spinnaker, and AWS services.",
    requirements: [
      "7+ years of experience leading deployment infrastructure for large networks.",
      "Expert knowledge of AWS architecture, networking, and regional scaling.",
      "Familiarity with container runtimes, Kubernetes, and continuous deployment systems.",
      "Outstanding post-mortem analysis and incident resolution skills."
    ],
    benefits: [
      "Genuinely market-leading cash compensation with flexible stock structures.",
      "Fully covered health, vision, and dental programs.",
      "100% remote flexibility with optional office access in Los Gatos.",
      "Generous retirement matching and child-care assistance programs."
    ]
  },
  {
    title: "UI/UX Product Designer",
    company: "Figma",
    logo: "FG",
    logoBg: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    location: "San Francisco, CA (Hybrid)",
    salary: "$140k - $175k",
    salaryMin: 140000,
    salaryMax: 175000,
    type: "Full-time",
    matchScore: 88,
    tags: ["Figma", "Prototyping", "Design Systems", "Research"],
    category: "Design",
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    description: "Figma is recruiting a UI/UX Product Designer to rethink how design assets are shared. You will conduct user research, create interactive prototypes, and collaborate directly with engineers to design features that improve cross-functional collaboration and vector rendering workflows.",
    requirements: [
      "3+ years of experience as a product designer in modern tech environments.",
      "Strong portfolio illustrating end-to-end design research and design systems execution.",
      "Expert knowledge of prototyping workflows, Figma variables, and design tokens.",
      "Ability to write crisp design specs and collaborate with frontend developers."
    ],
    benefits: [
      "Competitive salary packages and employee stock choices.",
      "Flexible hybrid setup (2 days in-office in SF).",
      "Full family health plan and wellness funds.",
      "Annual design community learning stipend."
    ]
  },
  {
    title: "Backend Engineer (Distributed Systems)",
    company: "Stripe",
    logo: "ST",
    logoBg: "bg-indigo-600/10 text-indigo-400 border-indigo-600/20",
    location: "Remote",
    salary: "$170k - $210k",
    salaryMin: 170000,
    salaryMax: 210000,
    type: "Full-time",
    matchScore: 92,
    tags: ["Ruby", "Go", "SQL", "Distributed Systems"],
    category: "Backend",
    postedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    description: "Stripe is looking for a Backend Engineer to join our Core API Ledger team. You will write distributed transaction processing engines, optimize query layouts across large SQL databases, and build reliable financial ledgers handling billions of operations globally.",
    requirements: [
      "5+ years of software design specializing in high-throughput backend services.",
      "Proficient in Go, Ruby, or Java for backend infrastructure.",
      "Strong experience dealing with concurrency, locking mechanisms, and database clustering.",
      "Prior knowledge in financial ledger compliance is a strong plus."
    ],
    benefits: [
      "Excellent salary + equity benefits.",
      "Work-from-home workspace stipends ($2,000).",
      "Full premium health coverage.",
      "100% remote flexibility with asynchronous coordination styles."
    ]
  },
  {
    title: "Data Platform Engineer",
    company: "Snowflake",
    logo: "SF",
    logoBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    location: "San Mateo, CA",
    salary: "$160k - $200k",
    salaryMin: 160000,
    salaryMax: 200000,
    type: "Full-time",
    matchScore: 89,
    tags: ["Java", "Scala", "Spark", "SQL"],
    category: "Backend",
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    description: "Snowflake is searching for a Data Platform Engineer to optimize core ingestion query planners. You will implement distributed map-reduce architectures, optimize Spark and JVM data engines, and design APIs that manage petabyte-scale data Warehouses.",
    requirements: [
      "4+ years of data infrastructure programming focusing on JVM languages (Java/Scala).",
      "Solid knowledge of database internals, query parsing, and index optimizations.",
      "Familiarity with big data tools (Apache Spark, Kafka, Hadoop).",
      "Strong algorithmic foundation."
    ],
    benefits: [
      "Premium compensation plan with quarterly equity options.",
      "Full family coverage and insurance advocacy packages.",
      "Commuter allowances and parking coverage.",
      "On-site cafeteria and recreation facilities."
    ]
  },
  {
    title: "Machine Learning Scientist",
    company: "Anthropic",
    logo: "AN",
    logoBg: "bg-amber-700/10 text-amber-500 border-amber-700/20",
    location: "San Francisco, CA",
    salary: "$230k - $280k",
    salaryMin: 230000,
    salaryMax: 280000,
    type: "Full-time",
    matchScore: 97,
    tags: ["Python", "PyTorch", "Transformers", "NLP"],
    category: "AI / Machine Learning",
    postedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    description: "Anthropic is seeking an ML Scientist to study model behavior, alignment safety, and scaling laws. You will conduct research on neural network architecture modifications, build NLP evaluation pipelines, and refine training strategies for safe AI agents.",
    requirements: [
      "PhD in Machine Learning or equivalent publication record (NeurIPS, ICML).",
      "Excellent coding proficiency in Python and PyTorch.",
      "Prior history working on large transformer architectures.",
      "Passionate about model alignment and safety science."
    ],
    benefits: [
      "Exceptional base compensation + significant early startup equity options.",
      "Premium office space in San Francisco with catered meals.",
      "Excellent medical, vision, and dental programs.",
      "Flexible schedule and open PTO policies."
    ]
  },
  {
    title: "Mobile (iOS) Engineer",
    company: "Linear",
    logo: "LN",
    logoBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    location: "Remote",
    salary: "$145k - $175k",
    salaryMin: 145000,
    salaryMax: 175000,
    type: "Full-time",
    matchScore: 87,
    tags: ["Swift", "UIKit", "SwiftUI", "iOS"],
    category: "Mobile",
    postedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    description: "Linear is searching for a Mobile (iOS) Engineer to launch our native mobile client. You will build high-speed rendering pipelines, design offline synchronization caches, and craft tactile, snappy SwiftUI gestures matching our desktop client's feel.",
    requirements: [
      "4+ years designing professional iOS applications.",
      "Expert knowledge of SwiftUI, UIKit, and iOS memory management profiles.",
      "Experience optimizing local data synchronization systems (CoreData, SQLite).",
      "A pixel-perfect mindset for UI details and fluid animations."
    ],
    benefits: [
      "Very competitive cash + early product shares incentive.",
      "Work-from-home and hardware updates stipend ($2,500).",
      "Full family coverage options.",
      "Annual team retreats and gathering tickets."
    ]
  }
];

export async function GET(request) {
  try {
    const db = await getDb();
    const collection = db.collection("jobs");

    // Check if seeding is required
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(SEED_JOBS);
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const sort = searchParams.get("sort") || "date";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    // Build filter query
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } }
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (location && location !== "All") {
      if (location === "Remote") {
        query.location = { $regex: "remote", $options: "i" };
      } else if (location === "Hybrid") {
        query.location = { $regex: "hybrid", $options: "i" };
      } else if (location === "On-site") {
        query.location = { $not: /remote|hybrid/i };
      } else {
        query.location = { $regex: location, $options: "i" };
      }
    }

    // Sorting
    const sortOptions = {};
    if (sort === "salary") {
      sortOptions.salaryMax = -1; // Highest salary first
    } else {
      sortOptions.postedAt = -1; // Newest first
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      collection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(query)
    ]);

    // Map _id to id string for ease of use in UI
    const formattedJobs = jobs.map(job => ({
      ...job,
      id: job._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error in GET /api/jobs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
