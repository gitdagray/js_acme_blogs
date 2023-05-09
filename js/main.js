// 1. createElemWithText
// input:   elem:                   HTML element string name to be created
//          textContent:            textContent of the element to be created
//          className(optional):    the className if one is to be applied
// output: Returns the created element
function createElemWithText(elem = "p", textContent = "", className) {
    // instantiate the element using the elem parameter
    var element = document.createElement(elem);
    
    // Set the textContent
    element.textContent = textContent;

    // If className is defined set the className
    if (className) {
        element.className = className;
    }

    // return the created element
    return element;
}

// 2. createSelectOptions
// input:   data:           user JSON data
// output:  Returns undefined if no parameter received,
//          otherwise it returns an array of elements with user.id = option.value 
//          and user.name = option.textContent
function createSelectOptions(data) {
    if (!data) return;
    
    const options = data.map(user => {
        // Instantiate option element
        const option = document.createElement("option");

        // assign user.id to option.value
        option.value = user.id;

        // assign user.name to option.textContent
        option.textContent = user.name;

        // return option, which adds it to options array
        return option;
    });

    // return options
    return options;
}

// 3. toggleCommentSection
// input:   postId of the section to be toggled
// output:  returns the section element that was toggled
function toggleCommentSection(postId) {
    if (!postId) return;
    
    // get the section
    const section = document.querySelector(`section[data-post-id="${postId}"]`);

    // if section exists, set it to hide
    if (section) {
        section.classList.toggle("hide");
    }

    return section;
}

// 4. toggleCommentButton
// input:   postId of the button to be toggled
// output:  returns the button element that was toggled
function toggleCommentButton(postId) {
    if (!postId) return;
    
    // get the button
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    
    if (button) {
        // use a ternary operator to assign button.textContent whichever value it is not
        button.textContent = button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";
    }

    // return button
    return button;
}

// 5. deleteChildElements
// input:   parentElement of the child elements to delete
// output:  parentElement of the deleted child elements
function deleteChildElements(parentElement) {
    if (!parentElement || parentElement instanceof HTMLElement === false) return;

    // get the first childElement
    let childElement = parentElement.lastElementChild;

    // while loop removing current childElement from parentElement
    while(childElement) {
        parentElement.removeChild(childElement);
        childElement = parentElement.lastElementChild;
    }

    // return parentElement
    return parentElement;
}

// empty toggleComments function
function toggleComments(event, postId) {
    // empty
}

// 6. addButtonListeners
// input:   none
// output:  returns the button elements which were selected
function addButtonListeners() {
    // get the main element
    const main = document.querySelector('main');
    
    // select all buttons nested inside the main element
    const buttons = main.querySelectorAll('button');

    // conditional for if there are buttons
    if (buttons.length > 0) {
        // for each button
        buttons.forEach(button => {
            // Get the postId
            const postId = button.dataset.postId;

            // add the click event listener to the current button
            button.addEventListener("click", (event) => {
                // call the toggleComments function
                toggleComments(event, postId);
            });
        });
    }

    // return the array buttons of button elements
    return buttons;
}

// 7. removeButtonListeners
// input:   none
// output:  returns the button elements which were selected
function removeButtonListeners() {
    // get the main element
    const main = document.querySelector('main');
    
    // select all buttons nested inside the main element
    const buttons = main.querySelectorAll('button');

    // conditional for if there are buttons
    if (buttons.length > 0) {
        // for each button
        buttons.forEach(button => {
            // Get the postId
            const postId = button.dataset.postId;

            // add the click event listener to the current button
            button.removeEventListener("click", (event) => {
                // call the toggleComments function
                toggleComments(event, postId);
            });
        });
    }

    // return the array buttons of button elements
    return buttons;
}

// 8. createComments
// input:   JSON comments data
// output:  returns the fragment element
function createComments(commentsData) {
    if (!commentsData) return;
    
    // create fragment element
    const fragment = document.createDocumentFragment();

    // loop through the comments
    commentsData.forEach(comment => {
        // article element
        const article = document.createElement("article");

        // h3 element
        const h3 = createElemWithText("h3", comment.name);

        // paragraph element
        const para = createElemWithText("p", comment.body);

        // email
        const email = createElemWithText("p", `From: ${comment.email}`);

        // append h3 para and email to article
        article.appendChild(h3);
        article.appendChild(para);
        article.appendChild(email);

        // append article to fragment
        fragment.appendChild(article);
    });

    // return fragment
    return fragment;
}

// 9. populateSelectMenu
// input:   JSON users data
// output:  returns the selectMenu element
function populateSelectMenu(usersData) {
    if (!usersData) return;
    
    // select the #selectMenu element
    const selectMenu = document.getElementById("selectMenu");

    // pass usersData to createSelectOptions
    const options = createSelectOptions(usersData);

    // Loop through options and append each to the select menu
    options.forEach(option => {
        selectMenu.appendChild(option);
    });

    // return selectMenu
    return selectMenu;
}

// 10. getUsers
// input: none
// output: users JSON data
async function getUsers() {
    try {
        // fetch users data from URL
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // await response
        return await response.json();
    } catch (error) {
        // Log error
        console.error("Received following error when fetching users data:", error);
    }
}

// 11. getUserPosts
// input: userId of the user whose posts we are fetching
// output: user's posts as JSON data
async function getUserPosts(userId) {
    if (!userId) return;
    
    try {
        // fetch users data from URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        
        // await response
        return await response.json();
    } catch (error) {
        // Log error
        console.error("Received following error when fetching user posts data:", error);
    }
}

