function buildSvgCircle(id, cx, cy, r, fill) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', id);
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    
    return circle;
}

function buildSvgText(x, y, textAnchor, fontSize, fill, label) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', textAnchor);
    text.setAttribute('font-size', fontSize);
    text.setAttribute('fill', fill);
    text.textContent = label;
    text.setAttribute('pointer-events', 'none');

    return text
}

function buildSvgArrowComponents(x1, y1, x2, y2, label) {
    function buildSvgArrowLineAndHead(x1, y1, x2, y2, color) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '2');

        const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const headSize = 10;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const xArrow1 = x2 - headSize * Math.cos(angle - Math.PI / 6);
        const yArrow1 = y2 - headSize * Math.sin(angle - Math.PI / 6);
        const xArrow2 = x2 - headSize * Math.cos(angle + Math.PI / 6);
        const yArrow2 = y2 - headSize * Math.sin(angle + Math.PI / 6);

        arrowHead.setAttribute('points', `${x2},${y2} ${xArrow1},${yArrow1} ${xArrow2},${yArrow2}`);
        arrowHead.setAttribute('fill', color);

        return { line, arrowHead };
    }

    const t = 0.75;
    const xb = x1 + t * (x2 - x1);
    const yb = y1 + t * (y2 - y1);

    const xr = x2 + t * (x1 - x2);
    const yr = y2 + t * (y1 - y2);

    const { line: line1, arrowHead: arrowHead1 } = buildSvgArrowLineAndHead(x1 - 15, y1 + 15, x2 - 15, y2 - 15, 'black');
    const label1 = buildSvgText(xb, yb, 'end', '12', 'black', label);

    const { line: line2, arrowHead: arrowHead2 } = buildSvgArrowLineAndHead(x2 + 15, y2 - 15, x1 + 15, y1 + 15, 'grey');
    const label2 = buildSvgText(xr, yr, 'end', '12', 'grey', label);

    return { line1, arrowHead1, label1, line2, arrowHead2, label2 };
}

function drawInicialArrowOnSvg(state) {
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const baseSize = 20;

        const x1 = state.cx;
        const y1 = state.cy - state.r;

        const x2 = state.cx - baseSize / 2;
        const y2 = state.cy - state.r - 15;

        const x3 = state.cx + baseSize / 2;
        const y3 = state.cy - state.r - 15;

        triangle.setAttribute('points', `${x2},${y2} ${x3},${y3} ${x1},${y1}`);
        triangle.setAttribute('fill', 'none');
        triangle.setAttribute('stroke', 'black');
        triangle.setAttribute('stroke-width', '2');

        svg.appendChild(triangle);
}

// Função para gerar estados e setas
function drawStateOnSvg(state) {
    const circle = buildSvgCircle(state.id, state.cx, state.cy, state.r, state.fill);
    const innerCircle = buildSvgCircle(state.id, state.cx, state.cy, state.r - 5, state.fill);
    const text = buildSvgText(state.cx, state.cy + 5, 'middle', '16', 'black', state.label);

    svg.appendChild(circle);
    svg.appendChild(innerCircle);
    svg.appendChild(text);
}

function drawTransitionArrowOnSvg(arrow) {
    const { line1, arrowHead1, label1, line2, arrowHead2, label2 } = buildSvgArrowComponents(arrow.from[0], arrow.from[1], arrow.to[0], arrow.to[1], arrow.label);
    svg.appendChild(line1);
    svg.appendChild(arrowHead1);
    svg.appendChild(label1);
    svg.appendChild(line2);
    svg.appendChild(arrowHead2);
    svg.appendChild(label2);
}

function drawAutomatonOnSvg() {
    svg.innerHTML = '';

    states.forEach(state => {
        drawStateOnSvg(state)

        if (state.id === '0000')
            drawInicialArrowOnSvg(state);
    });

    arrows.forEach(arrow => {
        drawTransitionArrowOnSvg(arrow)
    });

    innerCircleListenerOn(true);
    attAutomatonState();
}