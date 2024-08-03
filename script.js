document.addEventListener("DOMContentLoaded", function() {
    const text = document.querySelector("textarea");
    const bgColor = document.querySelector(".bg-color");
    const textColor = document.querySelector(".text-color");
    const btn = document.querySelector("button");
    const message = document.getElementById("message");
    const notesContainer = document.getElementById("notes_container");
    const rightContainer = document.querySelector(".right-container");

    function addNote() {
        const note = text.value.trim();
        if (note === "") {
            alert("Please enter some text in the sticky note");
            return;
        }

        message.style.display = "none";

        const noteElement = document.createElement("div");
        let p = document.createElement("p");
        let crossBtn = document.createElement("button");

        noteElement.setAttribute("class", "card");
        p.setAttribute("contenteditable", "true");
        crossBtn.innerText = "X";
        p.style.color=textColor.value;
        p.innerText = text.value;

        noteElement.style.backgroundColor = bgColor.value;
        noteElement.appendChild(p);
        noteElement.appendChild(crossBtn);
        notesContainer.appendChild(noteElement);

        text.value = "";
        bgColor.value = "#000000";
        textColor.value="#000000";



        noteElement.onmousedown = function(event) {
            if(event.target == crossBtn){
                return;
            }
            noteElement.style.position = 'absolute';
            noteElement.style.zIndex = 1000;

            rightContainer.append(noteElement);

            function moveAt(pageX, pageY) {

                const newX = pageX - rightContainer.offsetLeft - noteElement.offsetWidth / 2;
                const newY = pageY - rightContainer.offsetTop - noteElement.offsetHeight / 2;

                const maxX = rightContainer.clientWidth - noteElement.offsetWidth;
                const maxY = rightContainer.clientHeight - noteElement.offsetHeight;

                noteElement.style.left = Math.min(Math.max(0, newX), maxX) + 'px';
                noteElement.style.top = Math.min(Math.max(0, newY), maxY) + 'px';
            }

            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                noteElement.onmouseup = null;
            }
            document.addEventListener('mouseup', onMouseUp);

            noteElement.ondragstart = function() {
                return false;
            };
        };
       

        // Set up removing the note

        crossBtn.onclick = function() {
            console.log("hello")
            noteElement.remove();
            if (notesContainer.innerHTML.trim() == "") {
                message.style.display = "block";
            }
        };

        
    }

    btn.addEventListener("click", addNote);
    
});

