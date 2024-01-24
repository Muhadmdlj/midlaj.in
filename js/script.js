$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.header').addClass("header-1");
        } else {
            $('.header').removeClass("header-1");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 200) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }

        // if (this.scrollY > 100) {
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[0].classList.add('active');
        // }
        // if(this.scrollY > 200){
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[1].classList.add('active');
        // }
        // if(this.scrollY > 800){
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[2].classList.add('active');
        // }
        // if(this.scrollY > 1100){
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[3].classList.add('active');
        // }
        // if(this.scrollY > 1900){
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[4].classList.add('active');
        // }
        // if(this.scrollY > 2100){
        //     document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
        //     document.querySelectorAll('#nav-link ul li a')[5].classList.add('active');
        // }
        if (this.scrollY < 600) {
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[0].classList.add('active');
        }
        else if(this.scrollY < 630+430){
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[1].classList.add('active');
        }
        else if(this.scrollY < 630+430+500){
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[2].classList.add('active');
        }
        else if(this.scrollY < 630+430+500+480){
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[3].classList.add('active');
        }
        else if(this.scrollY < 630+430+500+480+520){
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[4].classList.add('active');
        }
        else if(this.scrollY < 630+430+500+480+520+570){
            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            document.querySelectorAll('#nav-link ul li a')[5].classList.add('active');
        }
    });
    // typing animation
    var typed = new Typed(".typing", {
        strings: ["Web Designer...", "web Developer..."],
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
    });
    var typed = new Typed(".typing-2", {
        strings: ["Web Designer...", "Web Developer..."],
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
    });
    // sliders
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: true,
            },
            700: {
                items: 3,
                nav: false,
                dots: true,
            },
            1500: {
                items: 4,
                nav: false,
                loop: false,
                dots: true,
            }
        }
    });
    // banner photo hover effect

    var vertex = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
    var fragment = `
varying vec2 vUv;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;
uniform float dispFactor;
uniform float intensity1;
uniform float intensity2;
uniform float angle1;
uniform float angle2;

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {
    vec4 disp = texture2D(disp, vUv);
    vec2 dispVec = vec2(disp.r, disp.g) * 2.0 - 1.0;
    vec2 distPos1 = vUv + rotate(dispVec, angle1) * intensity1 * dispFactor;
    vec2 distPos2 = vUv + rotate(dispVec, angle2) * intensity2 * (1.0 - dispFactor);
    gl_FragColor = mix(texture2D(texture1, distPos1), texture2D(texture2, distPos2), dispFactor);
}
`;


    var parent = document.getElementById('hoverTarget');
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(parent.offsetWidth / -2, parent.offsetWidth / 2, parent.offsetHeight / 2, parent.offsetHeight / -2, 1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: false });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);

    var loader = new THREE.TextureLoader();
    loader.setCrossOrigin(''); // Handling CORS

    var texture1 = loader.load('./img/banner/IMG_1436.HEIC');
    var texture2 = loader.load('./img/banner/myphoto.jpg');
    var dispTexture = loader.load('https://images.pexels.com/photos/4252667/pexels-photo-4252667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

    var uniforms = {
        "texture1": { type: "t", value: texture1 },
        "texture2": { type: "t", value: texture2 },
        "disp": { type: "t", value: dispTexture },
        "dispFactor": { type: "f", value: 0.0 },
        "intensity1": { type: "f", value: 0.2 },
        "intensity2": { type: "f", value: 0.1 },
        "angle1": { type: "f", value: Math.PI / 4 },
        "angle2": { type: "f", value: -Math.PI / 4 }
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight);
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    camera.position.z = 1;

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();

    parent.addEventListener("mouseenter", function () {
        gsap.to(uniforms.dispFactor, { duration: 1, value: 1 });
    });

    parent.addEventListener("mouseleave", function () {
        gsap.to(uniforms.dispFactor, { duration: 1, value: 0 });
    });

    //skills percentage
    $('.get-value').each(function (data, ind) {
        var percentage = parseFloat(data.innerHTML);
        $('.set-value')[ind].css({ 'width': percentage + '%' });
    });



});



// java-script---------


// popup tooggle button

let hide = document.querySelectorAll(".hide")
let chat = document.querySelector("#chat");
let cross = document.querySelector("#cross");
let bool = true;
let crosIcon = cross.innerHTML;
let comIcon = chat.innerHTML;
chat.addEventListener("click", () => {
    hide.forEach((data) => {
        data.classList.toggle("show");
    });
    if (bool) {
        chat.innerHTML = crosIcon;
        bool = false;
    }
    else {
        chat.innerHTML = comIcon;
        bool = true;
    }
})
//progress animation
let mySkil = document.querySelectorAll('.skil');
mySkil.forEach((data) => {
    data.addEventListener('mouseenter', () => {
        data.classList.add('animate');
    });
    data.addEventListener('mouseleave', () => {
        data.classList.remove('animate');
    });
});
//skills percentage
let getval = document.querySelectorAll(".get-value");
let setval = document.querySelectorAll(".set-value");
getval.forEach((data, ind) => {
    let persentage = data.innerHTML;
    setval[ind].style.width = persentage;

});
// navigation active
document.addEventListener('DOMContentLoaded', () => {
    let navLink = document.querySelectorAll('#nav-link ul li a');
    navLink.forEach((link, ind) => {
        link.addEventListener('click', () => {

            document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
                navLink[ind].classList.add('active');

            // this.classList.add('active');
            // this.classList.remove('active');

        });
    });
    document.getElementById("scroll-btn").addEventListener('click', () => {
        document.querySelector('nav#nav-link ul li a.active').classList.remove('active'),
            navLink[0].classList.add('active');
    });
});
