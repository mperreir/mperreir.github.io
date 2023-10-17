---
marp: true
lang: fr
paginate: true
theme: marp
---

<!-- _paginate: skip -->
# Les templates {{Mustache}}

![center](images/moustache-gracias.png)

<!-- _footer: <span class='red'>*</span> M. PERREIRA DA SILVA -->

---

<!-- _paginate: skip -->
# [Version PDF des slides](pdf/mustache.pdf)

---

# Les templates

- Simplifier / remplacer la manipulation du DOM
  
  - Originellement fait coté serveur (ASP, PHP, etc.)

  - Maintenant aussi coté client. Ex : [{{Mustache}}](https://github.com/janl/mustache.js)

- Principe de {{Mustache}} : insérer des données en remplacement de tags
  
  * Variables `{{maVariable}}`

    - est remplacé par le contenu de la variable `maVariable`

  * Sections `{{#nomSection}}`...`{{/nomSection}}`

    - est répété autant de fois qu'il y a d'élements dans  `nomSection`

---

# Templates : exemple simple

<div class='pure-g'>
<div class='pure-u-1-2'>

Données JSON

```JSON
{
    "people": [
        {
          "name": {
            "first": "Michael",
            "last": "Jackson"
          },
          "age": "RIP"
        },
        {
        "name": {
            "first": "Toto",
            "last": "Le héro"
          },
          "age": "12 ans"
        }
    ]
}
```

</div>
<div class='pure-u-1-2'>

Template {{Mustache}}

```Markdown
Personnes :
{{#people}}
* {{name.first}}, {{name.last}}
-> {{age}}
{{/people}}
```

Résultat

```Markdown
Personnes :
* Michael, Jackson
-> RIP
* Toto, Le héro
-> 12 ans
```

</div>
</div>

---

# Templates : exemple HTML + JS

HTML

```HTML
<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Chargement de mustache -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.1.0/mustache.js"defer></script>
   <!-- et de notre scipt principal -->
   <script src="js/main.js" defer></script>
</head>
<body>
    <section id="main"></section>
    <script id="main-template" type="x-tmpl-mustache">
        <ul>
        {{#people}}
            <li> 
                <p>{{name.first}}, {{name.last}}</p>
                <p>{{age}}</p>
            </li>
        {{/people}}
        </ul>    
    </script>
</body>
</html>
```

---

# Templates : exemple HTML + JS

Javascript

```javascript
'use strict';
// on définit nos données (normalement chargées depuis un serveur)
let people = {
    "name": {
        "first": "Michael",
        "last": "Jackson"
      },
      "age": "RIP"
    },
    {
    "name": {
        "first": "Toto",
        "last": "Le héro"
      },
      "age": "12 ans"
    };

// rendu du template
const template = document.querySelector('#main-template').innerHTML;
let rendered = Mustache.render(template, people);
const main = document.querySelector('#main');
main.innerHTML = rendered;
```