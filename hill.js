export class Hill { 

    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            };
        }
    }
    //draw hill
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;
        //if the first point is out of the screen, add a new point to the beginning
        if(cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            });
        } else if (cur.x > this.stageWidth + this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            //draw curve using quadratic curve function
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        //dots is the position of the sheep
        return dots;
    }
    //set y position random
    getY() {
        const min = this.stageHeight / 6;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}