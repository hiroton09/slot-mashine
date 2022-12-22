'use strict';

{
    const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
    ];

    class Panel {

        constructor(){
            const section = document.createElement('section');
            section.classList.add('panel');

            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            this.stop.classList.add('stop', 'inactive');
            this.stop.addEventListener('click', () => {
                if(this.stop.classList.contains('inactive')){
                    return;
                }
                this.stop.classList.add('inactive')

                clearTimeout(this.timeoutId);

                panelsLeft--;

                if (panelsLeft === 0){
                    checkResult();
                    spin.classList.remove('inactive');
                    panelsLeft = 3;
                }

            });

            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector('main');
            main.appendChild(section);
        }

        getRandomImage() {
            return images[Math.floor(Math.random() * images.length)];
        }

        spin() {
            this.img.src = this.getRandomImage();
            this.timeoutId  = setTimeout(() => {
                this.spin();
            }, 200);
        }

        isUnmatched(p1, p2) {
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }

        isMatched(p1, p2) {
            return this.img.src.includes(images[0]) && this.img.src === p1.img.src && this.img.src === p2.img.src;
        }

        unmatch() {
            this.img.classList.add('unmatched');
        }

        activate() {
            this.img.classList.remove('unmatched')
            this.stop.classList.remove('inactive')
        }
    }

    function checkResult() {
        if (panels[0].isUnmatched(panels[1], panels[2])){
            panels[0].unmatch();
        }
        if (panels[1].isUnmatched(panels[0], panels[2])){
            panels[1].unmatch()
        }
        if (panels[2].isUnmatched(panels[0], panels[1])){
            panels[2].unmatch();
        }
        if (panels[0].isMatched(panels[1], panels[2])){
            if(confirm("ラッコは好きですか？")) {
                if(confirm("鳥羽水族館へ行きたいですか？")) {
                    if(confirm("本当に行きたいですか？")) {
                        alert("そのラッコに対する熱い思いしかと承りました。\n友美は鳥羽水族館のチケットを手に入れた。");
                    } else {
                        alert("ラッコに対する気持ちはそこまでなんですね。失望です。");
                    }
                } else {
                    alert("もう一生ラッコ見れないですね。");
                }
            } else {
                alert("あーじゃあもうクリスマスプレゼントはないですね。");
            }
        }
    }

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    let panelsLeft = 3;

    const spin = document.getElementById('spin');
    spin.addEventListener('click', () => {
        if(spin.classList.contains('inactive')){
            return;
        }
        spin.classList.add('inactive');

        panels.forEach(panel => {
            panel.activate();
            panel.spin();
        });
    });


}