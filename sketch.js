let target;
let maxPopulation;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {

    bestPhrase = createDiv("Best phrase: ");
    bestPhrase.class("best");

    allPhrases = createDiv("All phrases: ");
    allPhrases.position(600, 20);
    allPhrases.class("all");

    stats = createDiv("Stats");
    stats.class("stats");

    target = "Radu Tudor Eduard";
    maxPopulation = 250;
    mutationRate = 0.035;

    population = new Population(target, mutationRate, maxPopulation);
}

function draw() {

    population.naturalSelection();
    population.createGeneration();
    population.calculateFitness();

    population.evaluate();

    if (population.isFinished())
        noLoop();

    displayInfo();
}

function displayInfo() {

    let answer = population.getBest();
    bestPhrase.html("Best phrase:<br>" + answer);

    let statsText =
        "Total generations:\t"  + population.getGenerations() + "<br>";
    statsText +=
        "Average fitness:\t" + nf(population.getAverageFitness().toFixed(2)) + "<br>";
    statsText +=
        "Total population:\t"+ maxPopulation  + "<br>";
    statsText +=
        "Mutation rate:\t" + int(mutationRate * 100) + "%";

    stats.html(statsText);
    allPhrases.html("All phrases:<br>" + population.getAllPhrases());
}