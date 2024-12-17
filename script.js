let selectedAnswerImage = "";

function selectImage(answer) {
  selectedAnswerImage = answer;
  document.getElementById(
    "selectedAnswer"
  ).innerText = `Vous avez sélectionné : ${selectedAnswerImage}`;
}

document.getElementById("submitQuiz").addEventListener("click", function () {
  let form = document.getElementById("quizForm");
  let score = 0;
  let results = "";

  let correctAnswers = {
    q1: "A", // France : Paris
    q2: "berlin", // Allemagne : Berlin
    q3: "Vrai", // Le Japon est une île située en Asie
    q4: ["A", "C", "D"], // Italie : Vert, Blanc, Rouge
    q5: "moscou", // Russie : Moscou
    q6: "C", // Brésil : Brasília
    q7: "Rome", // Sélection d'image : Rome
    q8: "Faux", // Afrique du Sud n'est pas en Amérique du Sud
    q9: ["A", "B", "C"], // Belgique : Français, Allemand, Néerlandais
    q10: "ottawa", // Canada : Ottawa
  };

  for (let i = 1; i <= 10; i++) {
    let isCorrect = false;

    if (form.querySelector(`input[name='q${i}']:checked`)) {
      let userAnswer = form.querySelector(`input[name='q${i}']:checked`).value;
      if (Array.isArray(correctAnswers[`q${i}`])) {
        let userAnswers = [];
        document
          .querySelectorAll(`input[name='q${i}']:checked`)
          .forEach((input) => userAnswers.push(input.value));
        if (
          JSON.stringify(userAnswers.sort()) ===
          JSON.stringify(correctAnswers[`q${i}`].sort())
        ) {
          score++;
          isCorrect = true;
        }
      } else if (userAnswer === correctAnswers[`q${i}`]) {
        score++;
        isCorrect = true;
      }
    } else if (form.querySelector(`input[name='q${i}']`)) {
      let userAnswerText = form
        .querySelector(`input[name='q${i}']`)
        .value.trim()
        .toLowerCase();
      if (userAnswerText === correctAnswers[`q${i}`]) {
        score++;
        isCorrect = true;
      }
    }

    if (i !== 7) {
      results += `<li>Question ${i}: ${
        isCorrect ? "Juste ✅" : "Faux ❌"
      }</li>`;
    }
  }

  if (selectedAnswerImage === correctAnswers.q7) {
    score++;
    results += `<li>Question 7: Juste ✅</li>`;
  } else {
    results += `<li>Question 7: Faux ❌</li>`;
  }

  document.getElementById("result").innerHTML = `
        <h2>Résultats du Quiz</h2>
        <p>Votre score est de ${score} / 10.</p>
        <ul>${results}</ul>
        <button id="showCorrections">Afficher les corrections</button>
    `;

  document
    .getElementById("showCorrections")
    .addEventListener("click", function () {
      let corrections = "<h3>Corrections :</h3><ul>";
      for (let i = 1; i <= 10; i++) {
        corrections += `<li>Question ${i}: ${
          Array.isArray(correctAnswers[`q${i}`])
            ? correctAnswers[`q${i}`].join(", ")
            : correctAnswers[`q${i}`]
        }</li>`;
      }
      corrections += "</ul>";

      document.getElementById("result").innerHTML += corrections;
    });
});

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
