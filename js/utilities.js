/**
 * Created by rsalazar on 9/11/14.
 */


var Tools = function () {

    return {
        Normalize: function(value, min, max) {
                return _Normalize(value, min, max);
            }
        ,
        Lerp: function(norm, min, max) {
            return _Lerp(norm,min,max);
        },
        Map: function(value, sourceMin, sourceMax, destMin, destMax) {
            var n = _Normalize(value, sourceMin, sourceMax);
            return _Lerp(n, destMin, destMax);
        },
        Clamp: function(value, min, max){
            return Math.min(Math.max(value,min), max);
        },
        RandomRange: function(min, max) {
            return min + Math.random() * (max - min);
        },
        RandomInt: function(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        },
        degreesToRads: function(degrees) {
            return degrees / 180 * Math.PI;
        },
        radsToDegrees: function(radians) {
            return radians * 180 / Math.PI;
        },
        distance: function(p0,p1) {
            var dx = p1.x - p0.x,
                dy = p1.y - p0.y;

            return Math.sqrt(dx*dx + dy*dy);
        },
        distanceXY: function(x0, y0, x1, y1){
            var dx = x1 - x0,
                dy = y1 - y0;

            return Math.sqrt(dx*dx + dy*dy);
        },
        circleCollision: function(c0, c1) {

            return Tools.distance(c0, c1) <= c0.radius + c1.radius;
        },
        circlePointCollision: function(x, y, circle) {

            return Tools.distanceXY(x,y, circle.x, circle.y) < circle.radius;
        },
        pointInRect: function(x, y, rect){
            return Tools.inRange(x, rect.x, rect.x + rect.width) &&
                   Tools.inRange(y, rect.y, rect.y + rect.height);
        },
        inRange: function(value, min, max){
            return value >= Math.min(min, max) && value <= Math.max(min,max);
        },
        rangeIntersect: function(min0, max0, min1, max1){

            return Math.max(min0, max0) >= Math.min(min1, max1) &&
                   Math.min(min0, max0) <= Math.max(min1, max1);
        },
        rectIntersect: function(r0, r1){

            return Tools.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
                   Tools.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
        },
        quadraticBezier: function(p0, p1, p2, t, pFinal){

            var pFinal = pFinal || {};

            pFinal.x = Math.pow(1-t,2) * p0.x +
                (1 - t) * 2 * t * p1.x +
                t * t * p2.x;

            pFinal.y = Math.pow(1-t,2) * p0.y +
                (1 - t) * 2 * t * p1.y +
                t * t * p2.y;

            return pFinal;
        },

        cubicBezier: function(p0, p1, p2, p3, t, pFinal){

            var pFinal = pFinal || {};

            pFinal.x = Math.pow(1 - t, 3) * p0.x +
                       Math.pow(1 - t, 2) * 3 * t * p1.x +
                (1 - t) * 3 * t * t * p2.x +
                Math.pow(t, 3) * p3.x;

            pFinal.y = Math.pow(1 - t, 3) * p0.y +
                Math.pow(1 - t, 2) * 3 * t * p1.y +
                (1 - t) * 3 * t * t * p2.y +
                Math.pow(t, 3) * p3.y;

            return pFinal;
        },

        multicurve: function(points, context){

            var p0, p1, midx, midy;

            context.moveTo(points[0].x, points[0].y);

            for(var i = 1; i < points.length - 2; i+=1)
            {
                p0 = points[i];
                p1 = points[i+1];
                midx = (p0.x + p1.x) / 2;
                midy = (p0.y + p1.y) / 2;

                context.quadraticCurveTo(p0.x, p0.y, midx, midy);

            }

            p0 = points[points.length - 2];
            p1 = points[points.length - 1];
            context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
        }




    };

    function _Normalize(value, min, max){
            return (value - min)/(max - min);

    }

    function _Lerp(norm, min, max) {
        return (max - min) * norm + min;
    }



}();



