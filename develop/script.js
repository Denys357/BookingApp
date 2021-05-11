import './style.css'

const time10 = document.getElementById('time10')
const time12 = document.getElementById('time12')
const time14 = document.getElementById('time14')
const time16 = document.getElementById('time16')
const time18 = document.getElementById('time18')
const time20 = document.getElementById('time20')
const dates = document.getElementById('dates')
let thisDay
const buttons = document.getElementsByClassName('buttons')
let result = document.getElementsByClassName('result')
const time = document.getElementById('time')
let selectBtns = document.getElementsByClassName('select')
let bookingId
let chooseOne = document.getElementById('chooseOne')
const book = document.getElementById('book')
const deleteBook = document.getElementById('deleteBook')
let archiveOrNot
let dataFromLS = []
let choosenTimes = []
let data = {
	day: '',
	time: []
}

function color(textColor, bgColor) {
	if (bookingId === 'time10') {
		time10.style.color = textColor
		time10.style.backgroundColor = bgColor
	}
	if (bookingId === 'time12') {
		time12.style.color = textColor
		time12.style.backgroundColor = bgColor
	}
	if (bookingId === 'time14') {
		time14.style.color = textColor
		time14.style.backgroundColor = bgColor
	}
	if (bookingId === 'time16') {
		time16.style.color = textColor
		time16.style.backgroundColor = bgColor
	}
	if (bookingId === 'time18') {
		time18.style.color = textColor
		time18.style.backgroundColor = bgColor
	}
	if (bookingId === 'time20') {
		time20.style.color = textColor
		time20.style.backgroundColor = bgColor
	}
}

function someDay(el) {
	return el.day === thisDay    
}

document.addEventListener('DOMContentLoaded', function(){
	// Dates
	let month = ["января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря"]
	let htmlDay = document.getElementsByClassName('date')
	let j = 0
	for (let i = -7; i <= 7; i++) {
		let d = new Date()
		let day = d.setDate(d.getDate() - i)  
		let callendar = new Date(day)
		let fullDate = `${callendar.getDate()} ${month[callendar.getMonth()]}`
		htmlDay[j].innerText = fullDate
		htmlDay[j].id = `${callendar.getDate()}${month[callendar.getMonth()]}`
		if (i > 0) {
			htmlDay[j].classList.add('archive')
		}
		j = j + 1
	}

	// Check LS
	dataFromLS = JSON.parse(localStorage.getItem('bookings'))
	if (dataFromLS !== null) {
		choosenTimes =  dataFromLS
	}
})

// Choosen Day
dates.addEventListener('click', function(event){
	thisDay = event.target.id
	archiveOrNot = event.target 
	chooseOne.style.display = 'none'
	time.style.display = 'block'

	// for (let i = 0; i < dates.children.length; i++) {
	// 	if (dates.children[i].classList.contains('archive')) {
	// 		deleteBook.setAttribute('disabled', 'disabled')
	// 		book.setAttribute('disabled', 'disabled')
	// 	} 
	// }
	book.removeAttribute('disabled')
	deleteBook.setAttribute('disabled', 'disabled')
	// Days styles
	for (let i = 0; i < dates.children.length; i++) {
		if (dates.children[i].classList.contains('active')) {
			dates.children[i].classList.remove('active')
		}
	}
	if (event.target.classList.contains('date')) {
		event.target.classList.add('active') 
	}

	for (let i = 0; i < selectBtns.length; i++) {
		selectBtns[i].classList.remove('scale')
	}
	result[0].style.visibility = 'hidden'
	buttons[0].style.visibility = 'hidden'

	// work with Data
	if (!choosenTimes.find(someDay)) {
		data = {
			day: thisDay,
			time: []
		}
	}
	if (choosenTimes.find(someDay)) {
		let x = choosenTimes.find(someDay)
		data = {
			time: x.time
		}
	} 
	
	// Buttons styles
	time10.style.color = 'black'
	time10.style.backgroundColor = 'white'
	time12.style.color = 'black'
	time12.style.backgroundColor = 'white'
	time14.style.color = 'black'
	time14.style.backgroundColor = 'white'
	time16.style.color = 'black'
	time16.style.backgroundColor = 'white'
	time18.style.color = 'black'
	time18.style.backgroundColor = 'white'
	time20.style.color = 'black'
	time20.style.backgroundColor = 'white'
	for (let i = 0; i < choosenTimes.length; i++) {
		if (choosenTimes[i].day === thisDay) {
			for (let j = 0; j < choosenTimes[i].time.length; j++) {
				if (choosenTimes[i].time[j] === 'time10') {
					time10.style.color = 'white'
					time10.style.backgroundColor = 'red'
				}
				if (choosenTimes[i].time[j] === 'time12') {
					time12.style.color = 'white'
					time12.style.backgroundColor = 'red'
				}
				if (choosenTimes[i].time[j] === 'time14') {
					time14.style.color = 'white'
					time14.style.backgroundColor = 'red'
				}
				if (choosenTimes[i].time[j] === 'time16') {
					time16.style.color = 'white'
					time16.style.backgroundColor = 'red'
				}
				if (choosenTimes[i].time[j] === 'time18') {
					time18.style.color = 'white'
					time18.style.backgroundColor = 'red'
				}
				if (choosenTimes[i].time[j] === 'time20') {
					time20.style.color = 'white'
					time20.style.backgroundColor = 'red'
				}
			}
		}
	}
})

