//create snowman:
function createSnowman(window, THREE) {
  function Snowman() {
    this.mesh = _snowmanMesh.clone();
    this.position = {};
  }
  Snowman.HAT_HEIGHT = 6;
  Snowman.HAT_RIM_HEIGHT = 1;
  Snowman.BODY_RADIUS = 10;
  Snowman.HEAD_RADIUS = 7;
  Snowman.BUTTON_COUNT = 3;
  Snowman.BUTTON_RADIUS = 1;
  Snowman.EYE_RADIUS = 0.6;

  var buttons = [];
  var eyes = [];

  Snowman.prototype.update = function () {
    this.mesh.position = this.position;
  };

  var bodyGeometry = new THREE.SphereGeometry(Snowman.BODY_RADIUS, 30, 30);
  var secondBodyGeometry = new THREE.SphereGeometry(
    Snowman.BODY_RADIUS,
    30,
    30
  );
  var headGeometry = new THREE.SphereGeometry(Snowman.HEAD_RADIUS, 30, 30);
  var hatGeometry = new THREE.CylinderGeometry(3, 3, Snowman.HAT_HEIGHT, 40);
  var hatRimGeometry = new THREE.CylinderGeometry(
    4,
    4,
    Snowman.HAT_RIM_HEIGHT,
    40
  );
  var eyeGeometry = new THREE.SphereGeometry(Snowman.EYE_RADIUS, 30, 30);
  var buttonGeometry = new THREE.SphereGeometry(Snowman.BUTTON_RADIUS, 30, 30);

  var bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0x2c7f96,
    emissive: 0x6dd2ee,
    vertexColors: false,
    fog: true,
    combine: THREE.MultiplyOperation,
    reflectivity: 1,
    refractionRatio: 1,
    wireframe: false,
  });

  var headMaterial = new THREE.MeshLambertMaterial({
    color: 0x2c7f96,
    emissive: 0x6dd2ee,
    vertexColors: false,
    fog: true,
    combine: THREE.MultiplyOperation,
    reflectivity: 1,
    refractionRatio: 1,
    wireframe: false,
  });
  // hat color:
  var hatMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false,
  });

  var eyeMaterial = new THREE.MeshLambertMaterial({
    color: 0x666666,
    wireframe: false,
  });

  var buttonMaterial = new THREE.MeshLambertMaterial({
    color: 0x6dd2ee,
    wireframe: false,
  });

  // arm color:

  var armMaterial = new THREE.LineBasicMaterial({
    color: 'black',
  });

  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  var secondBody = new THREE.Mesh(secondBodyGeometry, bodyMaterial);
  var head = new THREE.Mesh(headGeometry, headMaterial);
  var hat = new THREE.Mesh(hatGeometry, hatMaterial);
  var hatRim = new THREE.Mesh(hatRimGeometry, hatMaterial);

  var i;
  for (i = 0; i < Snowman.BUTTON_COUNT; i++) {
    buttons[i] = new THREE.Mesh(buttonGeometry, buttonMaterial);
    var buttonAngle = ((i + 3) * Math.PI) / 6;
    buttons[i].position.x = 0;
    buttons[i].position.y = Snowman.BODY_RADIUS * (1 - Math.cos(buttonAngle));
    buttons[i].position.z =
      Snowman.BODY_RADIUS * Math.sin(buttonAngle) + Snowman.BUTTON_RADIUS * 0.8;
    buttons[i].castShadow = true;
  }

  var eyeAngelZ;
  var eyeAngelXY;
  for (i = 0; i < 2; i++) {
    eyes[i] = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeAngelZ = 1.1;
    eyeAngelXY = (Math.PI * 5) / 8;
    //todo - the maths here isn't right.
    eyes[i].position.x =
      (-1 + 2 * i) * Snowman.HEAD_RADIUS * Math.cos((-1 + 2 * i) * eyeAngelZ) +
      (Snowman.EYE_RADIUS * (-1 + 2 * i)) / 5;
    eyes[i].position.z = 42;
    eyes[i].position.y =
      Snowman.BODY_RADIUS * 2 +
      Snowman.HEAD_RADIUS +
      Math.sin(eyeAngelXY) * Math.cos(eyeAngelZ) * Snowman.HEAD_RADIUS;
  }

  var arm1Geometry = new THREE.Geometry();
  arm1Geometry.vertices.push(new THREE.Vector3(0, Snowman.BODY_RADIUS, 5));
  arm1Geometry.vertices.push(
    new THREE.Vector3(Snowman.BODY_RADIUS * 1.5, Snowman.BODY_RADIUS * 1.5, 5)
  );
  arm1Geometry.vertices.push(
    new THREE.Vector3(Snowman.BODY_RADIUS * 1.7, Snowman.BODY_RADIUS * 2, 5)
  );

  var arm2Geometry = new THREE.Geometry();
  arm2Geometry.vertices.push(new THREE.Vector3(0, Snowman.BODY_RADIUS, 5));
  arm2Geometry.vertices.push(
    new THREE.Vector3(-Snowman.BODY_RADIUS * 1.5, Snowman.BODY_RADIUS * 1.5, 5)
  );
  arm2Geometry.vertices.push(
    new THREE.Vector3(-Snowman.BODY_RADIUS * 1.7, Snowman.BODY_RADIUS * 2, 5)
  );

  var arm1 = new THREE.Line(arm1Geometry, armMaterial);
  var arm2 = new THREE.Line(arm2Geometry, armMaterial);
  var nose = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0,
      2,
      12.642,
      12,
      11,
      false,
      7.19,
      6.283185307179586
    ),
    new THREE.MeshLambertMaterial({
      color: 0xff8000,
      wireframe: false,
    })
  );


  var nose2 = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0,
      2,
      12.642,
      12,
      11,
      false,
      7.19,
      6.283185307179586
    ),
    new THREE.MeshLambertMaterial({
      color: 0xff8000,
      wireframe: false,
    })
  );

  nose.rotation.z = 2;
  nose.rotation.y = Math.PI * 1.5;
  nose.position.z = 25;
  nose.position.y = Snowman.BODY_RADIUS * 2 + Snowman.HEAD_RADIUS;

  nose2.rotation.z = 2;
  nose2.rotation.y =15;
  nose2.rotation.x =15;
  nose2.position.z = 15;
  nose2.position.y =0;
  nose2.position.x =-25;


  hat.position.z = 62;
  hat.position.y =
    Snowman.BODY_RADIUS * 2 +
    Snowman.HEAD_RADIUS * 1.75 +
    Snowman.HAT_HEIGHT / 2;
  hatRim.position.y =
    Snowman.BODY_RADIUS * 2 +
    Snowman.HEAD_RADIUS * 1.75 +
    Snowman.HAT_RIM_HEIGHT / 2;
  hatRim.position.z = 62;

  arm1.position.z = 40;
  arm2.position.z = 40;

  secondBody.castShadow = true;
  secondBody.position.x = 0;
  secondBody.position.y = Snowman.BODY_RADIUS;
  secondBody.position.z = 47;

  body.castShadow = true;
  body.position.x = 0;
  body.position.y = Snowman.BODY_RADIUS;
  body.position.z = 0;

  head.position.x = 0;
  head.position.y =
    parseInt(Snowman.BODY_RADIUS) * 2 + parseInt(Snowman.HEAD_RADIUS);
  head.position.z = 48;

  // Create snowman
  var _snowmanMesh = new THREE.Group();
  _snowmanMesh.add(secondBody);
  _snowmanMesh.add(arm1);
  _snowmanMesh.add(arm2);
  _snowmanMesh.add(body);
  _snowmanMesh.add(head);
  _snowmanMesh.add(hat);
  _snowmanMesh.add(hatRim);
  _snowmanMesh.add(nose);
  _snowmanMesh.add(nose2);

  for (var j = 0; j < eyes.length; j++) {
    _snowmanMesh.add(eyes[j]);
  }

  _snowmanMesh.castShadow = true;

  window.Snowman = Snowman;
}


