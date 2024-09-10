# Projeto de Interface Interativa com HTML, CSS e JavaScript

Este projeto consiste em uma interface interativa que simula um autômato de um fogão de 4 bocas, a partir de 4 botões de controle (que representam as bocas do fogão), representados por círculos brancos que se alternam para vermelho ao clique, juntamente do desenho dos estados e transições do autômato, estados esses também clicáveis. O usuário pode ligar e desligar cada boca individualmente usando os botões de contole tendo uma resposta na estrutua visual do autômato, também é possível clicar em um estado específico e ver a disposição de bocas ligadas daquele estado. Além disso, o projeto inclui a descrição formal do autômato, assim como a descrição do que seus estados representam.


## Funcionalidades

- **Controle das bocas**: Cada boca pode ser ligada ou desligada independentemente a partir dos botões que a representa.
- **Exibição do estado**: O estado do sistema é exibido com base nas combinações de bocas ligadas, indicando se todas estão desligadas, apenas algumas estão ligadas ou todas estão ligadas, também é visível o estado atual do autômato em sua representação visual.
- **Interface estilizada**: A interface é estilizada com elementos vermelhos, botões arredondados, e a representação do autômato a direita.


## Layout

A interface é composta pelos seguintes elementos:
- **Botões de controle**: Botões que representam as bocas do fogão, dispostos em linha.
- **Estado atual do sistema**: Uma linha de texto que exibe o estado atual do sistema (`q0` a `q15`) dependendo da combinação das bocas ligadas.
- **Caixa de texto para teste de palavras**: Caixa de texto para visualizar o comportamento do autômato dada uma palavra da linguagem.
- **Representação visual do autômato**: Posicionado no lado direito da página.
- **Descrição formal do autômato**: Um texto que exibe a descrição formal do autômato.
- **Descrição dos estados do autômato**: Um texto que exibe a descrição de cada estado do autômato.

## Como Usar

1. **Baixe os arquivos**:

    É encontrado no botão verde "code" ao subir a tela e clique em "Download ZIP"

2. **Abra o arquivo `page.html` ao pasta que foi baixada**:
    Basta abrir o arquivo `page.html` em qualquer navegador web, possuindo os demais arquivos no mesmo diretório de `page.hmtl`.

3. **Interaja com a interface**:
    - Clique nos botões para ligar ou desligar cada boca, ou nos estados para ver a disposição das bocas daquele estado.
    - Observe a atualização do estado do sistema na frase exibida, juntamente na alteração da cor no estado atual do autômato.
    - Digite uma palavra da linguagem e veja como o autômato se comporta ao ler aquela palavra.

## Tecnologias Utilizadas

- **HTML**: Estrutura básica da página.
- **CSS**: Estilos visuais, incluindo o posicionamento da imagem, cores, layout em grade, centralização de elementos, arredondamento dos botões, etc.
- **JavaScript**: Lógica para controlar o estado das bocas e atualizar a exibição do estado.

## Estrutura do Projeto

- `index.html`: Arquivo principal da interface web.
- `styles.css`: Arquivo de estilos que define o layout e aparência dos elementos.
- `consts.js`: Arquivo de script que contém as constantes utilizadas nos demais scripts.
- `svgDrawFunctions.js`: Arquivo de script que contém a logica para geração de elementos SVG, assim como a lógica da disposições desses elementos no SVG.
- `scripts.js`: Arquivo de script que contém a lógica de botões para a manipulação dos estados, das bocas e atualização da interface, juntamente de outros blocos de código para o perfeito funcionamento da página.
- `funcoesDeTransicao`: Imagem utilizada para visualizar detalhadamente as funções de transição do autômato dentro da página.
