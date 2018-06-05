class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    draw(){
        const div = document.querySelector('div');
        const r = this.radius;
    div.innerHTML = `
<svg width="${3*r}" height="${3*r}">
    <circle cx="${1.5*r}" cy="${1.5*r}" r="${r}" stroke="#000" stroke-width="2" fill="transparent" />
</svg>
    `;
    }
}

function makeCircle() {
} 

function main(){
        console.log('Tracé du cercle')
        const c = new Circle(300);
        c.draw();
   }
    
main();