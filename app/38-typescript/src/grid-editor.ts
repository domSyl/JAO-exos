import { Grid } from "./grid";

export class GridEditor {

    constructor(public grid: Grid) { }

    render() {
        const editor = document.createElement('div');
        editor.classList.add('editor');

        const options = this.grid.example.getMakeMethodNames()
            .map(m => `<option value="${m.substr('make'.length)}">${m.substr('make'.length)}</option>`)
            .join();

        editor.innerHTML = `
<button class="toggle">Start</button>
<button class="clear">Clear</button>
<button class="faster">Faster (+)</button>
<button class="slower">Slower (-)</button>
<button class="log">Log</button>
<select class="setup" onfocus="this.selectedIndex = -1;">
        ${options}
</select>
<input type="number" step="10" class="gridx" max="200" min="40">
`;
        this.grid.element.appendChild(editor);
        this.grid.element.querySelector('.editor .toggle').addEventListener('click', this.toggle.bind(this));
        this.grid.element.querySelector('.editor .clear').addEventListener('click', this.clear.bind(this));
        this.grid.element.querySelector('.editor .faster').addEventListener('click', this.faster.bind(this));
        this.grid.element.querySelector('.editor .slower').addEventListener('click', this.slower.bind(this));
        this.grid.element.querySelector('.editor .log').addEventListener('click', this.grid.log.bind(this.grid));

        const select: HTMLSelectElement = this.grid.element.querySelector('.editor .setup');
        select.addEventListener('change', (e) => {
            const value = (<HTMLSelectElement>e.target).value;
            this.setup(value);
        });
        const gridx = this.grid.element.querySelector('.editor .gridx');
        gridx['value'] = this.grid.col;
        gridx.addEventListener('input',() => {
            console.log('input gridx');
            this.grid.col = gridx['value'];
            this.grid.render(document.querySelector('#root'));
        });
    }

    toggle() {
        const button = this.grid.element.querySelector('.editor .toggle');
        this.grid.isRunning = !this.grid.isRunning;
        if (this.grid.isRunning) {
            this.grid.start();
            button.innerHTML = 'Stop';
        } else {
            button.innerHTML = 'Start';
        }
    }

    clear() {
        if (this.grid.isRunning) {
            this.toggle();
        }
        this.grid.hardReset();
    }

    faster() {
        this.grid.time /= 2;
    }

    slower() {
        this.grid.time *= 2;
    }

    setup(str: string) {
        this.grid.example.set(str);
    }


}
