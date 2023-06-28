let selectedAns = []
// Code for every ans button
const ansBtns = document.getElementsByClassName('ans-btn')
console.log(ansBtns)
for(var x = 0; x < ansBtns.length; x++) {
    ansBtns[x].addEventListener('click', function() {
        // Check to see if btn click is already selected
        if(selectedAns.includes(this.id) === true) {
            this.style.backgroundColor = 'bisque'
            removeArr(selectedAns, this.id)

        } else {

            // Split text into the subject and the number
            let btnIdSplit = this.id.split('-')
            const anyRepeat = checkRepeat(selectedAns, btnIdSplit[0], btnIdSplit[1])

            // Check if "anyRepeat" is false
            if(anyRepeat === false) {
                selectedAns.push(this.id)
                this.style.backgroundColor = 'blue'
                console.log(selectedAns)
            }
    
        }

    })
}

// This function will check an array for any repeat. When finish the function will return a boolean
function checkRepeat(arr, subject, num) {
    if(arr.length === 0) return false


    for(var i = 0; i < arr.length; i++) {
        if(arr[i].includes(subject) === true) {
            selectedAns = removeArr(arr, arr[i])
        }
    }
    
    return false
}

// this function will remove an item from an array
function removeArr(arr, item) {
    let newArr = []
    document.getElementById(item).style.backgroundColor = 'bisque'
    for(items in arr) {
        if(arr[items].includes(item) !== true) {
           newArr.push(arr[items]) 
        }
    }
    console.log(newArr)
    return newArr
}

// Code for the sumbit button
document.getElementsByClassName('sumbit-btn')[0].addEventListener('click', e=> {
    const name = document.getElementsByClassName('text-input')[0]

    let math;
    let science;
    let history;
    let ela;

    // Loop through the array "selectedAns"
    for(items in selectedAns) {
        let ansSplit = selectedAns[items].split('-')
        let subject = ansSplit[0]

        if(subject === 'math') math = ansSplit[1]
        if(subject === 'science') science = ansSplit[1]
        if(subject === 'history') history = ansSplit[1]
        if(subject === 'ela') ela = ansSplit[1]
    }
    // Post information to "index.js"
    postToNode(name.value, math, science, history, ela)
})

// This function post the infomation "name", "math", "science", "history", "ela" to "index.js"
async function postToNode(name, math, science, history, ela) {
    let data = { name, math, science, history, ela }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    }
    fetch( '/pushXlsx', options)
}