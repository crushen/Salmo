import anime from 'animejs'

//import { translate } from './animate'
export function morph(element) {
  console.log(element)
  anime({
    targets: element,
    d: [
      { value: 'M414 0H0V110.272C57.5 190 126.5 170.5 173.5 147.5C220.5 124.5 276 94.5 322.5 94.5C369 94.5 387.292 110.16 414 110.272V0Z' },
      { value: 'M425.383 0H0V172.7C188.183 98.8673 206.693 383.984 425.383 253.16V0Z' }
    ],
    easing: 'eastInOutQuint',
    duration: 1300,
    loop: false,
    autoplay: false
  })
}
