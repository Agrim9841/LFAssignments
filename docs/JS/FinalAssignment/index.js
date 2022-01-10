const PI = Math.PI;
const TABLE_WIDTH = 232;
const TABLE_HEIGHT = 120;
const TABLE_INNER_WIDTH = 224;
const TABLE_INNER_HEIGHT = 112;
const STICK_WIDTH = 144;
const STICK_HEIGHT = 3;
const LINE_POS = 55.6;
const BALL_POSITIONS = [
    {xPosition: 161.685, yPosition: 63.3575},
    {xPosition: 168.4, yPosition: 53.82856},
    {xPosition: 175.115, yPosition: 56.6425},
    {xPosition: 175.115, yPosition: 70.0725},
    {xPosition: 181.83, yPosition: 60},
    {xPosition: 181.83, yPosition: 47.11356},
    {xPosition: 181.83, yPosition: 72.88644},

    {xPosition: 168.4, yPosition: 60},

    {xPosition: 181.83, yPosition: 53.82856},
    {xPosition: 181.83, yPosition: 66.17144},
    {xPosition: 175.115, yPosition: 49.9275},
    {xPosition: 175.115, yPosition: 63.3575},
    {xPosition: 168.4, yPosition: 66.17144},
    {xPosition: 161.685, yPosition: 56.6425},
    {xPosition: 154.97, yPosition: 60},
]
const BALL_RADIUS = 2.8575;
const CORNER_WIDTH = TABLE_WIDTH - TABLE_INNER_WIDTH;

let canvas = document.querySelector("#canvas1");
let ctx = canvas.getContext("2d");
let stick;
let ballInHand;
let table;
let cue;

canvas.width = window.innerWidth;
canvas.height = (TABLE_HEIGHT * canvas.width) / TABLE_WIDTH;

function degToRad(deg){
    return (PI * deg) / 180;
}

function calcDistance(x1, y1, x2, y2){
    let xDiff = (x2 - x1) ** 2;
    let yDiff = (y2 - y1) ** 2;
    return Math.sqrt(xDiff + yDiff);
}