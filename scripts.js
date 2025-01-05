/**************************************************************
 * 0) LANDING PAGE VALIDATION
 **************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  // Event listener for Continue button on Page 0
  document.getElementById('continueButton').addEventListener('click', validateStudentForm);

  // Event listeners for category checkboxes on Page 1
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      toggleDropdown(`${this.id.replace('Checkbox', 'Clusters')}`);
    });
  });

  // Event listener for Next button on Page 1
  document.getElementById('nextButtonPage1').addEventListener('click', function() {
    const clustersChosen = Array.from(document.querySelectorAll('input[name="cluster"]:checked')).map(i => i.value);
    if (clustersChosen.length === 0) {
      alert("Please select at least one cluster to proceed.");
      return;
    }
    goToPage(2);
  });

  // Event listener for Start Assessment button on Page 2
  document.getElementById('startAssessmentButton').addEventListener('click', startSelfAssessment);

  // Event listener for Next button on Page 3
  document.getElementById('nextButton').addEventListener('click', navigateSkill);

  // Enhance date field interaction
  const dateField = document.getElementById('dateField');
  dateField.addEventListener('click', function() {
    this.showPicker ? this.showPicker() : null; // Fallback if showPicker is supported
  });
});

/**************************************************************
 * 1) FULL LIST of CATEGORIES & SKILLS from PDF
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
      "Keep and use a weekly planner for assignments",
      "Set goals that are challenging and realistic",
      "Plan strategies and take action to achieve personal and academic goals",
      "Bring necessary equipment and supplies to class",
      "Keep an organized and logical system of information files/notebooks",
      "Use appropriate strategies for organizing complex information",
      "Understand and use sensory learning preferences (learning styles)",
      "Select and use technology effectively and productively"
    ],
    "Affective skills": [
      "Practise focus and concentration",
      "Practise strategies to develop mental focus",
      "Practise strategies to overcome distractions",
      "Practise being aware of body–mind connections",
      "Demonstrate persistence and perseverance",
      "Practise delaying gratification",
      "Practise strategies to overcome impulsiveness and anger",
      "Practise strategies to prevent and eliminate bullying",
      "Practise strategies to reduce stress and anxiety",
      "Practise analyzing and attributing causes for failure",
      "Practise managing self-talk",
      "Practise positive thinking",
      "Practise “bouncing back” after adversity, mistakes, and failures",
      "Practise “failing well”",
      "Practise dealing with disappointment and unmet expectations",
      "Practise dealing with change"
    ],
    "Reflection skills": [
      "Develop new skills, techniques, and strategies for effective learning",
      "Identify strengths and weaknesses of personal learning strategies (self-assessment)",
      "Demonstrate flexibility in the selection and use of learning strategies",
      "Try new ATL skills and evaluate their effectiveness",
      "Consider content: What did I learn about today?",
      "Consider content: What don’t I yet understand?",
      "Consider content: What questions do I have now?",
      "Consider ATL skills development: What can I already do?",
      "Consider ATL skills development: How can I share my skills to help peers who need more practice?",
      "Consider ATL skills development: What will I work on next?",
      "Consider personal learning strategies: What can I do to become a more efficient and effective learner?",
      "Consider personal learning strategies: How can I become more flexible in my choice of learning strategies?",
      "Consider personal learning strategies: What factors are important for helping me learn well?",
      "Focus on the process of creating by imitating the work of others",
      "Consider ethical, cultural, and environmental implications",
      "Keep a journal to record reflections"
    ]
  },
  Research: {
    "Information literacy skills": [
      "Collect, record, and verify data",
      "Access information to be informed and inform others",
      "Make connections between various sources of information",
      "Understand the benefits and limitations of personal sensory learning preferences",
      "Use memory techniques to develop long-term memory",
      "Present information in a variety of formats and platforms",
      "Collect and analyze data to identify solutions and make informed decisions",
      "Process data and report results",
      "Evaluate and select information sources and digital tools based on their appropriateness",
      "Understand and use technology systems",
      "Use critical literacy skills to analyze and interpret media communications",
      "Understand and implement intellectual property rights",
      "Create references and citations",
      "Identify primary and secondary sources"
    ],
    "Media literacy skills": [
      "Locate, organize, analyze, evaluate, synthesize, and ethically use information",
      "Demonstrate awareness of media interpretations of events and ideas",
      "Make informed choices about personal viewing experiences",
      "Understand the impact of media representations",
      "Seek a range of perspectives from multiple sources",
      "Communicate information and ideas effectively to multiple audiences",
      "Compare, contrast, and draw connections among media resources"
    ]
  },
  Thinking: {
    "Critical-thinking skills": [
      "Practise observing carefully to recognize problems",
      "Gather and organize relevant information to formulate an argument",
      "Recognize unstated assumptions and bias",
      "Interpret data",
      "Recognize and evaluate propositions",
      "Evaluate evidence and arguments",
      "Draw reasonable conclusions and generalizations",
      "Test generalizations and conclusions",
      "Revise understanding based on new information and evidence",
      "Evaluate and manage risk",
      "Formulate factual, topical, conceptual, and debatable questions",
      "Consider ideas from multiple perspectives",
      "Develop contrary or opposing arguments",
      "Analyze complex concepts and projects into their constituent parts and synthesize them to create new understanding",
      "Propose and evaluate a variety of solutions",
      "Identify obstacles and challenges",
      "Use models and simulations to explore complex systems and issues",
      "Identify trends and forecast possibilities",
      "Troubleshoot systems and applications"
    ],
    "Creative-thinking skills": [
      "Use brainstorming and visual diagrams to generate new ideas and inquiries",
      "Consider multiple alternatives, including those that might be unlikely or impossible",
      "Create novel solutions to authentic problems",
      "Make unexpected or unusual connections between objects and/or ideas",
      "Design improvements to existing machines, media, and technologies",
      "Design new machines, media, and technologies",
      "Practise flexible thinking—develop multiple opposing, contradictory, and complementary arguments",
      "Practise visible thinking strategies and techniques",
      "Generate metaphors and analogies",
      "Apply existing knowledge to generate new ideas, products, or processes",
      "Make guesses, ask “what if” questions, and generate testable hypotheses",
      "Practise innovation and entrepreneurship"
    ],
    "Transfer skills": [
      "Use effective learning strategies in subject groups and disciplines",
      "Apply skills and knowledge in unfamiliar situations",
      "Inquire in different contexts to gain a different perspective",
      "Compare conceptual understanding across multiple subject groups and disciplines",
      "Make connections between subject groups and disciplines",
      "Combine knowledge, understanding, and skills to create products or solutions",
      "Transfer current knowledge to learning of new technologies",
      "Change the context of an inquiry to gain different perspectives"
    ]
  }
};

/**************************************************************
 * 2) Q2 => "I CAN" statements for a random single statement
 **************************************************************/
