"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./page.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jetbrains",
});

type TerminalItem = {
  id: number;
  node: React.ReactNode;
};

type PromptInfo = {
  user: string;
  host: string;
  path: string;
  branch: string;
};

const PROMPT: PromptInfo = {
  user: "harendra",
  host: "hk-dev",
  path: "~/portfolio",
  branch: "(main)",
};

const BANNER_TEXT = "HARENDRA KUMARASIRI";
const CV_FILE_NAME = "Curriculum Vitae KAHW Kumarasiri.pdf";
const CV_URL = `/${CV_FILE_NAME}`;

const NEOFETCH_ART = `
--------------~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---~~~~~~~~~~~~~~~~--~-------------------------
-----------~~-~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--~--:...:-:-::-~~~~~~~~~~~~~~---------------------------
-----------~~~~~~~~~~~~~~~~~~~~~~~~~~~--:-::::::.::::::---::-~~~~~~~~~~~~~~~~-----------------------
---------~~~~~~~~~~~~~~~~~~~~~~~~-:::..:::----::-:..::-:--:..:--~~~~~~~~~~~~~-----------------------
-------~~~~~~~~~~~~~~~~~~~~~~~--::.::.::...::::::::-:.:::::.::::-~~~~~~~~~~~~-----------------------
-----~-~~~~~~~~~~~~~~~~~~~~~~~~~:::.:::....::::....:.::..:::.::-:-:~~~~~~~~~~~----------------------
-------~~~~~~~~~~~~~~~~~~~~~-----::............:........:...:::::----~~~~~~~~~~---------------------
---~~~~~~~~~~~~~~~~~~~~~~~~-..::::::......::......................:----~~~~~~~~~~-------------------
---~~~~~~~~~~~~~~~~~~~~~~-::..::..::.....::::.....................:----~~~~~~~~~-~------------------
-~~~~~~~~~~~~~~~~~~~~~~~-:::......:.....:............:::............:::-~~~~~~~~--------------------
---~~~~~~~~~~~~~~~~~~~~-.:.:................:::-~=+****=~-:.........:::.-~~~~~~~~-------------------
-~~~~~~~~~~~~~~~~~~~~~~-:...:...:......:-+****^>)((((())<*=-:......:::..:-~~~~~~~~~~----------------
~~~~~~~~~~~~~~~~~~~~~~~~..............:~+>><<<))(((((]]()<>^+-:.....:...:-~~~~~~~~~~~---------------
~~~~~~~~~~~~~~~~~~~~~~~~-:...........-=+^><<)))))(((((]())<>>*=::::....:-~~~~~~~~~~~~---------------
~~~~~~~~~~~~~~~~~~~~~~~~~-........:-~=*^><)))))))))((]]())<>^^+-:......-~~~~~~~~~~~~~~~~------------
~~~~~~~~~~~~~~~~~~~~~~~~~~-......:-~=++^^><)(((())(]]]]]((<>^^*~..:...:~~~~~~~~~~~~~~~~~~~----------
~~~~~~~~~~~~~~~~~~~~~~~~~~~:....::-=+**+++*>><<<<>>>>>>>>>**^^**-.::::~~~~~~~~~~~~~~~~~~~~~---------
~~~~~~~~~~~~~~~~~~~~~~~~~~~-...::::.:::::::-~+^^^+~--:::::::--=*+-:::-~~~~~~~~~~~~~~~~~~~~~~--------
~~~~~~~~~~~~~~~~~~~~~~~====~::.................::........::::.....:::~~~~~~~~~~~~~~~~~~~~~~~~~------
~~~~~~~~~~~~~~~=~~~~========~:....................................::-~~~~~~~~~~~~~~~~~~~~~~~~~~~~---
~~~~~~~~~~~~~~=~=============:................+)):............::.-:-~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--
~~~~~~~~~~~~~~============~::::..............:*)(*:.........:::.:-:>(>++=~~~~~~~~~~~~~~~~~~~~~~~~~--
~~~~~~~~~~~==~============:.::::.............-*)(>=..:....:...:.+*=^>>**==~~~~~~~~~~~~~~~~~~~~~~~~~-
~~~~~~~~~=================::-::-:-..........:~^((<>:-~:::::::-:*^*~^())>+====~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~===================-::.:------::::-~=~=^<)<<<=~~~~~~~=><>^++*^))^========~~~~~~~~~~~~~~~~~~~~
~~~========================-:.:---::--~+^^~-..:~~::*<<>^^**+^>>^+=>]<)>============~~~~~~~~~~~~~~~~~
~~=========================~::::----~=*^^=:....:~=~=)(]((()<<>^*=~)<^>+=============~~~~~~~~~~~~~~~~
============================~::::---~=+**+~::::-:-:=^<))))<<>^*=-=<<>=================~~~~~~~~~~~~~~
=============================~--.::-~~~-::::::~+=---:--~+<<>^+~-:=^^+=================~~~~~~~~~~~~~~
==========================++=++=:.::--:........:::..::..-^>^=~---======================~~~~~~~~~~~~~
=====================+++++++++++~..:::..:::-=*>^><^+++~--^*=--::~++======================~~~~~~~~~~~
====================++++++++++++=-..::::--:::::::::~*^*+++=-:::-++++++===================~~~~~~~~~~~
==================++++++++++++++++:..:.::--::::::-~+***=~~-:..~+++++++++===================~~~~~~~~~
================++++++++++++++++++=:...::~====--~*>>>^=-::..:=*+++++++++++==================~~~~~~~~
===============+++++++++++++++++++=::...:::::::::-~---::...-+^*+++++++++++===================~~~~~~~
=============+++++++++++++++++++++=::::..........::::....-=*>>*+++++++++++++==================~~~~~~
=============+++++++++++++++++++++=-:::::.............:-~+>>>>*++++++++++++++=================~~~~~~
===========+++++++++++++++++++++++=::::::::::......:--~+^><<<>*+++++++++++++++================~~~~~~
==========++++++++++++++++++++++~:-:::::::::::::::--~=+*><<<<>*++::+++++++++++=================~~~~~
=========++++++++++++++++++++=-..:-:::::::::::::--~==+*><<)<>>**>>~::-=++++++++==================~~~
========++++++++++++++++++=:.....:::::::::::::::-~=+*^><)<<>>^^^><-:::::~+++++++================~~~~
=======+++++++++++++++=~:........:::::::::::---~=*^^>>><<>>>>>>><=..:::::::-~=++=================~~~
=======++++++++++++~:.............::::::------~=+++*^^>>^^^^>>>>~..:::::::::::::-=================~~
=======+++++++=~-...................::::-------~=++**^^^^^^>>>=:..::::::::::::::::::~============~~~
======+++++~-::.......................:--~==~~~~==++*^^^^>>*~::.::::::::::::::::::::::::-=========~~
========~::::::::::......................:=++==~~==+*^^^=:::::::::::::::::::::::::::::::::::-~====~~
===+=::::::::::::.............................::::::.......:::::::::::::::::::::::::::::::::::~===~~
==+~::::::::::::::::.......................................::::::::::::::::::::::::::::::::::::-==~~
==-..::::::::::::::::::..................................:::::::::::::::::::::::::::::::::::::::-~=~
=-....::::::::::::::::::::...:...........................::.::::::::::::::::::::::::::::::::::::::~~
~......::::::::::::::::::::::.........................::::::::::::::::::::::::::::::::::.::::.::::-~
:.......::...::::::::::::::::::::.::::::....:::::::::::::::::::::::::::::::::::::::::.....:.:..::::~
........:::..:::.::::::::::::::::::::::.:::::::::::::::::::::::::::::::::::::::::::::....:......:::-
.........::..:::..:::::::::::.:::::::::::::::::::::.:::::::::::::::::::::::::::::::::...........::::
.........::..:....:::::::::::::::::::::::::::::::::.::::::::::::::::::::::::::::::::::...........:::
`;

