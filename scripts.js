/* scripts.js */

/**************************************************************
 * 0) INITIALIZATION: SET UP EVENT LISTENERS AFTER DOM LOADS
 **************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed.");

  // Event listener for Continue button on Landing Page (page0)
  const continueButton = document.getElementById('continueButton');
  if (continueButton) {
    continueButton.addEventListener('click', function() {
      console.log("Continue button clicked. Navigating to page1.");
      goToPage(1);
    });
  } else {
    console.error("Continue button not found!");
  }

  // Event listener for Next button on Page 1 (Student Info) (page1)
  const nextButtonPage1 = document.getElementById('nextButtonPage1');
  if (nextButtonPage1) {
    nextButtonPage1.addEventListener('click', function() {
      console.log("Next button on page1 clicked. Validating form.");
      if (validateStudentForm()) {
        console.log("Form validated. Navigating to page2.");
        goToPage(2);
      }
    });
  } else {
    console.error("Next button on page1 not found!");
  }

  // Event listeners for category checkboxes on Page 2 (Categories & Clusters) (page2)
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      console.log(`Category checkbox changed: ${this.value}. Toggling dropdown.`);
      toggleDropdown(`${this.id.replace('Checkbox', 'Clusters')}`);
    });
  });

  // Event listener for Next button on Page 2 (Categories & Clusters) (page2)
  const nextButtonPage2 = document.getElementById('nextButtonPage2');
  if (nextButtonPage2) {
    nextButtonPage2.addEventListener('click', function() {
      console.log("Next button on page2 clicked. Checking selected clusters.");
      const clustersChosen = Array.from(document.querySelectorAll('input[name="cluster"]:checked')).map(i => i.value);
      if (clustersChosen.length === 0) {
        alert("Please select at least one cluster to proceed.");
        console.log("No clusters selected. Alerting user.");
        return;
      }
      console.log(`Clusters selected: ${clustersChosen.join(", ")}. Navigating to page3.`);
      goToPage(3);
    });
  } else {
    console.error("Next button on page2 not found!");
  }

  // Event listener for Start Assessment button on Page 3 (Skills Selection) (page3)
  const startAssessmentButton = document.getElementById('startAssessmentButton');
  if (startAssessmentButton) {
    startAssessmentButton.addEventListener('click', function() {
      console.log("Start Assessment button clicked. Starting self-assessment.");
      startSelfAssessment();
    });
  } else {
    console.error("Start Assessment button not found!");
  }

  // Event listener for Next button on Page 4 (Self-Assessment) (page4)
  const nextButton = document.getElementById('nextButton');
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      console.log("Next button on page4 clicked. Navigating through questions or submitting.");
      navigateSkill();
    });
  } else {
    console.error("Next button on page4 not found!");
  }

  // Enhance date field interaction: Clicking anywhere on the date field triggers the date picker
  const dateField = document.getElementById('dateField');
  if(dateField) {
    dateField.addEventListener('click', function() {
      console.log("Date field clicked. Attempting to show date picker.");
      // For browsers that support showPicker (Chrome, Edge, etc.)
      if (typeof dateField.showPicker === 'function') {
        dateField.showPicker();
      }
    });
  }
});

/**************************************************************
 * 1) DEFINING CATEGORIES & SKILLS
 **************************************************************/
const categoriesAndSkills = {
  // ... (Same as previously provided)
  // [Omitted for brevity; ensure this matches the HTML structure]
};

/**************************************************************
 * 2) PROFICIENCY LEVEL STATEMENTS
 **************************************************************/
const proficiencyLevels = {
  // ... (Same as previously provided)
  // [Omitted for brevity]
};

/**************************************************************
 * 3) IB LEARNER TRAITS
 **************************************************************/
const ibLearnerTraits = [
  // ... (Same as previously provided)
  // [Omitted for brevity]
];

/**************************************************************
 * 4) GLOBAL VARIABLES
 **************************************************************/
let selectedSkills = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;
let responses = {}; // To store user responses
let proficiencyStatements = {}; // To store random proficiency statements per skill

