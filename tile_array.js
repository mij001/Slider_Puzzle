class tileArray
{
    constructor(puzzleImage)
    {
        this.tiles = [];

        this.tileSize = tileHeight;

        this.rows = height / this.tileSize;
        this.columns = width / this.tileSize;

        let etRow = etRowSlider.value() - 1;
        let etCloumn = etColumnSlider.value() - 1;

        for (let row = 0; row < this.rows; row++)
        {
            for (let column = 0; column < this.columns; column++)
            {
                let emptyTileColumnAndRowMatch = (column == etCloumn) && (row == etRow);

                if (emptyTileColumnAndRowMatch)
                {
                    this.emptyTile = new tile(this, false, puzzleImage)
                    this.tiles.push(this.emptyTile);
                }
                else
                {
                    this.tiles.push(new tile(this, true, puzzleImage));
                }
            }
        }

        if (randomizeTheTiles.checked())
        {
            this.randomizeTiles_guaraneedSolvability();
            //this.randomizeTiles_willyNilly();
        }
    }

    swap()
    {
        for (let t of this.tiles)
        {
            let axis = t.canTilesBeMoved()

            if (t.mouseOverTile() && axis)
            {
                t.swap(axis);
                
                break;
            }
        }
    }

    updateAndDisplay()
    {
        for (let i = 0; i < this.tiles.length; i++)
        {
            if (this.tiles[i] !== this.emptyTile)
            {
                this.tiles[i].update();
                this.tiles[i].display();
            }
        }
    }

    isMoving()
    {
        let flag = false;

        for (let t of this.tiles)
        {
            flag = flag || t.isMoving;
        }

        return flag;
    }

    randomizeTiles_willyNilly()
    {
        for (let i = 0; i < 10; i++)
        {
            for (let t of this.tiles)
            {
                let randomTileIndex = Math.floor(random(this.tiles.length));
                let randomTile = this.tiles[randomTileIndex];

                let tempLoc = t.location;
                t.location = randomTile.location;
                randomTile.location = tempLoc;
            }
        }

        for (let t of this.tiles)
        {
            t.newLocation = t.location.copy();
        }
    }

    randomizeTiles_guaraneedSolvability()
    {
        for (let i = 0; i < 2000; i++)
        {
            let validRandomTilePlace = Math.floor(random(this.rows + this.columns - 1));
            let validTilePlace = 0;

            for (let t of this.tiles)
            {
                if (t.canTilesBeMoved())
                {
                    if (validRandomTilePlace == validTilePlace)
                    {
                        t.swap();

                        for (let t of this.tiles)
                        {
                            t.location = t.newLocation.copy();
                        }

                        break;
                    }

                    validTilePlace++;
                }
            }
        }

        for (let t of this.tiles)
        {
            t.newLocation = t.location.copy();
        }
    }
}