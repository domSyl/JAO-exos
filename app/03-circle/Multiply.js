class Multiply {
    constructor() {

    }
    draw() {
        const c = new Circle(300);
        c.draw();
        for (let i = 0; i<10; i++){
            const a = (360/10) * i;
            c.setPoint(a);
        }
        
    }
}