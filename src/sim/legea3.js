const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const engine = Engine.create();
const { world } = engine;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Ground and walls
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, {
    isStatic: true,
    render: {
        fillStyle: 'brown'
    }
});

const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight, {
    isStatic: true,
    render: {
        visible: true
    }
});

const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, window.innerHeight, {
    isStatic: true,
    render: {
        visible: true
    }
});

World.add(world, [ground, leftWall, rightWall]);

// Calculate centered positions for the balls
const centerOffsetX = 150; // Distance from center of the screen
const ballRadius = 40; // Radius of the balls

const ball1X = window.innerWidth / 2 - centerOffsetX - ballRadius;
const ball2X = window.innerWidth / 2 + centerOffsetX + ballRadius;
const ballsY = window.innerHeight - 25; // Y-coordinate for both balls

// Create two interacting balls
const ball1 = Bodies.circle(ball1X, ballsY, ballRadius, {
    restitution: 0.7,
    friction: 0.05,
    render: {
        fillStyle: 'blue'
    }
});

const ball2 = Bodies.circle(ball2X, ballsY, ballRadius, {
    restitution: 0.8,
    friction: 0.05,
    render: {
        fillStyle: 'green'
    }
});

World.add(world, [ball1, ball2]);

// Apply forces to demonstrate interaction (equal and opposite forces)
const forceMagnitude = 0.2;

setTimeout(() => {
    Body.applyForce(ball1, { x: ball1.position.x, y: ball1.position.y }, { x: forceMagnitude, y: 0 });
    Body.applyForce(ball2, { x: ball2.position.x, y: ball2.position.y }, { x: -forceMagnitude, y: 0 });
}, 2000);

// Override the render function to add custom drawing
Events.on(render, 'afterRender', function () {
    const context = render.context;

    // Display text above each ball
    context.font = '40px Arial';
    context.fillStyle = 'white';

    const text1 = 'Corpul 1';
    const text2 = 'Corpul 2';

    // Measure text width to center it
    const textWidth1 = context.measureText(text1).width;
    const textWidth2 = context.measureText(text2).width;

    context.fillText(text1, ball1.position.x - textWidth1 / 2, ball1.position.y - 50);
    context.fillText(text2, ball2.position.x - textWidth2 / 2, ball2.position.y - 50);

    // Add the text to the top-left corner
    const topText = 'Pentru orice acțiune, există o reacțiune opusă și egală.';
    context.font = '24px Arial';

    const topTextWidth1 = context.measureText(topText).width;
    const xPosition1 = (window.innerWidth - topTextWidth1) / 2;

    context.fillText(topText, xPosition1, 50);

    const topText2 = 'După o decalare de 2 secunde, aceeași forță este aplicată ambelor bile, cu sens opus. Se poate vedea interacțiunea dintre bile.';
    context.font = '24px Arial';

    const topTextWidth2 = context.measureText(topText2).width;
    const xPosition2 = (window.innerWidth - topTextWidth2) / 2;

    context.fillText(topText2, xPosition2, 350);
});

const image = new Image();
image.src = 'img/principiul-3.jpg';
image.onload = function() {
    const body = Bodies.rectangle(765, 120, image.width, image.height, {
        isStatic: true,
        render: {
            sprite: {
                texture: image.src,
                xScale: 1,
                yScale: 1
            }
        }
    });

    World.add(world, body);
};

const image2 = new Image();
image2.src = 'img/principiul-3-enunt.png';
image2.onload = function() {
    const body = Bodies.rectangle(765, 250, image2.width, image2.height, {
        isStatic: true,
        render: {
            sprite: {
                texture: image2.src,
                xScale: 0.7,
                yScale: 0.7
            }
        }
    });

    World.add(world, body);
};