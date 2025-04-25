function calcular(operacao){
    const n1 = document.getElementById("n1").value;   //camel case as funcoes no javascript
    const n2 = document.getElementById("n2").value;

    let resultado
    switch(operacao){
        case '+': resultado = soma(n1,n2); break;
        case '-': resultado = subtrair(n1,n2); break;
        case '*': resultado = multiplicar(n1,n2); break;
        case '/': resultado = dividir(n1,n2); break;
        default: resultado = "Operação inválida!"; break;
    }
    document.getElementById("resultado").innerHTML = resultado;
    //innerHTML = resultado; //innerHTML é o conteúdo que está dentro da tag HTML

}
function soma(n1,n2){
    return Number(n1) + Number(n2);
}

function subtrair(n1,n2){
    return Number(n1) - Number(n2);
}

function multiplicar(n1,n2){
    return Number(n1) * Number(n2);
}

function dividir(n1,n2){
    if (n2 == 0) return "Divisão por zero não é permitida!";
    // Se n2 for igual a 0, retorna uma mensagem de erro
    return Number(n1) / Number(n2);
}
