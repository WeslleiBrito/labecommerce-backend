

const pedraPapelTesoura = (escolhaUsuario) => {

    const condicaoVitoria = {
        pedra: "tesoura",
        tesoura: "papel",
        papel: "pedra"
    }

    const opcoes = ["pedra", "tesoura", "papel"]

    escolhaUsuario = escolhaUsuario.toLowerCase()
    const escolhaMaquina = opcoes[Math.floor(Math.random() * 3)]

    let resultado

    if (opcoes.includes(escolhaUsuario)) {

        if (condicaoVitoria[escolhaUsuario] === escolhaMaquina) {
            resultado = "Você Ganhou!"
        } else if (escolhaMaquina === escolhaUsuario) {
            resultado = "Empate!"
        } else {
            resultado = "Você perdeu!"
        }

        console.log(`Você escolheu ${escolhaUsuario} e o computador escolheu ${escolhaMaquina}. ${resultado}`)

    } else {
        console.log('Você deve escolher uma das seguintes opções: ["Pedra", "Papel" ou "Tesoura"].')
    }
}

const escolhaUsuario = process.argv[2]

pedraPapelTesoura(escolhaUsuario)