const NEOFETCH_INFO: Array<React.ReactNode | ""> = [
  "",
  "",
  <React.Fragment key="identity">
    <span className="cyan">harendra</span>
    <span className="dim">@</span>
    <span className="g">hk-dev</span>
  </React.Fragment>,
  <span className="dim" key="divider">
    ──────────────────
  </span>,
  <React.Fragment key="os">
    <span className="pink">OS</span>
    <span className="w"> Ubuntu 24.04 LTS (portfolio edition)</span>
  </React.Fragment>,
  <React.Fragment key="shell">
    <span className="pink">Shell</span>
    <span className="w"> zsh 5.9 + oh-my-zsh</span>
  </React.Fragment>,
  <React.Fragment key="role">
    <span className="pink">Role</span>
    <span className="w"> Full Stack Developer</span>
  </React.Fragment>,
  <React.Fragment key="focus">
    <span className="pink">Focus</span>
    <span className="w"> React · Python · Java · MySQL</span>
  </React.Fragment>,
  <React.Fragment key="editor">
    <span className="pink">Editor</span>
    <span className="w"> VS Code (Dracula theme, obviously)</span>
  </React.Fragment>,
  <React.Fragment key="location">
    <span className="pink">Location</span>
    <span className="w"> Sri Lanka 🇱🇰</span>
  </React.Fragment>,
  <React.Fragment key="status">
    <span className="pink">Status</span>
    <span className="g"> ● available for hire</span>
  </React.Fragment>,
  "",
  <React.Fragment key="colors">
    <span style={{ color: "#ff5f56" }}>███</span>
    <span style={{ color: "#ffbd2e" }}>███</span>
    <span style={{ color: "#27c93f" }}>███</span>
    <span style={{ color: "#00d4ff" }}>███</span>
    <span style={{ color: "#ff79c6" }}>███</span>
    <span style={{ color: "#ffb86c" }}>███</span>
  </React.Fragment>,
];

