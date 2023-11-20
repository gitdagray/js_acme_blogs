// #1

function createElemWithText(
  HTMLElemStrngToCrt = "p",
  txtContntOfElToCrt = "",
  classNameifOneNeeded
) {
  // Use document.createElement() to create the requested HTML element
  let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);

  // set the textContent of the created element
  requestedElementCreated.textContent = txtContntOfElToCrt;

  // If class name is specified
  if (classNameifOneNeeded) {
    // set the class of created element
    requestedElementCreated.className = classNameifOneNeeded;
  }

  // return the created element
  return requestedElementCreated;
}

// #2

function createSelectOptions(users) {
  //returns undefined if no data parameter is provided.
  if (users === undefined || users === null) {
    return undefined;
  }

  // define an array
  optionArray = [];

  // for each user of users array
  for (user of users) {
    // print user in console
    console.log(user);
    // create option
    var opt = document.createElement("option");

    // assign user id to option value
    opt.value = user.id;

    // assign user name to innerhtml of option
    opt.innerHTML = user.name;

    // add that options to array
    optionArray.push(opt);
  }

  // return  array
  return optionArray;
}

// #3

// toggleCommentSection
function toggleCommentSection(postId) {
  if (!postId) {
    return undefined;
  }
  // Selects the section element with the data-post-id attribute
  // equal to the postId received as a parameter
  let section = document.querySelector(`section[data-post-id="${postId}"]`);
  // verify if section exist
  if (section) {
    // toggle the class `hide` on the section element
    section.classList.toggle("hide");
  }
  // return the section element
  return section;
}

// test toggleCommentSection
toggleCommentSection(1);
toggleCommentSection(2);

// #4

// function called "toggleCommentButton"
// this function gets 1 parameter named "postId"
function toggleCommentButton(postID) {
  // if postID is not received, return
  if (!postID) {
    return;
  }

  // select button having its value of "data-post-id" attribute = value of "postId"
  const btnSelectedEl = document.querySelector(
    `button[data-post-id = "${postID}"`
  );

  if (btnSelectedEl != null) {
    // if the textContent of button is 'Show Comments', change it to "Hide Comments", otherwise change to "Show Comments" by making use of ternary operator
    btnSelectedEl.textContent === "Show Comments"
      ? (btnSelectedEl.textContent = "Hide Comments")
      : (btnSelectedEl.textContent = "Show Comments");
  }

  // returning the selected button element
  return btnSelectedEl;
}

// check for function
console.log(toggleCommentButton("btnToTest"));

// #5

function deleteChildElements(param) {
  if (!param || !param.nodeType) {
    return undefined;
  }
  let child = param.lastElementChild;

  while (child) {
    param.removeChild(child);

    child = param.lastElementChild;
  }

  return param;
}

// #6

const addButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
  if(buttons.length) {
    for(const button of buttons){
      const postId = button.dataset.postId;
      button.addEventListener('click', event => {
      toggleComments(event, postId);
      })
    }
  }
  return buttons;
}

// #7

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
  if(buttons.length){
    for (const button of buttons){
      const postId = button.dataset.postId;
      button.removeEventListener('click', event => {
        toggleComments(event, postId);
      });
    }
  }
  return buttons;
}

// #8

const createComments = jsonComments => {
  if(!jsonComments) return;
  const docFrag = document.createDocumentFragment();
  for (const comment of jsonComments){
    const article = document.createElement('article');
    const h3 = createElemWithText('h3', comment.name);
    const p1 = createElemWithText('p', comment.body);
    const p2 = createElemWithText('p', `From: ${comment.email}`);
    article.append(h3, p1, p2);
    docFrag.append(article);
  }
  return docFrag
}

// #9

function populateSelectMenu(users) {
  // if users is empty, return undefined
  if (!users) return;
  // select the selectMenu id
  let menu = document.querySelector("#selectMenu");
  // passes the data to createSelectOptions to get an array
  let options = createSelectOptions(users);

  // loop through and append each option to the menu
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    menu.append(option);
  } // end for loop

  // return menu
  return menu;
} // end populateSelectMenu

// #10

let getUsers = async () => {
  let retrieve;
  // fetch users from jsonplaceholder.typicode.com
  try {
    retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
  } catch (error) {
    // end try
    console.log(error);
  } // end catch

  // return information
  return await retrieve.json();
}; // end getUsers

// #11

let getUserPosts = async (userId) => {
  // if userId has nothing
  if (!userId) return;

  let retrieve;

  // try to fetch data for userId
  try {
    retrieve = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
  } catch (error) {
    // end try
    console.log(error);
  } // end catch

  // return information
  return retrieve.json();
}; // end getUserPosts

// #12

let getUser = async (userId) => {
  // if userId has nothing
  if (!userId) return;

  let retrieve;

  // try to fetch data for userId
  try {
    retrieve = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
  } catch (error) {
    // end try
    console.log(error);
  } // end catch

  // return information
  return retrieve.json();
}; // end getUser

// #13

const getPostComments = async (postId) => {
  if (!postId) return;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const jsonPostComments = await response.json();
    return jsonPostComments;
  } catch (error) {
    console.log(error);
  }
};

// #14

const displayComments = async (postId) => {
  if (!postId) return;
  let section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  console.log(section);
  return section;
};
console.log(displayComments(5));

// #15

const createPosts = async (jsonPosts) => {
  if (!jsonPosts) return;

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < jsonPosts.length; i++) {
    let post = jsonPosts[i];

    let article = document.createElement("article");
    let section = await displayComments(post.id);
    let author = await getUser(post.userId);

    let h2 = createElemWithText("h2", post.title);
    let p = createElemWithText("p", post.body);
    let p2 = createElemWithText("p", `Post ID: ${post.id}`);

    let p3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

    let button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    article.append(h2, p, p2, p3, p4, button, section);

    fragment.append(article);
  }
  console.log(fragment);
  return fragment;
};

// #16

const displayPosts = async (posts) => {
  let myMain = document.querySelector("main");
  let element = posts
    ? await createPosts(posts)
    : document.querySelector("main p");
  myMain.append(element);
  return element;
};

// #17

function toggleComments(event, postId) {
  if (!event || !postId) {
    return undefined;
  }
  event.target.listener = true;
  let section = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

// #18

const refreshPosts = async (posts) => {
  if (!posts) {
    return undefined;
  }
  let buttons = removeButtonListeners();
  let myMain = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let button = addButtonListeners();
  return [buttons, myMain, fragment, button];
};

// #19

const selectMenuChangeEventHandler = async event => {
  if(!event) return;
  const select = document.getElementById('selectMenu');
  select.disabled = true;
  const userId = event?.target?.value || 1;
  const postData = await getUserPosts(userId);
  const refreshedPosts = await refreshPosts(postData);
  select.disabled = false;
  return [userId, postData,refreshedPosts];

}

// #20

const initPage = async () => {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
};

// #21

function initApp() {
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);
