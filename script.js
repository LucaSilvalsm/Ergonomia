const TEMPO_PADRAO = 3000; // 10 segundos para teste
let tempoTotal = TEMPO_PADRAO;
let tempoRestante = tempoTotal;
let intervalo;
let estaPausado = false;

const initialState = document.getElementById('initial-state');
const runningState = document.getElementById('running-state');
const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('barra-progresso');
const controlsDiv = document.getElementById('controles');
const btnPausa = document.getElementById('btn-pausa');
const labelStatus = document.getElementById('label-status');
const modal = document.getElementById('alerta-modal');
const audio = document.getElementById('som-notificacao');
const cardTimer = document.querySelector('.timer-card');

function iniciarJornada() {
    initialState.style.display = 'none';
    runningState.style.display = 'block';
    timerDisplay.style.display = 'block';
    controlsDiv.style.display = 'flex';
    document.querySelector('.progress-container').style.display = 'block';
    iniciarContagem();
}

function iniciarContagem() {
    clearInterval(intervalo);
    atualizarDisplay(tempoRestante);
    intervalo = setInterval(() => {
        if (!estaPausado) {
            tempoRestante--;
            atualizarDisplay(tempoRestante);
            let porcentagem = (tempoRestante / tempoTotal) * 100;
            progressBar.style.width = porcentagem + "%";
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                dispararAlerta();
            }
        }
    }, 1000);
}

function alternarPausa() {
    estaPausado = !estaPausado;
    if (estaPausado) {
        clearInterval(intervalo);
        btnPausa.innerText = "▶ Continuar";
        btnPausa.style.backgroundColor = "#4CAF50";
        btnPausa.style.color = "white";
        labelStatus.innerText = "Pausado";
        cardTimer.classList.add('paused-mode');
    } else {
        iniciarContagem();
        btnPausa.innerText = "⏸ Pausar";
        btnPausa.style.backgroundColor = "#FFC107";
        btnPausa.style.color = "#333";
        labelStatus.innerText = "Tempo até a pausa";
        cardTimer.classList.remove('paused-mode');
    }
}

function reiniciarTimer() {
    clearInterval(intervalo);
    tempoRestante = TEMPO_PADRAO;
    estaPausado = false;
    btnPausa.innerText = "⏸ Pausar";
    btnPausa.style.backgroundColor = "#FFC107";
    cardTimer.classList.remove('paused-mode');
    progressBar.style.width = "100%";
    iniciarContagem();
}

function atualizarDisplay(segundos) {
    let m = Math.floor(segundos / 60);
    let s = segundos % 60;
    timerDisplay.innerText = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function dispararAlerta() {
    modal.style.display = 'flex';
    audio.play().catch(e => console.log("Permissão de áudio necessária"));
}

function fecharAlerta() {
    modal.style.display = 'none';
    runningState.style.display = 'none';
    initialState.style.display = 'block';
    tempoRestante = TEMPO_PADRAO;
    progressBar.style.width = "100%";
}