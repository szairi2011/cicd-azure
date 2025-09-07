// Layout Manager for AdminHub application
// This file dynamically loads the components into each page

document.addEventListener('DOMContentLoaded', function() {
  // Get the current page and set the appropriate active state
  const currentPath = window.location.pathname.split('/').pop();
  let activePage = 'dashboard'; // Default to dashboard
  
  if (currentPath.includes('todo_lists')) {
    activePage = 'todo';
  } else if (currentPath.includes('task_scheduler')) {
    activePage = 'scheduler';
  }
  
  // Add active class to the correct navigation item
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.textContent.trim().toLowerCase().includes(activePage)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Initialize any page-specific components or functionality
  initPageComponents();
});

// Initialize components specific to each page
function initPageComponents() {
  // Todo Lists page - checkbox functionality
  const checkboxes = document.querySelectorAll('.todo-checkbox');
  if (checkboxes.length > 0) {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
        checkbox.nextElementSibling.classList.toggle('completed');
      });
    });
  }
  
  // Any other page-specific initializations can go here
}