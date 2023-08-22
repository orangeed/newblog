<!-- three -->
<template>
  <div id="three" class="bg-black text-white"></div>
</template>

<script lang="ts" setup name="three">
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  SpotLight,
  Vector2,
  AmbientLight,
  Raycaster,
  sRGBEncoding,
  PCFSoftShadowMap,
  Color,
  DirectionalLight,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";
// import TWEEN from "@tweenjs/tween.js";
// import { emitter } from "../utils/mitt";
import { Ref, ref } from "vue";
// import { threeModel } from "../utils/enum";

// const handleInit = () => {
//   // 新建一个场景
//   const scene = new Scene();
//   // 新建一个相机
//   const camera = new PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   // 新建一个渲染区域
//   const render = new WebGLRenderer();
//   // 设置渲染区域大小
//   render.setSize(window.innerWidth, window.innerHeight);
//   // 设置阴影
//   render.shadowMap.enabled = true
//   // 添加区域
//   document.getElementById("three")?.appendChild(render.domElement);
//   // 创建一个正方体
//   const geometry = new BoxGeometry(8, 8, 8);
//   // 设置正方体材质
//   const material = new MeshBasicMaterial({ color: 0xff2299 });
//   const cube = new Mesh(geometry, material);
//   cube.castShadow = true
//   // 添加正方体到场景中
//   scene.add(cube);
//   cube.position.x = 4;
//   cube.position.y = 10;
//   cube.position.z = 20;
//   // 设置相机距离
//   camera.position.x = -30;
//   camera.position.y = 45;
//   camera.position.z = 35;
//   camera.lookAt(scene.position);
//   // 设置正方体的旋转角度
//   // cube.rotation.x += 0.5;
//   // cube.rotation.y += 0.5;
//   // 添加坐标轴
//   const axes = new AxesHelper(50);
//   scene.add(axes);
//   // 新建地面
//   const planeGeometry = new PlaneGeometry(100, 100);
//   const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc });
//   const plane = new Mesh(planeGeometry, planeMaterial);
//   scene.add(plane);
//   plane.rotation.x = -0.5 * Math.PI;
//   plane.position.set(15, 0, 0);
//   plane.reciveShadow = true
//   // 设置光源
//   const ambientLight = new AmbientLight(0xffffff);
//   scene.add(ambientLight);
//   // 设置聚光灯
//   const spotLight = new SpotLight(0xffffff);
//   spotLight.position.set(-60, 40, -65);
//   spotLight.castShadow = true;
//   spotLight.shadow.mapSize = new Vector2(1024, 1024);
//   spotLight.shadow.camera.far = 130;
//   spotLight.shadow.camera.near = 40;
//   scene.add(spotLight);

//   // 渲染场景和相机
//   render.render(scene, camera);
// };

// 创建场景
const scene = new Scene();

// 创建相机
let camera: any;
const handleCreateCamera = () => {
  // 窗口宽高比
  const k = window.innerWidth / window.innerHeight;
  camera = new PerspectiveCamera(10, k, 0.1, 1000);
  // 设置相机位置
  camera.position.set(40, 50, 200);
  // 设置相机方向
  // camera.lookAt(new Vector3(14, 10, 0));
  camera.lookAt(scene.position);
  scene.add(camera);
  // 添加坐标轴
  const axes = new AxesHelper(50);
  scene.add(axes);
};

// 创建控件对象
const handleCreateControls = () => {
  // const controls = new OrbitControls(camera, renderer.domElement);
  new OrbitControls(camera, renderer.domElement);
};

// 创建光源
const handleCreateLight = () => {
  // 场景
  scene.background = new Color(0x000127);
  // scene.fog = new THREE.Fog(0xa0a0a0, 10, 500); // 边缘雾化
  // 创建环境光
  const ambientLight = new AmbientLight(0xffffff, 1);
  // 将环境光添加到场景
  scene.add(ambientLight);
  // 添加平行光源
  const directionalLight = new DirectionalLight(0x93d0ff);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -15;
  directionalLight.shadow.camera.right = 15;
  directionalLight.shadow.camera.top = 15;
  directionalLight.shadow.camera.bottom = -15;
  directionalLight.shadow.mapSize.width = 512; // default
  directionalLight.shadow.mapSize.height = 512; // default
  directionalLight.shadow.camera.near = 0.5; // default
  directionalLight.shadow.camera.far = 500; // default
  directionalLight.shadow.mapSize.set(1024, 1024);
  scene.add(directionalLight);
  // 设置聚光灯
  const spotLight = new SpotLight(0xfae94f);
  spotLight.position.set(0, 40, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);
};

