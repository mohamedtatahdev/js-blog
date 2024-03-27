import "../assets/styles/styles.scss";
import "./form.scss";
import "../assets/javascripts/topbar.js";

const form = document.querySelector("form"); // Sélectionne le formulaire dans le document.
const errorElement = document.querySelector("#errors"); // Sélectionne l'élément où afficher les erreurs.
let errors = []; // Initialise un tableau pour stocker les messages d'erreur.

form.addEventListener("submit", async event => { // Ajoute un écouteur d'événement pour gérer la soumission du formulaire.
  event.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire.
  const formData = new FormData(form); // Crée un objet FormData à partir du formulaire.
  const article = Object.fromEntries(formData.entries()); // Convertit les données du formulaire en un objet article.
  if (formIsValid(article)) { // Vérifie si le formulaire est valide.
    try {
        const json = JSON.stringify(article); // Convertit l'objet `article` en chaîne JSON pour l'envoi.
        const response = await fetch("https://restapi.fr/api/article", { // Effectue une requête POST pour envoyer l'article.
          method: "POST", // Spécifie la méthode HTTP POST pour l'envoi des données.
          body: json, // Attache la chaîne JSON convertie en tant que corps de la requête.
          headers: {
            "Content-Type": "application/json" // Définit l'en-tête pour indiquer le type de contenu envoyé.
          }
        });
        const body = await response.json(); // Attend et convertit la réponse en JSON.
        console.log(body); // Affiche la réponse dans la console.
      } catch (e) { // Attrape les erreurs qui peuvent survenir pendant l'exécution de la requête.
        console.error("e : ", e); // Affiche l'erreur dans la console.
      }
      
  }
});

const formIsValid = article => { // Définit une fonction pour valider les données du formulaire.
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.img ||
    !article.title
  ) { // Vérifie si les champs obligatoires sont remplis.
    errors.push("Vous devez renseigner tous les champs"); // Ajoute un message d'erreur si des champs obligatoires sont manquants.
  } else {
    errors = []; // Réinitialise le tableau d'erreurs si les champs sont correctement remplis.
  }
  if (errors.length) { // Vérifie si le tableau d'erreurs contient des messages.
    let errorHTML = ""; // Initialise une chaîne vide pour construire le HTML des erreurs.
    errors.forEach(e => { // Pour chaque erreur dans le tableau...
      errorHTML += `<li>${e}</li>`; // Ajoute l'erreur dans une balise <li> au HTML.
    });
    errorElement.innerHTML = errorHTML; // Met à jour le contenu HTML de l'élément des erreurs avec les messages d'erreur.
    return false; // Retourne faux pour indiquer que le formulaire n'est pas valide.
  } else {
    errorElement.innerHTML = ""; // Efface les messages d'erreur si le formulaire est valide.
    return true; // Retourne vrai pour indiquer que le formulaire est valide.
  }
};