createSnowman(window, window.THREE);


//create floor:
function createFloor (window, THREE) {
  var PLANE_SIZE = 1000;

  //Geometries
  var planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32, 32);

  for (var i = 0, l = planeGeometry.vertices.length; i < l; i++) {
    planeGeometry.vertices[i].z = 1;
  }

  //floor color- snow floor (white)
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xeaf4fe,
  });

  //Create objects
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  plane.castShadow = true;

  function Arena() {
    this.mesh = plane.clone();
  }

  Arena.prototype.addTo = function (scene) {
    scene.add(this.mesh);
  };



  Arena.PLANE_SIZE = PLANE_SIZE;

  window.Arena = Arena;
}

createFloor(window, window.THREE);


//create tree:
function createTree (window, THREE) {
  var TREE_HEIGHT = 55;
  var TRUNK_HEIGHT = 0;

  var treeGeometry = new THREE.CylinderGeometry(0, 20, TREE_HEIGHT, 40);
  var treeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999,
    wireframe: false,
  });  
  
  treeMaterial.opacity = 0.3;
  treeMaterial.transparent = true;

  var tree = new THREE.Mesh(treeGeometry, treeMaterial);
  var trunkGeometry = new THREE.CylinderGeometry(5, 5, TRUNK_HEIGHT, 40);
  var trunkMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false,
  });

  var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  tree.position.y = TREE_HEIGHT / 2 + TRUNK_HEIGHT;
  trunk.position.y = TRUNK_HEIGHT / 2;
  tree.castShadow = true;


  var wholeTree = new THREE.Group();
  wholeTree.add(trunk);
  wholeTree.add(tree);
  wholeTree.castShadow = true;

  function Tree() {
    this.mesh = wholeTree.clone();
  }

  window.Tree = Tree;
}

