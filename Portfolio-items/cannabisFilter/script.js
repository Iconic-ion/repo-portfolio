import { data } from './data.js' 

const getStrainBtn = document.getElementById('get-strain-btn')
const effectsRadios = document.querySelector('#effects-radios');
const strainModalInner = document.getElementById('strain-modal-inner')
const listModal = document.getElementById('list-modal')
const listModalCloseBtn = document.getElementById('list-modal-close-btn')
// const extraInfo = document.getElementById('extra-info')

effectsRadios.addEventListener('change', highlightChecked)

getStrainBtn.addEventListener('click', renderStrainList)

// extraInfo.addEventListener('hover', expandListItem)

listModalCloseBtn.addEventListener('click', closeModal)

function closeModal() {
    listModal.style.display = 'none';
}


function highlightChecked(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}




function getStrainArray(strains){
    const strainArray = [];
    for (let strain of strains) {
        for (let effect of strain.effects) {
            if(!strainArray.includes(effect)){
                strainArray.push(effect)
            };
        }
    };
    return strainArray;
};


function renderEffectsRadios(strains) {
    let effectsItems = '';
    const effects = getStrainArray(strains);
    for (let effect of effects) {
        effectsItems += `
                        <div class="radio">
                        <input type="radio"
                        id="${effect}"
                        value="${effect}"
                        name="effects" />
                        <label for="${effect}">${effect}</label>
                        </div>                    
                        `
    };
    effectsRadios.innerHTML = effectsItems;
};
renderEffectsRadios(data)



function getMatchingStrainsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEffect = document.querySelector('input[type="radio"]:checked').value
       
        
        const matchingStrainsArray = data.filter(function(eff){
            
            return eff.effects.includes(selectedEffect)
                      
        })
        return matchingStrainsArray 
    }  
}

function renderStrainList() {
    
    let renderedList = ''
    const strainList = getMatchingStrainsArray()
    for (let strain of strainList) {
        renderedList += `
                        <div class="list-item">
                            <h2>${strain.name}</h2>
                            <div class="strain-card">
                                <img src="${strain.image}" />
                                <div id="expand-list" class="expand-list">
                                    <div class="top">Effects: </div>
                                    <div>${strain.effects}</div>
                                    <div class="top">Negative Effects: </div>
                                    <div>${strain.negEffects}</div>
                                    <div class="top">Flavors: </div>
                                    <div>${strain.flavors}</div>

                                </div>
                                        
                                
                                
                                <div class="stats">
                                        <div>${strain.type}</div>
                                          <div> THC: ${strain.thc}% </div> 
                                        //   <div>Helps With: ${strain.medical} </div>     
                                </div>
                            </div>
                        </div>                        `
    }
    listModal.style.display = 'block'
    strainModalInner.innerHTML = renderedList

    // const expandList = document.getElementById('expand-list')
    // expandList.addEventListener('hover', expandListItem(){

    //     expandList.style.className = 'expand-list'
    // })

}


// function expandListItem() {
//     let expandedList = ''
//     const strainList = getMatchingStrainsArray()
//     for (let strain of strainList) {
//         expandedList += `
//                         <div>${strain.effects}</div>    
//                         `
//     }

//     expandList.innerHTML = expandedList

// }