// Secret Token (Ensure this matches the one set in your Google Apps Script)
const SECRET_TOKEN = "your-secret-token"; // Replace with your actual secret token

// Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFqBZxSilArZ-iGaxBC1TA2DcdpJ_T-7AfiWvKwUE__R8PIfc0QFNtd9Ak8-T0BwV07g/exec";

/**************************************************************
 * 5) TOGGLE DROPDOWN FUNCTION: SHOW/HIDE CLUSTERS
 **************************************************************/
function toggleDropdown(id){
  const dd = document.getElementById(id);
  if(!dd) {
    console.error(`Dropdown with id ${id} not found.`);
    return;
  }
  dd.classList.toggle('hidden');
  console.log(`Toggled dropdown for ${id}`);
}

/**************************************************************
 * 6) PAGE NAVIGATION FUNCTION: SWITCH BETWEEN SECTIONS
 **************************************************************/
function goToPage(num){
  console.log(`Navigating to page${num}`);
  document.querySelectorAll("section").forEach(sec => sec.classList.add('hidden'));
  const targetPage = document.getElementById(`page${num}`);
  if(targetPage){
    targetPage.classList.remove('hidden');
    console.log(`Displayed page${num}`);
  } else {
    console.error(`Page${num} does not exist.`);
  }

  if(num === 3){
    populateSkillsSelection();
  }
  if(num === 4){
    // Any specific actions when entering page4
  }
}

/**************************************************************
 * 7) VALIDATE STUDENT FORM FUNCTION: PAGE 1
 **************************************************************/
function validateStudentForm() {
  console.log("Validating student form.");
  const studentID = document.getElementById("studentID").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();

  if(!studentID || !lastName || !firstName) {
    alert("Please complete required fields: Student ID, Last Name, First Name.");
    console.log("Validation failed: Missing required fields.");
    return false;
  }
  console.log("Validation successful.");
  return true;
}

/**************************************************************
 * 8) POPULATE SKILLS SELECTION FUNCTION: PAGE 3
 **************************************************************/
function populateSkillsSelection(){
  console.log("Populating skills selection based on selected clusters.");
  const clustersChosen = Array.from(
    document.querySelectorAll('input[name="cluster"]:checked')
  ).map(i => i.value);

  const skillsDiv = document.getElementById("skillsSelection");
  skillsDiv.innerHTML = "";

  if(clustersChosen.length === 0){
    skillsDiv.innerHTML = "<p>No clusters selected. Please go back and select at least one cluster.</p>";
    console.log("No clusters selected.");
    return;
  }

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
      console.log(`Added skills for cluster: ${cluster}`);
    } else {
      console.error(`No mapping found for cluster: ${cluster}`);
    }
  });
}

/**************************************************************
 * 9) START SELF-ASSESSMENT FUNCTION: INITIATE ASSESSMENT
 **************************************************************/
function startSelfAssessment(){
  console.log("Starting self-assessment.");
  selectedSkills = Array.from(
    document.querySelectorAll('input[name="skill"]:checked')
  ).map(i => i.value);

  if(!selectedSkills.length){
    alert("Please select at least one skill before starting the self-assessment.");
    console.log("No skills selected.");
    return;
  }

  console.log(`Selected skills: ${selectedSkills.join(", ")}`);

  // Initialize proficiency statements for consistency
  selectedSkills.forEach((skill) => {
    proficiencyStatements[skill] = {};
    Object.keys(proficiencyLevels).forEach(level => {
      proficiencyStatements[skill][level] = pickRandom(proficiencyLevels[level]);
    });
  });

  // 3 questions per skill (Q1, Q2, Q4)
  totalQuestions = selectedSkills.length * 3;
  currentQuestionIndex = 0;

  goToPage(4);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 10) RENDER ASSESSMENT QUESTION FUNCTION: PAGE 4
 **************************************************************/
