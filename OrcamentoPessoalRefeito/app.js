class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){

        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for (let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){

                return false
            }
        }

        return true
    }
}

class Bd{
    constructor() {
        let id = localStorage.getItem(id)

        if(id == null){
            localStorage.setItem('id', 0)
        }
    }

    getproximoId(){
        let proximoId = localStorage.getItem('id')

        return parseInt(proximoId) + 1;
    }

    gravar(d){

        let id = this.getproximoId();

        localStorage.setItem(id, JSON.stringify(d) );

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){

        let despesas = Array();

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
        
            if(despesa === null){

                continue
            }
            

            despesa.id = i
            despesas.push(despesa);

        
        }

        return despesas;
        


    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
    
        despesasFiltradas = this.recuperarTodosRegistros()
    
        console.log(despesa);
        console.log(despesasFiltradas);
    
        if (despesa.ano != ''){

            console.log('filtro de ano');

            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);

            
            
        }

        if(despesa.mes != ''){

            console.log('filtro de mes');

            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes );

            
        }

        if(despesa.dia != ''){
            console.log('filtro  do dia');
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia );
            
        }

        if(despesa.tipo != ''){
            console.log('filtro de tipo');
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
            
        }

        if(despesa.descricao != ''){
            console.log('filtro de descricao');
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if(despesa.valor != ''){
            console.log('filtro de valor');
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.valor)
        }
        
        return despesasFiltradas;
    
    }

    remover(id){
        localStorage.removeItem(id)
    }
    
}

let bd = new Bd()

function cadastrarDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao =  document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
    )

    if (descricao.validarDados()){

        bd.gravar(despesa);

        document.getElementById('cor mondal').className = "modal-header text-success";
        document.getElementById('cor botao').className = "btn btn-success";
        document.getElementById('cor botao').innerHTML = "Voltar";
        document.getElementById('exampleModalLabel').innerHTML =  "Registro inserido com sucesso";
        document.getElementById('texto mondal').innerHTML = "Despesa foi cadastrada com sucesso";
        $('#modalRegistraDespesa').modal('show')

    }

}


function carregarListaDespesas(despesas =  Array(), filtro = false){

    if(despesas.length == 0 && filtro === false){
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(d){

        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    })
}
