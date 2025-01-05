/**************************************************************
 * 0) LANDING PAGE VALIDATION (PAGE 0)
 **************************************************************/
function validateStudentForm() {
  const studentID = document.getElementById("studentID").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();

  if (!studentID || !lastName || !firstName) {
    alert("Please complete required fields: Student ID, Last Name, First Name.");
    return;
  }
  // If valid, go to page1
  goToPage(1);
}

/**************************************************************
 * 1) FULL CATEGORIES & SKILLS (COMPREHENSIVE)
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
 * 2) GLOBAL STATE
 **************************************************************/
let selectedSkills = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;

/**************************************************************
 * 3) TOGGLE DROPDOWN
 **************************************************************/
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  dropdown.style.display = (dropdown.style.display==="none")?"block":"none";
}

/**************************************************************
 * 4) PAGE NAV
 **************************************************************/
function goToPage(pageNumber) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  document.getElementById(`page${pageNumber}`).style.display = "block";

  if (pageNumber === 2) populateSkillsSelection();
}

/**************************************************************
 * 5) POPULATE SKILLS (PAGE2)
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
 * 6) START SELF-ASSESSMENT => PAGE3
 **************************************************************/
function startSelfAssessment() {
  selectedSkills = Array.from(
    document.querySelectorAll('input[name="skill"]:checked')
  ).map(i => i.value);

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill before starting the self-assessment.");
    return;
  }

  totalQuestions = selectedSkills.length; // Each skill => 1 question? Or 5? You decide.
  currentQuestionIndex=0;

  goToPage(3);
  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 7) RENDER A SINGLE QUESTION (PAGE3) - Placeholder
 **************************************************************/
function renderAssessmentQuestion(qIndex) {
  const skill = selectedSkills[qIndex];
  const container = document.getElementById("selfAssessment");
  container.innerHTML = "";

  const titleEl = document.createElement("h2");
  titleEl.textContent = `ATL Skill: ${skill}`;
  container.appendChild(titleEl);

  // Show a placeholder question (expand your logic as needed)
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = `Placeholder question for skill: ${skill}`;
  container.appendChild(p);

  // Show/hide nav
  document.getElementById("prevButton").style.display = (qIndex>0)?"inline-block":"none";
  document.getElementById("nextButton").textContent = (qIndex< (totalQuestions-1))? "Next":"Submit";
}

/**************************************************************
 * 8) NEXT/PREV
 **************************************************************/
function navigateSkill(direction) {
  currentQuestionIndex += direction;

  if (currentQuestionIndex >= totalQuestions) {
    handleFinalSubmit();
    return;
  }
  if (currentQuestionIndex < 0) currentQuestionIndex=0;

  renderAssessmentQuestion(currentQuestionIndex);
}

/**************************************************************
 * 9) SUBMIT => APPS SCRIPT
 **************************************************************/
function handleFinalSubmit() {
  const data = {
    // Minimal example collecting just a few fields
    studentID :  document.getElementById("studentID").value.trim(),
    lastName  :  document.getElementById("lastName").value.trim(),
    firstName :  document.getElementById("firstName").value.trim(),
    date      :  document.getElementById("dateField").value.trim(),
    gradeLevel:  document.getElementById("gradeLevel").value.trim(),
    className :  document.getElementById("classField").value.trim(),
    cohortYear:  document.getElementById("cohortYear").value.trim(),
    advisory  :  document.getElementById("advisoryGroup").value.trim(),
    teacher   :  document.getElementById("teacher").value.trim(),
    // placeholders for final Q data
    category:"",
    cluster:"",
    skill:"",
    q1:"",
    q2:"",
    q3:"",
    q4:"",
    q5:""
  };

  submitData(data);
}

/**************************************************************
 * 10) fetch => Google Apps Script
 **************************************************************/
function submitData(obj) {
  // Replace with your actual Web App URL
  const scriptUrl = "https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec";

  fetch(scriptUrl, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(result => {
    if(result.status==="success"){
      alert("Data submitted successfully!");
    } else {
      alert("Error submitting data: " + (result.message||"Unknown error."));
    }
  })
  .catch(err=>{
    console.error("Submission error:", err);
    alert("An error occurred while submitting data.");
  });
}
