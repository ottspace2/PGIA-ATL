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
 * 1) FULL CATEGORIES & SKILLS
 **************************************************************/
const categoriesAndSkills = {
  Communication: {
    "Exchanging thoughts, messages, and information effectively": [
      "Give and receive meaningful feedback",
      "Use intercultural understanding to interpret communication",
      // ...
      "Share ideas with multiple audiences using a variety of digital environments and media"
    ],
    "Demonstrating communication through language": [
      "Read critically and for comprehension",
      // ...
      "Structure information in summaries, essays, and reports"
    ]
  },
  Social: {
    "Collaboration skills": [
      "Use social media networks appropriately to build relationships",
      // ...
      "Advocate for one’s own rights and needs"
    ]
  },
  "Self-Management": {
    "Organization skills": [
      "Plan short- and long-term assignments; meet deadlines",
      // ...
      "Select and use technology effectively and productively"
    ],
    "Affective skills": [
      "Practise focus and concentration",
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

// We'll have a global array for selectedSkills:
let selectedSkills = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;

/**************************************************************
 * 2) TOGGLE DROPDOWN (e.g., commClusters, socialClusters, etc.)
 **************************************************************/
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  dropdown.style.display = (dropdown.style.display === "none") ? "block" : "none";
}

/**************************************************************
 * 3) PAGE NAV
 **************************************************************/
function goToPage(pageNumber) {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(`page${pageNumber}`).style.display = "block";

  // If going to page2, let's populate skills
  if (pageNumber === 2) populateSkillsSelection();
}

/**************************************************************
 * 4) POPULATE SKILLS (PAGE 2)
 **************************************************************/
function populateSkillsSelection() {
  const selectedClusters = Array.from(
    document.querySelectorAll('input[name="cluster"]:checked')
  ).map(i => i.value);

  const skillsSelectionDiv = document.getElementById("skillsSelection");
  skillsSelectionDiv.innerHTML = "";

  selectedClusters.forEach(cluster => {
    // For each category
    Object.entries(categoriesAndSkills).forEach(([category, clusters]) => {
      // If this cluster is in that category
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
 * 5) START SELF-ASSESSMENT => GO PAGE3
 **************************************************************/
function startSelfAssessment() {
  selectedSkills = Array.from(
    document.querySelectorAll('input[name="skill"]:checked')
  ).map(i => i.value);

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill before starting the self-assessment.");
    return;
  }

  // Suppose 5 Q's per skill
  totalQuestions = selectedSkills.length * 5;
  currentQuestionIndex = 0;

  goToPage(3);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 6) RENDER A SINGLE QUESTION (PAGE 3)
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

  // For demonstration, let's just show a single example question
  // You'd replace with your multi-question logic (Q1..Q5):
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `Question #${questionNum + 1} about ${skill}... (replace with your Q logic)`;
  container.appendChild(p);

  // Show/hide nav
  const prevBtn = document.getElementById("prevButton");
  const nextBtn = document.getElementById("nextButton");

  prevBtn.style.display = (qIndex > 0) ? "inline-block" : "none";
  nextBtn.textContent = (qIndex < totalQuestions - 1) ? "Next" : "Submit";
}

/**************************************************************
 * 7) NAVIGATE: NEXT/PREV
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
 * 8) FINAL SUBMIT => APPS SCRIPT
 **************************************************************/
function handleFinalSubmit() {
  // Minimal example gathering only some fields
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

    category: "", 
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
 * 9) SUBMITDATA => fetch() -> Apps Script
 **************************************************************/
function submitData(obj) {
  // REPLACE with your actual Google Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec";

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
      console.error("Submission error:", err);
      alert("An error occurred while submitting data.");
    });
}
