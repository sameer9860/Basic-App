const usersList = document.getElementById('users');
const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const statusDiv = document.getElementById('status');

const API_URL = 'http://localhost:3000/users';

// Fetch and display users
async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    displayUsers(users);
  } catch (err) {
    statusDiv.textContent = 'Error fetching users';
    console.error(err);
  }
}

// Display users in the list
function displayUsers(users) {
  usersList.innerHTML = '';
  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="sn">${index + 1}</span>
      <span class="name">${user.name}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editUser(${user.id}, '${user.name}')">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    usersList.appendChild(li);
  });
}


// Add user
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = userNameInput.value;
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    if (res.ok) {
      userNameInput.value = '';
      fetchUsers();
    }
  } catch (err) {
    statusDiv.textContent = 'Error adding user';
    console.error(err);
  }
});

// Edit user
async function editUser(id, currentName) {
  const newName = prompt('Enter new name for the user:', currentName);
  
  if (newName && newName !== currentName) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      statusDiv.textContent = 'Error updating user';
      console.error(err);
    }
  }
}

// Delete user
async function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      statusDiv.textContent = 'Error deleting user';
      console.error(err);
    }
  }
}


// Initial fetch
fetchUsers();