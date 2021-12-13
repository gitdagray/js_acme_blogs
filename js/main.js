// first function
// no fails
function createElemWithText(
  paraElement = "p",
  textContent = "",
  textClassEl = ""
) {
  // creating the element
  const newElText = document.createElement(paraElement);
  // adding text content to the element
  newElText.textContent = textContent;
  // applying class name
  newElText.className = textClassEl;
  // return element
  return newElText;
} // end createElemWithText

// second function
// no fails
function createSelectOptions(users) {
  if (!users) {
    // return undefined if no user data
    return;
  }
  // loop through users with .map array
  const optionElems = users.map(user => {
    // create option element for each user
    const option = document.createElement("option");
    option.value = user.id; // assign user.id to option.value
    option.textContent = user.name; // assign user.name to options.textContent
    return option;
  });
  // return array of option elements
  return optionElems;
} // end createSelectOptions

// third function
// no fails
function toggleCommentSection(postId) {
  if (!postId) {
    // return undefined if no postId
    return;
  }
  // selects section with the data-post-id equal to the parameter
  let section = document.querySelector(`section[data-post-id="${postId}"]`);
  if (section) {
    // if section exists
    section.classList.toggle("hide"); // toggle hide
  }
  return section; // return section element
} // end toggleCommentSection

// fourth function
// no fails
function toggleCommentButton(postId) {
  if (!postId) {
    // return undefined if no postId
    return;
  }
  // selects button with the data-post-id equal to the parameter
  let button = document.querySelector(`button[data-post-id="${postId}"]`);
  if (button != null) {
    // if button exists
    // begin ternary statement
    button.textContent === "Show Comments"
      ? (button.textContent = "Hide Comments")
      : (button.textContent = "Show Comments");
    // if button is show comments then hide comments, etc
  }
  return button; // return button element
}

// fifth function
// no fails
function deleteChildElements(parentElement) {
  if (!parentElement?.tagName) {
    // if HTML element is not received, return undefined
    return;
  }
  let child = parentElement.lastElementChild; // define child element
  while (child) {
    // while child exist
    parentElement.removeChild(child); // remove child from loop
    child = parentElement.lastElementChild; // reassign child
  }
  return parentElement; // return parent
} // end deleteChildElements

// begin dependencies
// sixth function
// no fails
function addButtonListeners() {
  // select all buttons in main
  let mainElem = document.querySelector("main"); // get main
  let buttons = mainElem.querySelectorAll("button"); // get buttons
  if (buttons) {
    // if buttons exist loop
    for (let i = 0; i < buttons.length; i++) {
      // loop through buttons
      let button = buttons[i];
      let postId = button.dataset.postId; // get postId from buttons
      // addEventListener for click
      button.addEventListener("click", function(event) {
        toggleComments(event, postId), false;
      });
      // anonymous function calls event, postId as params
    }
    return buttons; // return button elements
  }
} // end addButtonListeners

// seventh function
// no fails
function removeButtonListeners() {
  // select all buttons in main
  let mainElem = document.querySelector("main"); // get main
  let buttons = mainElem.querySelectorAll("button"); // get buttons
  if (buttons) {
    // if buttons exist loop
    for (let i = 0; i < buttons.length; i++) {
      // loop through buttons
      let button = buttons[i];
      let postId = button.dataset.postId; // get postId from buttons
      // removeEventListener for click
      button.removeEventListener("click", function(event) {
        toggleComments(event, postId), false;
      });
      // anonymous function calls event, postId as params
    }
    return buttons; // return button elements
  }
} // end removeButtonListeners

// eighth function
// no fails
function createComments(comments) {
  if (!comments) {
    // return undefined if empty comments
    return;
  }
  // receives JSON comments data as a parameter
  // creating fragment using document.createDocumentFragment
  let frag = document.createDocumentFragment();
  // begin comment loop
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    let article = document.createElement("article"); // create article element
    let h3 = createElemWithText("h3", comment.name); // h3 element for comment name
    let p = createElemWithText("p", comment.body); // p comment body element
    let p2 = createElemWithText("p", `From: ${comment.email}`); // 2p element w/ required text
    article.append(h3, p, p2); // append elements to article
    frag.append(article); // append article to fragment
  } // end loop
  // return fragment
  return frag;
} // end createComments

// ninth function
// no fails
function populateSelectMenu(users) {
  if (!users) {
    // return undefined if empty users
    return;
  }
  // select the selectMenu id
  let menu = document.querySelector("#selectMenu");
  // passing users to createSelectOptions
  let options = createSelectOptions(users);
  // loop begins to append options to the menu
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    menu.append(option);
  } // end loop
  return menu; // return menu
} // end populateSelectMenu

