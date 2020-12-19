import { Component, OnInit } from "@angular/core";
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  Texture,
  Color,
  Fog,
} from "three";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "whos-next-app";

  ngOnInit(): void {
    var container = document.getElementById("canvas");
    document.body.appendChild(container);

    var scene = new Scene();
    scene.background = new Color(0xcce0ff);
    scene.fog = new Fog(0xcce0ff, 4, 7);

    var camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new WebGLRenderer();
    renderer.setSize(screen.availWidth, screen.availHeight);
    //document.body.appendChild(renderer.domElement);
    container.appendChild(renderer.domElement);

    var geometry = new BoxGeometry(3, 3, 3);
    let texture: Texture[] = new Array(8);

    for (let i = 0; i < 8; i++) {
      texture[i] = new TextureLoader().load(
        "assets/images/" + (i + 1) + ".jpg"
      );
    }

    var material = new MeshBasicMaterial({ map: texture[0] });
    var cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 7;

    var rotationCount = 500;
    var delta = 0.1;

    var animate = function () {
      requestAnimationFrame(animate);

      if (rotationCount > 0) {
        cube.rotation.x += delta;
        cube.rotation.y += delta;

        material = new MeshBasicMaterial({
          map: texture[1 + Math.round(Math.random() * 7)],
        });
        cube.material = material;

        rotationCount--;

        if (rotationCount < 200) delta = delta - 0.001;
      }

      if (rotationCount == 0 && camera.position.z > 4.5) {
        cube.rotation.x = 0;
        cube.rotation.y = 0;

        camera.position.z -= 0.1;
      }

      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      scene.background = new Color(color);
      renderer.render(scene, camera);
    };

    animate();
  }
}
