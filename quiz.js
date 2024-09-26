const qsn = document.getElementById("question");
const option = document.getElementsByClassName("options-container");
const next = document.querySelector("#next-btn");
const next1 = document.querySelectorAll(".option-btn");
let i = 0;
let j = 0;
let score = 0;
const modeSwitcher = document.querySelector('.mode-switcher input');
const body = document.body;
const Timer = () => {
    let h = 0, m = 0, s = 0;
    let interval = null; // This is the global variable inside the closure

    function timerContinue() {
        if (interval === null) { // Only start if the interval is not already running
            interval = setInterval(() => { // Assign interval to the outer variable
                s++;
                if (s === 60) {
                    s = 0;
                    m++;
                }
                if (m === 60) {
                    m = 0;
                    h++;
                }
                document.querySelector('#time').innerText = `${h}:${m}:${s}`;
            }, 1000);
        }
    }

    return timerContinue;
}
const timerClouser = Timer();

function loadqsn() {

    async function getquestion() {
        const options = document.querySelectorAll('.option-btn');
        options.forEach((opt) => {
            opt.classList.remove('correct');
            opt.classList.remove('incorrect');
        })
        try {
            const res = await fetch(`https://the-trivia-api.com/v2/questions`);
            const data = await res.json();
            qsn.innerText = data[0]['question']['text'];
            const n1 = [];
            while (n1.length < 4) {
                const elm = Math.floor(Math.random() * 4);
                if (!n1.includes(elm)) {
                    n1.push(elm);
                }
            }

            options[n1[0]].textContent = data[0]['incorrectAnswers'][0];
            options[n1[1]].textContent = data[0]['incorrectAnswers'][1];
            options[n1[2]].textContent = data[0]['incorrectAnswers'][2];
            options[n1[3]].textContent = data[0]['correctAnswer'];

            document.querySelector('#category').innerText = data[0]['category'];




            document.querySelector('#progress').innerText = `Question ${++i}`
            options.forEach((option) => {
                option.addEventListener('click', function () {
                    let answer = this.textContent;

                    if (answer == data[0]['correctAnswer']) {
                        score++;
                        document.getElementById("score").innerText = `Score: ${score}`;
                        this.classList.remove('incorrect');
                        // this.classList.add('correct');
                    } else {
                        this.classList.remove('incorrect');
                        this.classList.add('incorrect');
                    }
                    options.forEach((opt) => opt.classList.remove('correct'));// removes correct class from previous eventlistner...
                    options[n1[3]].classList.add('correct');// adds correct class to new event listener


                })

            })


        } catch (err) {
            qsn.innerText = `Error Occured : ${err}`;
        }
        //    options.addEventListener('click',function(){
        //        let answer=this.textContent;
        //        console.log(answer);
        //    })

    }

    getquestion();
    timerClouser();
}
const loaddata = () => setTimeout(loadqsn, 400);

modeSwitcher.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});
next.addEventListener('click', loaddata);
next1.forEach((nxt1) => {
    nxt1.addEventListener('click', loaddata);
});

