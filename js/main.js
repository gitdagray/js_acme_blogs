function createElemWithText (elemType ="p", textContent ="", className){
    const myElem=document.createElement(elemType);
    myElem.textContent= textContent;
    if(className) myElem.classList.add(className);
    return myElem;
}

function createSelectOptions (jsonData) {
    if (!jsonData) return;
    let user=[];
    jsonData.forEach(jsonData=>{
        const option= document.createElement('option');
        option.value=jsonData.id;
        option.textContent=jsonData.name;

        user.push(option);
    })
    
    return user;
}

function toggleCommentSection (postId){
 if (!postId) return;
const section = document.querySelector('section');
if(!section)return null;
section.classList.toggle('hide');
return section;

}

function toggleCommentButton (postId){
    if (!postId) return;
    const button= document.querySelector(`button[data-post-id='${postId}']`);
    if (!button) return null;

   button.textContent= (button.textContent==="Show Comments") ? "Hide Comments" : "Show Comments";


    return button;
    

}

function deleteChildElements(parentElement){

    if(!parentElement?.tagName) return;
    let element = parentElement.lastElementChild;

    while(element){
        parentElement.removeChild(element);
        element=parentElement.lastElementChild;
    }
 


    return parentElement;
}

function addButtonListeners (){
    const buttons = document.querySelector("main").querySelectorAll("button");
    if (!buttons) return;
    

    buttons.forEach(button=>{
        const postId=button.dataset.postId;
        button.addEventListener("click", function(e){toggleComments(e, postId)}, false);
    })

    return buttons;
}

function removeButtonListeners (){
    const buttons = document.querySelector("main").querySelectorAll("button");
    if (!buttons) return;


    buttons.forEach(button=>{
        const postId=button.dataset.postId;
        button.removeEventListener("click", function(e){toggleComments(e, postId)}, false);
           
    })
    return buttons;

}

function createComments (commentsData){
    if (!commentsData) return;

    const frag = document.createDocumentFragment();

    commentsData.forEach( comment=>{
        let article = document.createElement('article');
        const h3= createElemWithText('h3', comment.name);
        const p1=createElemWithText('p',comment.body);
        const p2 =createElemWithText('p',`From: ${comment.email}`);
       
        article.append(h3,p1,p2);
        frag.append(article);
        

    })
    
    return frag;
}

function populateSelectMenu (jsonUser){
    if (!jsonUser) return;
    const selectMenu = document.getElementById('selectMenu');
    const options = createSelectOptions(jsonUser);
    for (let i=0; i<options.length; i++){
        let option = document.createElement('option');
        option= options[i];
        selectMenu.append(option);
    }
    return selectMenu;
}

const getUsers = async () =>{
    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Status code not in 200-299 range");
    return await response.json();
}catch (err){
    console.error(err);
}
}

const getUserPosts = async (userId) =>{
    if (!userId)return;
    try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) throw new Error("Status code not in 200-299 range");
    return await response.json();
}catch (err){
    console.error(err);
}
}

const getUser = async (userId) =>{
    if(!userId)return;
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users/"+ userId);
        if (!response.ok) throw new Error("Status code not in 200-299 range");
        return await response.json(); 
    }catch(err){
        console.error(err);
    }
}

const getPostComments = async (postId) =>{
    if(!postId) return;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) throw new Error("Status code not in 200-299 range");
        return await response.json(); 
    }catch(err){
        console.error(err);
    }
}

const displayComments = async (postId) =>{
    if(!postId) return;
    const section = document.createElement('section');
    section.dataset.postId = postId;

    section.classList.add("comments", "hide");
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);


    return section;
}

const createPosts = async (posts)=>{

    const fragment= document.createDocumentFragment();
    if(!posts) return;
    
  
    for (const post of posts){
        let article= document.createElement('article');
       
        const h2 = createElemWithText('h2', post.title);
        const p1 = createElemWithText('p', post.body);
        const p4= createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const p2 = createElemWithText('p',`Author: ${author.name} with ${author.company.name}`);
        const p3 = createElemWithText('p', `${author.company.catchPhrase}`);
        const button = createElemWithText('button', 'Show Comments');
        button.dataset.postId= post.id;
        article.append(h2,p1,p4,p2,p3,button);
 
        const section = await displayComments(post.id);
        article.append(section);
    
        fragment.append(article);
    }
   

    return fragment;
}

const displayPosts = async (posts) =>{ 
     const main = document.querySelector('main');
    let element = (posts)? await createPosts(posts) : document.querySelector("main p");
     main.append(element);
     return element;
} 

const toggleComments = (event, postId) =>{
    if(!event || !postId) return;
    event.target.listener = true;
    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);

    return [section,button];

}

const refreshPosts = async (posts)=>{
    if (!posts) return;
    const main = document.querySelector('main');
    const buttons = removeButtonListeners();
    const myMain = deleteChildElements(main);
    const fragment = await displayPosts(posts);
    const button = addButtonListeners();

    return [buttons,myMain,fragment,button];

}

const selectMenuChangeEventHandler = async (event) =>{
    
    const userId= event?.target?.value||1;
    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);

    return [userId,posts,refreshPostsArray];
}

const initPage = async ()=>{
    const users = await getUsers();
    const select = populateSelectMenu(users);

    return [users,select];
}

const initApp = ()=>{
    initPage();
    const select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false)

}

document.addEventListener("DOMContentLoaded", initApp, false);
