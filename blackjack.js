var dealerSum = 0;
var yourSum = 0;


var dealerAce = 0;
var yourAce = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function()
{
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck()
{
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"]; 
    deck = [];

    for(let i=0;i<types.length;i++)
    {
        for(let j=0;j<values.length;j++)
        {
            deck.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(deck);
}

function shuffleDeck()
{
    for(let i=0;i<deck.length;i++)
    {
        let j = Math.floor(Math.random() * deck.length);

        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    console.log(deck);
}

function startGame()
{
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAce = checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    
    while(dealerSum < 17)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for(let i=0;i<2;i++)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAce += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click",hit);
    document.getElementById("stay").addEventListener("click",stay);
}

function hit()
{
    if(!canHit)
    {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourAce += checkAce;
    yourSum += getValue(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum,yourAce) > 21)
    {
        canHit = false;
    }
}

function stay()
{
    dealerSum = reduceAce(dealerSum , dealerAce);
    yourSum = reduceAce(yourSum , yourAce);

    canHit = false;

    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    
    if(yourSum > 21)
    {
        message = "You Lose";
    }
    
    else if(dealerSum > 21)
    {
        message ="You Win";
    }

    else if(dealerSum == yourSum)
    {
        message = "Tie";
    }

    else if(yourSum > dealerSum)
    {
        message ="You Win";
    }

    else if(yourSum < dealerSum)
    {
        message = "You Lose";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("results").innerText = message;

}

function getValue(card)
{
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value))
    {
        if(value == "A")
        {
            return 11;
        }

        return 10;
    }

    return parseInt(value);
}

function checkAce(card)
{
    if(card[0] == "A")
    {
        return 1;
    }

    return 0;
}

function reduceAce(playerSum , playerAce)
{
    while(playerSum > 21 && playerAce > 0)
    {
        playerSum -= 10;
        playerAce -= 1; 
    }

    return playerSum;
}