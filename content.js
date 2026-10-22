/* =====================================================================
   SITE CONTENT — edit this file to update your portfolio.
   ---------------------------------------------------------------------
   - Everything inside quotes "..." is text you can change.
   - Lists use [ ... ] with items separated by commas.
   - To add a project, copy one { ... } block in PROJECTS, paste it
     below the last one (with a comma between them), and edit it.
   - Images go in the  images/  folder; refer to them as "images/name.jpg".
     Leave an image as "" to show a placeholder instead.
   - Save the file and refresh your browser to see changes.
   ===================================================================== */

const SITE = {
  name: "Adam Zuiker",
  title: "Mechanical Engineer, M.S. Robotics Student",                 // shown under your name on the home page
  tagline: "I build robots that plan, perceive, and move through the real world.",
  email: "adamzuiker@gmail.com",
  location: "Ann Arbor, MI",
  resume: "",                                  // e.g. "files/resume.pdf" — leave "" to hide the button
  photo: "",                                   // e.g. "images/headshot.jpg"

  // Social / contact links. Remove any line you don't want; leave url "" to hide.
  links: [
    { label: "GitHub",   url: "https://github.com/Adam-Zuiker" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/adam-zuiker/" },
  ],
};

const ABOUT = {
  // Each string is one paragraph.
  bio: [
    "I'm a graduate student studying robotics, with interests in motion planning, control, and autonomous systems. Replace this paragraph with a short introduction about who you are and what drives your work.",
    "Use a second paragraph for background: where you studied, what you've worked on, and what you're looking for next (internships, full-time roles, research collaborations, etc.).",
  ],

  // Short lists, grouped by category.
  skills: [
    { group: "Languages",   items: ["Python", "C++", "JavaScript", "MATLAB"] },
    { group: "Robotics",    items: ["Motion Planning", "Kinematics & Dynamics", "Control Systems", "ROS / ROS 2"] },
    { group: "Tools",       items: ["Git", "Linux", "Gazebo", "SolidWorks"] },
  ],

  education: [
    { degree: "M.S. Robotics", school: "Your University", dates: "2025 – 2027", note: "Relevant coursework: ROB 511" },
    { degree: "B.S. Mechanical Engineering", school: "Your Undergraduate University", dates: "2021 – 2025", note: "" },
  ],

  experience: [
    { role: "Research Assistant", org: "Your Lab Name", dates: "2025 – Present", note: "One sentence on what you do there." },
    { role: "Engineering Intern", org: "Company Name", dates: "Summer 2024", note: "One sentence on what you accomplished." },
  ],
};

const PROJECTS = [
  {
    id: "path-planning",                       // short unique name, no spaces (used in the page link)
    title: "Graph Search Path Planning",
    summary: "Implemented A*, BFS, DFS, and greedy best-first search for 2D robot navigation and compared their performance.",
    date: "Fall 2026",
    tags: ["Planning", "JavaScript"],          // used for the filter buttons on the Projects page
    featured: true,                            // true = also shown on the home page
    image: "",                                 // e.g. "images/astar.png"
    links: [
      { label: "Code", url: "" },
      { label: "Demo", url: "" },
    ],
    // Detail page content. Each string is a paragraph; start one with "## " for a subheading.
    description: [
      "Describe the problem you were solving and why it matters.",
      "Explain your approach: algorithms, design decisions, and anything you're proud of.",
    ],
    highlights: [
      "A concrete result, e.g. 'Found optimal paths 3× faster than BFS on large maps'",
      "A technical detail worth calling out",
    ],
    gallery: [],                               // extra images, e.g. ["images/astar-1.png", "images/astar-2.png"]
    video: "",                                 // optional YouTube embed link, e.g. "https://www.youtube.com/embed/VIDEO_ID"
  },
  {
    id: "pendulum-control",
    title: "Pendulum Arm Control",
    summary: "Simulated a pendulum arm and designed PID controllers to stabilize it with different numerical integrators.",
    date: "Fall 2026",
    tags: ["Control", "Simulation"],
    featured: true,
    image: "",
    links: [{ label: "Code", url: "" }],
    description: [
      "Describe the problem you were solving and why it matters.",
      "Explain your approach and what you learned.",
    ],
    highlights: [
      "A concrete result",
      "A technical detail worth calling out",
    ],
    gallery: [],
    video: "",
  },
  {
    id: "forward-kinematics",
    title: "Robot Forward Kinematics",
    summary: "Built a forward kinematics engine that computes link poses for arbitrary robot descriptions.",
    date: "Fall 2026",
    tags: ["Kinematics", "Simulation"],
    featured: true,
    image: "",
    links: [{ label: "Code", url: "" }],
    description: [
      "To show off my forward kinematics engine, I've embedded a video of a dance I created for a URDF-defined robot using a finite state machine.",
      "## The Robot",
      "The robot used in the demo below is an old version of the Boston Dynamics Atlas humanoid robot (70 links, 30 revolute joints) loaded into my own ROS-like runtime.",
      "Credit: Atlas robot model from the Drake project (RobotLocomotion), BSD 3-Clause; via AtlasRobot.jl. The URDF used for the Atlas robot can be found at https://github.com/tkoolen/AtlasRobot.jl",
      "I chose to use a humanoid robot in this demo for 2 reasons:",
      "1. My FK engine was developed for and tested using the default Fetch robot that came with the project download. However, I wanted to show that my engine can generalize to any robot defined by a URDF file, and Atlas is a step up in complexity from the default Fetch robot.",
      "2. Most dances appear much more natural on a humanoid robot since dances are created by humans for humans, so using Atlas provides a more aesthetic appeal to the demo.",
      "## The Choreography",
      "The dance used in this demo is the famous dance to Hot To Go by Chappell Roan. Sort of like a modern twist on the classic YMCA dance, the Hot To Go dance consists of moving your arms to spell out the letters H-O-T-T-O-G-O in rhythm with the song. At the end, the robot strikes a hands-on-hips pose and loops.",
      "Not only is it a more modern dance that many are familiar with but it is also a dance that is easily replicated by a finite state machine since the moves are discrete and generally evenly timed.",
      "Each letter is a joint-space setpoint. A proportional servo moves the joints toward it, and the FSM advances once every joint is within tolerance and the letter has been held briefly. I found each letter's joint angles numerically: I set target elbow and wrist positions, then searched the arm joints using my forward kinematics to check each guess.",
      "## The Visualization",
      "My runtime computes every link's pose with forward kinematics (URDF parsing, quaternion rotations, 4×4 transform composition down the kinematic tree) and publishes it as a matrix. A small Python bridge relays those messages to a three.js web page, which builds each link from the URDF's visual geometry and Atlas's mesh files, then sets each link's transform directly from the published matrices [about 10 times per second]. The viewer only displays the poses; all the kinematics happen in my code.",
    ],
    highlights: [],
    gallery: [],
    video: "videos/FK_Hot_To_GO.mov",
  },
];
