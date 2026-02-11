const board = document.getElementById("board");
let position = 0;

// Criar tabuleiro
for (let i = 0; i < 30; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.id = "cell" + i;
  div.innerText = i + 1;
  board.appendChild(div);
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").innerText = "Dado: " + roll;
  movePlayer(roll);
}

function movePlayer(roll) {
  document.getElementById("cell" + position)?.classList.remove("player");

  position += roll;

  if (position >= 29) {
    alert("Você venceu!");
    position = 0;
  }

  document.getElementById("cell" + position).classList.add("player");

  // A cada 3 casas, faz pergunta
  if (position % 3 === 0) {
    fazerPergunta();
  }
}

function fazerPergunta() {
  const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];

  let texto = perguntaAleatoria.pergunta + "\n\n";

  perguntaAleatoria.opcoes.forEach((opcao, index) => {
    texto += `${index}: ${opcao}\n`;
  });

  const resposta = prompt(texto);

  if (parseInt(resposta) === perguntaAleatoria.respostaCorreta) {
    alert("✅ Resposta correta! Avance +1 casa.");
    position++;
  } else {
    alert("❌ Resposta incorreta! Volte 1 casa.");
    position--;
    if (position < 0) position = 0;
  }

  document.getElementById("cell" + position).classList.add("player");
}
