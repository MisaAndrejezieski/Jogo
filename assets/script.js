document.addEventListener('DOMContentLoaded', () => {
    let saldo = 1000;
    const saldoElement = document.getElementById('saldo');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const apostaInput = document.getElementById('aposta');
    const jogarButton = document.getElementById('jogar');

    const imagens = ["img/001_.jpg", "img/002_.jpg", "img/003_.jpg", "img/004_.jpg", "img/005_.jpg"];

    function atualizarSaldo() {
        saldoElement.textContent = `Saldo atual: R$${saldo}`;
    }

    function girarSlot(slot, rolos, callback) {
        let contador = 0;
        const intervalo = setInterval(() => {
            const indice = Math.floor(Math.random() * imagens.length);
            slot.src = imagens[indice];
            contador++;
            if (contador >= rolos.length) {
                clearInterval(intervalo);
                callback(rolos[contador - 1]);
            }
        }, 100);
    }

    function jogar() {
        const aposta = parseInt(apostaInput.value);
        if (aposta > saldo) {
            alert("Aposta maior que o saldo disponível. Tente novamente.");
            return;
        }

        saldo -= aposta;

        const rolos = [];
        for (let i = 0; i < 3; i++) {
            const indice = Math.floor(Math.random() * imagens.length);
            rolos.push(imagens[indice]);
        }

        girarSlot(slot1, rolos, (resultado1) => {
            girarSlot(slot2, rolos, (resultado2) => {
                girarSlot(slot3, rolos, (resultado3) => {
                    const resultados = [resultado1, resultado2, resultado3];

                    if (resultados[0] === resultados[1] && resultados[1] === resultados[2]) {
                        let ganho;
                        if (resultados[0] === "img/001_.jpg") {
                            ganho = aposta * 3;
                            alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais de 001_.jpg!`);
                        } else if (resultados[0] === "img/002_.jpg") {
                            ganho = aposta * 4;
                            alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais de 002_.jpg!`);
                        } else {
                            ganho = aposta * 2;
                            alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais!`);
                        }
                        saldo += ganho;
                    } else if (new Set(resultados).size === 3) {
                        saldo += aposta;
                        alert(`Você recuperou sua aposta de R$${aposta} com três imagens diferentes!`);
                    } else {
                        alert("Tente novamente!");
                    }

                    atualizarSaldo();

                    if (saldo <= 0) {
                        if (confirm("Saldo insuficiente para continuar jogando. Deseja comprar mais créditos?")) {
                            saldo = 1000; // Aqui você pode adicionar lógica para comprar créditos
                            atualizarSaldo();
                        } else {
                            alert("Fim de Jogo");
                        }
                    }
                });
            });
        });
    }

    jogarButton.addEventListener('click', jogar);
    atualizarSaldo();
});
