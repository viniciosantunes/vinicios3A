// Seleção de elementos DOM
const elementos = {
  principal: document.querySelector(".caixa-principal"),
  perguntas: document.querySelector(".caixa-perguntas"),
  alternativas: document.querySelector(".caixa-alternativas"),
  resultado: document.querySelector(".caixa-resultado"),
  textoResultado: document.querySelector(".texto-resultado")
};

// Banco de perguntas
const perguntas = [
  {
    enunciado: "Renan, em um belo dia saiu de casa, e não voltou mais. Qual o primeiro pensamento?",
    alternativas: [
      {
        texto: "Isso é assustador!",
        afirmacao: "Renan foi morar em um cabaré"
      },
      {
        texto: "Isso é maravilhoso!",
        afirmacao: "Renan fugiu de casa para estudar"
      }
    ]
  },
  {
    enunciado: "O que ele deve estar fazendo?",
    alternativas: [
      {
        texto: "Liderando o cabaré",
        afirmacao: "Você prefere proteger os empregos das primas."
      },
      {
        texto: "Se especializa em Ed.Física",
        afirmacao: "Você busca se adaptar às novas realidades do mercado."
      }
    ]
  },
  {
    enunciado: "Qual a atitude de Renan?",
    alternativas: [
      {
        texto: "Defende as regulamentações das casas noturnas ",
        afirmacao: "Você valoriza o corpo humano"
      },
      {
        texto: "Apoia a autonomia dos professores de Ed.Física",
        afirmacao: "Ele acredita no seu potencial sem restrições."
      }
    ]
  }
];

// Estado do quiz
const estado = {
  atual: 0,
  perguntaAtual: null,
  historiaFinal: []
};

// Funções principais
function inicializarQuiz() {
  elementos.resultado.style.display = "none";
  mostrarPergunta();
}

function mostrarPergunta() {
  if (estado.atual >= perguntas.length) {
    mostrarResultado();
    return;
  }

  // Limpa alternativas anteriores
  elementos.alternativas.innerHTML = "";
 
  // Define e mostra a pergunta atual
  estado.perguntaAtual = perguntas[estado.atual];
  elementos.perguntas.textContent = estado.perguntaAtual.enunciado;
 
  // Mostra alternativas
  mostrarAlternativas();
}

function mostrarAlternativas() {
  estado.perguntaAtual.alternativas.forEach(alternativa => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
   
    botao.addEventListener("click", () => {
      selecionarResposta(alternativa);
    });
   
    elementos.alternativas.appendChild(botao);
  });
}

function selecionarResposta(opcaoSelecionada) {
  // Adiciona a afirmação ao histórico
  estado.historiaFinal.push(opcaoSelecionada.afirmacao);
 
  // Avança para próxima pergunta ou mostra resultado
  estado.atual++;
 
  if (estado.atual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  elementos.perguntas.textContent = "Em 2049...";
  elementos.textoResultado.textContent = estado.historiaFinal.join(" ");
  elementos.alternativas.innerHTML = "";
  elementos.resultado.style.display = "block";
}

// Inicialização
document.addEventListener("DOMContentLoaded", inicializarQuiz);
