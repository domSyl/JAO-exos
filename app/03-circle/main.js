class Circle {
    constructor() {}

    draw(){
        const div = document.querySelector('div');
    div.innerHTML = `
<svg width="600" height="600">
    <circle cx="300" cy="300" r="200" stroke="#000" stroke-width="2" fill="transparent" />
</svg>
    `;
    }
}

function makeCircle() {
} 

function main(){
        console.log('Tracé du cercle')
        const c = new Circle();
        c.draw();
   }
    
main();