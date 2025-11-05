let liste = document.getElementById("liste");
let inputNom = document.getElementById("input");
let inputPrix = document.getElementById("prix");
let categorie = document.getElementById("categorie");
let button = document.getElementById("button");
let tousProduits; 
[inputNom, inputPrix, categorie].forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            button.click(); 
        }
    });
});


fetch("prouduits.json")
.then(response => response.json())
.then(data => {
    tousProduits = data; 
    function afficher(t) {
        liste.innerHTML = ""; 
        t.forEach(produit => {
            const div = document.createElement("div");
            div.className = "produit";
            div.innerHTML = `
                <img src="${produit.image}" width="200px" alt="${produit.nom}">
                <h3>${produit.nom}</h3>
                <p>Prix : ${produit.prix}dh</p>
                <p>Catégorie : ${produit.categorie}</p>
            `;
            liste.appendChild(div);
        });
    }

    afficher(tousProduits); 
    let categories = [...new Set(tousProduits.map(p => p.categorie))];
    categories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorie.appendChild(option);
    });

    categorie.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
    }
});

    button.addEventListener("click", () => {
        let mot = inputNom.value.toLowerCase();
        let cat = categorie.value;
        let prixMax = parseFloat(inputPrix.value); 

        let resultat = tousProduits.filter(p => {
            let nomOK = p.nom.toLowerCase().includes(mot);
            let catOK = cat === "" || p.categorie === cat;
            let prixOK = isNaN(prixMax) || p.prix <= prixMax; 
            return nomOK && catOK && prixOK;

            
        });

        afficher(resultat);
    });

})
.catch(error => console.error("Erreur :", error));
