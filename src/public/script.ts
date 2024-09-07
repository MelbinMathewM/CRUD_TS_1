const addBtn = document.getElementById('add-button');
if (addBtn) {
    addBtn.addEventListener('click', () => {
        const addModal = document.getElementById('add-student-modal');
        if (addModal) {
            if (addModal.style.display === 'none') {
                addModal.style.display = 'block'
            } else {
                addModal.style.display = 'none'
            }
        }
    });
}

const addClose = document.getElementById('add-student-close');
if (addClose) {
    addClose.addEventListener('click', () => {
        const addModal = document.getElementById('add-student-modal');
        if (addModal) {
            addModal.style.display = 'none';
        }
    });
}

const editBtn = document.querySelectorAll('.edit-btn');
editBtn.forEach((element, index) => {
    element.addEventListener('click', () => {
        const editModals = document.querySelectorAll('.edit-student-modal');
        const editModal = editModals[index] as HTMLElement;
        if (editModal.style.display === 'none') {
            editModal.style.display = 'block'
        }
        const editCloses = document.querySelectorAll('.edit-student-close');
        const editClose = editCloses[index] as HTMLElement;

        editClose.addEventListener('click', () => {
            editModal.style.display = 'none';
        });

        const editForm = document.querySelectorAll('.edit-student-form');
        const eForm = editForm[index];
        eForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let EnameDiv = document.getElementById(`Ename-${index + 1}`);
            let EemailDiv = document.getElementById(`Eemail-${index + 1}`);
            let EageDiv = document.getElementById(`Eage-${index + 1}`);
            let idDiv = document.getElementById(`id-${index + 1}`);

            if(EnameDiv && EemailDiv && EageDiv && idDiv){
                let Ename = (EnameDiv as HTMLInputElement).value.trim();
                let Eemail = (EemailDiv as HTMLInputElement).value.trim();
                let EageS = (EageDiv as HTMLInputElement).value.trim();
                let id = (idDiv as HTMLInputElement).value;
                let Eage = + EageS;

                if (verifyForm(Ename, Eemail, Eage)) {
                    const response = await fetch('/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Ename, Eemail, Eage, id })
                    })
                    const result = await response.json();
                    if (result.success) {
                        editModal.style.display = 'none'
                        snackBar(result.message)
                    } else {
                        snackBar(result.message)
                    }
                }
            } else {
                console.error('One or more elements not found');
            }
        })
    })
});

const delBtn = document.querySelectorAll('.delete-btn');
delBtn.forEach((element, index) => {
    element.addEventListener('click', async (event) => {
        const dBtn = event.target as HTMLElement;
        if (dBtn) {
            const id = dBtn.getAttribute('data-id');
            const response = await fetch(`/remove/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json();
            if (result.success) {
                snackBar(result.message)
            } else {
                snackBar(result.message)
            }
        }
    })
})

const Aform = document.getElementById('add-student-form');
if(Aform){
    Aform.addEventListener('submit', async (e) => {
        e.preventDefault();
        let Aname = (document.getElementById('Aname') as HTMLInputElement)?.value || '';
        let Aemail = (document.getElementById('Aemail') as HTMLInputElement)?.value || '';
        let AageS = (document.getElementById('Aage') as HTMLInputElement)?.value || '0';
        let Aage = + AageS;
        console.log(verifyForm(Aname, Aemail, Aage), 'jewife');
    
        if (verifyForm(Aname, Aemail, Aage)) {
            const response = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Aname, Aemail, Aage })
            })
            const result = await response.json();
            console.log(result);
    
            if (result.success) {
                const addModal = document.getElementById('add-student-modal');
                if(addModal){
                    addModal.style.display = 'none';
                }
                snackBar(result.message)
            } else {
                snackBar(result.message)
            }
        } else {
            snackBar('form problem man')
        }
    })
}

function snackBar(message : string) {
    const snackDiv = document.getElementById('snack-bar');
    if(snackDiv){
        snackDiv.innerText = message;
        snackDiv.style.display = 'block'
        setTimeout(() => {
        snackDiv.style.display = 'none';
        location.reload();
    }, 1500)
    }
}

function verifyForm(name : string, email : string, age : number) {
    let ok = false;
    if (!name || !email || !age) {
        return ok = false
    }
    return ok = true;
}