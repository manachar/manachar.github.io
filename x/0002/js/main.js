require({
    baseUrl: 'js',
    // three.js should have UMD support soon, but it currently does not
    shim: { 'vendor/three': { exports: 'THREE' } }
}, [
    'vendor/three'
], function(THREE) {

  if (typeof console == 'object') {
    console.log('Merry Christmaskwanzaka and such! Hope the holidays are treating you well.');
    console.log('This uses three.js and is heavily based on http://threejs.org/examples/webgl_particles_sprites.');
  }

  var $audio = $('#audio-xmas-2014'),
      $start = $('a.start'),
      $stop = $('a.stop');

  $start.on('click', function(e){
    e.preventDefault();
    $audio[0].play();
    $start.addClass('disabled');
    $stop.removeClass('disabled');
  });

  $stop.on('click', function(e){
    e.preventDefault();
    $audio[0].pause();
    $stop.addClass('disabled');
    $start.removeClass('disabled');
  });

  // Heavily based on http://threejs.org/examples/webgl_particles_sprites

  var container;
  var camera, scene, renderer, particles, geometry, materials = [], parameters, i, color, sprite, size;
  var sprite1, sprite2, sprite3, sprite4;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 1200;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

    geometry = new THREE.Geometry();

    sprite1 = THREE.ImageUtils.loadTexture( 'images/pixelflake-01.png' );
    sprite2 = THREE.ImageUtils.loadTexture( 'images/pixelflake-02.png' );
    sprite3 = THREE.ImageUtils.loadTexture( 'images/pixelflake-03.png' );
    sprite4 = THREE.ImageUtils.loadTexture( 'images/pixelflake-04.png' );

    for ( i = 0; i < 300; i ++ ) {

      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2000 - 1000;
      vertex.y = Math.random() * 2000 - 1000;
      vertex.z = Math.random() * 2000 - 1000;

      geometry.vertices.push( vertex );

    }

    parameters = [
      [ [0.6, 0.4, 0.9], sprite1, 10 ],
      [ [0.6, 0.4, 0.9], sprite1, 20 ],
      [ [0.6, 0.4, 0.9], sprite2, 20 ],
      [ [0.6, 0.4, 0.9], sprite3, 20 ],
      [ [0.6, 0.4, 0.9], sprite4, 20 ]
    ];

    for ( i = 0; i < parameters.length; i ++ ) {

      color  = parameters[i][0];
      sprite = parameters[i][1];
      size   = parameters[i][2];

      materials[i] = new THREE.PointCloudMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
      materials[i].color.setHSL( color[0], color[1], color[2] );

      particles = new THREE.PointCloud( geometry, materials[i] );

      particles.rotation.x = Math.random() * 3;
      particles.rotation.y = Math.random() * 3;
      particles.rotation.z = Math.random() * 3;

      scene.add( particles );

    }


    renderer = new THREE.WebGLRenderer( { clearAlpha: 1 } );
    renderer.setClearColor( 0x072445, 1);
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestAnimationFrame( animate );
    render();

  }

  function render() {

    var time = Date.now() * 0.00005;

    camera.lookAt( scene.position );

    for ( i = 0; i < scene.children.length; i ++ ) {

      var object = scene.children[ i ];

      if ( object instanceof THREE.PointCloud ) {

        object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

      }

    }

    renderer.render( scene, camera );

  }

});