// 12. getUser
// input: userId of the user whose data we are fetching
// output: user's posts as JSON data
async function getUser(userId) {
    if (!userId) return;

    try {
        // fetch users data from URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        // await response
        return await response.json();
    } catch (error) {
        // Log error
        console.error("Received error when fetching user data:", error);
    }
}

// 13. getPostComments
// input: postId of the user whose data we are fetching
// output: post comments as JSON data
async function getPostComments(postId) {
    if (!postId) return;
    
    try {
        // fetch users data from URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        
        // await response
        return await response.json();
    } catch (error) {
        // Log error
        console.error("Received error when fetching post data:", error);
    }
}

// 14. displayComments
// input:   postId of the post
// output:  returns the section element of the post
async function displayComments(postId) {
    if (!postId) return;
    
    // create section element
    const section = document.createElement("section");

    // set attribute on section
    section.dataset.postId = postId;

    // add 'comments' and 'hide classes to section
    section.classList.add("comments", "hide");

    try {
        // create the comments variable for the getPostComments return
        const comments = await getPostComments(postId);

        // variable for the comments fragment
        const fragment = createComments(comments);

        // append fragment to section
        section.appendChild(fragment);
    } catch (error) {
        // log the error
        console.error("Received error when fetching and displaying comments:", error);
    }

    // return section
    return section;
}

// 15. createPosts
// input:   posts JSON data
// output:  returns the fragment element of the posts
async function createPosts(postsData) {
    if (!postsData) return;
    // return undefined if postsData is not a JSON object
    //if(typeof postsData !== 'object' ||
    //postsData === null ||
    //Array.isArray(postsData)) return;

    // create fragment
    const fragment = document.createDocumentFragment();

    // loop through postsData, creating the necessary elements
    for (const post of postsData) {
        // article element
        const article = document.createElement("article");
        
        // h2 element
        const h2 = createElemWithText("h2", post.title);
        
        // post body
        const postBody = createElemWithText("p", post.body);
        
        // post id
        const postId = createElemWithText("p", `Post ID: ${post.id}`);
        
        // author
        const author = await getUser(post.userId);
        
        // author text
        const authorText = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        
        // catch phrase
        const catchPhrase = createElemWithText("p", author.company.catchPhrase);

        // show comments button
        const button = createElemWithText("button", "Show Comments");

        // set button attribute for postId
        button.dataset.postId = post.id;

        // append all of the above elements to the article
        article.appendChild(h2);
        article.appendChild(postBody);
        article.appendChild(postId);
        article.appendChild(authorText);
        article.appendChild(catchPhrase);
        article.appendChild(button);

        // instantiate section
        const section = await displayComments(post.id);

        // append section to article
        article.appendChild(section);

        // append article to fragment
        fragment.appendChild(article);
    }

    // return fragment
    return fragment;
}

// 16. displayPosts
// input:   postsData to be displayed
// output:  return the element for the post that is displayed
async function displayPosts(postsData) {
    // get main element
    const main = document.querySelector('main');

    // Use ternary operator to define element
    const element = postsData ? await createPosts(postsData) : document.querySelector('.default-text');

    // append element to main
    main.appendChild(element);

    // return element
    return element;
}

// 17. toggleComments
// input:   event fro the click event listener
//          postId that we want comments toggled on
// output:  array of section element from toggleCommentSection and button from toggleCommentButton
function toggleComments(event, postId) {
    if (!postId) return;
    
    // set event.target.listener to true per function description
    event.target.listener = true;

    // Pass postId to toggleCommentSection
    const commentSection = toggleCommentSection(postId);

    // pass postId to toggleCommentButton
    const commentButton = toggleCommentButton(postId);

    // return array
    return [commentSection, commentButton];
}

// 18. refreshPosts
// input:   postsData as JSON data
// output:  Returns array of results from removeButtons, main, fragment, and addButtons
async function refreshPosts(postsData) {
    if (!postsData) return;
    
    // call removeButtonListeners
    const removeButtons = removeButtonListeners();

    // call deleteChildElements for main
    const main = deleteChildElements('main');

    // call displayPosts with postsData
    const fragment = await displayPosts(postsData);

    // call addButtonListeners
    const addButtons = addButtonListeners(fragment);

    // return array
    return [removeButtons, main, fragment, addButtons];
}

// 19. selectMenuChangeEventHandler
// input:   event
// output:  returns array of userId, posts, and array returned from refreshPosts
async function selectMenuChangeEventHandler(event) {
    if (!event) return;
    
    // disable select menu
    event.target.disabled = true
    
    // select the #selectMenu element
    //const selectMenu = document.getElementById("selectMenu");
    
    // disable select menu
    //selectMenu.target.disabled = true

    // define userId
    const userId = event.target.value || 1;

    // pass userId to getUserPosts
    const posts = await getUserPosts(userId);

    // pass refreshPostsArray to refreshPosts
    const refreshPostsArray = await refreshPosts(posts);

    // enable select menu
    event.target.disabled = false;

    // return array
    return [userId, posts, refreshPostsArray];
}

// 20. initPage
// input:   none
// output:  returns an array of usersData from getUsers and element from populateSelectMenu
async function initPage() {
    // call await getUsers
    const usersData = await getUsers();

    // pass usersData to populateSelectMenu
    const selectElem = populateSelectMenu(usersData);

    // return usersData and selectElem in array
    return [usersData, selectElem];
}

// 21. initApp
// input:   none
// output:  none
async function initApp() {
    // call initPage
    await initPage();

    // select the #selectMenu element
    const selectMenu = document.getElementById("selectMenu");

    // add event listener to selectMenu
    selectMenu.addEventListener('change', selectMenuChangeEventHandler);
}

// last steps to get app to function correctly
document.addEventListener("DOMContentLoaded", initApp);