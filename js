let currentDraggedItem;

const tierInput = document.getElementById('tier');
// console.log(tierInput);

const itemContainers = document.getElementsByClassName('item-container');

// const tierLists = document.querySelectorAll('.tier-list');

const submitBtn = document.getElementById('submit');

const imageForm = document.getElementById('image-form');

for(const itemContainer of itemContainers){
    setUpItemContainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierList);

imageForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const imageItemInput = document.getElementById('image-item');
    if(imageItemInput.value ==''){
        alert('Enter valid image url');
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value='';
});

submitBtn.addEventListener('click', (event)=>{
    event.preventDefault();

    const target=event.target;
    console.log(tierInput.value);
    if(tierInput.value==''){
        alert('please enter a tier name');
        return;
    }
    createTierList(tierInput.value);
    
});

function createTierList(tierListName){
    const newTierList= document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading=document.createElement('h1')
    heading.textContent=tierListName;

    const newTierListItems= document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);

}

function createTierListItem(imageUrl){
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable','true');
    imageDiv.classList.add('item-container');

    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src=imageUrl;

    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);

}

function setUpItemContainerForDrag(itemContainer) {
    itemContainer.addEventListener('dragstart',(event) => {
        console.log(event);
        currentDraggedItem=event.target.parentNode;

    });

    itemContainer.addEventListener('dbclick',(event)=>{
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    });
}

function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener('drop',(event)=>{
        event.preventDefault();
        // console.log('Dropping');
        
        // event.target.appendChild(currentDraggedItem);
    });

    tierListItem.addEventListener('dragover',function
        (event) {
        // console.log('dragged over a drop zone');
        // console.log(event.target);
        
        // event.target.appendChild(currentDraggedItem);
        console.log('event coming up',event);
        
        if(this != currentDraggedItem.parentNode){
            // console.log(event.target);
            
            this.appendChild(currentDraggedItem);
        }
        
    });
}