time.addEventListener('click', function(event){
	event.preventDefault()
	result[0].style.visibility = 'hidden'
	buttons[0].style.visibility = 'visible'
	bookingId = event.target.id
	if (archiveOrNot.classList.contains('archive')) {
		result[0].style.visibility = 'hidden'
		buttons[0].style.visibility = 'hidden'
	}

	// Disabled buttons
	for (let i = 0; i < choosenTimes.length; i++) {
		if (choosenTimes[i].day === thisDay) {
			if (choosenTimes[i].time.includes(`${bookingId}`)) {
				book.setAttribute('disabled', 'disabled')
					} else {
						book.removeAttribute('disabled')
					}
			}   
	}
	for (let i = 0; i < choosenTimes.length; i++) {
		if (choosenTimes[i].day === thisDay) {
			if (choosenTimes[i].time.includes(`${bookingId}`)) {
				deleteBook.removeAttribute('disabled')
			} else {
					deleteBook.setAttribute('disabled', 'disabled')				
					}
			}   
	}

	// Focus
	let currentTime = event.target 
	if (event.target.tagName == 'BUTTON') {
			for (let i = 0; i < selectBtns.length; i++) {
			selectBtns[i].classList.remove('scale')
	}
	currentTime.classList.add('scale')
	}
	if (archiveOrNot.classList.contains('archive')) {
		currentTime.classList.remove('scale')
	}
})

book.addEventListener('click', function(event){
	event.preventDefault()
	
	// Booking Data 
	if (!choosenTimes.find(someDay)) {
		choosenTimes.push(data)
	}
	
	if (choosenTimes.find(someDay)) {
		data.time.push(bookingId)    
	} 

	// Disabled buttons
	book.setAttribute('disabled', 'disabled')
	deleteBook.removeAttribute('disabled')

	// Buttons Style
	color('white', 'red')
	result[0].style.visibility = 'visible'
	result[0].style.backgroundColor = 'green'
	result[0].innerText = 'Место забронировано'

	// LS
	localStorage.setItem('bookings', JSON.stringify(choosenTimes))   
})

deleteBook.addEventListener('click', function(event){
	event.preventDefault()

	// Delete Data
	if (choosenTimes.find(someDay)) {
		let deleteItem = data.time.indexOf(bookingId) 
		if (deleteItem >= 0) {
			data.time.splice(deleteItem, 1)
		}
	}

	// Disabled buttons
	deleteBook.setAttribute('disabled', 'disabled')
	book.removeAttribute('disabled')

	// Buttons Style
	color('black', 'white')
	result[0].style.visibility = 'visible'
	result[0].style.backgroundColor = 'red'
	result[0].innerText = 'Бронь снята'

	// LS
	localStorage.setItem('bookings', JSON.stringify(choosenTimes))
})









