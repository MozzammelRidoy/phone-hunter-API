const loadPhone = async(searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data , datalimit);
}

const displayPhone = (phones, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //display 20 phones 
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 15){
        phones = phones.slice(0, 15);
        showAll.classList.remove('d-none');

    }
    else{
        showAll.classList.add('d-none')
    }


    // display no found 
    const noPhoneFound = document.getElementById('no-found-massage');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none');
    }
    else{
        noPhoneFound.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDive = document.createElement('div');
        phoneDive.classList.add('col');
        phoneDive.innerHTML = `
        <div class="card p-3">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal" > Show Details </button>
          
        </div>
      </div>
        
        `;

        phoneContainer.appendChild(phoneDive);

    })

    //loader Stop
    toggleSpinner(false);

}




const processSearch = (datalimit) => {
    //loader Start
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    loadPhone(searchText, datalimit);
} 

document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
    processSearch(15);
        
})

// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
        // console.log(e.key);
        if(e.key === 'Enter'){
            processSearch(15);
        }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');

    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// No best wat 
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    disPlayPhoneDetails(data.data);
}

const disPlayPhoneDetails = (phone) => {
    // console.log(phone);
    const phoneTitle = document.getElementById('phoneModalLabel');
    phoneTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found' } </p>
        <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'Not Found'}</p>
        <p> Others : ${phone.others ? phone.others.Bluetooth : 'No Bluethoth Information'}</p>
        <p> Sensors : ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No Sensors'}</p>
    
    `;
}

loadPhone('ipad');