const proficiencyLevels = {
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

// IB Learner traits
const ibLearnerTraits = [
  { trait:"Inquirer", example:"I demonstrated being an inquirer by using research skills..." },
  { trait:"Knowledgeable", example:"I was knowledgeable when I applied discipline-specific terms..." },
  { trait:"Thinker", example:"I showed myself as a thinker by using critical-thinking skills..." },
  { trait:"Communicator", example:"I embodied the role of a communicator by practicing intercultural understanding..." },
  { trait:"Principled", example:"I demonstrated being principled by taking responsibility..." },
  { trait:"Open-minded", example:"I showed open-mindedness by actively listening..." },
  { trait:"Caring", example:"I was caring by helping a classmate improve their understanding..." },
  { trait:"Risk-Taker", example:"I demonstrated being a risk-taker by trying a new approach..." },
  { trait:"Balanced", example:"I showed balance by managing my time effectively..." },
  { trait:"Reflective", example:"I was reflective by considering the strengths and weaknesses..." }
];

/**************************************************************
 * 3) GLOBAL
 **************************************************************/
let selectedSkills = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;
let responses = {}; // To store user responses
let proficiencyStatements = {}; // To store random proficiency statements per skill

/**************************************************************
 * 4) TOGGLE DROPDOWN
 **************************************************************/
function toggleDropdown(id){
  const dd = document.getElementById(id);
  if(!dd) return;
  dd.classList.toggle('show');
}

/**************************************************************
 * 5) PAGE NAV
 **************************************************************/
function goToPage(num){
  document.querySelectorAll("section").forEach(sec => sec.classList.add('hidden'));
  document.getElementById(`page${num}`).classList.remove('hidden');

  if(num === 2){
    populateSkillsSelection();
  }
  if(num === 3){
    // Any specific actions when entering page 3
  }
}

/**************************************************************
 * 6) POPULATE SKILLS => PAGE2
 **************************************************************/
function populateSkillsSelection(){
  const clustersChosen = Array.from(
    document.querySelectorAll('input[name="cluster"]:checked')
  ).map(i => i.value);

  const skillsDiv = document.getElementById("skillsSelection");
  skillsDiv.innerHTML = "";

  const clusterToCategory = {};
  // Preprocess for efficient lookup
  Object.entries(categoriesAndSkills).forEach(([cat, clusters]) => {
    Object.entries(clusters).forEach(([cluName, skills]) => {
      clusterToCategory[cluName] = { category: cat, skills: skills };
    });
  });

  clustersChosen.forEach(cluster => {
    const { category, skills } = clusterToCategory[cluster];
    if(category && skills){
      const catDiv = document.createElement("div");
      catDiv.classList.add("skill-category");
      catDiv.innerHTML = `<h3>${category} - ${cluster}</h3>`;
      skills.forEach(skill => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" name="skill" value="${skill}"> ${skill}`;
        catDiv.appendChild(label);
      });
      skillsDiv.appendChild(catDiv);
    }
  });
}