const NEOFETCH_INFO_LINES = NEOFETCH_INFO.map((line) => line ?? "");

const PROJECTS = [
  {
    name: "purr-fect",
    desc: "AI-based pet adoption and rescue platform with pet recommendations, rescue reporting, lost pet finder, stray locator, and an in-built pet store.",
    stack: ["Python", "FastAPI", "MySQL", "React", "React Native"],
    status: "live",
    links: [
      ["web", "https://github.com/harrencode/purrfect-frontend-web"],
      ["mobile", "https://github.com/harrencode/purrfect-frontend-mobile"],
      ["backend", "https://github.com/harrencode/purrfect-backend"],
      ["demo", "https://purrfect-frontend-web.vercel.app/signin"],
    ],
  },
  {
    name: "highway-bus-mate",
    desc: "Sri Lankan highway bus companion for timetables, seat reservations, e-tickets, and live tracking.",
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "React Native"],
    status: "wip",
    links: [["repo", "https://github.com/harrencode/highway-bus-mate"]],
  },
  {
    name: "lunar",
    desc: "Menstrual cycle tracker with period logging, symptom and pattern tracking, smart predictions, wellness tips, mood insights, and private reminders.",
    stack: ["Python", "FastAPI", "MySQL", "React", "React Native"],
    status: "wip",
    links: [["repo", "https://github.com/harrencode/lunar-period-tracker-app"]],
  },
  {
    name: "vrs-vehicle-renting-system",
    desc: "Group project for a web-based vehicle rental system that lets customers book and manage rentals through a reliable, user-friendly workflow.",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    status: "live",
    links: [["repo", "https://github.com/SaviduOfficial/carRental"]],
  },
  {
    name: "mad-word-guessing-game",
    desc: "Android word guessing game where players try to uncover a hidden word within a limited number of attempts.",
    stack: ["Android Studio", "Java", "Dreamlo API"],
    status: "live",
    links: [["repo", "https://github.com/harrencode/mad_word_guessing_game"]],
  },
  {
    name: "slt-data-monitor-extension",
    desc: "Chrome and Edge extension that tracks SLT MySLT broadband usage, refreshes remaining data every 30 minutes, and sends low-data alerts.",
    stack: [
      "JavaScript",
      "HTML",
      "CSS",
      "Chrome Extension APIs",
      "Manifest V3",
      "PowerShell",
    ],
    status: "live",
    links: [["repo", "https://github.com/harrencode/slt-extension"]],
  },
];

type SkillCategory = {
  name: string;
  items: string[];
};

