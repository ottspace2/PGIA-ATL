/**************************************************************
 * 0) STUDENT FORM VALIDATION (PAGE 0)
 **************************************************************/
function validateStudentForm() {
  const studentID = document.getElementById("studentID").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();

  if (!studentID || !lastName || !firstName) {
    alert("Please complete required fields: Student ID, Last Name, First Name.");
    return;
  }
  // If valid, go to page1
  goToPage(1);
}

/**************************************************************
 * 1) FULL CATEGORIES & SKILLS (from your PDF)
 **************************************************************/
const categoriesAndSkills = {
  Communication: {
    "Exchanging thoughts, messages, and information effectively": [
      "Give and receive meaningful feedback",
      // ... plus the rest of the skill strings ...
    ],
    "Demonstrating communication through language": [
      // ...
    ]
  },
  Social: {
    "Collaboration skills": [
      // ...
    ]
  },
  // continue with Self-Management, Research, Thinking
};

/**************************************************************
 * 2) PROFICIENCY LEVELS, ETC.
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

// We'll have a global array for selectedSkills:
let selectedSkills = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;

/**************************************************************
 * 3) TOGGLE DROPDOWN
 **************************************************************/
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.style.display = (dropdown.style.display === "none") ? "block" : "none";
}

/**************************************************************
 * 4) PAGE NAV
 **************************************************************/
function goToPage(pageNumber) {
  document.querySelectorAll("section").forEach(sec => (sec.style.display = "none"));
  document.getElementById(`page${pageNumber}`).style.display = "block";

  if (pageNumber === 2) {
    populateSkillsSelection();
  }
}

/**************************************************************
 * 5) POPULATE SKILLS (PAGE 2)
 **************************************************************/
function populateSkillsSelection() {
  const selectedClusters = Array.from(
    document.querySelectorAll('input[name="cluster"]:checked')
  ).map(i => i.value);

  const skillsSelectionDiv = document.getElementById("skillsSelection");
  skillsSelectionDiv.innerHTML = "";

  selectedClusters.forEach(cluster => {
    Object.entries(categoriesAndSkills).forEach(([category, clusters]) => {
      if (clusters[cluster]) {
        const clusterDiv = document.createElement("div");
        clusterDiv.innerHTML = `<h3>${category} - ${cluster}</h3>`;
        clusters[cluster].forEach(skill => {
          const label = document.createElement("label");
          label.style.display = "block";
          label.innerHTML = `<input type="checkbox" name="skill" value="${skill}"> ${skill}`;
          clusterDiv.appendChild(label);
        });
        skillsSelectionDiv.appendChild(clusterDiv);
      }
    });
  });
}

/**************************************************************
 * 6) START SELF-ASSESSMENT => GO PAGE 3
 **************************************************************/
function startSelfAssessment() {
  selectedSkills = Array.from(document.querySelectorAll('input[name="skill"]:checked'))
    .map(i => i.value);

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill before starting the self-assessment.");
    return;
  }

  // 5 Q's per skill
  totalQuestions = selectedSkills.length * 5;
  currentQuestionIndex = 0;

  goToPage(3);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 7) RENDER A SINGLE QUESTION
 **************************************************************/
function renderAssessmentQuestion(qIndex) {
  const skillIndex = Math.floor(qIndex / 5);
  const questionNum = qIndex % 5;
  const skill = selectedSkills[skillIndex];

  const container = document.getElementById("selfAssessment");
  container.innerHTML = "";

  const titleEl = document.createElement("h2");
  titleEl.textContent = `ATL Skill: ${skill}`;
  container.appendChild(titleEl);

  switch (questionNum) {
    case 0: showLikertQuestion(container, skillIndex, skill); break;
    case 1: showProficiencyQuestion(container, skillIndex, skill); break;
    case 2: showShortResponseQ3(container, skillIndex, skill); break;
    case 3: showShortResponseQ4(container, skillIndex, skill); break;
    case 4: showIbLearnerProfileQ5(container, skillIndex, skill); break;
  }

  // Nav
  const prevBtn = document.getElementById("prevButton");
  const nextBtn = document.getElementById("nextButton");

  prevBtn.style.display = (qIndex > 0) ? "inline-block" : "none";
  nextBtn.textContent = (qIndex < totalQuestions - 1) ? "Next" : "Submit";
}

/**************************************************************
 * 8) Q1: HORIZONTAL LIKERT
 **************************************************************/
