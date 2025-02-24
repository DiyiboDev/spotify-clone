// TODO: FALTA MEJORAR EL JS Y LO MEJORARE PERO POR AHORA LO SUBIRE A PRODUCCIÓN

import './style.css'
import { $, $$ } from './utils/dom.js'
import { CLASSES, DEVICES  } from './utils/contants.js'

const $video = $('video')

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if the user agent indicates a mobile device, otherwise false.
 */
const isMobile = () => {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
}

const handleMobileAndDesktop = () => {
  if(isMobile()) {
    document.body.dataset.device = DEVICES.MOBILE
  } else {
    document.body.dataset.device = DEVICES.DESKTOP
    $video.play()
  }
}


//  INIT
(() => {
  handleMobileAndDesktop()

  const $closeVideoBtn = $('#close-video')

  $closeVideoBtn.addEventListener('click', () => {
    $video.pause()
    $('.aside-video').classList.add(CLASSES.ACTIVE)
  })

  const $showVideoBtn = $('.aside-video__show')
  $showVideoBtn.addEventListener('click', () => {
    $video.play()
    $('.aside-video').classList.remove(CLASSES.ACTIVE)
  })
})()

const $rangeVolume = $('#range-volume')
const $rangeTime = $('#range-time')

const activeColor = "#1db954"
const inactiveColor = "#4d4d4d"

$rangeTime?.addEventListener("input", sincronizeBackground)
$rangeVolume?.addEventListener("input", sincronizeBackground)
$rangeTime?.addEventListener('mouseleave', white)
$rangeTime?.addEventListener('mouseenter', green)
$rangeVolume?.addEventListener('mouseleave', white)
$rangeVolume?.addEventListener('mouseenter', green)

function white() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, #fff ${ratio}%, ${inactiveColor} ${ratio}%)`
}

function green() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
}

function sincronizeBackground() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
}

const $buttonSearch = $('.search__icon')
const $inputSearch = $('.search__input')
const $header = $('.header')

$buttonSearch.addEventListener('click', ()  => {
  $header.classList.add(CLASSES.ACTIVE)

  setTimeout(() => {
    $inputSearch.focus()
    $header.classList.add(CLASSES.ACTIVE)
  }, 0)
})

$inputSearch.addEventListener('blur', () => {
  $header.classList.remove(CLASSES.ACTIVE)
})