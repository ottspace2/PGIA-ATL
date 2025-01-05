/**************************************************************
 * 0) LANDING PAGE VALIDATION (Page 0)
 **************************************************************/
function validateStudentForm() {
  const studentID = document.getElementById("studentID").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();

  if(!studentID || !lastName || !firstName) {
    alert("Please complete required fields: Student ID, Last Name, and First Name.");
    return;
  }
  goToPage(1);
}

/**************************************************************
 * Full categories & skills
 **************************************************************/
const categoriesAndSkills = {
  Communication: {
    "Exchanging thoughts, messages, and information effectively": [
      "Give and receive meaningful feedback",
      "Use intercultural understanding to interpret communication",
      "Use a variety of speaking techniques to communicate with a variety of audiences",
      "Use appropriate forms of writing for different purposes and audiences",
      "Use a variety of media to communicate with a range of audiences",
      "Interpret and use effectively modes of non-verbal communication",
      "Negotiate ideas and knowledge with peers and teachers",
      "Participate in, and contribute to, digital social media networks",
      "Collaborate with peers and experts using a variety of digital environments and media",
      "Share ideas with multiple audiences using a variety of digital environments and media"
    ],
    "Demonstrating communication through language": [
      "Read critically and for comprehension",
      "Read a variety of sources for information and for pleasure",
      "Make inferences and draw conclusions",
      "Use and interpret a range of discipline-specific terms and symbols",
      "Write for different purposes",
      "Understand and use mathematical notation",
      "Paraphrase accurately and concisely",
      "Preview and skim texts to build understanding",
      "Take effective notes in class",
      "Make effective summary notes for studying",
      "Use a variety of organizers for academic writing tasks",
      "Find information for disciplinary and interdisciplinary inquiries using a variety of media",
      "Organize and depict information logically",
      "Structure information in summaries, essays, and reports"
    ]
  },
  Social: {
    "Collaboration skills": [
      "Use social media networks appropriately to build and develop relationships",
      "Practise empathy",
      "Delegate and share responsibility for decision-making",
      "Help others to succeed",
      "Take responsibility for one’s own actions",
      "Manage and resolve conflict, and work collaboratively in teams",
      "Build consensus",
      "Make fair and equitable decisions",
      "Listen actively to other perspectives and ideas",
      "Negotiate effectively",
      "Encourage others to contribute",
      "Exercise leadership and take on a variety of roles within groups",
      "Give and receive meaningful feedback",
      "Advocate for one’s own rights and needs"
    ]
  },
  "Self-Management": {
    "Organization skills": [
      "Plan short- and long-term assignments; meet deadlines",
      "Create plans to prepare for summative assessments",
      // ...
      "Select and use technology effectively and productively"
    ],
    "Affective skills": [
      "Practise focus and concentration",
      "Practise strategies to develop mental focus",
      // ...
      "Practise dealing with change"
    ],
    "Reflection skills": [
      "Develop new skills, techniques, and strategies for effective learning",
      // ...
      "Keep a journal to record reflections"
    ]
  },
  Research: {
    "Information literacy skills": [
      "Collect, record, and verify data",
      // ...
      "Identify primary and secondary sources"
    ],
    "Media literacy skills": [
      "Locate, organize, analyze, evaluate, synthesize, and ethically use information",
      // ...
      "Compare, contrast, and draw connections among media resources"
    ]
  },
  Thinking: {
    "Critical-thinking skills": [
      "Practise observing carefully to recognize problems",
      // ...
      "Troubleshoot systems and applications"
    ],
    "Creative-thinking skills": [
      "Use brainstorming and visual diagrams to generate new ideas and inquiries",
      // ...
      "Practise innovation and entrepreneurship"
    ],
    "Transfer skills": [
      "Use effective learning strategies in subject groups and disciplines",
      // ...
      "Change the context of an inquiry to gain different perspectives"
    ]
  }
};

/**************************************************************
 * For question #2: "I can" statements by proficiency level
 * We'll pick 1 random statement from each "Novice", "Learner",
 * "Practitioner", "Expert" set
 **************************************************************/
