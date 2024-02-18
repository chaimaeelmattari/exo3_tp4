import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        });
        //etape 3 créer nouvel utilisateur
    } else {
        const newUser = {
            email,
            password: hashedPassword,
            //role aléatoire
            role: [Math.floor(Math.random() * roles.length)],
        };
        users.push(newUser);
        res.status(200).send({
            message: "Utilisateur enregistré avec succès",
            user: newUser
        });
    }
}

export const loginUser = async function (req, res) {
//étape 4
    const { email, password } = req.body;
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex");

    // Recherche de l'utilisateur
    const user = users.find((u) => u.email === email && u.password === hashedPassword);

    if (user) {
        // Création du jeton
        const tokenPayload = {
            email: user.email,
            role: user.role,
        };

        // Signature du jeton
        const token = await sign(tokenPayload);

        // Renvoi du jeton dans la réponse
        res.status(200).send({
            message: "Connexion réussie",
            token,
        });
    } else {
        // Utilisateur non trouvé
        res.status(401).send({
            message: "Utilisateur non-identifié",
        });
    }
}