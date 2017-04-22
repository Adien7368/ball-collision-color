window.onload = function (){


      var canvas = document.getElementById("myCanvas"),
          context = canvas.getContext("2d"),
          width = canvas.width = window.innerWidth,
          height = canvas.height = window.innerHeight;

      var pointsArray = [];
          
          for(var i = 0; i < 100; ++i){
              point = {
                "x" : width*.5,
                "y" : height*.5,
                "velocityX" : 2*Math.random() - 1,
                "velocityY" : 2*Math.random() - 1,
                "radius" : 10 ,
                "r" : Math.round(Math.random()*255),
                "g" : Math.round(Math.random()*255),
                "b" : Math.round(Math.random()*255)
              }
              
           pointsArray.push(point);
          }
          
      




          render();

          function render(){
            context.clearRect(0,0,width,height);
            update();
            renderTail();
            project();
            requestAnimationFrame(render);
          }


          function update(){
            for(i = 0; i <  pointsArray.length; ++i){
              //pointsArray[i].velocityX += Math.cos(pointsArray[i].x - width/2)*2;
              //pointsArray[i].velocityY += Math.sin(pointsArray[i].y - height/2);
              if(pointsArray[i].x < 0 ){
                if(pointsArray[i].velocityX < 0)
                pointsArray[i].velocityX *= -1;
              }else if(pointsArray[i].x > width){
                if(pointsArray[i].velocityX > 0)
                  pointsArray[i].velocityX *= -1;
              }

              if(pointsArray[i].y < 0){
                if(pointsArray[i].velocityY < 0)
                pointsArray[i].velocityY *= -1;
              }else if(pointsArray[i].y > height){
                if(pointsArray[i].velocityY > 0)
                pointsArray[i].velocityY *= -1;
              }

              collide(pointsArray[i],i);
              
              pointsArray[i].x += pointsArray[i].velocityX;
              pointsArray[i].y += pointsArray[i].velocityY;


            }
          }



          function project(){
            for(i = 0;i < pointsArray.length; ++i){
              context.beginPath();
              context.fillStyle = "rgb(" + pointsArray[i].r + ", " + pointsArray[i].g + ", " + pointsArray[i].b + ")";
              context.arc(pointsArray[i].x,pointsArray[i].y,pointsArray[i].radius,0,Math.PI*2);
              context.fill();
            }
          }


          function collide(pt,num){
            for( var j = 0; j < pointsArray.length && j!=num ; j++){
             
              var d = pointsArray[j];
               if((Math.abs(pt.x - d.x) <= d.radius + pt.radius) && (Math.abs(pt.y - d.y) <= d.radius + pt.radius)){
                 if(distanceBetweenPoint(pt,d) <= d.radius + pt.radius){
                  var vectorX = pt.x - d.x,
                      vectorY = pt.y - d.y,
                      mag = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
                  pt.velocityX = vectorX / mag;
                  pt.velocityY = vectorY / mag;
                  d.velocityX = -vectorX/mag;
                  d.velocityY = -vectorY/mag;
                     
                 }
               }
            }
          }

          function distanceBetweenPoint(a,b){
              var dx = a.x - b.x,dy = a.y - b.y;
              return Math.sqrt(dx*dx + dy*dy);
          }


          function renderTail(){
            var xa,ya;
           for(i = 0; i < pointsArray.length ;++i ){
            var pt = pointsArray[i],tmp = 5;
                xa = pointsArray[i].x;
                ya = pointsArray[i].y;
            
            while(tmp--){
              context.beginPath();
              context.strokeStyle = "rgb("+pointsArray[i].r+", "+pointsArray[i].g+", "+pointsArray[i].b + ")";
              context.moveTo(xa,ya);
              context.globalAlpha = tmp/10 +.1;
              xa+=(-pt.velocityX)*10;
              ya+=(-pt.velocityY)*10;
              context.lineTo(xa,ya);
              context.stroke();
            }
            context.globalAlpha = 1;
           }
          }
}
 
