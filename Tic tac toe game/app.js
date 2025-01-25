
let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector("#newGame");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn =  true;


const winPatterns = [
 [0,1,2],
 [0,3,6],
 [0,4,8], 
 [1,4,7],
 [2,5,8],
 [2,4,6], 
 [3,4,5],
 [6,7,8]
]

//getting input in boxes
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
          if(turn){
            box.innerText="0";
            turn = false;
            box.style.color="blue";
          }
          else{
            box.innerText="X";
            turn = true;
            box.style.color="red";
          }
          box.disabled=true; 

          checkWinner();
    }) 
})

const showWinner = (winner)=>{
    msg.innerText=`Congratulation ,Winner is ${winner}`;
    msgContainer.classList.remove("hide"); 

    for(box of boxes){
        box.disabled=true;
    }
};

//checking winner after every input
const checkWinner = () =>{
    for(let pattern of winPatterns){

        let post1 = boxes[pattern[0]].innerText;
        let post2 = boxes[pattern[1]].innerText;
        let post3 = boxes[pattern[2]].innerText;

        if(post1 !="" && post2 != "" && post3 !=""){
            if(post1===post2 && post2===post3){

                showWinner(post1);
            }
        }
    }

}


const resetGame = ()=>{
    turn = true;

    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }

    msgContainer.classList.add("hide");
    
}


newGame.addEventListener("click",resetGame);