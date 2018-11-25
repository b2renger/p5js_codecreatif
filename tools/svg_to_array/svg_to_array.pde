// You need to install geomerative lib from the contribution manager
import geomerative.*;


String name = "8413b54090698bf0";
RShape grp;
RPoint[][] pointPaths;

String[] s = {"", ""};

void setup() {
  size(600, 600, P3D);
  RG.init(this);
  RG.ignoreStyles(true);

  RG.setPolygonizer(RG.ADAPTATIVE);

  // put you svg in the data forlder and change its name here
  grp = RG.loadShape("../svgs/"+name+".svg");
  grp.centerIn(g, 100, 1, 1);

  pointPaths = grp.getPointsInPaths();
  println(pointPaths);

  // to java arrays 
  s[0] += "processing code : \n";
  s[1] += "js code : \n";
  for (int i = 0; i<pointPaths.length; i++) {
    s[0] += "float [] xpos"+i+" = {";
    s[1] += "var  xpos"+i+" = [";
    if (pointPaths[i] != null) {

      for (int j = 0; j<pointPaths[i].length; j++) {
        s[0] += pointPaths[i][j].x ;
        s[1] += pointPaths[i][j].x ;

        if (j != pointPaths[i].length-1) {
          s[0] += "," ;
          s[1] += "," ;
        }
      }
    }
    s[0] += "};\n";
    s[1] += "];\n";
  }

  for (int i = 0; i<pointPaths.length; i++) {
    s[0] += "float [] ypos"+i+" = {";
    s[1] += "var  ypos"+i+" = [";
    if (pointPaths[i] != null) {

      for (int j = 0; j<pointPaths[i].length; j++) {
        s[0] += pointPaths[i][j].y ;
        s[1] += pointPaths[i][j].y ;
        if (j != pointPaths[i].length-1) {
          s[0] += "," ;
          s[1] += "," ;
        }
      }
    }
    s[0] += "};\n";
    s[1] += "];\n";
  }



  saveStrings(name+".txt", s);
}

void draw() {
  for (int i = 0; i<pointPaths.length; i++) {


    if (pointPaths[i] != null) {
      beginShape();
      for (int j = 0; j<pointPaths[i].length; j++) {
        vertex(width/2 + pointPaths[i][j].x, height/2 + pointPaths[i][j].y);
      }
      endShape();
    }
  }
}
