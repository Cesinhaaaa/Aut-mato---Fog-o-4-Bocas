function addButtonsListeners() {
    // Adiciona ouvintes de evento para os botões
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => toggleButton(button));
    });
}

function addStatesDescsOnUl () {
    const listaEstados = document.getElementById('lista-estados');

    states.forEach(estado => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${estado.label}</strong> - ${estado.desc}`;
        listaEstados.appendChild(li);
    });
}

function toggleImageOfTransitions() {
    var image = document.querySelector('.hover-image');
    image.style.display = image.style.display === 'block' ? 'none' : 'block';
}

function innerCircleListener() {setActualStateId(this.id)}

function innerCircleListenerOn(on) {
    const circles = document.querySelectorAll('circle');
    
    circles.forEach(circle => {
        if (circle.r.baseVal.value == 15) {
            if (on) {
                circle.addEventListener('click', innerCircleListener);
            } else {
                circle.removeEventListener('click', innerCircleListener);
            }
        }
    });
}

function buttonListenerOn(on) {
    buttons.forEach(button => {
        if (on) {
            button.style.pointerEvents = 'auto';
        } else {
            button.style.pointerEvents = 'none';
        } 
    });
}

function getActualStateId() {
    const estadoBinario =
        (actualStates.boca1 ? '1' : '0') +
        (actualStates.boca2 ? '1' : '0') +
        (actualStates.boca3 ? '1' : '0') +
        (actualStates.boca4 ? '1' : '0');

    return estadoBinario;
}

function updateActualStateDesc(label, desc) {
    document.getElementById('estado-atual').textContent = label + ' - ' + desc;
}

function attAutomatonState() {
    const estadoAtual = getActualStateId();
    const estado = states.find(e => e.id === estadoAtual);
    updateActualStateDesc(estado.label, estado.desc);

    svg.querySelectorAll('circle').forEach(circle => {
        if (circle.id !== estadoAtual) {
            circle.setAttribute('fill', 'yellow');
        } else {
            circle.setAttribute('fill', 'red');
        }
    });
}

// Função para alternar o estado dos botões e atualizar o autômato
function toggleButton(button) {
    const boca = button.getAttribute('data-boca');
    actualStates[boca] = !actualStates[boca];
    button.classList.toggle('on', actualStates[boca]);
    button.classList.toggle('off', !actualStates[boca]);

    attAutomatonState();
}

function setActualStateId(id=undefined) {
    if (id == undefined)
        id = this.id;
    for (let i = 1; i <= 4; i++) {
        const boca = 'boca' + i.toString();
        if (actualStates[boca] != (id[i - 1] == '1')) {
            toggleButton(buttons[i - 1]);
        }
    }
}

function resetAutomaton() {
    setActualStateId('0000');
}

function handleEnterKey(event) {
    // Verifica se a tecla pressionada é 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault();  // Impede o comportamento padrão
        lerTexto();  // Chama a função que você definiu
    }
}

function textInputListenerOn(on) {
    const inputField = document.getElementById('meuCampoTexto');  // Seleciona o campo de texto

    if (on) {
        inputField.addEventListener('keypress', handleEnterKey);
    } else {
        inputField.removeEventListener('keypress', handleEnterKey);
    }
}

function listenersOn(on) {
    buttonListenerOn(on);
    innerCircleListenerOn(on);
    textInputListenerOn(on);
}

function lerTexto() {
    resetAutomaton();

    // Obtém o valor do campo de entrada
    const texto = document.getElementById('meuCampoTexto').value;
    const textoLimpo = texto.replace(/[^1234]/g, '');

    // Mostra o valor em um parágrafo
    const resultado = document.getElementById('resultado');
    resultado.textContent = "Palavra: ";
    
    // Adiciona cada caractere dentro de um span para ser manipulado depois
    for (let i = 0; i < textoLimpo.length; i++) {
        const span = document.createElement('span');
        span.textContent = textoLimpo[i];
        span.classList.add('restante');
        resultado.appendChild(span);
    }

    const spans = document.querySelectorAll('#resultado span');
    let index = 0; // Inicializa o índice
    const spansLength = spans.length;

    if (spansLength > 0) {
        listenersOn(false);

        const intervalId = setInterval(() => {
            const caracterAtual = spans[index].textContent
            if (index < spans.length) {
                // Torna o caractere consumido (cinza)
                spans[index].classList.remove('restante');
                spans[index].classList.add('consumido');
                index++;

                if (index == spansLength) {
                    listenersOn(true);
                    clearInterval(intervalId);  // Para o intervalo quando terminar
                }
            }

            document.querySelectorAll('.button').forEach(button => {
                if (button.id[6] == caracterAtual) toggleButton(button);
            });
        }, 1000);  // Intervalo de 1 segundo
    }
}

addButtonsListeners()
addStatesDescsOnUl()
textInputListenerOn(true)

window.onload = drawAutomatonOnSvg;