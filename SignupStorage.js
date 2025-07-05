function saveUser(userObject) {
  localStorage.setItem("user", JSON.stringify(userObject));
}

export { saveUser };
