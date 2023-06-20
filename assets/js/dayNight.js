
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", function () {
    document.querySelector(".style-switcher").classList.toggle("open");
});


window.addEventListener("scroll", function () {
    if (document.querySelector(".style-switcher").classList.toggle("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})


const themeLight = document.querySelector(".day-night");
themeLight.addEventListener("click", function (){
    themeLight.querySelector("i").classList.toggle("fa-sun");
    themeLight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark")
})
window.addEventListener("load",function (){
    if (document.body.classList.contains("dark")){
        themeLight.querySelector("i").classList.add("fa-sun");
    }else{
        themeLight.querySelector("i").classList.add("fa-moon");
    }
})