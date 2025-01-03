// Load JSON data
fetch('collections.json')
  .then(response => response.json())
  .then(data => initializeCollections(data))
  .catch(error => console.error('Error loading collections:', error));

// Initialize collections
function initializeCollections(collections) {
  const collectionList = document.getElementById('collectionList');
  const collectionDetails = document.getElementById('collectionDetails');

  // Populate sidebar with collection titles
  collections.forEach((collection, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = collection.title;
    listItem.addEventListener('click', () => displayCollection(collection, listItem));
    collectionList.appendChild(listItem);

    // Load the first collection by default
    if (index === 0) {
      displayCollection(collection, listItem);
    }
  });
}

// Display selected collection in the content area
function displayCollection(collection, selectedItem) {
  const collectionDetails = document.getElementById('collectionDetails');
  
  // Clear the collection details section
  collectionDetails.innerHTML = '';

  // Add collection title and description
  const title = document.createElement('h3');
  title.textContent = collection.title;
  const description = document.createElement('p');
  description.textContent = collection.description;
  collectionDetails.appendChild(title);
  collectionDetails.appendChild(description);

  // Add images in one-per-row format
  collection.images.forEach(imageData => {
    const imageRow = document.createElement('div');
    imageRow.classList.add('collection-image');

    const img = document.createElement('img');
    img.src = imageData.image;
    img.alt = imageData.title;

    const imageTitle = document.createElement('h4');
    imageTitle.textContent = imageData.title;

    const imageDescription = document.createElement('p');
    imageDescription.textContent = imageData.description;

    imageRow.appendChild(img);
    imageRow.appendChild(imageTitle);
    imageRow.appendChild(imageDescription);

    collectionDetails.appendChild(imageRow);
  });

  // Deselect all sidebar items and select the clicked item
  const allSidebarItems = document.querySelectorAll('.sidebar ul li');
  allSidebarItems.forEach(item => item.classList.remove('selected'));
  selectedItem.classList.add('selected');
}
