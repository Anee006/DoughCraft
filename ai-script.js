document.addEventListener("DOMContentLoaded", () => {
    
    const outputArea = document.getElementById("ai-output");

    // 1. AI Recipe Generator
    const generateForm = document.getElementById("generate-form");
    if(generateForm){
        generateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const ingredients = document.getElementById("ingredients").value;
            const difficulty = document.getElementById("difficulty").value;
            setLoadingState();

            try {
               
                const response = await fetch('/api/generate', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ingredients, difficulty }), 
                });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const recipe = await response.json(); 
                displayRecipe(recipe);
            } catch (error) {
                console.error(error);
                displayText(`<h3>Error</h3><p>${error.message}</p>`);
            }
        });
    }

    // 2. AI Recipe Converter
    const convertForm = document.getElementById("convert-form");
    if(convertForm) {
        convertForm.addEventListener("submit", async (e) => { 
            e.preventDefault();
            const originalRecipe = document.getElementById("original-recipe").value;
            const modification = document.getElementById("modification").value;
            setLoadingState();

            try {
               
                const response = await fetch('/api/convert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ originalRecipe, modification }),
                });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const recipe = await response.json();
                displayRecipe(recipe, true); 
            } catch (error) {
                console.error(error);
                displayText(`<h3>Error</h3><p>${error.message}</p>`);
            }
        });
    }

    // 3. AI Taste Fusion
    const fusionForm = document.getElementById("fusion-form");
    if(fusionForm) {
        fusionForm.addEventListener("submit", async (e) => { 
            e.preventDefault();
            const recipeA = document.getElementById("recipe-a").value;
            const recipeB = document.getElementById("recipe-b").value;
            setLoadingState();

            try {
               
                const response = await fetch('/api/fusion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ recipeA, recipeB }),
                });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const recipe = await response.json();
                displayRecipe(recipe);
            } catch (error) {
                console.error(error);
                displayText(`<h3>Error</h3><p>${error.message}</p>`);
            }
        });
    }

    // 4. AI Blogging Assistant
    const assistantForm = document.getElementById("assistant-form");
    if(assistantForm) {
        assistantForm.addEventListener("submit", async (e) => { 
            e.preventDefault();
            const blogDraft = document.getElementById("blog-draft").value;
            const helpType = document.getElementById("help-type").value;
            setLoadingState();

            try {
                
                const response = await fetch('/api/assistant', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blogDraft, helpType }),
                });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                
                
                if (data.html_suggestion) {
                    displayText(data.html_suggestion);
                } else {
                    throw new Error("AI returned an invalid format.");
                }
            } catch (error) {
                console.error(error);
                displayText(`<h3>Error</h3><p>${error.message}</p>`);
            }
        });
    }

    // --- HELPER FUNCTIONS ---

    function setLoadingState() {
        if(outputArea) {
            outputArea.innerHTML = "Generating with AI ... 🍰";
            outputArea.classList.add("loading");
        }
    }

    function displayRecipe(recipe, isModified = false) {
        if(outputArea) {
            outputArea.classList.remove("loading");
           
            if (!recipe || !recipe.title || !recipe.ingredientList || !recipe.instructions) {
                displayText(`<h3>Error</h3><p>The AI returned an invalid recipe format. Please try again.</p>`);
                return;
            }

            let html = `<h2>${recipe.title}</h2>`;

            if(recipe.description) {
                html += `<p><em>${recipe.description}</em></p>`;
            }
            if(isModified && recipe.summaryOfChanges) {
                html += `<h3>Summary of Changes:</h3><p>${recipe.summaryOfChanges}</p>`;
            }

            html += `<h3>Ingredients:</h3><ul>`;
            recipe.ingredientList.forEach(ing => {
                html += `<li>${ing}</li>`;
            });
            html += `</ul>`;

            html += `<h3>Instructions:</h3><ol>`;
            recipe.instructions.forEach(step => {
                html += `<li>${step}</li>`;
            });
            html += `</ol>`;

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