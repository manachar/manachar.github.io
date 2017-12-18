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

  var now     = new Date(),
      $cal    = $('.cal'),
      $days   = $('.cal-day', $cal),
      $audios = $('audio'),
      okDays  = [];

  var playAudio = function($day) {

    var $control = $('.fa', $day),
        day      = $day.data('day'),
        $audio   = $('#audio-xmas-2017-' + day),
        status   = $day.data('status');

    if ( status !== 'playing') {
      $audio[0].play();
      $control.removeClass('fa-play').addClass('fa-pause');
      $day.data('status', 'playing');
    }

  };

  var pauseAudio = function($day) {

    var $control = $('.fa', $day),
        day      = $day.data('day'),
        $audio   = $('#audio-xmas-2017-' + day),
        status   = $day.data('status');

    if ( status !== 'paused') {
      $audio[0].pause();
      $control.removeClass('fa-pause').addClass('fa-play');
      $day.data('status', 'paused');
    }

  };

  $days.each(function(){
    var $day = $(this),
        month = $day.data('month'),
        day = $day.data('day'),
        year = $day.data('year'),
        date = new Date(year, month, day);

    if (date && now >= date){
      $day.addClass('ok');
      okDays.push(day);
    }
  });

  $cal.on('click', '.cal-day.ok', function(event){
    if($(event.target).hasClass('cal-day-cover')){
      $(this).addClass('active');
    }
  });

  $cal.on('click', '.cal-day.active', function(event){
    var $day = $(this),
        status = $day.data('status');
    if(status=='playing'){
      pauseAudio($day);
    }
    else {
      playAudio($day);
    }
  });

  $audios.on('ended', function(event){
    var $this = $(this),
        day = $this.data('day'),
        nextDay = day + 1;

    var $day        = $('.cal-day[data-day="' + day + '"]'),
        $dayControl = $('.fa', $day),
        $nextDay    = $('.cal-day[data-day="' + ( okDays.indexOf(nextDay) !== -1 ? nextDay : 1 ) + '"]');

    $day.data('status', null);
    $day.removeClass('active');
    $dayControl.removeClass('fa-pause').addClass('fa-play');
    $nextDay.addClass('active');
    playAudio($nextDay);

  });

  var easter_egg = new Konami(
    function() {

      alert('You are the sort of person who reads the end of the book first, aren\'t you?');

      $days.each(function(){
        var $day = $(this),
            month = $day.data('month'),
            day = $day.data('day'),
            year = $day.data('year'),
            date = new Date(year, month, day);

        $day.addClass('ok');
        okDays.push(day);
      });

    }
  );

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
    container.setAttribute('class', 'snowflakes');
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

    for ( i = 0; i < 50; i ++ ) {

      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2000 - 1000;
      vertex.y = Math.random() * 2000 - 1000;
      vertex.z = Math.random() * 2000 - 1000;

      geometry.vertices.push( vertex );

    }

    baseColor = [0.6, 1, .9];

    parameters = [
      [ baseColor, sprite1, 40 ],
      [ baseColor, sprite2, 40 ],
      [ baseColor, sprite3, 40 ],
      [ baseColor, sprite4, 40 ]
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

    renderer = new THREE.WebGLRenderer( { alpha: true, clearAlpha: 1 } );
    renderer.setClearColor( 0x000000, 0);
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