const iCanStatements = {
  "Novice/Beginning (Observation)": [
    "I can recognize and describe how this skill is used by others.",
    "I can identify examples of this skill in action during the unit.",
    "I can understand the importance of this skill when I see it being applied.",
    "I can follow along when others demonstrate this skill."
  ],
  "Learner/Developing (Emulation)": [
    "I can use this skill with help or guidance from others.",
    "I can practice this skill by following examples provided.",
    "I can explain how I attempted to use this skill during the unit.",
    "I can improve my use of this skill when someone shows me how."
  ],
  "Practitioner/Using (Demonstration)": [
    "I can use this skill effectively and confidently in my work.",
    "I can independently apply this skill to different tasks or challenges.",
    "I can explain how and why I used this skill to support my learning.",
    "I can adapt this skill to new situations or problems I encounter."
  ],
  "Expert/Sharing (Self-Regulation)": [
    "I can teach others how to use this skill effectively.",
    "I can evaluate how well I used this skill and suggest ways to improve.",
    "I can use this skill naturally and adjust it as needed in different contexts.",
    "I can assess how others are using this skill and provide constructive feedback."
  ]
};

// Utility to pick one random statement from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**************************************************************
 * GLOBAL STATE
 **************************************************************/
let selectedSkills = [];
// We'll do 2 questions per skill => Q1=Likert scale, Q2=I can statement
let totalQuestions = 0;
let currentQuestionIndex = 0;

/**************************************************************
 * Toggle Category's cluster dropdown
 **************************************************************/
function toggleDropdown(id) {
  const dd = document.getElementById(id);
  if(!dd) return;
  dd.style.display = (dd.style.display==="none")?"block":"none";
}

/**************************************************************
 * Navigate Pages
 **************************************************************/
function goToPage(pageNumber) {
  document.querySelectorAll("section").forEach(sec => sec.style.display="none");
  document.getElementById(`page${pageNumber}`).style.display="block";

  if(pageNumber===2) populateSkillsSelection();
}

/**************************************************************
 * Populate Skills (Page 2)
 **************************************************************/
function populateSkillsSelection() {
  const selectedClusters = Array.from(
    document.querySelectorAll('input[name="cluster"]:checked')
  ).map(i => i.value);

  const skillsDiv = document.getElementById("skillsSelection");
  skillsDiv.innerHTML = "";

  selectedClusters.forEach(cluster => {
    // For each category
    Object.entries(categoriesAndSkills).forEach(([category, clusters])=>{
      if(clusters[cluster]) {
        const catClusterDiv = document.createElement("div");
        catClusterDiv.innerHTML = `<h3>${category} - ${cluster}</h3>`;

        clusters[cluster].forEach(skill => {
          const label = document.createElement("label");
          label.style.display="inline-flex"; // side-by-side
          label.innerHTML = `<input type="checkbox" name="skill" value="${skill}"> ${skill}`;
          catClusterDiv.appendChild(label);
        });
        skillsDiv.appendChild(catClusterDiv);
      }
    });
  });
}

/**************************************************************
 * Start Self-Assessment => Page3
 **************************************************************/
function startSelfAssessment() {
  selectedSkills = Array.from(document.querySelectorAll('input[name="skill"]:checked'))
    .map(i => i.value);

  if(selectedSkills.length===0) {
    alert("Please select at least one skill before starting the self-assessment.");
    return;
  }

  // 2 questions per skill => total=2*selectedSkills.length
  totalQuestions = selectedSkills.length*2;
  currentQuestionIndex=0;

  goToPage(3);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * Render single question (2 Q's per skill)
 **************************************************************/
function renderAssessmentQuestion(qIndex){
  const skillIdx = Math.floor(qIndex/2);
  const questionNum = qIndex %2; // 0 or 1
  const skill = selectedSkills[skillIdx];

  const container = document.getElementById("selfAssessment");
  container.innerHTML="";

  // Title
  const h2 = document.createElement("h2");
  h2.textContent = `ATL Skill: ${skill}`;
  container.appendChild(h2);

  // QUESTION 1 => "Likert scale"
  if(questionNum===0){
    // "At the start of this unit I would describe my ability to <skill> as .."
    const p = document.createElement("p");
    p.className="question";
  