// async/await functions begin
// tenth function
// no fails
const getUsers = async () => {
  let ret; // declare var to retrieve
  try {
    // begin try to fetch
    ret = await fetch("https://jsonplaceholder.typicode.com/users");
  } catch (error) {
    // end try
    // catch errors to console
    console.log(error);
  }
  // return json data
  return await ret.json();
}; // end getUsers

// eleventh function
// no fails
const getUserPosts = async userId => {
  if (!userId) {
    // return undefined if empty userId
    return;
  }
  let ret; // declare var to retrieve
  try {
    // begin try to fetch
    ret = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
  } catch (error) {
    // end try
    // catch errors to console
    console.log(error);
  }
  // return json data
  return ret.json();
}; // end getUserPosts

// twelfth function
// no fails
const getUser = async userId => {
  if (!userId) {
    // return undefined if empty userId
    return;
  }
  let ret; // declare var to retrieve
  try {
    // begin try to fetch
    ret = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  } catch (error) {
    // end try
    // catch errors to console
    console.log(error);
  }
  // return json data
  return ret.json();
}; // end getUser

// thirteenth function
// no fails
const getPostComments = async postId => {
  if (!postId) {
    // return undefined if empty postId
    return;
  }
  let ret; // declare var to retrieve
  try {
    // begin try to fetch
    ret = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
  } catch (error) {
    // catch errors to console
    console.log(error);
  }
  return ret.json();
}; // end getPostComments

// async/await function continue with dependencies
// fourteenth function
// no fails
const displayComments = async postId => {
  if (!postId) {
    return;
  }
  let mySection = document.createElement("section");
  mySection.dataset.postId = postId;
  mySection.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  mySection.append(fragment);
  console.log(mySection);
  return mySection;
}; // end displayComments

// fifteenth function
// no fails
const createPosts = async jsonPosts => {
  if (!jsonPosts) {
    // return undefined if empty JSON posts
    return;
  }
  // create fragment with createDocumentFragment
  let frag = document.createDocumentFragment();
  // begin loop through post data
  for (let i = 0; i < jsonPosts.length; i++) {
    let post = jsonPosts[i];
    let article = document.createElement("article"); // create article element
    let h2 = createElemWithText("h2", post.title); // h2 post title element
    let p = createElemWithText("p", post.body); // p post body element
    let p2 = createElemWithText("p", `Post ID: ${post.id}`); // 2p element w/ required text
    let author = await getUser(post.userId); // author element w/ awaits
    let p3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    ); // 3p author element
    let p4 = createElemWithText("p", `${author.company.catchPhrase}`); // 4p author catch phrase
    let button = createElemWithText("button", "Show Comments"); // show comments button
    button.dataset.postId = post.id; // button attribute
    let section = await displayComments(post.id); // section element w/ awaits
    article.append(h2, p, p2, p3, p4, button, section); // append elements to article
    frag.append(article); // loop complete, append article to frag
  }
  // return fragment
  return frag;
}; // end createPosts

// sixteenth function
// no fails
const displayPosts = async posts => {
  // select the main element
  let mainElem = document.querySelector("main");
  // define variable element
  // equal to if post exists: createPosts, if does not: equal to main para.
  let element = posts
    ? await createPosts(posts)
    : document.querySelector("main p");
  // append to main element
  mainElem.append(element);
  // return element
  return element;
}; // end displayPosts

// procedural functions, call dependencies in the correct order
// seventeenth function
// current fails: 1
// 1The function toggleComments should return an array containing the section element returned by toggleCommentSection and the button element returned by toggleCommentButton.
// needs function three and four to work
function toggleComments(event, postId) {
  if (!event || !postId) {
    return;
  }
  event.target.listener = true;
  let section = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

// eighteenth function
// no fails
const refreshPosts = async posts => {
  if (!posts) {
    return;
  }
  let buttons = removeButtonListeners();
  let mainElem = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let button = addButtonListeners();
  return [buttons, mainElem, fragment, button];
}; // end refreshPosts

// nineteenth function
// no fails
const selectMenuChangeEventHandler = async event => {
  let userId = event?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);
  return [userId, posts, refreshPostsArray];
}; // end selectMenuChangeEventHandler

// twentieth function
// no fails
const initPage = async () => {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
}; // end initPage

// twenty-first function
// no fails
function initApp() {
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
} // end initApp

// *** This must be underneath the definition of initApp in your file..
document.addEventListener("DOMContentLoaded", initApp);
