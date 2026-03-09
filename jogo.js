
    // elementos do jogo
        const menu = document.getElementById("menu");
        const game = document.getElementById("game");
        const lanterna = document.getElementById("lanterna");
        const monstro = document.getElementById("monstro");
        const mensagem = document.getElementById("mensagem");
        const jumpscare = document.getElementById("jumpscare");
        const SecretButton = document.getElementById("SecretButton");
        const novaChave = document.createElement("div");

        let jogoAtivo = false;
        let playerX = 0;
        let playerY = 0;
        let monstroX = 0;
        let monstroY = 0;
        let totalchaves = 3;
        let chavesColetadas = 0;
        let chaves = []
        let faseAtual = 1;
        let salasTotais = 3;

    function iniciarJogo() {

        menu.style.display = "none";
        game.style.display = "block";
        jogoAtivo = true;
        document.getElementById("hud").style.display = "block";

        // resetar(toda vez que pega uma chave a contagem é reiniciada ate pegar a terceira)
        chavesColetadas = 0;
        chaves.forEach(c => c.remove());
        chaves = [];
    
        ConfigFase();
        MudancaMapa()
        atualizarSalasHUD();
        atualizarChavesHUD();
    
        // criar várias chaves
        for (let i = 0; i < totalchaves; i++) {
            novaChave.classList.add("chave");

            novaChave.style.left = Math.random() * (window.innerWidth - 26) + "px";
            novaChave.style.top = Math.random() * (window.innerHeight - 26) + "px";

            game.appendChild(novaChave);
            chaves.push(novaChave);

            novaChave.addEventListener("click", () => {
                if (!jogoAtivo) return;

                novaChave.remove();
                chavesColetadas++;
                atualizarChavesHUD();

             if (chavesColetadas === totalchaves) {
        setTimeout(ProximaFase, 1500);

      
    }
            
                }
   
            );
            }   
        moverMonstro();
        EasterEgg();
        
}


        // monstro
        monstroX = Math.random() * (window.innerWidth - 50);
        monstroY = Math.random() * (window.innerHeight - 50);
        monstro.style.left = monstroX + "px";
        monstro.style.top = monstroY + "px";


        // faz com que a lanterna siga o mouse
        document.addEventListener("mousemove", e => {
            playerX = e.clientX;
            playerY = e.clientY;

            lanterna.style.left = playerX - 110 + "px";
            lanterna.style.top = playerY - 110 + "px";
        });

        function ConfigFase() {
            if (faseAtual === 1) {
            totalchaves = 3;
            mensagem.innerText = "Encontre as chaves... antes que ele te encontre...";
            monstro.style.display = "block";
        }

        if (faseAtual === 2) {
            totalchaves = 5;
            mensagem.innerText = "Ele está atras de você...";
        }

        if (faseAtual === 3) {
            totalchaves = 7;
            mensagem.innerText = "CORRA!";
        }

        if (faseAtual === 5) {
            totalchaves = 1;
            mensagem.innerText = "Deus te abençoe"
        }

    };

    // mudança de mapa, cada vez que voce termina as chave a imagem muda

        function MudancaMapa() {
            if (faseAtual == 1) {
                game.style.backgroundImage = "url(https://img.freepik.com/fotos-gratis/cena-de-horror-com-um-hospital-assustador_23-2150975200.jpg?semt=ais_hybrid&w=740&q=80)";
        }

        else if (faseAtual == 2) {
            game.style.backgroundImage = "url(https://www.gamereporter.com.br/wp-content/uploads/2016/10/Room-404.jpg)";
        }

        else if (faseAtual === 3) {
        game.style.backgroundImage = "url(https://img.freepik.com/fotos-gratis/casa-assombrada-em-estilo-gotico_23-2151626620.jpg?semt=ais_hybrid&w=740&q=80)";
        }
        else if (faseAtual === 5) {
            game.style.backgroundImage = "url(https://media.istockphoto.com/id/1163408439/pt/foto/altar-rituals-satanic.jpg?s=612x612&w=0&k=20&c=nrXagh1wNdiUIw7CQUI2nlISyLCiAa3p2wU8qzJPvTs=)"
        }
        }

        // próxima fase e vitória

        function ProximaFase() {
            
            faseAtual++;
            if (faseAtual > salasTotais) {
                vencerJogo();
            } else {
                iniciarJogo();
            }
            }
        
        //HUD
        function atualizarChavesHUD() {
        document.getElementById("hudChaves").innerText =
            `Chaves: ${chavesColetadas} / ${totalchaves}`;
    }



        function atualizarSalasHUD() {
        document.getElementById("HudMapas").innerText =
            `SALAS: ${faseAtual} / ${salasTotais}`;
    }


        //movimento do monstro
        function moverMonstro() {
            if (!jogoAtivo) return;

            const dx = playerX - monstroX;
            const dy = playerY - monstroY;
            const dist = Math.sqrt(dx*dx + dy*dy);

            const velocidade = 0.5 + faseAtual;
            monstroX += (dx / dist) * velocidade;
            monstroY += (dy / dist) * velocidade;

            monstro.style.left = monstroX + "px";
            monstro.style.top = monstroY + "px";

            if (dist < 40) {
                jumpscare.style.display = "flex";
                jogoAtivo = false;

                setTimeout(() => {
                   SecretButton.style.display = "block";
            }, 2000);
            }
            
            
            requestAnimationFrame(moverMonstro);
           
        }

        // vitória
        function vencerJogo() {
        mensagem.innerText = "Você escapou...por enquanto.";
        mensagem.style.color = "darkred";
        jogoAtivo = false;
        monstro.style.display = "none";
        game.style.backgroundImage = "url(https://img.freepik.com/fotos-premium/porta-de-terror-de-suspense_87720-62478.jpg)";
        }

        function alertaSecreto(){ 
        alert("achou que ia escapar né");
        alert("você não deveria ter clicado aqui...");
        alert("...");
        alert("...");
        alert("que barulho é esse?");
        alert("???");
    
        
        faseSecreta();
    }
 SecretButton.addEventListener("click", alertaSecreto);

    function faseSecreta() { 
        jogoAtivo = true;
        jumpscare.style.display = "none";
        faseAtual = 5;

if (faseAtual === 5) {
        totalchaves = 1;
        monstroX = Math.random() * (window.innerWidth - 50);
        monstroY = Math.random() * (window.innerHeight - 50);

        monstro.style.left = monstroX + "px";
        monstro.style.top = monstroY + "px";

        SecretButton.style.display = "none";
        lanterna.style.left = playerX - 60 + "px";
        lanterna.style.top = playerY - 60 + "px";

}


    
        ConfigFase();
        MudancaMapa();
        moverMonstro();
      
 }
