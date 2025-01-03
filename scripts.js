/**************************************************************
 * 0) STUDENT FORM VALIDATION (LANDING PAGE)
 **************************************************************/
function validateStudentForm() {
    // Required: Student ID, Last Name, First Name
    const studentID = document.getElementById("studentID").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
  
    if (!studentID || !lastName || !firstName) {
      alert("Please complete the required fields: Student ID, Last Name, First Name.");
      return;
    }
    // If passes, go to page1
    goToPage(1);
  }
  
  /**************************************************************
   * 1) FULL CATEGORIES, CLUSTERS, & SKILLS (from your PDF)
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
   * 2) PROFICIENCY LEVELS (Q2)
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
  
  /**************************************************************
   * 3) GLOBAL STATE
   **************************************************************/
  let selectedSkills = [];
  let currentQuestionIndex = 0;
  let totalQuestions = 0;
  
  /**************************************************************
   * 4) PAGE 1: toggleDropdown
   **************************************************************/
  function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = (dropdown.style.display === "none") ? "block" : "none";
  }
  
  /**************************************************************
   * 5) PAGE NAV
   **************************************************************/
  function goToPage(pageNumber) {
    document.querySelectorAll("section").forEach(sec => (sec.style.display = "none"));
    document.getElementById(`page${pageNumber}`).style.display = "block";
  
    if (pageNumber === 2) {
      populateSkillsSelection();
    }
  }
  
  /**************************************************************
   * 6) PAGE 2: SKILLS
   **************************************************************/
  function populateSkillsSelection() {
    const selectedClusters = Array.from(
      document.querySelectorAll('input[name="cluster"]:checked')
    ).map(i => i.value);
  
    const skillsDiv = document.getElementById("skillsSelection");
    skillsDiv.innerHTML = "";
  
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
          skillsDiv.appendChild(clusterDiv);
        }
      });
    });
  }
  
  /**************************************************************
   * 7) START SELF-ASSESSMENT
   **************************************************************/
  function startSelfAssessment() {
    selectedSkills = Array.from(document.querySelectorAll('input[name="skill"]:checked'))
      .map(i => i.value);
  
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill before starting the self-assessment.");
      return;
    }
  
    // 5 questions per skill
    totalQuestions = selectedSkills.length * 5;
    currentQuestionIndex = 0;
  
    goToPage(3);
    renderAssessmentQuestion(currentQuestionIndex);
  }
  
  /**************************************************************
   * 8) RENDER A SINGLE QUESTION PAGE
   **************************************************************/
  function renderAssessmentQuestion(qIndex) {
    const skillIndex = Math.floor(qIndex / 5);
    const questionNum = qIndex % 5; // 0..4
    const skill = selectedSkills[skillIndex];
  
    const container = document.getElementById("selfAssessment");
    container.innerHTML = "";
  
    // Title
    const titleEl = document.createElement("h2");
    titleEl.textContent = `ATL Skill: ${skill}`;
    container.appendChild(titleEl);
  
    switch (questionNum) {
      case 0:
        // Q1: horizontal Likert
        showLikertQuestion(container, skillIndex, skill);
        break;
      case 1:
        // Q2: random from proficiency
        showProficiencyQuestion(container, skillIndex, skill);
        break;
      case 2:
        // Q3: short response #1
        showShortResponseQ3(container, skillIndex, skill);
        break;
      case 3:
        // Q4: short response #2
        showShortResponseQ4(container, skillIndex, skill);
        break;
      case 4:
        // Q5: IB learner
        showIbLearnerProfileQ5(container, skillIndex, skill);
        break;
    }
  
    // Prev / Next or Submit
    const prevBtn = document.getElementById("prevButton");
    const nextBtn = document.getElementById("nextButton");
  
    prevBtn.style.display = (qIndex > 0) ? "inline-block" : "none";
    if (qIndex < totalQuestions - 1) {
      nextBtn.textContent = "Next";
    } else {
      nextBtn.textContent = "Submit";
    }
  }
  
  /**************************************************************
   * 9) Q1: HORIZONTAL LIKERT
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
   * 10) Q2: RANDOM SINGLE STATEMENT (Proficiency)
   **************************************************************/
  function showProficiencyQuestion(container, skillIndex, skill) {
    const prompt = document.createElement("p");
    prompt.className = "question";
    prompt.textContent = `Reflecting on your progress and growth in this unit, select the statement that best applies to your current ability to ${skill}...`;
    container.appendChild(prompt);
  
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
  
    Object.entries(proficiencyLevels).forEach(([level, statements]) => {
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
   * 11) Q3: SHORT RESPONSE #1
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
   * 12) Q4: SHORT RESPONSE #2
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
   * 13) Q5: IB LEARNER PROFILE w/ Example in Parentheses
   **************************************************************/
  function showIbLearnerProfileQ5(container, skillIndex, skill) {
    const p = document.createElement("p");
    p.className = "question";
    p.textContent = `If someone were observing you practicing this skill, which IB learner profile trait would they say you demonstrated? Why?`;
    container.appendChild(p);
  
    // Trait + example
    const ibTraits = [
      {
        trait: "Inquirer",
        example: "I demonstrated being an inquirer by using research skills to locate, analyze, and synthesize information for a group project."
      },
      {
        trait: "Knowledgeable",
        example: "I was knowledgeable when I applied discipline-specific terms effectively while presenting a mathematical solution."
      },
      {
        trait: "Thinker",
        example: "I showed myself as a thinker by using critical-thinking skills to evaluate evidence and draw a reasoned conclusion in a debate."
      },
      {
        trait: "Communicator",
        example: "I embodied the role of a communicator by practicing intercultural understanding to collaborate with peers from different backgrounds."
      },
      {
        trait: "Principled",
        example: "I demonstrated being principled by taking responsibility for meeting deadlines and following through on commitments to my group."
      },
      {
        trait: "Open-minded",
        example: "I showed open-mindedness by actively listening to different perspectives during a collaborative problem-solving activity."
      },
      {
        trait: "Caring",
        example: "I was caring by helping a classmate improve their understanding of a topic through constructive feedback."
      },
      {
        trait: "Risk-Taker",
        example: "I demonstrated being a risk-taker by trying a new approach to solving a problem or presenting a unique idea in a group discussion."
      },
      {
        trait: "Balanced",
        example: "I showed balance by managing my time effectively to complete assignments while maintaining my personal well-being."
      },
      {
        trait: "Reflective",
        example: "I was reflective by considering the strengths and weaknesses of my personal strategies during a group presentation."
      }
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
      // "trait (example in parentheses)"
      opt.textContent = `${obj.trait} (${obj.example})`;
      select.appendChild(opt);
    });
  
    container.appendChild(select);
  
    const textArea = document.createElement("textarea");
    textArea.name = `Q5-skill${skillIndex}`;
    textArea.rows = 4;
    textArea.style.width = "100%";
    textArea.placeholder = "Explain why that trait was demonstrated...";
    container.appendChild(textArea);
  }
  
  /**************************************************************
   * 14) NAVIGATE ACROSS QUESTIONS
   **************************************************************/
  function navigateSkill(direction) {
    currentQuestionIndex += direction;
  
    if (currentQuestionIndex >= totalQuestions) {
      alert("Self-assessment submitted! Thank you.");
      return;
    }
    if (currentQuestionIndex < 0) {
      currentQuestionIndex = 0;
    }
  
    renderAssessmentQuestion(currentQuestionIndex);
  }
  