function renderAssessmentQuestion(qIndex){
  console.log(`Rendering question ${qIndex + 1} of ${totalQuestions}`);
  const skillIndex = Math.floor(qIndex / 3);
  const questionNum = qIndex % 3;
  const skill = selectedSkills[skillIndex];

  const container = document.getElementById("selfAssessment");
  container.innerHTML = "";

  // Container for each skill
  const skillContainer = document.createElement("div");
  skillContainer.classList.add("skill-container");
  container.appendChild(skillContainer);

  // Title
  const h3 = document.createElement("h3");
  h3.textContent = `ATL Skill: ${skill}`;
  skillContainer.appendChild(h3);

  // Question
  const p = document.createElement("p");
  p.className = "question";

  switch(questionNum){
    case 0: // Q1 => LIKERT SCALE
      p.textContent = `At the start of this unit, I would describe my ability to "${skill}" as...`;
      skillContainer.appendChild(p);
      showLikertQuestion(skillContainer, skillIndex);
      break;
    case 1: // Q2 => PROFICIENCY STATEMENT
      p.textContent = `Reflecting on your progress this unit, select the statement that best applies to your current ability to "${skill}"...`;
      skillContainer.appendChild(p);
      showProficiencyQuestion(skillContainer, skillIndex, skill);
      break;
    case 2: // Q4 => REWORDED SHORT RESPONSE QUESTION
      p.textContent = `What is one challenge you experienced applying "${skill}" and how you would overcome a similar challenge in the future?`;
      skillContainer.appendChild(p);
      showShortResponseQ4(skillContainer, skillIndex, skill);
      break;
    default:
      console.error("Unknown question number:", questionNum);
  }

  // Update Next button text
  document.getElementById("nextButton").textContent = (qIndex < totalQuestions -1) ? "Next" : "Submit";
}

/**************************************************************
 * 11) Q1 => LIKERT SCALE QUESTION FUNCTION
 **************************************************************/
function showLikertQuestion(container, skillIndex){
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
    radio.required = true; // Ensure selection
    col.appendChild(radio);

    const belowLabel = document.createElement("div");
    belowLabel.textContent = opt.label;
    belowLabel.style.fontStyle = "italic";
    col.appendChild(belowLabel);

    scaleDiv.appendChild(col);
  });

  container.appendChild(scaleDiv);
  console.log(`Displayed Likert scale for skill ${skillIndex}: ${scaleOpts.map(o=>o.label).join(", ")}`);
}

/**************************************************************
 * 12) Q2 => PROFICIENCY STATEMENT QUESTION FUNCTION
 **************************************************************/
