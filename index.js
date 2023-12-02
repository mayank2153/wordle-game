
let height = 6;
let width=5;
let row =0;
let col = 0;
let gameOver = false;
const wordList = ["MANGO","TOKYO","APPLE","PEARS","TEARS","HELLO","FROST","WHALE", "CLOUD","SUGAR", "FAITH"]
const guessList=["MANGO","TOKYO","APPLE","PEARS","TEARS","HELLO","PIZZA","QUICK","WHICH","LUNCH", "HAPPY", "GRAPE", "LASER", "JUMBO","BEACH", "CRANE", "DAISY", "OCEAN", "UNITY","BLITZ", "FROST", "MUSIC", "ZEBRA", "LUNAR","QUEEN", "CHAIR", "SMILE", "GREEN", "SWEAT","VIVID", "KIWI", "SPARK", "PRISM", "OASIS","DREAM", "FLUTE", "MAGIC","BLAZE", "VIBES","SWIRL", "HONOR", "CROWN", "PEACE", "CHARM","SUNNY", "TIGER", "WALTZ", "WHALE", "CLOUD","SUGAR", "FAITH", "GRIND", "HAZEL", "FABLE","CREEK", "STORM", "TRAIL", "SWAMP", "SPACE"]
let word = wordList[Math.floor(Math.random()*wordList.length)];
console.log(word);
window.onload=function() {
    initialize();
}
function initialize() {
    for(let r=0;r<height;r++){
        for(let c=0;c<width;c++){
            let tile=document.createElement("span");
            tile.id=r.toString()+"-"+c.toString();
            // console.log(tile.id);
            tile.classList.add("tile");
            tile.innerText=" ";
            document.getElementById('board').appendChild(tile);
        }
    }
}
const abc=document.getElementById("type");
let keyboard = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Enter','Z','X','C','V','B','N','M','⌫']
]
function reload(){
    location.reload();
}
function giveup(){
    gameOver=true;
    alert("Correct answer is "+word+", Click on reset to restart game.");
}
for(let i =0;i<keyboard.length;i++) {
    let currRow=keyboard[i];
    let keyboardRow=document.createElement("div");
    keyboardRow.classList.add("keyboard-row");
    for(let j=0;j<currRow.length;j++) {
        let keyTile= document.createElement("div");
        let key = currRow[j];
        keyTile.innerText=key;
        keyTile.style.userSelect="none";
        if(key == "Enter"){
            keyTile.id="Enter";
        }
        else if(key=="⌫"){
            keyTile.id="Backspace";
        }
        else if(key>='A' && key<='Z'){
            keyTile.id="key"+key;
        }
        console.log(keyTile.id);
        keyTile.addEventListener("click",processKey);
        if(key=="Enter"){
            keyTile.classList.add("Enter-key-tile");
        }
        else{
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
    }
    abc.appendChild(keyboardRow);
}
document.addEventListener("keyup",(e)=>{
    processInput(e);
});
function processKey(){
    e={"code" : this.id};
    processInput(e);
}
function processInput(e){
    // console.log(e.code);
    if(gameOver){
        return;
    }
    if(e.code>="keyA" && e.code<="keyZ"){
        if(col<width){
            let currTile =  document.getElementById(row.toString()+"-"+col.toString());
            console.log(currTile);
            if(currTile.innerText==""){
                currTile.innerText=e.code[3];
                console.log(e.code[3]);
                col++;
            }
        }
    }
    else if(e.code=="Backspace"){
        console.log(col);
        if(col>0 && col<=width){
            col-=1;
        }
        let currTile =  document.getElementById(row.toString()+"-"+col.toString());
        currTile.innerText="";
    }
    else{
        update();
    }
    if(!gameOver && row == height){
        gameOver=true;
        document.getElementById("ans").innerText=word;
    }

}
function update(){
    let guess="";
    document.getElementById("ans").innerText="";
    for(let i =0;i<width;i++){
        let currTile=document.getElementById(row.toString()+"-"+i.toString());
        let letter = currTile.innerText;
        guess+=letter;
    }
    if(!guessList.includes(guess)){
        document.getElementById("ans").innerText="This word is not in guesslist";
        return;
    }
    let correct=0;
    let letterCount={};
    for(let i=0;i<word.length;i++){
        let letter=word[i];
        if(letterCount[letter]){
            letterCount[letter]+=1;
        }
        else{
            letterCount[letter]=1;
        }
    }
    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+"-"+c.toString());
        console.log(currTile.innerText);
        let letter = currTile.innerText;
        if(word[c]==letter){
            currTile.classList.add("correct");
            let keyTile=document.getElementById("key"+letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct+=1;
            letterCount[letter]-=1;
        }
        if(correct==width){
            gameOver=true;
            document.getElementById("ans").innerText="CORRECT GUESS!!!, Word is "+word;
        }
    }
    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+"-"+c.toString());
        let letter = currTile.innerText;
        if(!currTile.classList.contains("correct")){
            if(letterCount[letter]>0 && word.includes(letter)){
                currTile.classList.add("present");

                let keyTile = document.getElementById("key"+letter);
                if(!keyTile.classList.contains("correct")){
                    keyTile.classList.add("present");
                }
                letterCount[letter]-=1;
            }
            else{
                currTile.classList.add("absent");
                let keyTile = document.getElementById("key"+letter);
                keyTile.classList.add("absent");
            }
        }
    }
    row+=1;
    col=0;
}