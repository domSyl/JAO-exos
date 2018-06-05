'use strict';

class System {

    constructor() {
        if (System.instance !== null) {
            throw 'Forbidden';
        }
        console.log('building the system.');
        this.name = 'Main system';
        System.intance = this;
    }

    // singleton design pattern
    static getInstance() {
        if (System.instance === null) {
            System.instance = new System();
        }
        return System.instance;
    }
}
// static variable
System.instance = null;

const system = System.getInstance();
console.log('system', system);
const system2 = System.getInstance();
console.log('system2', system2);
console.log('system === system2', system === system2);

// exercice : rewrite this in ES5.