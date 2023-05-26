


const parOuImpar = (escolhaUsuario, numeroUsuario) => {

    escolhaUsuario = escolhaUsuario.toLowerCase()
    numeroUsuario = Number(numeroUsuario)

    const numeroPc = Math.floor(Math.random() * 11)
    const soma = numeroPc + numeroUsuario

    let resultado


    if (numeroUsuario <= 10 && (escolhaUsuario === "par" || escolhaUsuario === "impar")) {

        if (soma % 2 === 0 && escolhaUsuario === "par" || soma % 2 !== 0 && escolhaUsuario === "impar") {
            resultado = "Você Ganhou!"
        } else {
            resultado = "Você perdeu!"
        }

        console.log(`Você escolheu ${escolhaUsuario} e o computador escolheu ${escolhaUsuario === "par" ? "impar" : "par"}. O resultado foi ${soma}. ${resultado}`)

    } else {
        console.log("Sua escolha deve ser ['Par' ou 'Impar'] e você deve informar um valor menor ou igual a 10.")
    }

}

const escolhaUsuario = process.argv[2]
const numeroUsuario = process.argv[3]

parOuImpar(escolhaUsuario, numeroUsuario)