createTree(window, window.THREE);

//create forest:
function createForest(window, THREE) {
  var NOS_TREES = 400;
  var forest = new THREE.Group();

  for (var i = 0; i < NOS_TREES; i++) {
    var tree = new window.Tree();
    var sign = Math.random() < 0.5 ? -1 : 1;
    if (i < NOS_TREES / 2) {
      tree.mesh.position.x =
        Math.random() * (window.Arena.PLANE_SIZE * 0.5) * sign;
      tree.mesh.position.z = window.Arena.PLANE_SIZE / 2 - Math.random() * 50;
      if (i < NOS_TREES / 4) {
        tree.mesh.position.z *= -1;
      }
    } else {
      tree.mesh.position.z =
        Math.random() * (window.Arena.PLANE_SIZE * 0.5) * sign;
      tree.mesh.position.x = window.Arena.PLANE_SIZE / 2 - Math.random() * 50;
      if (i < (NOS_TREES * 3) / 4) {
        tree.mesh.position.x *= -1;
      }
    }

    var treeScale = (Math.random() + 0.5) * 1;
    tree.mesh.scale.set(treeScale, treeScale, treeScale);
    forest.add(tree.mesh);
  }

  function Forest() {
    this.mesh = forest;
  }

  window.Forest = Forest;
}

createForest(window, window.THREE);


//create snow:
function createSnow (window, THREE) {
  var NOS_FLAKES = 1000;

  var snowGeometry = new THREE.Geometry();
  var snowMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  var particles = [];

  for (var i = 0; i < NOS_FLAKES; i++) {
    var particle = new THREE.Vector3(
      (Math.random() - 0.5) * window.Arena.PLANE_SIZE,
      Math.random() * 200,
      (Math.random() - 0.5) * window.Arena.PLANE_SIZE
    );
    snowGeometry.vertices.push(particle);
    particles.push(particle);
  }

  function SnowStorm() {
    this.mesh = new THREE.Points(snowGeometry, snowMaterial);
  }

  SnowStorm.prototype.update = function () {
    window.scene.remove(this.mesh);
    snowGeometry = new THREE.Geometry();
    for (var i = 0; i < particles.length; i++) {
      if (particles[i].y < 0) {
        particles[i].y = 100;
      }
      particles[i].y -= 0.2 * (1 + Math.sin(i));
      snowGeometry.vertices.push(particles[i]);
    }
    this.mesh = new THREE.Points(snowGeometry, snowMaterial);
    window.scene.add(this.mesh);
  };

  window.SnowStorm = SnowStorm;
}

