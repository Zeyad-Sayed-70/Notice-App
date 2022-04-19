
const createNote_btn = document.querySelector(".createNote");
const note_content = document.querySelector(".notes-container");
let all_notes = note_content.querySelectorAll(".note");

createNote_btn.addEventListener("click", (ev) => {
    createNote();
})

let noteArr = [];

if ( localStorage.getItem("notes") !== null ) {
    noteArr = JSON.parse(localStorage.getItem("notes"));
    getNotesLC();
}


function createNote(val = 'Enter Your Note.') {
    let note = document.createElement("div");
    note.classList.add("note");
    
    note.innerHTML = `
    <div class="options">
    <div>
    <span class="addNote"><i class="fa-solid fa-plus"></i></span>
    <span class="editNote"><i class="fa-solid fa-marker fa-xs"></i></span>
    </div>
    <div class="switcher">
    <span class="forword"><i class="fa-solid fa-arrow-left-long"></i></span>
    <span class="back"><i class="fa-solid fa-arrow-right-long"></i></span>
    </div>
    <div>
    <span class="removeNote"><i class="fa-solid fa-xmark"></i></span>
    </div>
    </div>
    <div class="note-content">
    <p contenteditable="false">${val}</p>
    </div>
    `;
    // Append note to note_content

    note_content.appendChild(note);

    all_notes = note_content.querySelectorAll(".note");
    // Add active class
    all_notes.forEach(e => {e.classList.remove("active")});
    note.classList.add("active");
    
    let add_note = note.querySelector(".addNote");
    let edit_note = note.querySelector(".editNote");
    let remove_note = note.querySelector(".removeNote");
    let text = note.querySelector(".note-content p");
    let forword = note.querySelector(".forword");
    let back = note.querySelector(".back");
    
    
    // Add Note
    add_note.addEventListener("click", (e) => {
        if ( text.innerText !== '' ) {
            text.setAttribute("contenteditable", "false");
        }
        all_notes = note_content.querySelectorAll(".note");
    })
    // Edet Text in note
    edit_note.addEventListener("click", (e) => {
        if ( text.innerText !== '' ) {
            text.setAttribute("contenteditable", "true");
            text.focus();
        }
        all_notes = note_content.querySelectorAll(".note");
    })
    // Revome Note
    remove_note.addEventListener("click", (e) => {
        note.remove();
        all_notes = note_content.querySelectorAll(".note");
        if ( all_notes.length > 0 )
        note_content.lastChild.classList.add("active");
        else
        noteArr = [];
        updateLC();
    })
    // Swap Forword
    forword.addEventListener("click", (e) => {
        if ( !all_notes[all_notes.length-1].classList.contains("active") ) {
            for ( let i = 0; i < all_notes.length; i++ ) {
                if ( all_notes[i].classList.contains("active") ) {
                    all_notes[i].classList.remove("active");
                    all_notes[i+1].classList.add("active");
                    break;
                }
            }
        }
        all_notes = note_content.querySelectorAll(".note");
    })
    // Swap Back
    back.addEventListener("click", (e) => {
        if ( !all_notes[0].classList.contains("active") ) {
            for ( let i = 0; i < all_notes.length; i++ ) {
                if ( all_notes[i].classList.contains("active") ) {
                    all_notes[i].classList.remove("active");
                    all_notes[i-1].classList.add("active");
                    break;
                }
            }
        }
        all_notes = note_content.querySelectorAll(".note");
    })
    text.addEventListener("input", (ev) => {
        all_notes = note_content.querySelectorAll(".note");
        updateLC();
    })
    // Set Note To noteArr
    updateLC();
}

function getNotesLC() {
    noteArr.forEach(e => { createNote(e) });
}

function updateLC() {
    // Set Note To noteArr
    noteArr = [];
    if ( all_notes.length > 0 ) {
        all_notes.forEach(e => {
            noteArr.push(e.querySelector("p").innerText);
            localStorage.setItem("notes", JSON.stringify(noteArr));
        })
    } 
    else
    localStorage.removeItem("notes");
}