// 创建渲染器
let renderer: any;
const handleCreateRender = () => {
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.enabled = true; // 是否渲染阴影
  renderer.shadowMap.type = PCFSoftShadowMap; // 阴影类型
  document.getElementById("three")?.appendChild(renderer.domElement);
};
let mesh: any;
const render = () => {
  if (mesh) {
    mesh.rotation.z += 0.006;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 加载模型
const handleLoad3DModel = () => {
  const loader = new GLTFLoader();
  loader.load(
    "src/assets/castle/castle.glb",
    (gltf: any) => {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          console.log("child", child);
          switch (child.name) {
            case "moon":
              // child.material = new THREE.MeshPhongMaterial({ color: 0xcd6a15 });
              // 添加聚光灯光源
              // const spotLight = new SpotLight(0xffffff);
              // spotLight.position.set(
              //   child.position.x,
              //   child.position.y,
              //   child.position.z
              // );
              // spotLight.castShadow = true;
              // scene.add(spotLight);
              break;

            default:
              break;
          }
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    (error: any) => {
      console.log("error", error);
    }
  );
};

// 点击模型
const raycaster = new Raycaster();
const mouse = new Vector2();
// const modelType: Ref<string> = ref("");
const clickEvent: Ref<boolean> = ref(false);
const onMouseClick = async (event: any) => {
  console.log("event", event);
  // 防止多次点击
  if (clickEvent.value) return;
  clickEvent.value = true;
  //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log("intersects", intersects);
  // if (intersects.length > 0) {
  //   console.log(111);
  //   intersects.forEach((v: any) => {
  //     // 将相机定位到点击的位置
  //     if (v.object.name.includes("pc")) {
  //       handleAnimateCamera(camera, { x: 100, y: 10, z: 0 }, 1600);
  //       modelType.value = threeModel.movie;
  //       if (!isShowArticle.value) {
  //         hanleOpenArticle();
  //       }
  //     } else if (v.object.name.includes("book")) {
  //       handleAnimateCamera(camera, { x: 10, y: 100, z: -200 }, 1600);
  //       modelType.value = threeModel.read;
  //       if (!isShowArticle.value) {
  //         hanleOpenArticle();
  //       }
  //     } else if (v.object.name.includes("article")) {
  //       handleAnimateCamera(camera, { x: 150, y: 10, z: 0 }, 1600);
  //       modelType.value = threeModel.article;
  //       if (!isShowArticle.value) {
  //         hanleOpenArticle();
  //       }
  //     } else if (v.object.name.includes("bed")) {
  //       handleAnimateCamera(camera, { x: 100, y: 60, z: -10 }, 1600);
  //       modelType.value = threeModel.about;
  //       if (!isShowArticle.value) {
  //         hanleOpenArticle();
  //       }
  //     } else if (v.object.name.includes("board")) {
  //       handleAnimateCamera(camera, { x: 50, y: 5, z: -10 }, 1600);
  //     } else {
  //     }
  //   });
  // }
};

// // 切换视角
// // const handleAnimateCamera = (camera: any, newP: any, time: any) => {
// //   new TWEEN.Tween(camera.position)
// //     .to(
// //       {
// //         x: newP.x,
// //         y: newP.y,
// //         z: newP.z,
// //       },
// //       time
// //     )
// //     .easing(TWEEN.Easing.Quadratic.InOut) //.easing(TWEEN.Easing.Cubic.InOut);
// //     .onUpdate(() => {
// //       // onUpdate会在镜头移动到指定位置期间不停的循环调用
// //       // 使用lookAt，让镜头移动时始终看向场景
// //       camera.lookAt(scene.position);
// //     })
// //     .start();
// //   animate();
// //   function animate() {
// //     // mesh.rotation.x += 0.01
// //     requestAnimationFrame(animate);
// //     TWEEN.update();
// //   }
// // };

// // 返回平面
// // const handleSelectFlat = () => {
// //   emitter.emit("3DMODEL", false);
// // };

// /**
//  * 弹窗相关
//  */
// // const isShowArticle: Ref<boolean> = ref(false);
// // const hanleOpenArticle = () => {
// //   setTimeout(() => {
// //     isShowArticle.value = true;
// //   }, 1400);
// // };

// // 关闭弹窗后
// // const handleAfterCloseModel = () => {
// //   modelType.value = "";
// //   clickEvent.value = false;
// // };

// // const handleClickModel = (event: any) => {
// //   event.stopPropagation();
// // };

onMounted(() => {
  handleLoad3DModel();
  handleCreateLight();
  handleCreateCamera();
  handleCreateRender();
  handleCreateControls();
  render();
  window.addEventListener("click", onMouseClick, false);
  document
    .getElementById("three")!
    .addEventListener("click", onMouseClick, false);
});
</script>

<style lang="scss" scoped>
#three {
  height: 100vh;
  width: 100vw;
  background: #93d0ff;
}
</style>
