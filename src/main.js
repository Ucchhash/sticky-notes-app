const notesContainer = document.getElementById('app');
const addNoteButton = document.querySelector('.add-note');

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener('click', () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem('stickynotes-notes') || "[]")
}

function saveNotes(notes){
    localStorage.setItem('stickynotes-notes', JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement('textarea')
    element.classList.add('note');
    element.value = content;
    element.placeholder = 'Empty Sticky Note'

    element.addEventListener('change', ()=> {
        updateNote(id, element.value);
    })

    element.addEventListener('dblclick', ()=>{
        const doDelete = confirm('Are you sure you want to delete this instance of notes?')

        if(doDelete){
            deleteNote(id, element)
        }
    })

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id : Math.floor(Math.random() * 100000),
        content : '',
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNotes(notes)
}

function updateNote(id, newContent){
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

// takes an id and deletes the respective html element
function deleteNote(id, element){
    console.log('Deleting Note...');

    const note = getNotes().filter(note => note.id != id);
    saveNotes(note);
    notesContainer.removeChild(element)

}