const SKILLS: SkillCategory[] = [
  {
    name: "Programming Languages",
    items: ["Python", "JavaScript", "Java", "PHP", "C#"],
  },
  {
    name: "Frameworks & Technologies",
    items: ["FastAPI", "Django", "React", "React Native", "Spring Boot"],
  },
  {
    name: "Database Management",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    name: "Cloud & Tools",
    items: [
      "AWS Cloud Services",
      "Google Cloud Services",
      "GitHub",
      "Android Studio",
    ],
  },
  {
    name: "Development Expertise",
    items: [
      "Full-Stack Development",
      "REST API Development",
      "Responsive Web Design",
      "Mobile Application Development",
      "Database Design",
    ],
  },
  {
    name: "Software Engineering Practices",
    items: [
      "Object-Oriented Programming (OOP)",
      "Version Control",
      "Agile Development",
      "Problem Solving",
      "Testing & Debugging",
    ],
  },
  {
    name: "Visualization",
    items: [
      "Figma",
      "SketchUp + Lumion",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "AutoCAD",
      "Revit",
    ],
  },
  {
    name: "Soft Skills",
    items: [
      "Team Collaboration",
      "Communication",
      "Adaptability",
      "Analytical Thinking",
      "Time Management",
      "Continuous Learning",
      "Attention to Detail",
    ],
  },
];

const SKILL_TOTAL = SKILLS.reduce(
  (total, category) => total + category.items.length,
  0,
);

