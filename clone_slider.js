const kSlider = function (target, option) {
    

    /* 이미지 로드 여부  */
    const toBeLoaded = document.querySelectorAll(`${target} img`);
    let loadedIamages = 0;
    toBeLoaded.forEach( item => {
        item.onload = () => {
            loadedIamages += 1;
            if (loadedIamages === toBeLoaded.length) {
                innerName(target, option);
            } else {
                return;
            }
        }
    });
    
    // window.onload = (function (target, option) {
    //     return () => {
    //         innerName(target, option);
    //     }
    // })(target, option);
    
    


    /* 메인구간 -  돔 준비 */
    function innerName(target, option) {
        const slider = document.querySelector(`${target}`);
        slider.classList.add('k_list'); //

        const kindSlider = document.createElement('div');
        const kindWrap = document.createElement('div');
        slider.parentNode.insertBefore(kindWrap, slider);
        kindSlider.className = 'kind_slider'
        kindWrap.className = 'kind_wrap';
        kindSlider.appendChild(slider);
        kindWrap.appendChild(kindSlider);

        const moveButton = document.createElement('div')
        moveButton.className ='arrow';
        const prevA = document.createElement('a')
        prevA.className = 'prev';
        const nextA = document.createElement('a')
        nextA.className ='next';
        prevA.textContent = 'prev';
        nextA.textContent = 'next';
        prevA.href = '';
        nextA.href = '';
        moveButton.appendChild(prevA);
        moveButton.appendChild(nextA);
        kindWrap.appendChild(moveButton);

        const slideLis = slider.querySelectorAll('.k_list > *');
        slideLis.forEach( item => {
            item.classList.add('k_item');
        })

        // 옵션 예외처리와 셋팅
        const OPTION = (option => {
            const OPTION = {...option};
            if (OPTION.speed <= 0) {
                throw new Error ('0이상의 값을 사용하세요')
            } else {
                return Object.freeze(OPTION);
            }
        })(option);


        // const moveButton = kindWrap.querySelector('.arrow');
        const liWidth = slideLis[0].clientWidth;
        let moveDist = -liWidth;
        let listIndex = 1;
        let speedTime = OPTION.speed;


        /* 클론 만들기 */
        const cloneA = slideLis[0].cloneNode(true);
        const cloneC = slideLis[slideLis.length - 1].cloneNode(true);
        slider.insertBefore(cloneC, slideLis[0]);
        slider.appendChild(cloneA);


        /* 넓이 구하기 */
        const sliderCloneLis = slider.querySelectorAll('.k_list > *');
        const sliderWidth = liWidth * sliderCloneLis.length;
        slider.style.width = sliderWidth + 'px';
        slider.style.transform = `translateX(${moveDist}px)`;



        moveButton.addEventListener('click', moveSlide);

        function moveSlide(event) {
            event.preventDefault();
            slider.style.transition = `all ${speedTime}ms ease`;
            if (event.target.className === 'next') {
                moveDist += -liWidth;  
                translate(moveDist, listIndex + 1);
                if(listIndex === sliderCloneLis.length-1) {
                    setTimeout( () => {
                        slider.style.transition = 'none';
                        moveDist = -liWidth;
                        translate(moveDist, 1);
                    }, speedTime);
                }
            } else {
                moveDist += liWidth;
                translate(moveDist, listIndex - 1);
                if(listIndex === 0) {
                    setTimeout( () => {
                        slider.style.transition = 'none';
                        moveDist = -liWidth * (sliderCloneLis.length - 2);
                        slider.style.transform = `translsteX(${moveDist}px)`;
                        listIndex = sliderCloneLis.length - 2;
                        translate(moveDist, listIndex);
                    }, speedTime);
                }
            }
        }

        function translate(moveDist, num) {     
            slider.style.transform = `translateX(${moveDist}px)`; 
            listIndex = num;
            console.log(listIndex, moveDist); 
        }
    } // innerName end
    
}
