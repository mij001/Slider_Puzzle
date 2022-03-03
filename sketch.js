let tiles_array;
let img;

let isImgLoaded = false;

let tileHeightSlider;

let canvasEnlargeCoefficientSlider;
let canvasEnlargeCoefficientSlider_decimal;

let randomizeTheTiles;

let etRowSlider;
let etColumnSlider;

let tileHeight = 100; // Default is 100
let canvasEnlargeCoefficient = .3; // Default is .3

function setup()
{   
    tileHeightSlider = select("#tile_size");
    tileHeightSliderValue = select("#tile_size_value");

    canvasEnlargeCoefficientSlider = select("#enlarge");
    canvasEnlargeCoefficientSlider_decimal = select("#enlarge_decimal");
    canvasEnlargeCoefficientSliderValue = select("#enlarge_value");

    randomizeTheTiles = select("#randomize_tiles");

    etRowSlider = select("#et_row");
    etColumnSlider = select("#et_column");

    select("#et_possition").hide();

    let c = createCanvas(500, 500);
    background(255, 247, 0);
    c.drop(whenImageDropped);
}

function whenImageDropped(file)
{
    if (file.type === 'image')
    {
        isImgLoaded = false;
        tiles_array = null;

        img = loadImage(file.data, createCanvasForImage);
    }
}

function draw()
{
    tileHeightSliderValue.html("&nbsp&nbsp" + tileHeightSlider.value());
    canvasEnlargeCoefficientSliderValue.html("&nbsp&nbsp" + (canvasEnlargeCoefficientSlider.value() + canvasEnlargeCoefficientSlider_decimal.value() / 1000) + "&nbsptimes");
    select("#et_row_value").html("&nbsp&nbsp" + etRowSlider.value());
    select("#et_column_value").html("&nbsp&nbsp" + etColumnSlider.value());

    if (!tiles_array && isImgLoaded)
    {
        background(255, 247, 0);

        tiles_array = new tileArray(img);
        select("#et_possition").show();
    }
    else if (tiles_array && isImgLoaded)
    {
        background(255, 247, 0);

        tiles_array.updateAndDisplay();

        randomizeTheTiles.changed(() => tiles_array = null);
        
        etRowSlider.changed
        (
            function()
            {
                tiles_array = null;
            }
        );

        etColumnSlider.changed
        (
            function()
            {
                tiles_array = null;
            }
        );
        
        tileHeightSlider.changed
        (
            function()
            {
                tileHeight = tileHeightSlider.value();
                
                tiles_array = null;
                createCanvasForImage();

                let rows = height / tileHeight;
                let columns = width / tileHeight;
                
                console.log(rows, columns);

                etRowSlider.attribute("max", rows + "");
                etColumnSlider.attribute("max", columns + "");
            }
        );

        canvasEnlargeCoefficientSlider.changed
        (
            function()
            {
                canvasEnlargeCoefficient = canvasEnlargeCoefficientSlider.value() + (canvasEnlargeCoefficientSlider_decimal.value() + 1) / 1000;
                tiles_array = null;
                createCanvasForImage();
            }
        );

        canvasEnlargeCoefficientSlider_decimal.changed
        (
            function()
            {
                canvasEnlargeCoefficient = canvasEnlargeCoefficientSlider.value() + (canvasEnlargeCoefficientSlider_decimal.value() + 1) / 1000;
                tiles_array = null;
                createCanvasForImage();
            }
        );
    }
    else
    {
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Drop an image to make the puzzle.", 0, 0, height, width * .94);
    }
}

function mousePressed()
{  
     if (tiles_array)
    {
        //console.clear();

        if (!tiles_array.isMoving())
        {
            tiles_array.swap();
        }
    }
}

function createCanvasForImage()
{
    let canvasHeight = Math.floor(img.height * canvasEnlargeCoefficient / tileHeight) * tileHeight;
    let canvasWidth = Math.floor(img.width * canvasEnlargeCoefficient / tileHeight) * tileHeight;

    resizeCanvas(canvasWidth, canvasHeight, true);

    etRowSlider.attribute("max", (height / tileHeight) + "");
    etColumnSlider.attribute("max", (width / tileHeight) + "");

    isImgLoaded = true;
}