function showLikertQuestion(container, skillIndex, skill) {
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `At the start of this unit, I would describe my ability to ${skill} as...`;
  container.appendChild(p);

  const scaleDiv = document.createElement("div");
  scaleDiv.style.display = "flex";
  scaleDiv.style.flexDirection = "row";
  scaleDiv.style.justifyContent = "center";
  scaleDiv.style.gap = "40px";
  scaleDiv.style.marginTop = "20px";

  const scaleOptions = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Learner" },
    { value: 3, label: "Practitioner" },
    { value: 4, label: "Expert" }
  ];

  scaleOptions.forEach(opt => {
    const col = document.createElement("div");
    col.style.display = "flex";
    col.style.flexDirection = "column";
    col.style.alignItems = "center";

    const numberLabel = document.createElement("div");
    numberLabel.textContent = opt.value;
    numberLabel.style.fontWeight = "bold";
    numberLabel.style.marginBottom = "8px";
    col.appendChild(numberLabel);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `Q1-skill${skillIndex}`;
    radio.value = String(opt.value);
    radio.style.marginBottom = "4px";
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
 * 9) Q2: RANDOM PROFICIENCY
 **************************************************************/
function showProficiencyQuestion(container, skillIndex, skill) {
  const prompt = document.createElement("p");
  prompt.className = "question";
  prompt.textContent = `Reflecting on your progress and growth in this unit, select the statement that best applies to your current ability to ${skill}...`;
  container.appendChild(prompt);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  Object.entries(proficiencyLevels).forEach(([level, statements]) => {
    // pick random statement from that level
    const rnd = Math.floor(Math.random() * statements.length);
    const randomStatement = statements[rnd];

    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="Q2-skill${skillIndex}" value="${level}">
      ${randomStatement}
    `;
    optionsDiv.appendChild(label);
  });
  container.appendChild(optionsDiv);
}

/**************************************************************
 * 10) Q3: SHORT RESPONSE #1
 **************************************************************/
function showShortResponseQ3(container, skillIndex, skill) {
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `Describe one way I used ${skill} and what could I do to improve in the future?`;
  container.appendChild(p);

  const textarea = document.createElement("textarea");
  textarea.name = `Q3-skill${skillIndex}`;
  textarea.rows = 4;
  textarea.style.width = "100%";
  container.appendChild(textarea);
}

/**************************************************************
 * 11) Q4: SHORT RESPONSE #2
 **************************************************************/
function showShortResponseQ4(container, skillIndex, skill) {
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `What is one challenge you experienced related to ${skill} and how did you overcome it?`;
  container.appendChild(p);

  const textarea = document.createElement("textarea");
  textarea.name = `Q4-skill${skillIndex}`;
  textarea.rows = 4;
  textarea.style.width = "100%";
  container.appendChild(textarea);
}

/**************************************************************
 * 12) Q5: IB LEARNER PROFILE
 **************************************************************/
function showIbLearnerProfileQ5(container, skillIndex, skill) {
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `If someone were observing you practicing this skill, which IB learner profile trait would they say you demonstrated? Why?`;
  container.appendChild(p);

  const ibTraits = [
    { trait: "Inquirer", example: "I used research skills to locate, analyze, and synthesize information." },
    { trait: "Knowledgeable", example: "I applied discipline-specific terms effectively in a solution." },
    { trait: "Thinker", example: "I used critical-thinking to evaluate evidence and draw a reasoned conclusion." },
    { trait: "Communicator", example: "I practiced intercultural understanding to collaborate with diverse peers." },
    { trait: "Principled", example: "I took responsibility for meeting deadlines and commitments." },
    { trait: "Open-minded", example: "I actively listened to different perspectives during problem-solving." },
    { trait: "Caring", example: "I helped a classmate improve their understanding of a topic." },
    { trait: "Risk-Taker", example: "I tried a new approach or presented a unique idea in a discussion." },
    { trait: "Balanced", example: "I managed my time effectively while maintaining personal well-being." },
    { trait: "Reflective", example: "I considered the strengths and weaknesses of my strategies during a presentation." }
  ];

  const select = document.createElement("select");
  select.name = `Q5-select${skillIndex}`;
  select.style.display = "block";
  select.style.marginBottom = "10px";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select IB learner profile trait...";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  ibTraits.forEach(obj => {
    const opt = document.createElement("option");
    opt.value = obj.trait;
    opt.textContent = `${obj.trait} (${obj.example})`;
    select.appendChild(opt);
  });
  container.appendChild(select);

  const textArea = document.createElement("textarea");
  textArea.name = `Q5-skill${skillIndex}`;
  textArea.rows = 4;
  textArea.style.width = "100%";
  textArea.placeholder = "Explain why they'd see that trait...";
  container.appendChild(textArea);
}

/**************************************************************
 * 13) NEXT/PREV
 **************************************************************/
function navigateSkill(direction) {
  currentQuestionIndex += direction;

  if (currentQuestionIndex >= totalQuestions) {
    // final
    handleFinalSubmit();
    return;
  }
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = 0;
  }

  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 14) SUBMIT => APPS SCRIPT
 **************************************************************/
function handleFinalSubmit() {
  // For simplicity, we demonstrate minimal data. 
  // In practice, gather all Q1..Q5 for each skill from the DOM.
  const data = {
    studentID: document.getElementById("studentID").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    firstName: document.getElementById("firstName").value.trim(),
    date: document.getElementById("dateField").value.trim(),
    gradeLevel: document.getElementById("gradeLevel").value.trim(),
    className: document.getElementById("classField").value.trim(),
    cohortYear: document.getElementById("cohortYear").value.trim(),
    advisory: document.getElementById("advisoryGroup").value.trim(),
    teacher: document.getElementById("teacher").value.trim(),

    category: "",  // you'd store or compute
    cluster: "",
    skill: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: ""
  };

  submitData(data);
}

/**************************************************************
 * 15) SUBMIT DATA VIA fetch()
 **************************************************************/
function submitData(obj) {
  // The Web App URL from your Google Apps Script deployment:
  const scriptUrl = "https://script.google.com/macros/s/AKfycbxac8wENzpyU03bIM2vFaF5hGPSG5aTumO9zo5agm_L4JHCu4xCyUsWA4hbbrKdUvwVKw/exec";

  fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(result => {
      if (result.status === "success") {
        alert("Data submitted successfully!");
      } else {
        alert("Error submitting data: " + (result.message || "Unknown error."));
      }
    })
    .catch(err => {
      console.error(err);
      alert("An error occurred while submitting data.");
    });
}