/**************************************************************
 * 7) START SELF-ASSESSMENT => PAGE3
 **************************************************************/
function startSelfAssessment(){
  selectedSkills = Array.from(
    document.querySelectorAll('input[name="skill"]:checked')
  ).map(i => i.value);

  if(!selectedSkills.length){
    alert("Please select at least one skill before starting the self-assessment.");
    return;
  }

  // Initialize proficiency statements for consistency
  selectedSkills.forEach((skill, index) => {
    proficiencyStatements[skill] = {};
    Object.keys(proficiencyLevels).forEach(level => {
      proficiencyStatements[skill][level] = pickRandom(proficiencyLevels[level]);
    });
  });

  // 5 questions per skill
  totalQuestions = selectedSkills.length * 5;
  currentQuestionIndex = 0;

  goToPage(3);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 8) RENDER SINGLE Q
 **************************************************************/
function renderAssessmentQuestion(qIndex){
  const skillIndex = Math.floor(qIndex / 5);
  const questionNum = qIndex % 5;
  const skill = selectedSkills[skillIndex];

  const container = document.getElementById("selfAssessment");
  container.innerHTML = "";

  // Container for each skill
  const skillContainer = document.createElement("div");
  skillContainer.classList.add("skill-container");
  container.appendChild(skillContainer);

  // Title
  const h2 = document.createElement("h3");
  h2.textContent = `ATL Skill: ${skill}`;
  skillContainer.appendChild(h2);

  // Question
  const p = document.createElement("p");
  p.className = "question";

  switch(questionNum){
    case 0: // Q1 => LIKERT
      p.textContent = `At the start of this unit, I would describe my ability to "${skill}" as...`;
      skillContainer.appendChild(p);
      showLikertQuestion(skillContainer, skillIndex, skill);
      break;
    case 1: // Q2 => PROFICIENCY
      p.textContent = `Reflecting on your progress this unit, select the statement that best applies to your current ability to "${skill}"...`;
      skillContainer.appendChild(p);
      showProficiencyQuestion(skillContainer, skillIndex, skill);
      break;
    case 2: // Q3 => SHORT RESP #1
      p.textContent = `Describe one way I used ${skill} and what could I do to improve in the future?`;
      skillContainer.appendChild(p);
      showShortResponseQ3(skillContainer, skillIndex, skill);
      break;
    case 3: // Q4 => SHORT RESP #2
      p.textContent = `What is one challenge you experienced related to ${skill}, and how did you overcome it?`;
      skillContainer.appendChild(p);
      showShortResponseQ4(skillContainer, skillIndex, skill);
      break;
    case 4: // Q5 => IB Learner trait
      p.textContent = `If someone were observing you practicing this skill, which IB learner profile trait would they say you demonstrated? Why?`;
      skillContainer.appendChild(p);
      showIbLearnerProfileQ5(skillContainer, skillIndex, skill);
      break;
    default:
      console.error("Unknown question number:", questionNum);
  }

  // Update Next button text
  document.getElementById("nextButton").textContent = (qIndex < totalQuestions -1) ? "Next" : "Submit";
}

/**************************************************************
 * 9) Q1 => LIKERT
 **************************************************************/