createSnow(window, window.THREE);

//create behaviors on keyboard moves
function createKeyboardBehaviors(window, Snowball) {
  var SNOWBALL_POWER_LIMIT = 2; //small- paster, big- lower

  function Player(snowman, id, options) {
    var self = this;
    this.mesh = snowman.mesh;
    this.id = id;
    this.move = {
      incx: 0,
      incRot: 0,
    };
    this.snowBallPowerUp = false;
    this.snowballPower = 0;
    this.counter = 0;
    this.walkSlowness = 15;
    this.scaleShrinkage = 40;

    if (options) {
      this.move = options.move;

      if (options.keysEnabled) {
        window.addEventListener("keydown", function (event) {
          switch (event.keyCode) {
            case 37: // left
              self.rotateDirection(0.02);
              break;
            case 39: // right
              self.rotateDirection(-0.02);
              break;
            case 38: // up
              self.moveDirection(2);
              break;
            case 40: // down
              self.moveDirection(-2);
              break;
            case 32: // spacebar
              self.snowBallPowerUp = true;
              break;
          }
          // sendUpdate();
        });

        window.addEventListener(
          "keyup",
          function (event) {
            switch (event.keyCode) {
              case 37: // left
                self.rotateDirection(0);
                break;
              case 39: // right
                self.rotateDirection(0);
                break;
              case 38: // up
                self.moveDirection(0);
                break;
              case 40: // down
                self.moveDirection(0);
                break;
              case 32: // spacebar
                var snowball = self.makeSnowball(self.snowballPower);
                scene.add(snowball.mesh);
                Game.lastPower = self.snowballPower;
                Game.snowballs.push(snowball);
                self.snowBallPowerUp = false;
                self.snowballPower = 0;
                break;
            }
            // sendUpdate();
          },
          false
        );
      }
    }
  }

  Player.prototype.moveDirection = function (incx) {
    this.move.incx = incx;
  };

  Player.prototype.rotateDirection = function (rot) {
    this.move.incRot = rot;
  };

  Player.prototype.update = function () {
    this.mesh.position.x += this.move.incx * Math.sin(this.mesh.rotation.y);
    this.mesh.position.z += this.move.incx * Math.cos(this.mesh.rotation.y);

    this.mesh.rotation.y += this.move.incRot;
    this.mesh.position.y = 0.5 * Math.sin(this.counter / this.walkSlowness);

    this.mesh.scale.set(
      1 + Math.sin(this.counter / this.walkSlowness) / this.scaleShrinkage,
      1 + Math.cos(this.counter / this.walkSlowness) / this.scaleShrinkage,
      1 + Math.sin(this.counter / this.walkSlowness) / this.scaleShrinkage
    );

    this.counter++;

    if (this.snowBallPowerUp && this.snowballPower < SNOWBALL_POWER_LIMIT) {
      this.snowballPower += 0.1;
    }
  };

  Player.prototype.makeSnowball = function (power) {
    return new Snowball(
      this.id,
      this.mesh.position,
      this.mesh.rotation.y,
      power
    );
  };

  Object.defineProperty(Player.prototype, "position", {
    get: function position() {
      return this.mesh.position;
    },
    set: function position(value) {
      this.mesh.position = value;
    },
  });

  window.Player = Player;
}

createKeyboardBehaviors(window, window.THREE, window.Snowman, window.Snowball);


