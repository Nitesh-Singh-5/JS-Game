const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea');
const sideScore = document.querySelector('.side-score')

// console.log(score);

startScreen.addEventListener('click', start);

let player = {speed:5, score:0 };

let keys = { ArrowUp : false, ArrowDown :false, ArrowLeft : false, ArrowRight : false }

document.addEventListener('keydown',KeyDown);
document.addEventListener('keyup',KeyUp);

function KeyDown(e){
    e.preventDefault(); // to prevent js pre functionalities
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys)
}
function KeyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys)
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right) )
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >= 700){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}



function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isCollide(car, item)){
            console.log("boom hit");
            endgame();
        }

        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay(){
    // console.log("clicked");
    let car = document.querySelector("#car");
    let road = gameArea.getBoundingClientRect();
    // console.log(road)
    if(player.start){
        sideScore.classList.remove('hide'); 
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top+30)){ player.y -= player.speed}
        if (keys.ArrowDown && player.y < (road.bottom-85)){ player.y += player.speed }
        if (keys.ArrowLeft && player.x>0 ){ player.x -= player.speed}
        if (keys.ArrowRight && player.x < (road.width - 50)){ player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let ps = player.score - 1;
        sideScore.innerText = ps;
        
    }
}

function start(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(var x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (x*150);
        roadLine.style.top = (x*150)+"px";
        gameArea.appendChild(roadLine)
    }

    let car = document.createElement('div');
    car.setAttribute('id','car');
    // car.innerText = "Hey I am your car"
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("Top Position : " + car.offsetTop);
    // console.log("Left Position : "+ car.offsetLeft)

    for(var x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*300)*-1;
        enemyCar.style.top = enemyCar.y+"px";
        // enemyCar.style.background = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

