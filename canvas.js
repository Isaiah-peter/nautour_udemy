let canvas = document.getElementById('canvas1')
let footerH = document.getElementsByClassName('footer')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = []
let hue = 0





window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

let ctx =  canvas.getContext('2d')

let mouse = {
    x:undefined,
    y: undefined
}

let colors = ['white','red','blue']



class Paticle {
    constructor(){

        this.x = mouse.x
        this.y = mouse.y
        // this.x = Math.random() * canvas.width
        // this.y = Math.random() * canvas.height
        this.size = Math.random() * 16 + 1
        this.speedX = Math.random() * 4  - 1.5
        this.speedY = Math.random() * 4  - 1.5
        this.color = `hsl(${hue},100%,50%)`
      
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        
        if(this.size > 0.2){
            this.size -= 0.1
        }
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5;
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2 )
        ctx.fill()
        // ctx.stroke()
    }
}

// function init() {
//     for(let i = 0; i < 100; i++){
//      particleArray.push(new Paticle())
//     // }
// }


function handlePaticle() {
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update()
        particleArray[i].draw()
        for(let j = i ; j < particleArray.length; j++ ){
            const dx = particleArray[i].x - particleArray[j].x
            const dy = particleArray[i].y - particleArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
           
            if(distance < 100){
                ctx.beginPath()
                ctx.strokeStyle = particleArray[i].color
                ctx.lineWidth = 2
                ctx.moveTo(particleArray[i].x, particleArray[i].y)
                ctx.lineTo(particleArray[j].x, particleArray[j].y)
                ctx.stroke()
            }
        
        }
        if(particleArray[i].size < 0.3){
            particleArray.splice(i,1)
            i--
        }
    
    }
    
}




// window.addEventListener('click',(e)=>{
//     mouse.x = e.x
//     mouse.y = e.y

//     for(let i = 0; i < 10; i++){
//         particleArray.push(new Paticle)
//     }
    
// })

window.addEventListener('mousemove',(e)=>{
    mouse.x = e.x
    mouse.y = e.y

    for(let i = 0; i < 2; i++){
        particleArray.push(new Paticle)
    }
    
})

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.fillStyle= 'rgba(0,0,0,0.1)'
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    handlePaticle()
    hue+=10
    requestAnimationFrame(animate)
}

animate()