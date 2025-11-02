document.addEventListener("DOMContentLoaded", () => {

    const outputArea = document.getElementById("ai-output");

    // 1. AI Recipe Generator
    const generateForm = document.getElementById("generate-form");
    if(generateForm){
        generateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const ingredients = document.getElementById("ingredients").value;
            const difficulty = document.getElementById("difficulty").value;

            setLoadingState();

            // Fake AI call (demo purpose only)
            setTimeout( () => {
                const fakeRecipe = {
                    title: "Fudgy Chocolate Brownies",
                    description: `A delicious way to use those ingredients with a ${difficulty} difficulty!`,
                    ingredientList: ["..."],
                    instructions: ["..."]
                };
                displayRecipe(fakeRecipe);
            }, 1500);
        });
    }

    // 2. AI Recipe Converter
    const convertForm = document.getElementById("convert-form");
    if(convertForm) {
        convertForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const originalRecipe = document.getElementById("original-recipe").value;
            const modification = document.getElementById("modification").value;

            setLoadingState();

            setTimeout(() => {
                const fakeModifiedRecipe = {
                    title: `Vegan-Friendly Chocolate Brownies (Converted)`,
                    summaryOfChanges: "I replaced the toned milk with almond milk.",
                    ingredientList: ["..."],
                    instructions: ["..."]
                };
                displayRecipe(fakeModifiedRecipe, true);
            }, 1500);
        });
    }

    // 3. AI Taste Fusion
    const fusionForm = document.getElementById("fusion-form");
    if(fusionForm) {
        fusionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const recipeA = document.getElementById("recipe-a").value;
            const recipeB = document.getElementById("recipe-b").value;

            setLoadingState();

            setTimeout(() => {
                const fakeFusionRecipe = {
                    title: `Brownie-Cheesecake Swirl Bars`,
                    description: `The ultimate fusion of rich, fudgy ${recipeA} and creamy ${recipeB} filling.`,
                    ingredientList: ["..."],
                    instructions: ["..."]
                };
                displayRecipe(fakeFusionRecipe);
            }, 1500);
        });
    }

    // 4. AI Blogging Assistant
    const assistantForm = document.getElementById("assistant-form");
    if(assistantForm) {
        assistantForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const blogDraft = document.getElementById("blog-draft").value;
            const helpType = document.getElementById("help-type").value;

            setLoadingState();

            setTimeout(() => {
                let fakeAssistance = "";
                if(helpType === "Title") {
                    fakeAssistance = `<h3>Suggested Titles:</h3>...`;
                } else if(helpType === "Intro") {
                    fakeAssistance = '<h3>Suggested Intro:</h3>...';
                } else {
                    fakeAssistance = `<h3>Suggested Tags:</h3>...`;
                }
                displayText(fakeAssistance);
            }, 1000);
        });
    }

    function setLoadingState() {
        if(outputArea) {
            outputArea.innerHTML = "Generating with AI ... 🍰";
            outputArea.classList.add("loading");
        }
    }

    function displayRecipe(recipe, isModified = false) {
        if(outputArea) {
            outputArea.classList.remove("loading");

            let html = `<h2>${recipe.title}</h2>`;

            if(recipe.description) {
                html += `<p><em>${recipe.description}</em></p>`;
            }

            if(isModified && recipe.summaryOfChanges) {
                html += `<h3>Summary of Changes:</h3><p>${recipe.summaryOfChanges}</p>`;
            }

            html += `<h3>Ingredients:</h3><ul><li>...</li></ul>`;
            html += `<h3>Instructions:</h3><ol><li>...</li></ol>`;

            outputArea.innerHTML = html;
        }
    }

    function displayText(html) {
        if(outputArea) {
            outputArea.classList.remove("loading");
            outputArea.innerHTML = html;
        }
    }

});