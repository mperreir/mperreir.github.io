---
marp: true
lang: fr
paginate: true
theme: marp
---

<!-- _paginate: skip -->
# Technologies web et XML

<!-- _footer: <span class='red'>*</span> par R. LEHN, N. NORMAND et M. PERREIRA DA SILVA -->

---
<!-- _paginate: skip -->
# [Version PDF des slides](pdf/intro.pdf)

---

# Organisation des enseignements

## Les cours

- 3 **intervenants** pour les FISE, 2 pour les FISA
  - Remi Lehn : Outils et XML (FISE seulement) 
  - Nicolas Normand : Javascript
  - Matthieu Perreira Da Silva : ...

- 4 **cours** par intervenant (+1 de XML)
  - 4 **TPs** (HTML/CSS, JS pure, programmation client, programmation serveur)

- 1 **projet** IHM - CSI - web (FISE)

---

# Organisation des enseignements

## Mes cours

1. **Introduction**
   + Historique, définitions et vue globale des technos web

2. **Technologies front-end** : affichage
   + HTML5 
   + CSS + Media queries
   + responsive web design et accessibilité

3. **Protocoles web**
   + HTTP(S), MIME, Cookies, WebSocket

---

# Organisation des enseignements

## Mes cours (suite)

4. **Programmation coté serveur**
   + Rôle d'un serveur, CGI, PHP, **Nodejs**, etc.

5. **Services web et protocoles associés**
   + Architectures par composants, SOAP, REST

---

# Introduction

---

# Le web?

- <span class='red'>Web &ne; Internet</span>
  - l'Internet = interconnexion de dizaines de milliers de réseaux autonomes
    - Différents protocoles de communication : IP, TCP, DNS, FTP, HTTP, Telnet, etc.
  - le Web = un système hypertexte public fonctionnant sur l'Internet
    - Deux protocoles principaux : HTTP et WebSocket
    - Et d'autres : Ethernet, IP, TCP, UDP, FTP, etc.

- Permet de mettre des <span class='green'>ressources</span> à disposition des utilisateurs
  - Texte
  - Images
  - Vidéos
  - etc.

---

# Quelques dates

- **1967** : Début du programme ARPANET au ministère de la défense des Etat-Unis
- **1979** : Création du réseau civil USENET (newsgroup)
- **1984** : Scission d'ARPANET entre MILNET  (militaire) et INTERNET
- **1989** : Invention du Web (système hypertexte) au CERN par Tim Berners-Lee
- **1991** : Apparition des fournisseurs d'accès commerciaux
- **1993** : Premier navigateur graphique (NCSA Mosaic)

---

# Le web : un écosystème standardisé

## Le W3C

![bg w:80% right:25%](images/W3C_Icon.svg "Source: http://www.w3.org/Consortium/Legal/logo-usage-20000308")