function showLikertQuestion(container, skillIndex, skill){
  const scaleDiv = document.createElement("div");
  scaleDiv.classList.add("scaleDiv");

  const scaleOpts = [
    {value:"1", label:"Beginner"},
    {value:"2", label:"Learner"},
    {value:"3", label:"Practitioner"},
    {value:"4", label:"Expert"}
  ];

  scaleOpts.forEach(opt => {
    const col = document.createElement("div");
    col.classList.add("scaleCol");

    const numberLabel = document.createElement("div");
    numberLabel.textContent = opt.value;
    numberLabel.style.fontWeight = "bold";
    col.appendChild(numberLabel);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `Q1-skill${skillIndex}`;
    radio.value = opt.value;
    col.appendChild(radio);

    const belowLabel = document.createElement("div");
    belowLabel.textContent = opt.label;
    belowLabel.style.fontStyle = "italic";
    col.appendChild(belowLabel);

    scaleDiv.appendChild(col);
  });

  container.appendChild(scaleDiv);
}

/**************************************************************
 * 10) Q2 => PROFICIENCY
 **************************************************************/
function showProficiencyQuestion(container, skillIndex, skill){
  const opsDiv = document.createElement("div");
  opsDiv.className = "options";

  const proficiencyLevelsOrdered = [
    "Novice/Beginning (Observation)",
    "Learner/Developing (Emulation)",
    "Practitioner/Using (Demonstration)",
    "Expert/Sharing (Self-Regulation)"
  ];

  proficiencyLevelsOrdered.forEach(level => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="Q2-skill${skillIndex}" value="${level}"> ${proficiencyStatements[skill][level]}`;
    opsDiv.appendChild(label);
  });

  container.appendChild(opsDiv);
}

/**************************************************************
 * 11) Q3 => SHORT RESP #1
 **************************************************************/
function showShortResponseQ3(container, skillIndex, skill){
  const ta = document.createElement("textarea");
  ta.name = `Q3-skill${skillIndex}`;
  ta.rows = 4;
  ta.placeholder = "Describe your experience...";
  container.appendChild(ta);
}

/**************************************************************
 * 12) Q4 => SHORT RESP #2
 **************************************************************/
function showShortResponseQ4(container, skillIndex, skill){
  const ta = document.createElement("textarea");
  ta.name = `Q4-skill${skillIndex}`;
  ta.rows = 4;
  ta.placeholder = "Describe the challenge and your solution...";
  container.appendChild(ta);
}

/**************************************************************
 * 13) Q5 => IB Learner trait
 **************************************************************/
function showIbLearnerProfileQ5(container, skillIndex, skill){
  const select = document.createElement("select");
  select.name = `Q5-select${skillIndex}`;
  select.required = true;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select IB learner profile trait...";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  ibLearnerTraits.forEach(obj => {
    const opt = document.createElement("option");
    opt.value = obj.trait;
    opt.textContent = `${obj.trait} (${obj.example})`;
    select.appendChild(opt);
  });
  container.appendChild(select);

  const ta = document.createElement("textarea");
  ta.name = `Q5-skill${skillIndex}`;
  ta.rows = 4;
  ta.placeholder = "Explain why that trait was demonstrated...";
  ta.required = true;
  container.appendChild(ta);
}

/**************************************************************
 * 14) NEXT/PREV
 **************************************************************/
function navigateSkill(){
  // Validate current question before proceeding
  if(!validateCurrentQuestion()){
    alert("Please answer the current question before proceeding.");
    return;
  }

  // Save current response
  saveCurrentResponse();

  currentQuestionIndex++;

  if(currentQuestionIndex >= totalQuestions){
    handleFinalSubmit();
    return;
  }

  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 15) VALIDATE CURRENT QUESTION
 **************************************************************/
function validateCurrentQuestion(){
  const skillIndex = Math.floor(currentQuestionIndex / 5);
  const questionNum = currentQuestionIndex % 5;
  const skill = selectedSkills[skillIndex];

  switch(questionNum){
    case 0: // Q1 => LIKERT
      return document.querySelector(`input[name="Q1-skill${skillIndex}"]:checked`) !== null;
    case 1: // Q2 => PROFICIENCY
      return document.querySelector(`input[name="Q2-skill${skillIndex}"]:checked`) !== null;
    case 2: // Q3 => SHORT RESP #1
      return document.querySelector(`textarea[name="Q3-skill${skillIndex}"]`).value.trim() !== "";
    case 3: // Q4 => SHORT RESP #2
      return document.querySelector(`textarea[name="Q4-skill${skillIndex}"]`).value.trim() !== "";
    case 4: // Q5 => IB Learner trait
      const selectVal = document.querySelector(`select[name="Q5-select${skillIndex}"]`).value;
      const textVal = document.querySelector(`textarea[name="Q5-skill${skillIndex}"]`).value.trim();
      return selectVal !== "" && textVal !== "";
    default:
      return false;
  }
}

/**************************************************************
 * 16) SAVE CURRENT RESPONSE
 **************************************************************/
function saveCurrentResponse(){
  const skillIndex = Math.floor(currentQuestionIndex / 5);
  const questionNum = currentQuestionIndex % 5;
  const skill = selectedSkills[skillIndex];

  if(!responses[skill]) {
    responses[skill] = {};
  }

  switch(questionNum){
    case 0: // Q1 => LIKERT
      const q1 = document.querySelector(`input[name="Q1-skill${skillIndex}"]:checked`).value;
      responses[skill].q1 = q1;
      break;
    case 1: // Q2 => PROFICIENCY
      const q2 = document.querySelector(`input[name="Q2-skill${skillIndex}"]:checked`).value;
      responses[skill].q2 = q2;
      break;
    case 2: // Q3 => SHORT RESP #1
      const q3 = document.querySelector(`textarea[name="Q3-skill${skillIndex}"]`).value.trim();
      responses[skill].q3 = q3;
      break;
    case 3: // Q4 => SHORT RESP #2
      const q4 = document.querySelector(`textarea[name="Q4-skill${skillIndex}"]`).value.trim();
      responses[skill].q4 = q4;
      break;
    case 4: // Q5 => IB Learner trait
      const q5_sel = document.querySelector(`select[name="Q5-select${skillIndex}"]`).value;
      const q5_txt = document.querySelector(`textarea[name="Q5-skill${skillIndex}"]`).value.trim();
      responses[skill].q5 = `${q5_sel} - ${q5_txt}`;
      break;
    default:
      console.error("Unknown question number:", questionNum);
  }
}

/**************************************************************
 * 17) START SELF-ASSESSMENT
 **************************************************************/
// Already implemented in event listener

/**************************************************************
 * 18) RENDER ASSESSMENT QUESTION
 **************************************************************/
// Already implemented in renderAssessmentQuestion

/**************************************************************
 * 19) HANDLE FINAL SUBMIT => Post multiple rows (each skill)
 **************************************************************/
function handleFinalSubmit(){
  // Gather user info from page0
  const studentID = document.getElementById("studentID").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const dateField = document.getElementById("dateField").value.trim();
  const grade     = document.getElementById("gradeLevel").value.trim();
  const className = document.getElementById("classField").value.trim();
  const cohort    = document.getElementById("cohortYear").value.trim();
  const advisory  = document.getElementById("advisoryGroup").value.trim();
  const teacher   = document.getElementById("teacher").value.trim();

  let tasks = [];

  selectedSkills.forEach((skill, index) => {
    // Find category & cluster from the skill
    let foundCategory = "";
    let foundCluster = "";
    outer: for(const [cat, clusters] of Object.entries(categoriesAndSkills)){
      for(const [cluName, skillArr] of Object.entries(clusters)){
        if(skillArr.includes(skill)){
          foundCategory = cat;
          foundCluster = cluName;
          break outer;
        }
      }
    }

    const dataObj = {
      studentID,
      lastName,
      firstName,
      date: dateField,
      gradeLevel: grade,
      className,
      cohortYear: cohort,
      advisoryGroup: advisory,
      teacher,
      category: foundCategory,
      cluster: foundCluster,
      skill,
      q1: responses[skill]?.q1 || "",
      q2: responses[skill]?.q2 || "",
      q3: responses[skill]?.q3 || "",
      q4: responses[skill]?.q4 || "",
      q5: responses[skill]?.q5 || ""
    };

    tasks.push(submitDataForSkill(dataObj));
  });

  Promise.all(tasks)
    .then(()=>{
      alert("All self-assessments submitted successfully!");
      // Optionally, reset the form or redirect the user
      window.location.reload();
    })
    .catch(err=>{
      console.error("Error in final submission:", err);
      alert("Error submitting data. See console for details.");
    });
}

/**************************************************************
 * 20) Submit row to Google Apps Script
 **************************************************************/
function submitDataForSkill(obj){
  const scriptUrl = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; // Replace with your deployment URL

  return fetch(scriptUrl, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(obj)
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(res=>{
    if(res.status !== "success"){
      throw new Error(res.message || "Unknown error from Apps Script");
    }
  });
}

/**************************************************************
 * 21) RANDOM ARRAY PICK
 **************************************************************/
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
