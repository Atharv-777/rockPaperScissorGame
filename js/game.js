document.addEventListener('DOMContentLoaded', function(){
    let player;
    let computer;
    let score = 0;
    let check = false;
    let arr = ['img/rock.png', 'img/paper.png', 'img/scissor.png'];
    let text;
    let lives;
    let len;
    let interval;
    let scoreWinLose;
    
    
    
    function setComputerText(){                                                         //Computer changing text
        clearInterval(interval);
        interval = setInterval(function(){
            text = Math.ceil(Math.random()*arr.length - 1);
            document.querySelector('#computer').src = arr[text];
        }, 100);
        document.querySelector('#player').src = "";
    }  
    
    disableButton(false);
    
    document.getElementById('start').onclick = function(){
        lives = [0, 1, 2];
        len = lives.length;
        disableButton(true)
        setComputerText();
        for(let i = 0; i < len; i++){
            document.getElementById(`${i}`).style.visibility = "visible";
        }
        document.querySelectorAll('button').forEach(button =>{                              //User selecting options
            button.onclick = function(){
                clearInterval(interval);
                setTimeout(setComputerText, 2000);
                document.querySelector('#player').src = button.dataset.src;
                player = $('#player');
                computer = $('#computer');
                document.querySelector('#score').innerHTML = scoreBoard(computer, player);
                
            }
        });
        document.getElementById('start').disabled = true;
        document.getElementById('score').innerHTML = "";
        setTimeout(score = 0, 1000);
    }

    function scoreBoard(computer, player){                                                  //checking both selections and incrementing/decrementing score
        if(computer.attr('src') === 'img/rock.png'){
            if(player.attr('src') === 'img/paper.png'){
                console.log('win');
                score += 1;
            }
            if(player.attr('src') === 'img/scissor.png'){
                console.log('decrement');
                score = checkZero(lives, score);
            }
        }
        if(computer.attr('src') === 'img/paper.png'){
            if(player.attr('src') === 'img/scissor.png'){
                console.log('win');
                score += 1;
            }
            if(player.attr('src') === 'img/rock.png'){
                console.log('decrement');
                score = checkZero(lives, score);
            }
        }
        if(computer.attr('src') === 'img/scissor.png'){
            if(player.attr('src') === 'img/rock.png'){
                console.log('win');
                score += 1;
            }
            if(player.attr('src') === 'img/paper.png'){
                console.log('decrement');
                score = checkZero(lives, score);
            }
        }   
        if(score === 10){
            score = 'Win';
            clearInterval(interval);
            document.getElementById('start').disabled = false;
            disableButton(false);
        }
    
        return score;
    }

    function checkZero(lives, num){                                                                //function for checking score = 0 , return 0 else decrement score

        temp = true;
    
        for(let i = len-1; i >= 0; i--){
            if(temp === true){
                if(i === 0){
                    num = 'Loose';
                    console.log('You Loose')
                    clearInterval(interval); 
                    disableButton(false);
                    document.getElementById(`${i}`).style.visibility = "hidden";
                    document.getElementById('start').disabled = false;
                    
                }
                else{
                    document.getElementById(`${i}`).style.visibility = "hidden"; 
                    lives.splice(i,1);
                    len = lives.length;
                    temp = false;
                }
            }
        }
        return num
    }

    function disableButton(isDisable){
        if(isDisable === false){
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = true;
            });
        }
        else{
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = false;
            });
        }
    }
});