- World Wide Web consortium (http://www.w3.org/)
  - Fondé en 1994
  - Président : Tim Berners-Lee (ancien du CERN)
  - 384 membres (dont Microsoft, Mozilla, Apple, Opera, Google, etc.)

- Objectif : créer et promouvoir les standards du web

- Standard W3C = Recommandation
  - Différentes étapes avant recommandation finale (draft, candidate, proposed, etc.)

---

# Le web : un écosystème standardisé

## Le W3C

![bg w:80% right:25%](images/W3C_Icon.svg "Source: http://www.w3.org/Consortium/Legal/logo-usage-20000308")

- Nombreuses technologies standardisées
  - DOM, (X)HTML, PNG, XML (XPath, XQuery, etc.), SVG, SOAP,  WSDL, etc.
- Documents de normalisation en ligne
  - Ex HTML 5: http://www.w3.org/TR/html5/
  - Ex CSS 2.1: http://www.w3.org/TR/CSS2/
- Outils de validation (gratuits)
  - HTML: http://validator.w3.org/
  - CSS: http://jigsaw.w3.org/css-validator/
  - Mobile-friendly:  http://validator.w3.org/mobile/

<!-- _footer: <span class='red'>*</span> Aller regarder un standard -->

---

# Le web : un écosystème standardisé

## Le WaSP

![bg w:70% right:25%](images/WSaP_logo.png "Source: http://en.wikipedia.org/wiki/Web_Standards_Project")

- Web Standards Project (http://www.webstandards.org/)
  - Fondé en 1998

- Objectif : respect des standards par les navigateurs

- Les outils du WaSP
  - ACID test (actuellement ACID3)
    - http://www.acidtests.org/
  - Évalue : HTML, DOM, CSS, SVG, ECMAScript (JavaScript)

---

# Le web : un écosystème standardisé

## L'IETF et les RFC

![bg w:70% right:25%](images/ietflogotrans.gif "Source: https://www.ietf.org/")

- Internet Engineering Task Force
  - Groupe informel
  - Création de la plupart de RFC (Request For Comment)

- Certaines RFC sont des standards (liste dans [RFC 5000](https://www.ietf.org/rfc/rfc5000.txt))
  - UTF-8: [RFC 3629](https://www.ietf.org/rfc/rfc3629.txt)
  - MIME: [RFC 2045](https://www.ietf.org/rfc/rfc2045.txt)
  - HTTP: [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt)
  - etc.

---

![bg fit](images/Moz_ffx_openStandards_1280x1024.jpg "Source: https://developer.mozilla.org/en-US/docs/MDN/Promote")

---

# Terminologie et définitions

- **Hôte** : Ordinateur relié au réseau

- **Client** : Ordinateur envoyant des requêtes auxquelles un autre ordinateur va répondre

- **Serveur** : Ordinateur qui écoute et traite les requêtes du client

- **Navigateur** : programme informatique permettant de consulter des ressources sur le Web

- **Ressource** : "Objet" qui peut être localisé et atteint à travers le réseau

- **Nom de domaine** : Identifie un ensemble d'ordinateurs reliés à Internet et possédant une caractéristique commune

- **Hypertexte** : Système contenant des nœuds reliées entre eux par des liens

- **Hyperlien** : Lien qui relie deux nœuds entre eux

---

# Terminologie et définitions  (suite)

- **HTTP** (Hypertext Transfer Protocol) : Protocole de communication client-serveur principalement utilisé sur le web

- **XML** (eXtensible Markup Language) : Langage de balisage générique.

- **HTML** (Hypertext Markup Language) : Langage de balisage conçu pour représenter des pages web. Permet de définir de l'Hypertexte

- **CSS** (Cascading Style Sheets) : Langage de description permettant de mettre en forme les documents HTML et CSS

- **SVG** (Scalable Vector Graphics): Format de données basé sur XML, permettant de décrire des images vectorielles

- **PNG** (Portable Network Graphics) : Format d'images matricielles permettant une compression sans pertes

---

# URI, URL et URN

- **URI** (Uniform Resource Identifier) : Identifie une ressource (physique ou abstraite) sur un réseau ([RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)

- **Schéma** : Type de ressource identifiée par l'URI (ex: http, ftp, mailto, about). Ne référence pas forcement un protocole

- **URL** (Uniform Resource Locator) : Est une URI, mais fournit en plus un moyen d'agir sur la ressource ou d'en obtenir une représentation. Décrit également le mode d'accès à cette ressource
  - Ex1: http://web.polytech.univ-nantes.fr/
  - Ex2: mailto:matthieu.perreiradasilva@univ-nantes.fr

- **URN** (Uniform Resource Name) : Est une URI qui identifie une ressource par son nom dans un espace de nom
  - Ex:  isbn:978-2-7540-3849-2

---

# URL et protocole HTTP

- **Absolue** : `schéma://utilisateur:motdepasse@domaine:port/chemin?requête#fragment`
  - Ex: `http://joe:bar@www.univ-nantes.fr:80/polytech/dpts/info?enseignant=perreiradasilva-m&cours=technos-web#slide4`

- **Relative** : `chemin?requête#fragment`
  - Ex1: `ici`
  - Ex2: `/ici`
  - Ex3: `./ici?query=something`
  - Ex4: `../la/fichier.html`

---

# Programmer pour le web ?

![bg right:50%](images/web-languages.jpg  "Source: http://wikisocial.org/wp-content/uploads/2013/07/web-languages.jpg")

---

# Site statique

- Pages HTML (+CSS) créées à l'avance

- Le serveur web ne fait qu'envoyer le contenu des fichiers

- Pas de possibilité d'adaptation aux requêtes du client

- Le web des années 90...

<br>

![center h:6em](images/static_website.png "Source: MPDS")

---

# Site dynamique

- Pages HTML générées à la demande par le serveur

- Exécution de scripts sur le serveur (PHP, ASP, Python, etc.)

- Possibilité d'adapter le contenu à la requête envoyée par le client

- Interaction du serveur web avec une base de données

- Le web des années 2000+.

![center h:11em](images/dynamic_website.png "Source: MPDS")

---

# Deux façons de scripter

## Client ou serveur ?

- Historiquement : scripts exécutés sur le serveur (Server Side Scripting)
  - PHP, ASP, J(2)EE, etc.

- Plus récemment : DOM + évolutions de JavaScript
  - Nombreuses interactions coté client (Client Side Scripting)
  - Utilisation de requêtes pour récupérer des données (ex: AJAX)
    - Toujours besoin d'un serveur web pour les données / l'API
  - Applications internet riches (RIA)
    - Ex: Gmail

---

# Applications internet riches (RIA)

![center](images/diagramme_des_applications_nmedia_solutions.jpg "Source: http://www.nmediasolutions.com/publications/conseils/applications-internet-riches-rich-internet-application")

---

# RIA pour les nuls ?

## Applets et plugins (obsolète)

![bg w:80% right:50%](images/Introduction-to-JavaFX-Flex-and-Silverlight.jpg "Source: http://www.linkgard.com/blog/software-development/web-technologies/introduction-to-javafx-flex-and-silverlight.html")

- JavaFX (Oracle)
  + Basé sur Java

- Flex  (Adobe)
  - Basé sur Flash

- Silverlight   (Microsoft)
  - Basé sur le Framework .Net

---

# Applets et plugins (obsolète)

## <span class='green'>Avantages</span>

- Richesse graphique
  - Animations, etc.

- UX proche d'une application "Desktop"
  - Interface, réactivité, etc.
- Ajout de fonctionnalités non / mal supportées par les navigateurs
  - Ex: streaming vidéo

## <span class='red'>Inconvénients</span>

- Nécessité de télécharger un plugin
- Temps de téléchargement initial de l'application
- Risques de failles de sécurité accrus
- Accessibilité et référencement

---

# Les deux faces du développement web...

![bg right:51%](images/iceberg-front-end-back-end-developers.jpg "Source: http://www.alticreation.com/difference-developpeur-front-end-et-developpeur-back-end/")

- Frontend
  + (Très) proche du design
  + Integration / Interactions
  + HTML / CSS / Javascript

- Backend
  + Le "Vrai" développeur web...
  + Accès aux données
  + Code métier
  + PHP / MySQL, J2EE, NodeJS, Python

---

# Les technologies web c'est aussi...

## Les systèmes distribués

![bg left:45%](images/MESH-network-500x328.jpg "Source: http://adam.hypotheses.org/1263")

- Pas que des sites web...
  - Applications mobiles
  - Clients lourds
  - Services / API web
  - Cloud computing
  - Etc

- Technologies réutilisées
  - HTTP, XML, JSON, MIME, URI, etc.

---

# Cloud computing

## Dématérialisation de l'informatique

- Bonus, pour votre culture: 

  - [What is cloud computing](https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/)

![bg width:80% right:50%](images/Cloud_computing.svg "Source: https://en.wikipedia.org/wiki/Cloud_computing")

---

# Pour votre culture

- Faits marquants du web

  - [http://www.webdirections.org/history/](http://www.webdirections.org/history/)

  - [http://www.pewinternet.org/2014/03/11/world-wide-web-timeline/](http://www.pewinternet.org/2014/03/11/world-wide-web-timeline/)

- *Ex: (1996) Dancing baby : première vidéo virale*

![center](images/BabyOrigMed1.gif)

---

# This is (almost) the end...

## Next : HTML + CSS

![bg right:50%](images/422213306_e34827aaa6_o.jpg "Source: http://www.flickr.com/photos/daniello/422213306/")
