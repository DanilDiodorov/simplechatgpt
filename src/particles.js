function game() {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var particles = []

    var options = {
        backgroundColour: '#1F9BED',

        particleCount: 80,
        particleRadius: 5,
        particleSpeed: 1,
        particleColour: 'white',

        maxDistance: 150,
        lineColour: 'rgba(255, 255, 255, ',
        lineWidth: 2,
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    var canvasWidth = canvas.width
    var canvasHeight = canvas.height

    window.addEventListener('resize', () => {
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvasWidth = canvas.width
        canvasHeight = canvas.height
    })

    class Particle {
        constructor() {
            this.x = 100 + Math.random() * (canvasWidth - 100)
            this.y = 100 + Math.random() * (canvasHeight - 100)
            this.radius = options.particleRadius
            this.colour = options.particleColour
            this.speed = options.particleSpeed
            this.angle = Math.random() * (Math.PI * 2)
            this.coords = {
                x: this.speed * Math.cos(this.angle),
                y: this.speed * Math.sin(this.angle),
            }
        }
        draw = function () {
            context.beginPath()
            context.fillStyle = this.colour
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
            context.fill()
            this.move()
            this.border()
        }
        move = function () {
            this.x += this.coords.x
            this.y += this.coords.y
        }
        border = function () {
            if (
                this.x + this.radius >= canvasWidth ||
                this.x - this.radius <= 0
            ) {
                this.coords.x *= -1
            }
            if (
                this.y + this.radius >= canvasHeight ||
                this.y - this.radius <= 0
            ) {
                this.coords.y *= -1
            }
        }
    }
    function distance(x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
    function setup() {
        for (var i = 0; i < options.particleCount; i++) {
            particles[i] = new Particle()
        }
    }
    function lines() {
        for (var i = 0; i < options.particleCount - 1; i++) {
            for (var j = i + 1; j < options.particleCount; j++) {
                var t = distance(
                    particles[i].x,
                    particles[j].x,
                    particles[i].y,
                    particles[j].y
                )
                if (t <= options.maxDistance) {
                    context.beginPath()
                    context.strokeStyle =
                        options.lineColour + `${1 - t / options.maxDistance})`
                    context.lineWidth = options.lineWidth
                    context.moveTo(particles[i].x, particles[i].y)
                    context.lineTo(particles[j].x, particles[j].y)
                    context.stroke()
                }
            }
        }
    }
    let bgImage = new Image()
    bgImage.src =
        'https://catherineasquithgallery.com/uploads/posts/2021-02/1613215102_215-p-foni-sinii-256.jpg'
    function loop() {
        // context.fillStyle = options.backgroundColour
        // context.fillRect(0, 0, canvasWidth, canvasHeight)
        context.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight)
        for (var i = 0; i < options.particleCount; i++) {
            particles[i].draw()
        }
        lines()
        window.requestAnimationFrame(loop)
    }
    setup()
    loop()
}

export default game
