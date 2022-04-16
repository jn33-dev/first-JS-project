// 랜덤번호 지정
// 유저가 번호를 입력한다 -> go 버튼 누름
// 만약에 유저가 랜덤번호를 맞추면, "맞췄습니다!"
// 랜덤번호가 < 유저번호 -> DOWN!!!
// 랜덤번호가 > 유저번호 -> UP!!!
// RESET 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 GAME OVER (더이상 시도 불가, GO 버튼 DISABLED)
// 유저가 1~100 범위 밖의 숫자를 입력하면 경고. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let userValueHistory = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener('focus', function(){
    userInput.value = '';
})

function pickRandomNumber(){
    computerNum = Math.floor(Math.random()*100)+1; 
    console.log('정답', computerNum);
}

function play(){
    let userValue = userInput.value;
    if(userValue<1 || userValue > 100){
        resultArea.textContent = '범위 밖의 값을 입력하셨습니다.';
        return;
    }
    if(userValueHistory.includes(userValue)){
        resultArea.textContent = '이미 입력한 숫자입니다.';
        return;
    }
    chances--;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    if(userValue < computerNum){
        resultArea.textContent = 'UP!!!';
    }else if(userValue > computerNum){
        resultArea.textContent = 'DOWN!!!';
    }else {
        resultArea.textContent ='정답입니다!!!';
        chanceArea.textContent = `RESET 버튼을 누르세요!`;
        gameOver = true;
    }

    userValueHistory.push(userValue);
        
    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    // user input창 정리
    userInput.value = '';
    // 새로운 번호 생성
    pickRandomNumber();
    resultArea.textContent = '결과값이 여기 나옵니다.';
    play();
}


pickRandomNumber();