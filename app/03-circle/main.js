class Circle {
    constructor(radius) {
        this.radius = radius;
        this.cx = 1.5 * radius;
        this.cy = 1.5 * radius;
    }

    draw(){
        const div = document.querySelector('div');
        const r = this.radius;
    div.innerHTML = `
<svg width="${3 * r}" height="${3 * r}">
    <circle cx="${this.cx}" cy="${this.cy}" r="${r}" stroke="#000" stroke-width="2" fill="transparent" />
</svg>
    `;
    }

    setPoint(angle) {
        const a = angle * 2 * Math.PI / 360 ; 
        // Attention, lorsqu'on travaille avec du svg il faut forcément travailler dans un namespace
        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.querySelector('svg');
        // createElement de Javascript est à remplacer par createElementNS, à cause du namespace
        const point = document.createElementNS(svgns,'circle');
        point.setAttribute('cx', this.cx + this.radius * Math.cos(a));
        point.setAttribute('cy', this.cy - this.radius * Math.sin(a));
        point.setAttribute('r', 3);
        point.setAttribute('fill', '#000');
        point.setAttribute('stroke', '#000');
        point.setAttribute('stroke-width', '2');
        svg.appendChild(point);
    }
}


function main(){
        console.log('Tracé du cercle')
        const c = new Circle(300);
        c.draw();
        c.setPoint(30);
        c.setPoint(60);
        c.setPoint(90);
   }
    
main();