import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './pixabay-api';
import { initRender } from './render-functions';
import Pagination from './pagination';
import type { PixabayResponse } from './types/pixabay';

const form = document.querySelector<HTMLFormElement>('#search-form')!;
const input = document.querySelector<HTMLInputElement>('input[name="searchQuery"]')!;
const gallery = document.querySelector<HTMLDivElement>('.gallery')!;
const loader = document.querySelector<HTMLDivElement>('.loader')!;
const loadMoreBtn = document.querySelector<HTMLButtonElement>('.load-more')!;

let query: string = '';

const pagination = new Pagination();

const render = initRender({
  gallery,
  loader,
  loadMoreBtn,
});

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  query = input.value.trim();

  if (!query) return;

  pagination.reset();
  render.clearGallery();
  await fetchAndRender();
}

async function onLoadMoreClick(): Promise<void> {
  pagination.next();
  await fetchAndRender();
}

async function fetchAndRender(): Promise<void> {
  try {
    render.showLoader();

    const data: PixabayResponse = await getImagesByQuery(
      query,
      pagination.getPage()
    );

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'No images found',
      });
      return;
    }

    render.createGallery(data.hits);

    if (data.totalHits <= pagination.getPage() * pagination.getPerPage()) {
      render.hideLoadMore();
    } else {
      render.showLoadMore();
    }
  } catch (error: unknown) {
    iziToast.error({
      message: 'Something went wrong',
    });
  } finally {
    render.hideLoader();
  }
}
