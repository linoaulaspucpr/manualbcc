function detalhes(id){

    var div = document.getElementById(id);
    div.style.transform = "translateY(-100%)";

}

function fechar(id){

    var div = document.getElementById(id);
    div.style.transform = "none";

}

function fecharModal(){
    $(".class-modal").css("diplay", "none");
    $(".class-modal").hide();
}

function modal(){
    $(".class-modal-descricao").html("E-mail ou senha incorretos!");
    $('.class-modal').css('display', 'flex');
    $('.class-modal').show();
}


$('.class-modal').click(function(){
    if($('.class-modal-dialog').is(':hover') == false){
        $(".class-modal").css("diplay", "none");
        $(".class-modal").hide();
    }
});


$(document).ready(async function(){

    firebase.initializeApp(firebaseConfig);
    
    var atividade = await firebase.database().ref('bcc/atividade');
    atividade.on('value', async (snapshot) => {
        const data_atividade = snapshot.val();

        let count = 1;
        for(let i in data_atividade){

            montaItem(data_atividade[i], count);

            var item = await firebase.database().ref('bcc/atividade/'+count+"/item");
            item.on('value', async (snapshot) => {
                const data_item = snapshot.val();
                
                let count_atividade = 1;
                for(let j in data_item){ 

                    montaCard(data_item[j], count_atividade, count);
                    count_atividade++;
                }
            });

            count++;
        }
    });
});

function montaItem(objeto, id){

    var conteudo = "";

    conteudo += '<li class="collapsible-list">';
    conteudo += '<div class="collapsible-header">';
    conteudo += '<div class="collapsible-header-icone"> <i class="material-icons">work</i> </div>';
    conteudo += '<div class="collapsible-header-titulo">'+objeto.titulo+'</div>';
    conteudo += '<div class="collapsible-header-pontos"> 30 pontos</div>';
    conteudo += '</div>';
    conteudo += '<div class="collapsible-body collapsible-'+id+'" >';
    conteudo += '</div>';
    conteudo += '</li>';

    
    $(".lista-manual").append(conteudo);
}


function montaCard(objeto, id, id_pai){

    var conteudo = "";

    conteudo += '<div class="card">';
    conteudo += '<div class="card-titulo">';
    conteudo += objeto.titulo;
    conteudo += '<div class="card-mostrar-detalhes"><i class="material-icons" onclick="detalhes('+"'"+id_pai+"-"+id+"'"+')">more_vert</i></div>';
    conteudo += '</div>';
    conteudo += '<div class="card-desc">';
    conteudo += objeto.descricao;
    conteudo += '</div>';
    conteudo += '<div class="card-detalhes" id="'+id_pai+"-"+id+'">';
    conteudo += '<div class="card-detalhes-fechar"> ';
    conteudo += '<i class="material-icons" onclick="fechar('+"'"+id_pai+"-"+id+"'"+')">close</i>';
    conteudo += '</div>';
    conteudo += '<div>';
    conteudo += '<div class="card-pontuacao">';
    conteudo += '<div class="card-pontuacao-item">';
    conteudo += 'A cada 6 meses, com no mínimo 20 horas semanais, ganhará 15 pontos.';
    conteudo += '</div>';
    conteudo += '<div class="card-pontuacao-item">';
    conteudo += 'A cada 6 meses, com no mínimo 40 horas semanais, ganhará 30 pontos.';
    conteudo += '</div>';
    conteudo += '</div>';
    conteudo += '<div class="card-cadastro">';
    conteudo += '<button onclick="modal()">Como cadastrar?</button>';
    conteudo += '</div>';
    conteudo += '</div>';
    conteudo += '</div>';
    conteudo += '</div>';

    $(".collapsible-"+id_pai).append(conteudo);
}
