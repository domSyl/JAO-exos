const sleep = d => new Promise(r => setTimeout(r, d));

async function main() {
    for (let i = 0; i < 100; i++) {
        const m = new Multiply(i, 20);
        m.draw();
        await sleep(16);
    }
}

main();