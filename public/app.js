let timerId;
let animationId;
let text = document.querySelector('.breathing-state');


/*----------------------------EVENT LISTENERS----------------------------*/

/*------light mode/dark mode--------*/

let modeBtns = document.querySelectorAll('.mode-btn');

for(let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function() {
        if(this.classList.contains('light-mode')) {
            document.querySelector('body').classList.add('light-mode');
            document.querySelector('body').classList.remove('dark-mode');
            document.querySelector('h1').classList.add('light-mode');
            document.querySelector('h1').classList.remove('dark-mode');
        } else {
            document.querySelector('body').classList.add('dark-mode');
            document.querySelector('body').classList.remove('light-mode');
            document.querySelector('h1').classList.add('dark-mode');
            document.querySelector('h1').classList.remove('light-mode');
        }
    });
}

/*-----control center------*/

let arrows = document.querySelectorAll('.arrow');

for(let i = 0; i < arrows.length; i++) {
    
    arrows[i].addEventListener('click', function() {
        updateCount(this);
    });
    
}

/*--------launch pad--------*/

document.querySelector('.start').addEventListener('click', () => {
    let minuteCount = parseInt(document.querySelector('.minutes .count').textContent);
    let minutesRunning = 60 * minuteCount,
    display = document.querySelector('#time');
    let inhale = parseInt(document.querySelector('.breathe-in .count').textContent) * 1000;
    let hold1 = parseInt(document.querySelector('.hold-in .count').textContent) * 1000;
    let exhale = parseInt(document.querySelector('.breathe-out .count').textContent) * 1000;
    let hold2 = parseInt(document.querySelector('.hold-out .count').textContent) * 1000;
    let inhaleDuration = parseInt(document.querySelector('.breathe-in .count').textContent);
    let exhaleDuration = parseInt(document.querySelector('.breathe-out .count').textContent)
    let intervalLength = inhale + hold1 + exhale + hold2;

    if(inhaleDuration === 0) {
        document.querySelector('.error-message').textContent = 'Please add time to the inhale card';
        document.querySelector('.error-modal').style.display = 'flex';
        return;
    }

    if(exhaleDuration === 0) {
        document.querySelector('.error-message').textContent = 'Please add time to the exhale card';
        document.querySelector('.error-modal').style.display = 'flex';
        return;
    }

    if(minuteCount === 0) {
        document.querySelector('.error-message').textContent = 'Please add time to the timer';
        document.querySelector('.error-modal').style.display = 'flex';
        return;
    }

    

    startTimer(minutesRunning, display);

    setTimeout(() => {
        bubbleAnimation(inhale, hold1, exhale, hold2, inhaleDuration, exhaleDuration);
        animationId = setInterval(() => {
            bubbleAnimation(inhale, hold1, exhale, hold2, inhaleDuration, exhaleDuration);
        }, intervalLength);
    }, 1000)
});


document.querySelector('.reset').addEventListener('click', () => {
    clearInterval(timerId);
    clearInterval(animationId);
    document.querySelector('.zen-bubble').style.animationDuration = '0s';
    text.textContent = 'Zen';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.error-modal').style.display = 'none';
})

/*--------------------------------FUNCTIONS------------------------------------*/

function updateCount(arrow) {
    let countValue = parseInt(arrow.parentElement.childNodes[3].textContent);

    if(arrow.classList.contains('up')) {
        countValue++;
    } 

    if (arrow.classList.contains('down') && countValue > 0) {
        countValue--;
    }

    arrow.parentElement.childNodes[3].textContent = `${countValue}`;
};

/*
//felt lazy, this was easy to just plug and play..
source: https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
**/
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            document.querySelector('.reset').click();
            text.textContent = 'Good Work!';
        }
    }, 1000);
}

/*
    Params: inhale, hold1, exhale, hold2 are milliseconds
    Params: inhaleDuration, exhaleDuration are in seconds for css animation duration
*/
function bubbleAnimation(inhale, hold1, exhale, hold2, inhaleDuration, exhaleDuration) {
    let bubble = document.querySelector('.zen-bubble');

    bubble.classList.add('inhale');
    text.textContent = 'Inhale';
    bubble.style.animationDuration = `${inhaleDuration}s`;

    setTimeout(() => {

        text.textContent = 'Hold';
        bubble.classList.add('hold-1');
        setTimeout(() => {

            text.textContent = 'Exhale';
            bubble.classList.remove('hold-1');
            bubble.classList.remove('inhale');
            bubble.classList.add('exhale');
            bubble.style.animationDuration = `${exhaleDuration}s`;
            setTimeout(() => {

                text.textContent = 'Hold';
                bubble.classList.add('hold-2');
                setTimeout(() => {

                    text.textContent = 'Inhale';
                    bubble.classList.remove('hold-2');
                    bubble.classList.remove('exhale');
                }, hold2);

            }, exhale);

        }, hold1)

    }, (inhale));

}

