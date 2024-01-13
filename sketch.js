let target = "";

let maxPopulation;
let mutationRate;
let population;

let targetBox;
let submitButton;

let bestPhrase;
let allPhrases;
let stats;

let createPopulation = false;
let prints = false;

function setup() {

    // target string submission
    targetBox = createInput("");
    targetBox.class("input");
    targetBox.position(20, 20);
    styleTextBox();

    submitButton = createButton("Submit");
    submitButton.class("input");
    submitButton.position(235, 20);
    submitButton.size(80, 38);
    styleSubmitButton();

    submitButton.mousePressed(submitTarget);

    bestPhrase = createDiv("Best phrase: ");
    bestPhrase.class("best");

    allPhrases = createDiv("All phrases: ");
    allPhrases.position(600, 20);
    allPhrases.class("all");

    stats = createDiv("Stats");
    stats.class("stats");

    maxPopulation = 250;
    mutationRate = 0.035;

    maxPopulation = 200;
    mutationRate = 0.01;
}

function draw() {

    if (target !== "") {

        if (createPopulation === false) {

            population = new Population(target, mutationRate, maxPopulation);
            createPopulation = true;
        }

        if (population.isFinished() === false) {

            population.naturalSelection();
            population.createGeneration();
            population.calculateFitness();

            population.evaluate();
        }

        displayInfo();
    }
}

function displayInfo() {

    let answer = population.getBest();
    bestPhrase.html("Best phrase:<br>" + answer);

    let statsText =
        "Total generations:\t" + population.getGenerations() + "<br>";
    statsText +=
        "Average fitness:\t" + nf(population.getAverageFitness().toFixed(2)) + "<br>";
    statsText +=
        "Total population:\t" + maxPopulation + "<br>";
    statsText +=
        "Mutation rate:\t" + int(mutationRate * 100) + "%";

    stats.html(statsText);
    allPhrases.html("All phrases:<br>" + population.getAllPhrases());
}

function submitTarget() {

    target = targetBox.value();
    createPopulation = false;
}

function styleTextBox() {

    targetBox.style('padding', '8px'); // Add padding
    targetBox.style('font-size', '16px'); // Adjust font size
    targetBox.style('border', '2px solid #555'); // Add a border

    targetBox.style("font-family", 'Courier New');
}

function styleSubmitButton() {

    submitButton.style('padding', '5px'); // Add padding
    submitButton.style('font-size', '16px'); // Adjust font size
    submitButton.style('background-color', '#4CAF50'); // Change background color
    submitButton.style('color', 'white'); // Change text color
    submitButton.style('border', 'none'); // Remove border
    submitButton.style('cursor', 'pointer'); // Add a pointer cursor
    submitButton.style('border-radius', '4px'); // Add border-radius

    submitButton.style("font-family", 'Courier New');
}