//create camera following- we can change positions and see around object(such as anowman), and change the camera distance
function createCameraFollowing(window, THREE) {
  function FollowCamera(player) {
    this.player = player;
    this.camera = new THREE.PerspectiveCamera(
      60, //CAMERA DISTANCE- small: close, big: far
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  }
  FollowCamera.prototype.update = function () {
    this.camera.position.x = 
      this.player.mesh.position.x - 80 * Math.sin(this.player.mesh.rotation.y);
    this.camera.position.z =
      this.player.mesh.position.z - 80 * Math.cos(this.player.mesh.rotation.y);
    this.camera.position.y = 60;
    var toLookat = this.player.mesh.position.clone();
    toLookat.x = toLookat.x + 100 * Math.sin(this.player.mesh.rotation.y);
    toLookat.z = toLookat.z + 100 * Math.cos(this.player.mesh.rotation.y);
    this.camera.lookAt(toLookat);
  };

  window.FollowCamera = FollowCamera;
}

createCameraFollowing(window, window.THREE);

//game settings:
var GAME_TIME = 60;

var Game = {
  players: [],
  snowballs: [],
  marks: [],
  explosions: [],
  targets: [],
  totalPoints: 0,
  time: GAME_TIME,
};

var canvas = document.getElementById("map-canvas");
var ctx = canvas.getContext("2d");

Game.createPlayer = function (id, options) {
  var newPlayer = new Player(new Snowman(), id, options);
  scene.add(newPlayer.mesh);
  this.players.push(newPlayer);
  this.playerToMove = newPlayer;
};


Game.update = function () {
  //move the background with the keyboard arrows: (to stop the movement- delete the function)
  this.players.forEach(function (player) {
    var posX = player.position.x;
    var posZ = player.position.z;
    player.update();
    var allowMoveX = Math.abs(player.position.x) + 10 < Arena.PLANE_SIZE / 2;
    if (!allowMoveX) {
      player.position.x = posX;
    }
    var allowMoveZ = Math.abs(player.position.z) + 10 < Arena.PLANE_SIZE / 2;
    if (!allowMoveZ) {
      player.position.z = posZ;
    }
  });
};

//message with game instructions- optional (add the message div)
Game.message = function (text) {
  $(".message").html("text");
};


var socket = io(window.location.origin);

//init THREE.js scene
window.scene = new THREE.Scene();
// sky color:
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xc7e6eb));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-view").appendChild(renderer.domElement); //update the scene on screen view

var arena = new Arena();
arena.addTo(scene);

var snowStorm = new SnowStorm();
scene.add(snowStorm.mesh);

var forest = new Forest();
scene.add(forest.mesh);


//change the light (morning/night..)
var light = new THREE.DirectionalLight(0xdfebff, 2);
light.position.set(100, 1000, 100);
light.position.multiplyScalar(1);
light.castShadow = true;
light.shadowDarkness = 0.1; //NUMBER OD STARS

scene.add(light);

//responsive for smaller screens:
window.addEventListener(
  "resize",
  function () {
    followCam.camera.aspect = window.innerWidth / window.innerHeight;
    followCam.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

//start game on click btn "start game":
$(".single-player-start-button").on("click", function () {
    startSinglePlayerGame();
});


//turn on the game (enter behavior)
function startSinglePlayerGame() {
  Game.message("Go! Build the snowman body!");
  render(); 
}

//snowball storm power animation:
function powerInidcator() {
  $("#power").css(
    "width",
    (window.innerWidth / 2) * Game.playerToMove.snowballPower + "px"
  );
}

//initialize the player:
function startGame() {
  Game.createPlayer("", {
    keysEnabled: true,
    move: {
      incx: 0,
      incRot: 0,
    },
  });
}

//initial setup
startGame();

//add the following camera to scena
var followCam = new FollowCamera(Game.playerToMove);
Game.update();
followCam.update();
renderer.render(scene, followCam.camera);

//game loop
function render() {
    requestAnimationFrame(render); //allowing snowball storm
    Game.update();
    snowStorm.update();
    powerInidcator();
    followCam.update();
    renderer.render(scene, followCam.camera);
 
}


socket.on("connected", function (scores) {
  console.log("connected");
  //updateTopScores(scores);
});