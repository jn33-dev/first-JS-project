// 랜덤번호 지정
// 유저가 번호를 입력한다 -> go 버튼 누름
// 만약에 유저가 랜덤번호를 맞추면, "맞췄습니다!"
// 랜덤번호가 < 유저번호 -> DOWN!!!
// 랜덤번호가 > 유저번호 -> UP!!!
// RESET 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 GAME OVER (더이상 시도 불가, GO 버튼 DISABLED)
// 유저가 1~100 범위 밖의 숫자를 입력하면 경고. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let randomNum = 0;
let chance = 5;
let userValueHistory = [];
let gameOver = false;
let resultArea = document.getElementById('user-desc');
let chanceArea = document.getElementById('user-chance');
let userInput = document.getElementById('user-input');
let playButton = document.getElementById('button-go');
let resetButton = document.getElementById('button-reset');

chanceArea.innerHTML = `남은 도전 기회: ${chance}`;
resultArea.innerHTML = '게임을 시작하세요!';
playButton.addEventListener('click',play);
resetButton.addEventListener('click',reset);
userInput.addEventListener('focus', focusInput);


function makeRandomNum(){
    randomNum = Math.floor(Math.random()*100)+1
    console.log('정답:', randomNum);
}

function play(){
    const userValue = userInput.value;

    if(userValue < 1 || userValue > 100){
        resultArea.textContent = '잘못된 값을 입력하였습니다.';
        return;
    }
    if(userValueHistory.includes(userValue)){
        resultArea.textContent = '이미 입력된 값입니다.';
        return;
    }
    
    chance--;
    chanceArea.innerHTML = `남은 도전 기회: ${chance}`;
    userValueHistory.push(userValue);

    if(userValue < randomNum){
        resultArea.textContent = 'UP🔼';
    }else if(userValue > randomNum){
        resultArea.textContent = 'DOWN🔽';
    }else{
        resultArea.textContent = '정답입니다❕💯';
        gameOver = true;
        return chance;
    }
    
    if(chance == 0){
        gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true;
        resultArea.textContent = 'RESET을 눌러 게임을 시작하세요!';
    }
}

function focusInput(){
    userInput.value = '';
}


function reset(){   
    userInput.value = '';
    makeRandomNum();
    gameOver = false;
    playButton.disabled = false;
    chance = 5;
    chanceArea.innerHTML = `남은 도전 기회: ${chances}`;
    userValueHistory = [];
}
makeRandomNum();