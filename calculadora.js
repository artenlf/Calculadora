const botoesNumero = document.querySelectorAll("[data-numero]");
const botoesOperadores = document.querySelectorAll("[data-operador]");
const botaoIgualdade = document.querySelector("[data-igualdade]");
const allClear = document.querySelector("[data-ac]");
const botaoDel = document.querySelector("[data-del]");
const mostradorTexto = document.querySelector("[data-mostrador-atual]");
const mostradorAnteriorTexto = document.querySelector(
  "[data-mostrador-anterior]"
);

class Calculadora {
  constructor(mostradorAnteriorTexto, mostradorTexto) {
    this.mostradorAnteriorTexto = mostradorAnteriorTexto;
    this.mostradorTexto = mostradorTexto;
    this.clear();
  }

  formataNumeros(numero) {
    const numeroString = numero.toString();
    const digitosInteiros = parseFloat(numeroString.split(".")[0]);
    const digitosDecimais = numeroString.split(".")[1];
    let inteiroDisplay;
    if (isNaN(digitosInteiros)) {
      inteiroDisplay = "";
    } else {
      inteiroDisplay = digitosInteiros.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (digitosDecimais != null) {
      return `${inteiroDisplay}.${digitosDecimais}`;
    } else {
      return inteiroDisplay;
    }
  }

  deletar() {
    this.mostrador = this.mostrador.toString().slice(0, -1);
  }

  calcular() {
    let resultado;
    const mostradorAnteriorFloat = parseFloat(this.mostradorAnterior);
    const mostradorFloat = parseFloat(this.mostrador);
    if (isNaN(mostradorAnteriorFloat) || isNaN(mostradorFloat)) return;

    switch (this.operacao) {
      case "+":
        resultado = mostradorAnteriorFloat + mostradorFloat;
        break;
      case "-":
        resultado = mostradorAnteriorFloat - mostradorFloat;
        break;
      case "*":
        resultado = mostradorAnteriorFloat * mostradorFloat;
        break;
      case "/":
        resultado = mostradorAnteriorFloat / mostradorFloat;
        break;
      default:
        return;
    }

    this.mostrador = resultado;
    this.operacao = undefined;
    this.mostradorAnterior = "";
  }

  escolheOperacao(operacao) {
    if (this.mostrador == "") return;
    if (this.mostradorAnterior !== "") {
      this.calcular();
    }

    this.operacao = operacao;
    this.mostradorAnterior = this.mostrador;
    this.mostrador = "";
  }

  acrescentaNumero(numero) {
    if (this.mostrador.includes(".") && numero == ".") return;
    this.mostrador = `${this.mostrador}${numero.toString()}`;
  }

  clear() {
    this.mostradorAnterior = "";
    this.mostrador = "";
    this.operacao = undefined;
  }

  atualizaDisplay() {
    this.mostradorAnteriorTexto.innerText = `${this.formataNumeros(
      this.mostradorAnterior
    )} ${this.operacao || ""}`;
    this.mostradorTexto.innerText = this.formataNumeros(this.mostrador);
  }
}

const calculadora = new Calculadora(mostradorAnteriorTexto, mostradorTexto);

for (const botaoNumero of botoesNumero) {
  botaoNumero.addEventListener("click", () => {
    calculadora.acrescentaNumero(botaoNumero.innerText);
    calculadora.atualizaDisplay();
  });
}

for (const botaoOperador of botoesOperadores) {
  botaoOperador.addEventListener("click", () => {
    calculadora.escolheOperacao(botaoOperador.innerText);
    calculadora.atualizaDisplay();
  });
}

botaoDel.addEventListener("click", () => {
  calculadora.deletar();
  calculadora.atualizaDisplay();
});

allClear.addEventListener("click", () => {
  calculadora.clear();
  calculadora.atualizaDisplay();
});

botaoIgualdade.addEventListener("click", () => {
  calculadora.calcular();
  calculadora.atualizaDisplay();
});