export default function Page() {
  const [items, setItems] = useState<TerminalItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(0);
  const timeouts = useRef<number[]>([]);

  const addItem = useCallback((node: React.ReactNode) => {
    setItems((prev) => [...prev, { id: (nextId.current += 1), node }]);
  }, []);

  const addLine = useCallback(
    (node: React.ReactNode, className = "line") => {
      addItem(<div className={className}>{node}</div>);
    },
    [addItem],
  );

  const addSpacer = useCallback(() => {
    addItem(<div className="spacer" />);
  }, [addItem]);

  const addPrompt = useCallback(
    (cmd: string) => {
      addItem(
        <div className="prompt output-prompt">
          <span className="p-user">{PROMPT.user}</span>
          <span className="p-at">@</span>
          <span className="p-host">{PROMPT.host}</span>
          <span className="p-sep">:</span>
          <span className="p-path">{PROMPT.path}</span>
          <span className="p-branch"> {PROMPT.branch}</span>
          <span className="p-arrow"> $ </span>
          <span className="p-cmd">{cmd}</span>
        </div>,
      );
    },
    [addItem],
  );

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeouts.current.push(id);
  }, []);

  const clearScheduled = useCallback(() => {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];
  }, []);

  const showNeofetch = useCallback(() => {
    addSpacer();
    NEOFETCH_INFO_LINES.forEach((info) => {
      if (!info) {
        addLine("", "line");
        return;
      }
      addLine(<span className="neofetch-info">{info}</span>, "line");
    });
    addItem(<pre className="neofetch-art-block">{NEOFETCH_ART}</pre>);
    addSpacer();
  }, [addItem, addLine, addSpacer]);

  const showHelp = useCallback(() => {
    addSpacer();
    addLine(
      <>
        <span className="g">┌─</span> <span className="cyan">COMMANDS</span>{" "}
        <span className="g">
          ──────────────────────────────────────────────┐
        </span>
      </>,
    );
    const cmds: Array<[string, string]> = [
      ["neofetch", "system info & profile overview"],
      ["about", "who am i — bio & background"],
      ["skills", "tech stack with proficiency levels"],
      ["projects", "portfolio of work"],
      ["contact", "get in touch"],
      ["cv", "download curriculum vitae"],
      ["whoami", "current session info"],
      ["ls", "list portfolio directory"],
      ["cat README.md", "read this repo's readme"],
      ["clear", "clear the terminal"],
      ["sudo hire harendra", "...just try it"],
    ];
    cmds.forEach(([c, d]) => {
      addLine(
        <>
          <span className="g">│</span> <span className="yellow"> {c}</span>{" "}
          <span className="dim">{d}</span>
        </>,
      );
    });
    addLine(
      <span className="g">
        └────────────────────────────────────────────────────────────┘
      </span>,
    );
    addSpacer();
  }, [addLine, addSpacer]);

  const showAbout = useCallback(() => {
    addSpacer();
    addLine(
      <>
        <span className="dim">$ </span>
        <span className="g">cat</span> about.txt
      </>,
    );
    addSpacer();
    addLine(
      <>
        <span className="cyan">
          ╔══════════════════════════════════════════════════════════╗
        </span>
      </>,
    );
    addLine(
      <>
        <span className="cyan">║</span>{" "}
        <span className="yellow">HARENDRA KUMARASIRI</span>{" "}
        <span className="dim">—</span>{" "}
        <span className="g">Full Stack Developer</span>{" "}
        <span className="cyan"> ║</span>
      </>,
    );
    addLine(
      <>
        <span className="cyan">
          ╚══════════════════════════════════════════════════════════╝
        </span>
      </>,
    );
    addSpacer();
    [
      "Dynamic, detail-oriented developer with a strong",
      "foundation in both frontend and backend systems.",
      "I build things that are not just functional — they're",
      "precise, performant, and actually beautiful.",
    ].forEach((line) => {
      addLine(
        <>
          <span className="pink"> &gt;</span> <span className="w">{line}</span>
        </>,
      );
    });
    addSpacer();
    addLine(
      <span className="dim"> ──────────────────────────────────────────</span>,
    );
    [
      ["name", "Harendra Kumarasiri"],
      ["age", "27 years"],
      ["location", "Sri Lanka 🇱🇰"],
      ["study", "Bachelor of Information Technology"],
      ["exp", "3+ years building stuff"],
      ["passion", "clean code + pixel-perfect UIs"],
      ["github", "github.com/harrencode"],
    ].forEach(([k, v]) => {
      addLine(
        <>
          <span className="pink"> {k}</span> <span className="dim">:</span>{" "}
          <span className="w">{v}</span>
        </>,
      );
    });
    addSpacer();
    addLine(<span className="dim"> [EOF]</span>);
    addSpacer();
  }, [addLine, addSpacer]);

  const showSkills = useCallback(() => {
    addSpacer();
    addLine(
      <>
        <span className="dim">$ </span>
        <span className="g">cat</span> skills.json{" "}
        <span className="dim">{"| jq '.[] | {category, skills}'"}</span>
      </>,
    );
    addSpacer();
    SKILLS.forEach((category) => {
      addLine(<span className="yellow">{`// ${category.name}`}</span>);
      addItem(
        <div className="skill-cloud" key={`skills-${category.name}`}>
          {category.items.map((skill) => (
            <span className="skill-pill" key={`${category.name}-${skill}`}>
              {skill}
            </span>
          ))}
        </div>,
      );
      addSpacer();
    });
    addLine(
      <>
        <span className="dim">{"// "}</span>
        <span className="g">{SKILL_TOTAL}</span>
        <span className="dim"> skills loaded successfully</span>
      </>,
    );
    addSpacer();
  }, [addItem, addLine, addSpacer]);

  const showProjects = useCallback(() => {
    addSpacer();
    addLine(
      <>
        <span className="dim">$ </span>
        <span className="g">ls</span> ./projects{" "}
        <span className="dim">-la --sort=date</span>
      </>,
    );
    addSpacer();
    PROJECTS.forEach((proj, idx) => {
      addItem(
        <div className="proj" key={`proj-${proj.name}`}>
          <div className="proj-title">
            <span className="dim">{String(idx + 1).padStart(2, "0")}/</span>{" "}
            {proj.name}{" "}
            <span
              className={`pstatus ${proj.status === "live" ? "live" : "wip"}`}
            >
              {proj.status === "live" ? "● live" : "◉ wip"}
            </span>
          </div>
          <div className="proj-desc">{proj.desc}</div>
          <div className="proj-stack">
            {proj.stack.map((stack) => (
              <span className="ptag" key={`${proj.name}-${stack}`}>
                {stack}
              </span>
            ))}
          </div>
          <div className="proj-links">
            {proj.links.map(([label, href]) => (
              <a
                className="plink"
                href={href}
                key={`${proj.name}-${label}`}
                rel="noreferrer"
                target="_blank"
              >
                {label}
              </a>
            ))}
          </div>
        </div>,
      );
    });
    addSpacer();
    addLine(
      <>
        <span className="dim">{PROJECTS.length} projects found.</span>{" "}
        <span className="cyan">portfolio synced.</span>
      </>,
    );
    addSpacer();
  }, [addItem, addLine, addSpacer]);

  const showContact = useCallback(
    (showCommand = true) => {
      addSpacer();
      if (showCommand) {
        addLine(
          <>
            <span className="dim">$ </span>
            <span className="g">cat</span> contact.json
          </>,
        );
        addSpacer();
      }
      addLine(<span className="dim">{`{`}</span>);
      addLine(
        <>
          <span className="cyan">{'  "name"'}</span>
          <span className="dim">:</span>{" "}
          <span className="yellow">{'"Harendra Kumarasiri"'}</span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "whatsapp"'}</span>
          <span className="dim">:</span>{" "}
          <span className="yellow">{'"+94719825683"'}</span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "email"'}</span>
          <span className="dim">:</span>{" "}
          <span className="yellow">{'"harendra98w@gmail.com"'}</span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "github"'}</span>
          <span className="dim">:</span>{" "}
          <span className="blue">{'"github.com/harrencode"'}</span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "linkedin"'}</span>
          <span className="dim">:</span>{" "}
          <span className="blue">
            {'"linkedin.com/in/harendra-kumarasiri-bb2850a9/"'}
          </span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "behance"'}</span>
          <span className="dim">:</span>{" "}
          <span className="blue">{'"behance.net/harrencode"'}</span>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "cv"'}</span>
          <span className="dim">:</span>{" "}
          <a className="plink" download href={CV_URL}>
            {CV_URL}
          </a>
          <span className="dim">,</span>
        </>,
      );
      addLine(
        <>
          <span className="cyan">{'  "status"'}</span>
          <span className="dim">:</span>{" "}
          <span className="g">
            {'"open to freelance & full-time opportunities"'}
          </span>
        </>,
      );
      addLine(<span className="dim">{`}`}</span>);
      addSpacer();
      addLine(
        <>
          <span className="dim">{"// "}</span>
          <span className="g">response time</span>
          <span className="dim">: usually &lt; 24h</span>
        </>,
      );
      addSpacer();
    },
    [addLine, addSpacer],
  );

  const showWhoami = useCallback(() => {
    addSpacer();
    addLine(<span className="g">visitor</span>);
    addLine(
      <span className="dim">
        uid=1000(visitor) gid=1000(visitor) groups=portfolio,viewers
      </span>,
    );
    addSpacer();
  }, [addLine, addSpacer]);

  const showLs = useCallback(() => {
    addSpacer();
    addLine(<span className="dim">total 48</span>);
    [
      ["drwxr-xr-x", "harendra", "4096", "about/", "g"],
      ["drwxr-xr-x", "harendra", "4096", "skills/", "g"],
      ["drwxr-xr-x", "harendra", "4096", "projects/", "g"],
      ["-rw-r--r--", "harendra", "2.4K", "README.md", "yellow"],
      ["-rw-r--r--", "harendra", "1.1K", "contact.json", "yellow"],
      ["-rw-r--r--", "harendra", "CV", CV_FILE_NAME, "cyan"],
      ["-rw-r--r--", "harendra", "892", "package.json", "cyan"],
    ].forEach(([perm, owner, size, name, color]) => {
      addLine(
        <>
          <span className="dim">
            {perm} {owner} {size.padStart(5)}
          </span>{" "}
          <span className={color as string}>{name}</span>
        </>,
      );
    });
    addSpacer();
  }, [addLine, addSpacer]);

  const showCat = useCallback(
    (args: string) => {
      const normalizedArgs = args.toLowerCase();
      if (normalizedArgs.includes("contact")) {
        showContact(false);
        return;
      }
      if (!normalizedArgs.includes("readme")) {
        addLine(
          <span className="red">
            cat: {args || "(no file)"}: No such file or directory
          </span>,
        );
        addSpacer();
        return;
      }
      addSpacer();
      addLine(<span className="g"># Harendra Kumarasiri — Portfolio</span>);
      addSpacer();
      addLine(<span className="yellow">## tldr</span>);
      addLine(
        <span className="w">
          Full stack dev. Sri Lanka. Builds things that work and look good.
        </span>,
      );
      addSpacer();
      addLine(<span className="yellow">## explore</span>);
      ["neofetch", "about", "skills", "projects", "contact"].forEach((c) => {
        addLine(
          <>
            <span className="dim"> $</span> <span className="g">{c}</span>
          </>,
        );
      });
      addSpacer();
      addLine(<span className="yellow">## stack</span>);
      addLine(
        <span className="w">React · Python · Java · PHP · MySQL · Figma</span>,
      );
      addSpacer();
    },
    [addLine, addSpacer, showContact],
  );

  const showCv = useCallback(() => {
    addSpacer();
    addLine(
      <>
        <span className="dim">$ </span>
        <span className="g">open</span> {CV_URL}
      </>,
    );
    addLine(
      <>
        <span className="cyan">download:</span>{" "}
        <a className="plink" download href={CV_URL}>
          {CV_FILE_NAME}
        </a>
      </>,
    );
    addSpacer();
  }, [addLine, addSpacer]);

  const showSudo = useCallback(
    (args: string) => {
      if (!args.includes("hire")) {
        addLine(
          <span className="red">
            sudo: command not found or permission denied
          </span>,
        );
        addSpacer();
        return;
      }
      addSpacer();
      addLine(<span className="yellow">[sudo] password for visitor: </span>);
      schedule(() => addLine(<span className="dim">••••••••</span>), 500);
      schedule(() => addSpacer(), 800);
      schedule(
        () => addLine(<span className="g">✓ Authentication successful.</span>),
        850,
      );
      schedule(
        () => addLine(<span className="g">✓ Initiating hire sequence...</span>),
        980,
      );
      schedule(
        () =>
          addLine(
            <span className="cyan">
              {" "}
              Cloning harendra@hk-dev into your team...
            </span>,
          ),
        1500,
      );
      schedule(
        () =>
          addLine(
            <>
              <span className="dim"> [</span>
              <span className="g">████████████████████</span>
              <span className="dim">]</span>{" "}
              <span className="yellow">100%</span>
            </>,
          ),
        2200,
      );
      schedule(() => addSpacer(), 2600);
      schedule(
        () =>
          addLine(
            <span className="g">
              ✓ Harendra successfully added to your team!
            </span>,
          ),
        2800,
      );
      schedule(
        () =>
          addLine(
            <>
              <span className="dim"> Next step: </span>
              <span className="yellow">cat contact.json</span>
            </>,
          ),
        3000,
      );
      schedule(() => addSpacer(), 3300);
    },
    [addLine, addSpacer, schedule],
  );

  const notFound = useCallback(
    (cmd: string) => {
      addLine(<span className="red">bash: {cmd}: command not found</span>);
      addLine(
        <>
          <span className="dim">try </span>
          <span className="yellow">help</span>
        </>,
      );
      addSpacer();
    },
    [addLine, addSpacer],
  );

  const handleCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        return;
      }
      addPrompt(trimmed);
      const [cmd, ...rest] = trimmed.split(/\s+/);
      const args = rest.join(" ");
      switch (cmd.toLowerCase()) {
        case "help":
          showHelp();
          break;
        case "about":
          showAbout();
          break;
        case "skills":
          showSkills();
          break;
        case "projects":
          showProjects();
          break;
        case "contact":
          showContact();
          break;
        case "cv":
        case "resume":
          showCv();
          break;
        case "whoami":
          showWhoami();
          break;
        case "ls":
        case "dir":
          showLs();
          break;
        case "neofetch":
          showNeofetch();
          break;
        case "clear":
          clearScheduled();
          setItems([]);
          break;
        case "sudo":
          showSudo(args);
          break;
        case "cat":
          showCat(args);
          break;
        default:
          notFound(cmd);
      }
    },
    [
      addPrompt,
      clearScheduled,
      notFound,
      showAbout,
      showCat,
      showContact,
      showCv,
      showHelp,
      showLs,
      showNeofetch,
      showProjects,
      showSkills,
      showSudo,
      showWhoami,
    ],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const nextValue = inputValue;
        setInputValue("");
        setHistory((prev) => [nextValue, ...prev]);
        setHistoryIndex(-1);
        handleCommand(nextValue);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHistoryIndex((prev) => {
          const nextIndex = Math.min(prev + 1, history.length - 1);
          if (nextIndex >= 0) {
            setInputValue(history[nextIndex]);
          }
          return nextIndex;
        });
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHistoryIndex((prev) => {
          const nextIndex = Math.max(prev - 1, -1);
          if (nextIndex === -1) {
            setInputValue("");
          } else {
            setInputValue(history[nextIndex]);
          }
          return nextIndex;
        });
      }
    },
    [handleCommand, history, inputValue],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }
    const id = window.setTimeout(() => {
      clearScheduled();
      setItems([]);
      setHistory([]);
      setHistoryIndex(-1);
      setInputValue("");
      nextId.current = 0;
    }, 0);

    return () => window.clearTimeout(id);
  }, [clearScheduled]);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [items.length]);

  useEffect(() => {
    const steps: Array<[number, () => void]> = [
      [0, () => addItem(<div className="banner">{BANNER_TEXT}</div>)],
      [
        200,
        () =>
          addLine(
            <>
              <span className="cyan"> @harrecode</span>{" "}
              <span className="dim">—</span>{" "}
              <span className="g2">Full Stack Developer</span>{" "}
              <span className="dim">—</span>{" "}
              <span className="dim">Sri Lanka 🇱🇰</span>
            </>,
          ),
      ],
      [350, () => addSpacer()],
      [
        500,
        () =>
          addLine(
            <span className="dim">
              ────────────────────────────────────────────────────────────
            </span>,
          ),
      ],
      [
        600,
        () =>
          addLine(
            <>
              <span className="dim">[</span>
              <span className="g">sys</span>
              <span className="dim">]</span> kernel:{" "}
              <span className="yellow">portfolio-v2.0</span> uptime:{" "}
              <span className="cyan">3+ years</span> status:{" "}
              <span className="g">ONLINE</span>
            </>,
          ),
      ],
      [
        750,
        () =>
          addLine(
            <>
              <span className="dim">[</span>
              <span className="g">sys</span>
              <span className="dim">]</span> loading modules...{" "}
              <span className="g">████████████████████</span>{" "}
              <span className="yellow">100%</span>
            </>,
          ),
      ],
      [
        900,
        () =>
          addLine(
            <span className="dim">
              ────────────────────────────────────────────────────────────
            </span>,
          ),
      ],
      [1050, () => addSpacer()],
      [
        1100,
        () =>
          addLine(
            <>
              <span className="pink">type</span>{" "}
              <span className="yellow">help</span>{" "}
              <span className="dim">to list commands</span>{" "}
              <span className="dim">|</span> <span className="pink">type</span>{" "}
              <span className="yellow">about</span>{" "}
              <span className="dim">to start exploring</span>
            </>,
          ),
      ],
      [1250, () => addSpacer()],
      [1400, () => addPrompt("neofetch")],
      [1650, () => showNeofetch()],
    ];

    steps.forEach(([delay, fn]) => schedule(fn, delay));

    return () => {
      clearScheduled();
    };
  }, [
    addItem,
    addLine,
    addPrompt,
    addSpacer,
    clearScheduled,
    schedule,
    showNeofetch,
  ]);

  const blinkerHidden = inputValue.length > 0;

  return (
    <div
      className={`${jetbrains.variable} terminal-page`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanline" />
      <div className="term" ref={screenRef}>
        <div className="term-header">
          <span className="term-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </span>
          <span className="term-title">harendra K. — portfolio</span>
          <span className="term-status">● online</span>
        </div>
        <div id="output">
          {items.map((item) => (
            <React.Fragment key={item.id}>{item.node}</React.Fragment>
          ))}
        </div>
        <div className="input-wrap" id="inputWrap">
          <div className="prompt">
            <span className="p-user">{PROMPT.user}</span>
            <span className="p-at">@</span>
            <span className="p-host">{PROMPT.host}</span>
            <span className="p-sep">:</span>
            <span className="p-path">{PROMPT.path}</span>
            <span className="p-branch"> {PROMPT.branch}</span>
            <span className="p-arrow"> $ </span>
          </div>
          <input
            ref={inputRef}
            className="cmd-input"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <span className={`cursor${blinkerHidden ? " cursor-hidden" : ""}`} />
        </div>
      </div>
    </div>
  );
}
