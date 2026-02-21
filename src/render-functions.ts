import SimpleLightbox from 'simplelightbox';
import type { PixabayImage } from './types/pixabay';

export interface RenderElements {
  gallery: HTMLDivElement;
  loader: HTMLDivElement;
  loadMoreBtn: HTMLButtonElement;
}

export interface RenderAPI {
  clearGallery(): void;
  createGallery(images: PixabayImage[]): void;
  showLoader(): void;
  hideLoader(): void;
  showLoadMore(): void;
  hideLoadMore(): void;
}

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreBtn } = elements;

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  function clearGallery(): void {
    gallery.innerHTML = '';
  }

  function createGallery(images: PixabayImage[]): void {
    const markup = images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
        <div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info">
            <p>Likes ${likes}</p>
            <p>Views ${views}</p>
            <p>Comments ${comments}</p>
            <p>Downloads ${downloads}</p>
          </div>
        </div>
      `
      )
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }

  function showLoader(): void {
    loader.classList.remove('hidden');
  }

  function hideLoader(): void {
    loader.classList.add('hidden');
  }

  function showLoadMore(): void {
    loadMoreBtn.classList.remove('hidden');
  }

  function hideLoadMore(): void {
    loadMoreBtn.classList.add('hidden');
  }

  return {
    clearGallery,
    createGallery,
    showLoader,
    hideLoader,
    showLoadMore,
    hideLoadMore,
  };
}
