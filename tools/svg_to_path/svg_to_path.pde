// You need to install geomerative lib from the contribution manager
import geomerative.*;

String name = "diplo";
RShape grp;
RPoint[][] pointPaths;

String[] s = {""};


void setup(){
  size(600, 600, P3D);
  RG.init(this);
  RG.ignoreStyles(true);
  
  RG.setPolygonizer(RG.ADAPTATIVE);
  
  // put you svg in the data folder and change its name here
  grp = RG.loadShape(name+".svg");
  grp.centerIn(g, 100, 1, 1);
  
  pointPaths = grp.getPointsInPaths();
  println(pointPaths);
  
   for(int i = 0; i<pointPaths.length; i++){
    if (pointPaths[i] != null) {
      s[0] += "beginShape();\n";
      for(int j = 0; j<pointPaths[i].length; j++){
        s[0] += "curveVertex(" +pointPaths[i][j].x +"," + pointPaths[i][j].y+");\n";
      }
     s[0] += "endShape();\n";
    }
  }
  
  saveStrings(name+".txt", s);
}

void draw(){
   for(int i = 0; i<pointPaths.length; i++){
  

    if (pointPaths[i] != null) {
      beginShape();
      for(int j = 0; j<pointPaths[i].length; j++){
        vertex(width/2 + pointPaths[i][j].x, height/2 + pointPaths[i][j].y);
      }
      endShape();
    }
  }
 
}
