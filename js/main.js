function createElemWithText(elementName = "p", textContent = "", clsName){
    var element = document.createElement(elementName);
    element.textContent = textContent;
    if (clsName != undefined) element.className = clsName;
    return element;
}

function createSelectOptions(users){
    if (users == undefined) return undefined; 
    let options = [];
    for (let user of users){
        let element = document.createElement("option");
        element.value = user.id;
        element.textContent = user.name;
        options.push(element);
    }
    return options;
}

function toggleCommentSection(postId){
    if (postId == undefined) return undefined;
    let element = document.querySelector("section[data-post-id='" + postId + "']");
    if (element == undefined) return null;
    element.classList.toggle("hide");
    return element;
}

function toggleCommentButton(postId){
    if (postId == undefined) return undefined;
    let element = document.querySelector("button[data-post-id='" + postId + "']");
    if (element == undefined) return null;
    element.textContent == "Show Comments" ? element.textContent = "Hide Comments" : element.textContent = "Show Comments"
    return element;
}

function deleteChildElements(parentElement){
    if (!parentElement || !parentElement?.tagName) return undefined;
    let child = parentElement.lastElementChild;
    while (child != undefined){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}

function toggleComments(event, postId){
    if (event == undefined || postId == undefined) return undefined;
    event.target.listener = true;
    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
}

function addButtonListeners(){
    let main = document.querySelector("main");
    let buttons = main.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++){
        const postId = buttons[i].dataset.postId;
        buttons[i].addEventListener("click", function(e){toggleComments(e, postId)});
    }
    return buttons;
}

function removeButtonListeners(){
    let main = document.querySelector("main");
    let buttons = main.querySelectorAll("button");
    for (let button of buttons){
        let postId = button.dataset.id;
        button.removeEventListener("click", function(e){toggleComments(e, postId)});
    }
    return buttons;
}

function createComments(comments){
    if (comments == undefined) return undefined;
    let fragment = document.createDocumentFragment();
    for (let comment of comments){
        let article = document.createElement("article");
        article.append(createElemWithText("h3", comment.name));
        article.append(createElemWithText("p", comment.body));
        article.append(createElemWithText('p', `From: ${comment.email}`));
        fragment.append(article);
    }
    return fragment;
}

function populateSelectMenu(users){
    if (users == undefined) return undefined;
    let selectMenu = document.querySelector("#selectMenu");
    let options = createSelectOptions(users);
    for (let option of options) selectMenu.append(option);
    return selectMenu;
}

async function getUsers(){
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to get users! ");
        return await res.json();
    }catch(e){ console.error("Error: " + e); }
}

async function getUserPosts(userId){
    if (userId == undefined) return undefined;
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");       
        if (!res.ok) throw new Error("Failed to get posts! ");
        let posts = await res.json(), retData = [];
        for (let i = 0; i < posts.length; i++){
            if (posts[i].userId == userId) 
                retData.push(posts[i]); 
        }
        return retData;
    }catch(e){console.error("Error: " + e);}
}

async function getUser(userId){
    if (userId == undefined) return undefined;
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/users");       
        if (!res.ok) throw new Error("Failed to get users! ");
        let users = await res.json();
        for (let i = 0; i < users.length; i++){
            if (users[i].id == userId) 
            return users[i]; 
        }
    }catch(e){console.error("Error: " + e);}
}

async function getPostComments(postId){
    if (postId == undefined) return undefined;
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/comments");       
        if (!res.ok) throw new Error("Failed to get comments! ");
        let comments = await res.json(), retData = [];
        for (let i = 0; i < comments.length; i++){
            if (comments[i].postId == postId)
                retData.push(comments[i]);
        }
        return retData;
    }catch(e){console.error("Error: " + e);}
}

async function displayComments(postId){
    if (postId == undefined) return undefined;
    let section = document.createElement("section");
    section.setAttribute("data-post-id", postId);
    section.classList.add("comments", "hide");
    let comments = await getPostComments(postId);
    let fragment = createComments(comments);
    section.append(fragment);
    return section;
}

async function createPosts(posts){
    if (posts == undefined) return undefined;
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < posts.length; i++){
        let article = document.createElement("article"), data = [];
        let author = await getUser(posts[i].userId);

        data.push(createElemWithText("h2", posts[i].title));
        data.push(createElemWithText("p", posts[i].body));
        data.push(createElemWithText("p", `Post ID: ${posts[i].id}`));
        data.push(createElemWithText("p", `Author: ${author.name} with ${author.company.name}`));
        data.push(createElemWithText("p", author.company.catchPhrase));

        let button = createElemWithText("button", "Show Comments");
        button.setAttribute("data-post-id", posts[i].id);
        data.push(button);

        data.push(await displayComments(posts[i].id));
        data.forEach(element=>{article.append(element);});

        fragment.append(article);
    }
    return fragment;
}

async function displayPosts(posts){
    let main = document.querySelector("main");
    let element;
    if (posts == undefined){
        element = createElemWithText("p", "Select an Employee to display their posts.");
        element.classList.add("default-text");
    } else{ element = await createPosts(posts); }
    main.append(element);
    return element;
}

async function refreshPosts(posts){
    if (posts == undefined) return undefined;
    let main = document.querySelector("main");
    let re = removeButtonListeners();
    main = deleteChildElements(main);
    let frag = await displayPosts(posts);
    let add = addButtonListeners();
    return [re, main, frag, add];
}

async function selectMenuChangeEventHandler(){
    let id = event?.target?.value || 1;
    let get = await getUserPosts(id);
    let refresh = await refreshPosts(get);
    return[id, get, refresh];
}

async function initPage(){
    let users = await getUsers();
    let populate =  populateSelectMenu(users)
    return [users, populate];
}

async function initApp(){
    initPage();
    let menu = document.querySelector("#selectMenu")
    menu.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);