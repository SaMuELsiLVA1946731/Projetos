class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {

        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {

                return false
            }
        }

        return true
    }
}


class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id == null) {
            localStorage.setItem('id', 0)
        }
    }

    getproximoId() {
        let proximoId = localStorage.getItem('id')

        return parseInt(proximoId) + 1;
    }

    gravar(d) {

        let id = this.getproximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        let despesas = Array();

        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {

                continue
            }


            despesa.id = i
            despesas.push(despesa);


        }

        despesas.forEach(function (d) {

            /* console.log(d); */


        })

        return despesas;


    }


    pesquisar(despesa) {




        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()





        if (despesa.ano != '') {

            console.log('filtro de ano');

            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);



        }

        if (despesa.mes != '') {

            console.log('filtro de mes');

            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);


        }

        if (despesa.dia != '') {
            console.log('filtro  do dia');
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);

        }

        if (despesa.tipo != '') {
            console.log('filtro de tipo');
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        }

        if (despesa.descricao != '') {
            console.log('filtro de descricao');
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if (despesa.valor != '') {
            console.log('filtro de valor');
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.valor)
        }

        console.log(despesasFiltradas);
        return despesasFiltradas;

    }

    remover(id) {
        localStorage.removeItem(id)
    }






}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {

        bd.gravar(despesa);

        document.getElementById("cor modal").className = "modal-header text-success";
        document.getElementById("cor botao").className = "btn btn-success";
        document.getElementById("cor botao").innerHTML = "Voltar";
        document.getElementById("exampleModalLabel").innerHTML = "Registro inserido com sucesso";
        document.getElementById("texto modal").innerHTML = "Despesa foi cadastado com sucesso";


        // instrução para chamar o mondal sucesso de forma programada
        $('#modalRegistraDepesa').modal('show')
    }
}


function carregarListaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro === false) {
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''



    despesas.forEach(function (d) {

        /*  console.log(d); */


        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajustar o tipo

        switch (d.tipo) {
            case '1': d.tipo = "Alimentação";
                break;
            case '2': d.tipo = "Educação";
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saude';
                break;
            case '5': d.tipo = 'Transporte';
                break;
        }


        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)

            window.location.reload()
        }


        linha.insertCell(4).append(btn);
        /* console.log(d); */


        let btn2 = document.createElement("button")
        btn2.className = "btn btn-primary"
        btn2.innerHTML = '<i class="fas fa-edit"></i>'



        linha.insertCell(5).append(btn2);

        btn2.addEventListener("click", function () {

            $('#modalUpdate').modal('show');

            document.getElementById("anolabel").value = d.ano;
            document.getElementById("meslabel").value = d.mes;
            document.getElementById("dialabel").value = d.dia;
            document.getElementById("tipolabel").value = d.tipo;
            document.getElementById("descricaolabel").value = d.descricao;
            document.getElementById("valorlabel").value = d.valor;


            var atualizar = document.getElementById("cor botao3");
            atualizar.innerHTML = "Atualizar";
            atualizar.addEventListener("click", function () {

                var ano = document.getElementById("anolabel").value;
                var mes = document.getElementById("meslabel").value;
                var dia = document.getElementById("dialabel").value;
                var tipo = document.getElementById("tipolabel").value;
                var descricao = document.getElementById("descricaolabel").value;
                var valor = document.getElementById("valorlabel").value;


                var despesa = {

                    ano: ano,
                    mes: mes,
                    dia: dia,
                    tipo: tipo,
                    descricao: descricao,
                    valor: valor

                }

                var id = d.id

                localStorage.setItem(id, JSON.stringify(despesa));




            })




        })


    })


}

function pesquisarDespesa() {



    let ano = document.getElementById('anoCon').value
    let mes = document.getElementById('mesCon').value
    let dia = document.getElementById('diaCon').value
    let tipo = document.getElementById('tipoCon').value
    let descricao = document.getElementById('descricaoCon').value
    let valor = document.getElementById('valorCon').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);


    let despesas = bd.pesquisar(despesa);

    /* console.log(despesas); */


    this.carregarListaDespesas(despesas, true);

}



function ordenar() {

    var datas = bd.recuperarTodosRegistros();

    var Ordenado = new Array();

     Ordenado = datas.sort((a, b) => b.ano - a.ano);

     this.carregarListaDespesas(Ordenado, true);



}


















