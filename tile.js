class tile
{
    constructor(tile_array, isSolid, puzzleImage)
    {
        this.isMoving = false;
        this.isSolid = isSolid;
        this.tile_array = tile_array;
        this.puzzleImage = puzzleImage;

        this.tileSize = this.tile_array.tileSize;
        this.rows = this.tile_array.rows;
        this.columns = this.tile_array.columns;
        this.tiles = this.tile_array.tiles;

        this.initTileIndex = this.tile_array.tiles.length;

        this.location = this.tileIndexToTileLocation(this.initTileIndex);
        this.newLocation = this.location.copy();
        this.velocity = createVector(7.2, 7.2);
        
        this.initLocation = this.location.copy();
    }

    update()
    {
        let direction = p5.Vector.sub(this.newLocation, this.location);

        if (direction.mag() != 0)
        {
            let h = (direction.heading());

            console.log(h);
            
            this.velocity.setHeading(h);
            this.location.add(this.velocity);

            direction = p5.Vector.sub(this.newLocation, this.location);

            if (direction.mag() < this.tileSize / 50 || Math.round(direction.heading(), 2) == Math.round(h + PI, 2))
            {
                this.location = this.newLocation.copy();
                this.tile_array.emptyTile.location = this.tile_array.emptyTile.newLocation.copy();
            }
            
            this.isMoving = true;
        }
        else
        {
            this.isMoving = false;
        }
    }

    display()
    {
        if (this.isSolid)
        {
            let imageInitLocation = this.initLocation.copy().div(canvasEnlargeCoefficient)
            let multiplier = this.tileSize / canvasEnlargeCoefficient;

            image(this.puzzleImage,this.location.x, this.location.y, this.tileSize, this.tileSize, imageInitLocation.x, imageInitLocation.y, multiplier, multiplier);
        }
    }

    swap(axis)
    {
        let emptyTileIndex = this.tile_array.emptyTile.location.x * this.rows + this.tile_array.emptyTile.location.y * this.columns;
        let tileIndex = this.location.x * this.rows + this.location.y * this.columns;

        if (tileIndex < emptyTileIndex)
        {
            if (axis = "x")
            {
                for (let tile of this.tiles)
                {
                    if (tile.location.y >= this.location.y && tile.location.y < this.tile_array.emptyTile.location.y && this.location.x == tile.location.x)
                    {
                        tile.newLocation.y += this.tileSize;
                    }
                }
            }

            if (axis = "y")
            {
                for (let tile of this.tiles)
                {
                    if (tile.location.x >= this.location.x && tile.location.x < this.tile_array.emptyTile.location.x && this.location.y == tile.location.y)
                    {
                        tile.newLocation.x += this.tileSize;
                    }
                }
            }
        }
        else
        {
            if (axis = "x")
            {
                for (let tile of this.tiles)
                {
                    if (tile.location.y > this.tile_array.emptyTile.location.y && tile.location.y <= this.location.y && this.location.x == tile.location.x)
                    {
                        tile.newLocation.y -= this.tileSize;
                    }
                }
            }

            if (axis = "y")
            {
                for (let tile of this.tiles)
                {
                    if (tile.location.x > this.tile_array.emptyTile.location.x && tile.location.x <= this.location.x && this.location.y == tile.location.y)
                    {
                        tile.newLocation.x -= this.tileSize;
                    }
                }
            }
        }

        this.tile_array.emptyTile.newLocation = this.location.copy()
    }

    mouseOverTile()
    {
        let mouseOverTileTopLeft = (mouseX > this.location.x) && (mouseY > this.location.y);
        let mouseOverTileBottomRight = (mouseX < this.location.x + this.tileSize) && (mouseY < this.location.y + this.tileSize);

        return mouseOverTileTopLeft && mouseOverTileBottomRight;
    }

    canTilesBeMoved()
    {
        let x = this.location.x;
        let y = this.location.y;

        let emptyX = this.tile_array.emptyTile.location.x;
        let emptyY = this.tile_array.emptyTile.location.y;

        let axis = "";

        if (x == emptyX)
        {
            axis = "x";
        }
        else if( y == emptyY)
        {
            axis = "y";
        }
        else
        {
            axis = null;
        }

        return axis;
    }

    tileIndexToTileLocation(tileIndex)
    {
        let x = tileIndex % this.columns;
        let y = Math.floor(tileIndex / this.columns);

        let vec = createVector(x * this.tileSize, y * this.tileSize);

        return vec;
    }
}
