//var elementsArr = ['ambulance','apple','atoms','bandaid','bicycle','bottle','cross','eye','female_doctor','female_nurse','male_doctor','male_nurse','dropper','heart','mobile','pills','stethoscope','syringe','thermometer','tubes'];

//var elementsArr =['ambulance','apple','atoms','bandaid','bicycle','bottle','cross','eye','female_doctor','female_nurse','male_doctor','male_nurse','dropper','heart','mobile','pills','stethoscope','syringe','thermometer','tubes'];
var elementsArr = ['pills', 'ambulance', 'mobile','stethoscope','syringe', 'thermometer', 'apple', 'atoms']
var currentPage = 0;
var itemsPerPage = 100;
var icons = [];
var navText;

function buildIcons(){
    var element, anim;
    for(var i=0;i<elementsArr.length;i+=1){
        element = document.getElementById('icon-container-'+elementsArr[i]);
        element.style.display = 'none';
        var params = {
            container: document.getElementById('icon-'+elementsArr[i]),
            autoplay:true,
            loop:false,
            animationData:animations[elementsArr[i]],
            renderer:'svg'
        };
        anim = bodymovin.loadAnimation(params);
        icons.push({
            anim:anim,
            element: element
        })
    }
}

function renderPage(){
    var i, len = icons.length;
    for(i=0;i<len;i+=1){
        icons[i].element.style.display = 'inline-block';
        icons[i].anim.play();
    }

    bm_icon_hoverables = document.getElementsByClassName('bm_icon_hoverable');
    bm_shadow_hoverables = document.getElementsByClassName('bm_shadow_hoverable');

    for (var i = 0; i < bm_icon_hoverables.length; i++) {
        bm_icon_hoverables[i].style.cursor = 'pointer';
        bm_icon_hoverables[i].style.transition = 'transform 0.5s cubic-bezier(.18, .78, .37, .84)';
        bm_icon_hoverables[i].style.transformOrigin = '50% 50%';
        bm_icon_hoverables[i].style.transform = 'scale(1, 1)';

        bm_shadow_hoverables[i].style.cursor = 'pointer';
        bm_shadow_hoverables[i].style.transition = 'transform 0.5s cubic-bezier(.18, .78, .37, .84)';
        bm_shadow_hoverables[i].style.transformOrigin = '50% 50%';
        bm_shadow_hoverables[i].style.transform = 'translate(0, 0)';

        bm_icon_hoverables[i].onmouseover = function() {

           this.style.transform = 'scale(1.05, 1.05)';
           this.style.transform = 'translate(-10px, -10px)'
            //bm_icon_hoverables[i].style.background = 'red';
        }
        bm_icon_hoverables[i].onmouseout = function() {
            this.style.transform = 'scale(1, 1)';
            this.style.transform = 'translate(0, 0)'
             //bm_icon_hoverables[i].style.background = 'red';
         }
    }
}

function playRandom(){
    var i, len = icons.length;
    for(i=0;i<len;i+=1){
        if(Math.floor(Math.random() * 30) + 1 == 1) {
            icons[i].anim.goToAndStop(0);
            icons[i].anim.play();
            break;
        }
    }
}

//onmouseover="document.getElementById('input').style.backgroundColor='Blue';
