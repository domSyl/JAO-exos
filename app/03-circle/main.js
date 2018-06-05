function main(){
        for (let i = 0; i < 1000; i++){
            setTimeout(() => {
                const m = new Multiply(i, 20);
                m.draw();
            }, 16*i)
            
        }
   }
    
main();