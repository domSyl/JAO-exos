function sleep(delay) {
    //En simplification de code, on peut écrire : return new Promise(resolve => {instructions})
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

async function main() {
    for (let i = 0; i < 1000; i++) {
        const m = new Multiply(i, 20);
        m.draw();
        await sleep(16);
    }
}

main();