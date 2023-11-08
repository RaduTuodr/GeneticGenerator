class Population {

    constructor(targetEntity, mutationRate, numberOfEntities) {

      //this.population;
      //this.matingPool;
        this.generations = 0;
        this.finished = false;
        this.target = targetEntity;
        this.mutationRate = mutationRate;
        this.perfectScore = 1;

        this.best = "";

        this.population = [];
        for (let i = 0; i < numberOfEntities; i++) {
            this.population[i] = new DNA(this.target.length);
        }
        this.matingPool = [];
        this.calculateFitness();
    }

    getBest() {
        return this.best;
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / this.population.length;
    }

    getAllPhrases() {
        let allPhrases = "";
        let displayLimit = min(this.population.length, 50);

        for (let i = 0; i < displayLimit; i++)
            allPhrases += this.population[i].getPhrase() + "<br>";

        return allPhrases;
    }

    getMaxFitness() {
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }
        return maxFitness;
    }

    calculateFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calculateFitness(target);
        }
    }

    naturalSelection() {
        this.matingPool = [];
        let maxFitness = this.getMaxFitness();

        for (let i = 0; i < this.population.length; i++) {

            let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            let n = int(fitness * 100);

            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    createGeneration() {
        for (let i = 0; i < this.population.length; i++) {

            let a = Math.floor(random(this.matingPool.length));
            let b = Math.floor(random(this.matingPool.length));

            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];

            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }

    evaluate() {
        let maxFitness = 0.0;
        let index = 0;

        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
                index = i;
            }
        }

        this.best = this.population[index].getPhrase();
        if (maxFitness === this.perfectScore)
            this.finished = true;
    }
}