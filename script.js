function soumettreQuiz() {
  const form = document.forms["quizForm"];

  if (
    !form.q1.value ||
    !form.q2.value.trim() ||
    !form.q3.value ||
    !form.q5.value
  ) {
    alert(
      "Veuillez répondre à toutes les questions avant de soumettre le quiz."
    );
    return;
  }

  // Réponses correctes
  const reponsesCorrectes = {
    q1: "A",
    q2: "Berlin",
    q3: "Vrai",
    q5: "C",
  };

  let score = 0;
  let resultats = "";

  // Question 1
  const q1 = form.q1.value;
  if (q1 === reponsesCorrectes.q1) {
    score++;
    resultats += "<p class='correct'>1. Bonne réponse : Paris ✅</p>";
  } else {
    resultats +=
      "<p class='incorrect'>1. Mauvaise réponse ❌ (La bonne réponse est : Paris)</p>";
  }

  // Question 2
  const q2 = form.q2.value.trim();
  if (q2.toLowerCase() === reponsesCorrectes.q2.toLowerCase()) {
    score++;
    resultats += "<p class='correct'>2. Bonne réponse : Berlin ✅</p>";
  } else {
    resultats +=
      "<p class='incorrect'>2. Mauvaise réponse ❌ (La bonne réponse est : Berlin)</p>";
  }

  // Question 3
  const q3 = form.q3.value;
  if (q3 === reponsesCorrectes.q3) {
    score++;
    resultats += "<p class='correct'>3. Bonne réponse : Vrai ✅</p>";
  } else {
    resultats +=
      "<p class='incorrect'>3. Mauvaise réponse ❌ (La bonne réponse est : Vrai)</p>";
  }

  // Question 4 (Cases à cocher)
  if (verifierCases(form)) {
    score++;
    resultats +=
      "<p class='correct'>4. Bonne réponse ✅ : vert , rouge , blanc</p>";
  } else {
    resultats +=
      "<p class='incorrect'>4. Mauvaise réponse ❌ (La bonne réponse est : vert , rouge , blanc) </p>";
  }

  // Question 5
  const q5 = form.q5.value;
  if (q5 === reponsesCorrectes.q5) {
    score++;
    resultats += "<p class='correct'>5. Bonne réponse : Brasília ✅</p>";
  } else {
    resultats +=
      "<p class='incorrect'>5. Mauvaise réponse ❌ (La bonne réponse est : Brasília)</p>";
  }

  const totalQuestions = 5;
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
      <h3>Votre score : ${score} / ${totalQuestions}</h3>
      ${resultats}
  `;

  // resultElement.textContent = `Votre score : ${score} / ${totalQuestions}\n${resultats}`;


  // Si le score est parfait, ajouter une explosion de réussite
  if (score === totalQuestions) {
    explosionReussite();
  }
}

function verifierCases(form) {
  const cases = form.check;
  return (
    cases[0].checked === true && // vert
    cases[1].checked === false && // bleu
    cases[2].checked === true && // blanc
    cases[3].checked === true // rouge
  );
}

function explosionReussite() {
  const body = document.querySelector("body");
  const explosion = document.createElement("div");
  explosion.classList.add("explosion");
  body.appendChild(explosion);

  setTimeout(() => {
    body.removeChild(explosion);
  }, 2000); // L'effet d'explosion disparaît après 2 secondes
}

window.onload = function () {
  alert(
    "Bienvenue au quiz ! Certaines questions peuvent avoir plusieurs réponses, alors lisez attentivement avant de répondre."
  );

  document.body.style.transform = "translateY(0)";
  document.body.style.opacity = 1;
};

let colors = ["#fcd78c", "#eca074", "#cdcac4"];
let colorIndex = 0;

function changeTitleColor() {
  let title = document.querySelector("header h1");
  title.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
}
setInterval(changeTitleColor, 1000);
