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

        slot1.src = rolos[0];
        slot2.src = rolos[1];
        slot3.src = rolos[2];

        if (rolos[0] === rolos[1] && rolos[1] === rolos[2]) {
            let ganho;
            if (rolos[0] === "img/001_.jpg") {
                ganho = aposta * 3;
                alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais de 001_.jpg!`);
            } else if (rolos[0] === "img/002_.jpg") {
                ganho = aposta * 4;
                alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais de 002_.jpg!`);
            } else {
                ganho = aposta * 2;
                alert(`Parabéns! Você ganhou R$${ganho} com três imagens iguais!`);
            }
            saldo += ganho;
        } else if (new Set(rolos).size === 3) {
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
    }

    jogarButton.addEventListener('click', jogar);
    atualizarSaldo();
});
