function Voiture(prix, couleur, vMax, marque){
    this.prix = prix;
    this.couleur = couleur ;
    this.vMax = vMax;
    this.marque = marque;
}

Voiture.prototype.start = function(){
    console.log(`Vroum, Vroum, je suis une ${this.marque}, et je peux rouler à ${this.vMax} Km/h`);
}

console.log('voiture',Voiture);
console.log('voiture%O',Voiture);
const testa = new Voiture(47000, 'rouge', 320, 'Ferrari');
testa.start();
const ds3 = new Voiture(12000,'bleu',130, 'Citroen');
ds3.start();