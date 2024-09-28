// Ajouter une tâche en cliquant sur le bouton "Ajouter"
document.getElementById("button-addon2").addEventListener("click", function () {
  // Récupérer la valeur de la tâche
  let task = document.getElementById("input-box").value.trim();

  // Si la tâche est vide, afficher une alerte
  if (task === "") {
    alert("Veuillez entrer une tâche avant de l'ajouter.");
  } else {
    // Si la tâche n'est pas vide, on crée un élément <li> pour l'ajouter à la liste
    let listItem = document.createElement("li");
    listItem.className = "list-group-item task-item"; // Ajouter une classe pour le style

    // Ajouter la tâche et le bouton "Terminer"
    listItem.innerHTML = `${task} <button class="btn btn-success btn-sm float-right complete-btn">Terminer</button>`;

    // Ajouter l'élément à la liste <ul>
    document.getElementById("list-container1").appendChild(listItem);

    // Vider le champ de saisie après l'ajout de la tâche
    document.getElementById("input-box").value = "";

    // Ajout de l'événement "click" pour marquer une tâche comme terminée ou annuler
    listItem
      .querySelector(".complete-btn")
      .addEventListener("click", function () {
        // Ajouter/enlever la classe 'completed' pour marquer la tâche comme terminée
        listItem.classList.toggle("completed");

        // Changer le texte du bouton en fonction de l'état de la tâche
        this.textContent = listItem.classList.contains("completed")
          ? "Annuler"
          : "Terminer";
      });
  }
});

// Fonctionnalité de filtrage des tâches
document.getElementById("all-tasks-btn").addEventListener("click", function () {
  showTasks("all"); // Afficher toutes les tâches
});

document
  .getElementById("todo-tasks-btn")
  .addEventListener("click", function () {
    showTasks("todo"); // Afficher seulement les tâches non terminées
  });

document
  .getElementById("completed-tasks-btn")
  .addEventListener("click", function () {
    showTasks("completed"); // Afficher seulement les tâches terminées
  });

// Fonction pour afficher les tâches en fonction du filtre choisi
function showTasks(filter) {
  let tasks = document.querySelectorAll(".task-item"); // Récupérer toutes les tâches

  tasks.forEach((task) => {
    switch (filter) {
      case "all":
        task.style.display = "block"; // Afficher toutes les tâches
        break;
      case "todo":
        task.style.display = task.classList.contains("completed")
          ? "none"
          : "block"; // Afficher les tâches non terminées
        break;
      case "completed":
        task.style.display = task.classList.contains("completed")
          ? "block"
          : "none"; // Afficher les tâches terminées
        break;
    }
  });
}
