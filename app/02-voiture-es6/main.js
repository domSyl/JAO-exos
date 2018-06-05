class Voiture{
    constructor(prix, couleur, vMax, marque){
        this.prix = prix;
        this.couleur = couleur;
        this.vMax = vMax;
        this.marque = marque;
    }

    start(){
        console.log('Vroum, Vroum, je suis une %s et je peux rouler à %d Km/h',this.marque,this.vMax);
    }
}

console.log('voiture',Voiture);
console.log('voiture%O',Voiture);
const peugeot2008 = new Voiture(23000, 'rouge', 180,'Peugeot');
peugeot2008.start();
const dscitroen2cv = new Voiture(5000,'bleu',100,'Citroen');
dscitroen2cv.start();