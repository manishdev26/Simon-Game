let gameSeq = [];           // yeha game ka sequence yad rakhne ke liye array liye hai
let userSeq = [];           // yeha user ka sequence yad rakhne ke liye array liye hai


/********************************* Step 1: key press krne par game ko start krne ke liye   *************************************/


let started = false;
let level = 0;                  // starting mai level 0 rhne ke liye use kiye

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){         // keypress yani keyboard se koi bhi key press krte hai to game chalu ho jayega
    if(started == false)
    {
        console.log("game is started");
           started = true;
           levelUp();                   // jab key press krne ke bad level up hone ke liye LevelUp() lo call kiye hai
    }

});




/***************************** Step 2: automatic game button flash karane ke liye   *************************************/


let btns = ["yellow", "red", "blue", "green"];

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);          // yeha 4 se multiply esikiye kiye hai taki 0,1,2,3 enme se koi random number de
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);


    // console.log(randIdx);            // ye check krne ke liye use kare ki levelUp() work kr rha hai ki nahi
    // console.log(randColor);
    // console.log(randBtn);


    gameSeq.push(randColor);    // genrate flash random color insert in array
    console.log(gameSeq);
    gameFlash(randBtn);         // genrate flash random color
    


}

function gameFlash(gameBtn){
    gameBtn.classList.add("flash");

    setTimeout(function(){
        gameBtn.classList.remove("flash");
    }, 250);
}


function userFlash(gameBtn){
    gameBtn.classList.add("user_Flash");

    setTimeout(function(){
        gameBtn.classList.remove("user_Flash");
    }, 250);
}




/***************************** Step 3: game button ko click krne par flash karna   *************************************/


let allBtns = document.querySelectorAll(".gameBtn");
for( btn of allBtns)
{
    
    btn.addEventListener("click", btnPress);
}


function btnPress(){
    if(started === true){
        let gameBtn = this;
    userFlash(gameBtn);

    userColor = gameBtn.getAttribute("id");             // game button ko click kerne par uska color dega esiliye id use kiye hai
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

    //console.log("key was press");
    }
}


/*********************** Step 4:  Check Sequence krne ke liye  *************************************/


function checkAns(Idx)
{

    if (userSeq[Idx] === gameSeq[Idx]) {                        //esse only first step hi match hota hai
        if (userSeq.length === gameSeq.length) {                //aur ye condtion use krne par ab pura sequence ko check krta hai
            setTimeout(levelUp, 1000);
        }
    }
    
    else
    {
        h2.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";

        // setTimeout(function(){
        //     document.querySelector("body").style.backgroundColor = rgb(54, 75, 113);
        // }, 150);

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="rgb(54, 75, 113)";
        }, 1000);

        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}