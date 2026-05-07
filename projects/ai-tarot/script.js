const drawBtn = document.getElementById("drawBtn");

const result = document.getElementById("result");

drawBtn.addEventListener("click", drawCard);

async function drawCard(){

    const question =
    document.getElementById("questionInput").value;

    const mood =
    document.getElementById("moodInput").value;

    const response =
    await fetch("https://tarotapi.dev/api/v1/cards");

    const data = await response.json();

    const cards = data.cards;

    const randomCard =
    cards[Math.floor(Math.random() * cards.length)];

    let message = "";

    if(mood === "anxious"){
        message =
        "You may be overthinking the unknown right now. Trust that clarity will come.";
    }

    else if(mood === "hopeful"){
        message =
        "This card reflects growth, softness, and possibility entering your life.";
    }

    else if(mood === "stuck"){
        message =
        "A shift in perspective may help you move forward.";
    }

    else if(mood === "excited"){
        message =
        "Follow your excitement, but remember to stay grounded.";
    }

    else{
        message =
        "Not every answer appears immediately. Sit with uncertainty.";
    }

    result.style.display = "block";

    result.innerHTML = `
        <h2>${randomCard.name}</h2>

        <p>
        <strong>Your Question:</strong>
        ${question}
        </p>

        <p>
        <strong>Card Meaning:</strong>
        ${randomCard.meaning_up}
        </p>

        <p>
        <strong>Your Reading:</strong>
        ${message}
        </p>
    `;
}
