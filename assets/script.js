document.addEventListener('DOMContentLoaded', () => {
    let saldo = 1000;
    const saldoElement = document.getElementById('saldo');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const apostaInput = document.getElementById('aposta');
    const jogarButton = document.getElementById('jogar');
    const mensagemElement = document.getElementById('mensagem');
    const compraInput = document.getElementById('compra');
    const comprarButton = document.getElementById('comprar');

    // Lista de imagens com pesos
    const imagens = [
        { src: "img/anime.jpg", peso: 1 },
        { src: "img/madmax.jpg", peso: 1 },
        { src: "img/tetas.jpg", peso: 1 },
        { src: "img/Julieta.jpg", peso: 1 },
        { src: "img/Ravena.jpg", peso: 1 }
    ];

    // Função para criar uma lista ponderada
    function criarListaPonderada(imagens) {
        const listaPonderada = [];
        imagens.forEach(imagem => {
            for (let i = 0; i < imagem.peso; i++) {
                listaPonderada.push(imagem.src);
            }
        });
        return listaPonderada;
    }

    const listaPonderada = criarListaPonderada(imagens);

    function atualizarSaldo() {
        saldoElement.textContent = `Saldo atual: R$${saldo}`;
    }

    function exibirMensagem(mensagem) {
        mensagemElement.textContent = mensagem;
    }

    function girarSlot(slot, callback) {
        let contador = 0;
        const intervalo = setInterval(() => {
            const indice = Math.floor(Math.random() * listaPonderada.length);
            slot.src = listaPonderada[indice];
            contador++;
            if (contador >= 10) { // Número de giros antes de parar
                clearInterval(intervalo);
                callback(listaPonderada[indice]);
            }
        }, 50); // Velocidade dos giros
    }

    function jogar() {
        const aposta = parseInt(apostaInput.value);
        if (isNaN(aposta) || aposta <= 0) {
            exibirMensagem("Por favor, insira um valor de aposta válido.");
            return;
        }
        if (aposta > saldo) {
            exibirMensagem("Aposta maior que o saldo disponível. Tente novamente.");
            return;
        }

        saldo -= aposta;
        atualizarSaldo();

        girarSlot(slot1, (resultado1) => {
            girarSlot(slot2, (resultado2) => {
                girarSlot(slot3, (resultado3) => {
                    const resultados = [resultado1, resultado2, resultado3];
                    let mensagem = "";

                    if (resultados[0] === resultados[1] && resultados[1] === resultados[2]) {
                        let ganho;
                        if (resultados[0] === "img/anime.jpg") {
                            ganho = aposta * 10;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais de anime!`;
                        } else if (resultados[0] === "img/madmax.jpg") {
                            ganho = aposta * 8;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais de Mad Max!`;
                        } else if (resultados[0] === "img/Julieta.jpg") {
                            ganho = aposta * 6;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais de Julieta!`;
                        } else if (resultados[0] === "img/tetas.jpg") {
                            ganho = aposta * 4;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais de Tetas!`;
                        } else if (resultados[0] === "img/Ravena.jpg") {
                            ganho = aposta * 2;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais de Ravena!`;
                        } else {
                            ganho = aposta * 2;
                            mensagem = `Parabéns! Você ganhou R$${ganho} com três imagens iguais!`;
                        }

                        saldo += ganho;
                    } else if (new Set(resultados).size === 3) {
                        saldo += aposta;
                        mensagem = `Você recuperou sua aposta de R$${aposta} com três imagens diferentes!`;
                    } else {
                        mensagem = "Tente novamente!";
                    }

                    atualizarSaldo();
                    exibirMensagem(mensagem);

                    if (saldo <= 0) {
                        if (confirm("Saldo insuficiente para continuar jogando. Deseja comprar mais créditos?")) {
                            exibirMensagem("Por favor, compre mais créditos para continuar jogando.");
                        } else {
                            exibirMensagem("Fim de Jogo");
                        }
                    }
                });
            });
        });
    }

    function comprarCreditos() {
        const compra = parseInt(compraInput.value);
        if (isNaN(compra) || compra <= 0) {
            exibirMensagem("Por favor, insira um valor de compra válido.");
            return;
        }

        saldo += compra;
        atualizarSaldo();
        exibirMensagem(`Você comprou R$${compra} em créditos!`);
    }

    jogarButton.addEventListener('click', jogar);
    comprarButton.addEventListener('click', comprarCreditos);
    atualizarSaldo();
});
