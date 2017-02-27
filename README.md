TchatBox
==============

##Presentation
C'est un tchat sous symfony donc l'utilisateur doit saisir l'email  
 et le mot de passe qu'il a inscrit dans sa base de donnée.

##Techno utilisé
    *HTML 5
    *CSS 3
    *PHP 7
    *MySql 5.7
    *Symfony 3.2
    *NetBeans IDE 8.2

#Procédure d'installation (NetBeans IDE 8.2)
    1. Projet Clique droit, composer, install dev.
    2. Allez dans le fichier parameters.yml et ajoute le nom et le mot de passe de votre base de donnée
    3. Faire un chmod -R 777 a la racine du projet.(sous linux)
    4. Mettre à la base de donnée (php bin/console doctrine:schema:update --force
    5. Inserer un utilisateur pour pouvoir s'identifier

A Symfony project created on February 21, 2017, 11:11 pm.
