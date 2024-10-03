const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

let workplan = [];

// Fonction asynchrone pour générer le prompt pour chaque session de brainstorming
async function generatePrompt(contexte, role, competences, taches, fonctions, routine, processus, caracteristiques, actionsImmediates, resultatAttendu) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: `Vous êtes une IA, une Machine à optimisé les Prompts. 
                    Développez le prompt Ultime :
                    ## Contexte : ${contexte}, 
                    ## Rôle : ${role}, 
                    ## Compétences : ${competences}, 
                    ## Tâches : ${taches}, 
                    ## Fonctions : ${fonctions}, 
                    ## Routine : ${routine}, 
                    ## Processus : ${processus}, 
                    ## Caractéristiques : ${caracteristiques}, 
                    ## Actions Immédiates : ${actionsImmediates}, 
                    ## Résultat attendu : ${resultatAttendu}`
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.8,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Erreur lors de la génération du prompt :", error);
  }
}

// Fonction pour initialiser les sessions de brainstorming et ajouter les détails à `workplan`
async function initBrainstormingSession(sessionNumber, contexte, role, competences, taches, fonctions, routine, processus, caracteristiques, actionsImmediates, resultatAttendu) {
  const prompt = await generatePrompt(contexte, role, competences, taches, fonctions, routine, processus, caracteristiques, actionsImmediates, resultatAttendu);

  // Simule un horodatage de début et de fin de session
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Décalage d'une heure

  console.log(`Session ${sessionNumber}`);
  console.log(`Début : ${startTime.toLocaleTimeString()}`);
  console.log(`Fin : ${endTime.toLocaleTimeString()}`);
  console.log("Prompt généré : ", prompt);

  // Ajout des détails de la session au plan de travail
  workplan.push({
    session: sessionNumber,
    contexte: contexte,
    role: role,
    competences: competences,
    taches: taches,
    fonctions: fonctions,
    routine: routine,
    processus: processus,
    caracteristiques: caracteristiques,
    actionsImmediates: actionsImmediates,
    resultatAttendu: resultatAttendu,
    promptGeneré: prompt,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString()
  });
}

// Simule les sessions de brainstorming avec prompts générés par l'IA et génère `workplan.json`
async function runBrainstormingSessions() {
  await initBrainstormingSession(1, "Développement d'une IA", "Optimisation", "Analyse des prompts", "Génération de prompts", "Amélioration continue", "Génération automatique", "Paramètres dynamiques", "Actions optimisées", "Prompts efficaces");
  await initBrainstormingSession(2, "Amélioration produit", "Analyse", "Recherche", "Propositions d'idées", "Création de prototype", "Test et itération", "Amélioration du processus", "Prise de décision", "Résultats mesurables");
  await initBrainstormingSession(3, "Stratégie Marketing", "Création de contenu", "Gestion des campagnes", "Identification des KPIs", "Planification", "Publication", "Automatisation", "Engagement client", "Réaction rapide", "Contenu viral");
  await initBrainstormingSession(4, "Gestion d'équipe", "Coordination", "Définition des tâches", "Suivi des performances", "Réunions régulières", "Surveillance", "Motivation des équipes", "Amélioration de la productivité", "Résolution des conflits", "Efficacité accrue");
  await initBrainstormingSession(5, "Développement d'un produit", "Conception", "Tests utilisateurs", "Feedback", "Prototypage", "Planification", "Mise à jour", "Tests fonctionnels", "Validation", "Livraison", "Satisfaction utilisateur");

  // Sauvegarde du workplan dans un fichier JSON
  fs.writeFileSync("workplan.json", JSON.stringify(workplan, null, 2));
  
  console.log("Le fichier workplan.json a été généré avec succès !");
}

runBrainstormingSessions();
