// Objeto para armazenar o estado atual das bocas
const actualStates = {
    'boca1': false,
    'boca2': false,
    'boca3': false,
    'boca4': false
};

function defineState(id, cx, cy, label, desc) {
    return { id, cx, cy, r: 20, label, desc, fill: 'yellow'};
}

// Array de estados usando a função de criação
const states = [
    defineState('0000', 475, 100, 'q0', 'Todas as bocas estão desligadas'),
    defineState('1000', 250, 250, 'q1', 'Apenas a boca 1 está ligada'),
    defineState('0100', 400, 250, 'q2', 'Apenas a boca 2 está ligada'),
    defineState('0010', 550, 250, 'q3', 'Apenas a boca 3 está ligada'),
    defineState('0001', 700, 250, 'q4', 'Apenas a boca 4 está ligada'),

    defineState('1100', 100, 450, 'q5', 'As bocas 1 e 2 estão ligadas'),
    defineState('1010', 250, 450, 'q6', 'As bocas 1 e 3 estão ligadas'),
    defineState('1001', 400, 450, 'q7', 'As bocas 1 e 4 estão ligadas'),
    defineState('0110', 550, 450, 'q8', 'As bocas 2 e 3 estão ligadas'),
    defineState('0101', 700, 450, 'q9', 'As bocas 2 e 4 estão ligadas'),
    defineState('0011', 850, 450, 'q10', 'As bocas 3 e 4 estão ligadas'),

    defineState('1110', 250, 650, 'q11', 'As bocas 1, 2 e 3 estão ligadas'),
    defineState('1101', 400, 650, 'q12', 'As bocas 1, 2 e 4 estão ligadas'),
    defineState('1011', 550, 650, 'q13', 'As bocas 1, 3 e 4 estão ligadas'),
    defineState('0111', 700, 650, 'q14', 'As bocas 2, 3 e 4 estão ligadas'),

    defineState('1111', 475, 800, 'q15', 'Todas as bocas estão ligadas')
];

states[0].fill = 'red';

function defineTransition(sourceState, symbol, targetState) {
    const source = states.find(e => e.label === sourceState);
    const target = states.find(e => e.label === targetState);

    const sourceX = parseFloat(source.cx);
    const sourceY = parseFloat(source.cy);

    const targetX = parseFloat(target.cx);
    const targetY = parseFloat(target.cy);

    return { from: [sourceX, sourceY], to: [targetX, targetY], label: symbol };
}

// Array de setas entre estados
const arrows = [
    defineTransition('q0', '1', 'q1'),
    defineTransition('q0', '2', 'q2'),
    defineTransition('q0', '3', 'q3'),
    defineTransition('q0', '4', 'q4'),

    defineTransition('q1', '2', 'q5'),
    defineTransition('q1', '3', 'q6'),
    defineTransition('q1', '4', 'q7'),
    defineTransition('q2', '1', 'q5'),
    defineTransition('q2', '3', 'q8'),
    defineTransition('q2', '4', 'q9'),
    defineTransition('q3', '1', 'q6'),
    defineTransition('q3', '2', 'q8'),
    defineTransition('q3', '4', 'q10'),
    defineTransition('q4', '1', 'q7'),
    defineTransition('q4', '2', 'q9'),
    defineTransition('q4', '3', 'q10'),

    defineTransition('q5', '3', 'q11'),
    defineTransition('q5', '4', 'q12'),
    defineTransition('q6', '2', 'q11'),
    defineTransition('q6', '4', 'q13'),
    defineTransition('q7', '2', 'q12'),
    defineTransition('q7', '3', 'q13'),
    defineTransition('q8', '1', 'q11'),
    defineTransition('q8', '4', 'q14'),
    defineTransition('q9', '1', 'q12'),
    defineTransition('q9', '3', 'q14'),
    defineTransition('q10', '1', 'q13'),
    defineTransition('q10', '2', 'q14'),

    defineTransition('q11', '4', 'q15'),
    defineTransition('q12', '3', 'q15'),
    defineTransition('q13', '2', 'q15'),
    defineTransition('q14', '1', 'q15')
];

const svg = document.getElementById('svgCanvas');
const buttons = document.querySelectorAll('.button');