function showProficiencyQuestion(container, skillIndex, skill){
  const opsDiv = document.createElement("div");
  opsDiv.className = "options";

  const proficiencyLevelsOrdered = [
    "Novice/Beginning (Observation)",
    "Learner/Developing (Emulation)",
    "Practitioner/Using (Demonstration)"
  ];

  proficiencyLevelsOrdered.forEach(level => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="Q2-skill${skillIndex}" value="${level}" required> ${proficiencyStatements[skill][level]}`;
    opsDiv.appendChild(label);
  });

  container.appendChild(opsDiv);
  console.log(`Displayed proficiency statements for skill ${skill}: ${proficiencyLevelsOrdered.join(", ")}`);
}

/**************************************************************
 * 13) Q4 => SHORT RESPONSE QUESTION FUNCTION
 **************************************************************/
function showShortResponseQ4(container, skillIndex, skill){
  const ta = document.createElement("textarea");
  ta.name = `Q4-skill${skillIndex}`;
  ta.rows = 4;
  ta.placeholder = "Describe the challenge and your solution...";
  ta.required = true; // Ensure response
  container.appendChild(ta);
  console.log(`Displayed short response textarea for skill ${skill}`);
}

/**************************************************************
 * 14) NEXT BUTTON NAVIGATION FUNCTION: HANDLE NAVIGATION AND SUBMISSION
 **************************************************************/
function navigateSkill(){
  console.log(`Navigating skill question at index ${currentQuestionIndex}`);
  // Validate current question before proceeding
  if(!validateCurrentQuestion()){
    alert("Please answer the current question before proceeding.");
    console.log("Current question validation failed.");
    return;
  }

  // Save current response
  saveCurrentResponse();

  currentQuestionIndex++;

  if(currentQuestionIndex >= totalQuestions){
    console.log("All questions answered. Submitting data.");
    handleFinalSubmit();
    return;
  }

  console.log(`Rendering next question at index ${currentQuestionIndex}`);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 15) VALIDATE CURRENT QUESTION FUNCTION
 **************************************************************/
function validateCurrentQuestion(){
  const skillIndex = Math.floor(currentQuestionIndex / 3);
  const questionNum = currentQuestionIndex % 3;
  const skill = selectedSkills[skillIndex];

  let valid = false;
  switch(questionNum){
    case 0: // Q1 => LIKERT SCALE
      valid = document.querySelector(`input[name="Q1-skill${skillIndex}"]:checked`) !== null;
      console.log(`Validating Q1 for skill ${skill}: ${valid}`);
      break;
    case 1: // Q2 => PROFICIENCY STATEMENT
      valid = document.querySelector(`input[name="Q2-skill${skillIndex}"]:checked`) !== null;
      console.log(`Validating Q2 for skill ${skill}: ${valid}`);
      break;
    case 2: // Q4 => SHORT RESPONSE
      const textarea = document.querySelector(`textarea[name="Q4-skill${skillIndex}"]`);
      valid = textarea && textarea.value.trim() !== "";
      console.log(`Validating Q4 for skill ${skill}: ${valid}`);
      break;
    default:
      console.error("Unknown question number:", questionNum);
  }
  return valid;
}

/**************************************************************
 * 16) SAVE CURRENT RESPONSE FUNCTION
 **************************************************************/
function saveCurrentResponse(){
  const skillIndex = Math.floor(currentQuestionIndex / 3);
  const questionNum = currentQuestionIndex % 3;
  const skill = selectedSkills[skillIndex];

  if(!responses[skill]) {
    responses[skill] = {};
  }

  switch(questionNum){
    case 0: // Q1 => LIKERT SCALE
      const q1 = document.querySelector(`input[name="Q1-skill${skillIndex}"]:checked`).value;
      responses[skill].q1 = q1;
      console.log(`Saved Q1 for skill ${skill}: ${q1}`);
      break;
    case 1: // Q2 => PROFICIENCY STATEMENT
      const q2 = document.querySelector(`input[name="Q2-skill${skillIndex}"]:checked`).value;
      responses[skill].q2 = q2;
      console.log(`Saved Q2 for skill ${skill}: ${q2}`);
      break;
    case 2: // Q4 => SHORT RESPONSE
      const q4 = document.querySelector(`textarea[name="Q4-skill${skillIndex}"]`).value.trim();
      responses[skill].q4 = q4;
      console.log(`Saved Q4 for skill ${skill}: ${q4}`);
      break;
    default:
      console.error("Unknown question number:", questionNum);
  }
}

/**************************************************************
 * 17) HANDLE FINAL SUBMIT FUNCTION: SEND DATA TO GOOGLE SHEET
 **************************************************************/
function handleFinalSubmit(){
  console.log("Handling final submission.");
  // Gather user info from page1 (Student Info)
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

  selectedSkills.forEach((skill) => {
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
      q4: responses[skill]?.q4 || "",
      token: SECRET_TOKEN // Include token here
    };

    tasks.push(submitDataForSkill(dataObj));
  });

  // Execute all submissions concurrently
  Promise.all(tasks)
    .then(()=>{
      console.log("All data submitted successfully.");
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
 * 18) SUBMIT DATA FUNCTION: SEND DATA TO GOOGLE APPS SCRIPT
 **************************************************************/
function submitDataForSkill(obj){
  console.log(`Submitting data for skill ${obj.skill}`);
  return fetch(SCRIPT_URL, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(obj)
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(res=>{
    if(res.status !== "success"){
      throw new Error(res.message || "Unknown error from Apps Script");
    }
    console.log(`Data for skill ${obj.skill} submitted successfully.`);
  })
  .catch(error => {
    console.error("Error in submitDataForSkill:", error);
    throw error; // Propagate error to Promise.all
  });
}

/**************************************************************
 * 19) PICK RANDOM ELEMENT FROM ARRAY FUNCTION
 **************************************************************/
function pickRandom(arr) {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  console.log(`Picked random element: ${randomElement}`);
  return randomElement;
}
