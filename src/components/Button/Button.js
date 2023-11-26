import React from "react";
import styles from './Button.module.css'


loadMoreBtn.style.display = 'none';
let totalHits; // Dostęp do wszystkich obrazów
let totalDownloadedImages = 0; // Inicjalizuje  zmienną do śledzenia liczby pobranych obrazów
const infoParagraph = document.querySelector('.load-more-wrapper p');

function displayImages(images) {
  images.forEach(image => {
    gallery.appendChild(createImageCard(image));
  });

  photoCard.style.display = 'block';
  loadMoreBtn.style.display = 'block';
  lightbox.refresh();
}

async function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}

const searchForm = document.getElementById('search-form');
let query = ''; // Zmienna przechowujaca wartość pola input

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  searchInput = e.target.querySelector('input[name="searchQuery"]'); // Przypisujemy wartość do zmiennej
  query = searchInput.value.trim();

  if (query.length > 0) {
    clearGallery();
    try {
      const result = await searchImages(query);
      const images = result.hits; // Dostęp do tablicy obrazów
      totalHits = result.totalHits;

      // Wyświetlam ilość znalezionych obrazów
      console.log(`Znaleziono ${totalHits} obrazów ${query}`);

      displayImages(images);
      searchInput.value = ''; // Czyszczenie pola input

      totalDownloadedImages = images.length; // Ustawiam totalDownloadedImages na ilość obrazów z pierwszego pobrania
      infoParagraph.textContent = `Total ${totalDownloadedImages} images downloaded from ${totalHits} available. Search: "${query.toUpperCase()}"`;

      // Wyświetlam informację o ilości pobranych obrazów
      console.log(`Pobrano ${totalDownloadedImages} obrazów z ${totalHits} możliwych`);

       // Sprawdzenie czy przycisk "Load more" powinien być ukryty
       if (totalDownloadedImages >= totalHits) {
        loadMoreBtn.style.display = 'none';
      }

    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('An error occurred. Please try again later.');
    }
  }
  
});

// Obsługa przycisku "Load more"
let page = 2;

loadMoreBtn.addEventListener('click', async () => {
  if (query.length > 0) { // Użyj zapamiętanej wartości
    try {
      // Ładowanie kolejnych stron
      const result = await searchImages(query, page);
      const images = result.hits; // Dostęp do tablicy obrazów

      if (images.length === 0) {
        Notiflix.Notify.info('No more images to load.');
      } else {
        page++;
        displayImages(images);
        totalDownloadedImages += images.length; // Aktualizuje liczbę pobranych obrazów

        infoParagraph.textContent = `Total ${totalDownloadedImages} images downloaded from ${totalHits} available. Search: "${query.toUpperCase()}"`;

        // Wyświetl informację o ilości pobranych obrazów
        console.log(`Pobrano łącznie ${totalDownloadedImages} obrazów ${totalHits} z możliwych`);

         // Sprawdzenie czy przycisk "Load more" powinien być ukryty
      if (totalDownloadedImages >= totalHits) {
        loadMoreBtn.style.display = 'none';
      }
      }
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure(
        'An error occurred while loading more images. Please try again later.'
      );
    }
  }
});