class DNA {
    constructor(length) {

        this.genes = [];
        this.fitness = 0;

        for (let i = 0; i < length; i++) {
            this.genes[i] = newChar();
        }
    }

    getPhrase() { // return genes (char array) as string
        return this.genes.join("");
    }

    calculateFitness() {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++)
            if (this.genes[i] === target.charAt(i)) {
                score++;
            }
        this.fitness = score/target.length;
        this.fitness = Math.pow(this.fitness, 4);
    }

    crossover(partner) {

        let child = new DNA(this.genes.length);
        let midPoint = Math.floor(random(this.genes.length));

        for (let i = 0; i < this.genes.length; i++) {

            if (i > midPoint)
                child.genes[i] = this.genes[i];
            else
                child.genes[i] = partner.genes[i];
        }

        return child;
    }

    mutate(mutationRate) {

        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) <= mutationRate)
                this.genes[i] = newChar();
        }
    }
}