<template>
  <form class="mx-auto divide-y divide-gray-200 lg:col-span-9" submit.prevent>
    <!-- Profile section -->
    <div class="px-4 py-6 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
        <p class="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div class="flex flex-col mt-6 lg:flex-row">
        <div class="flex-grow space-y-6">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div class="flex mt-1 rounded-md shadow-sm">
              <span
                class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm"
              >
                workcation.com/
              </span>
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-light-blue-500 focus:border-light-blue-500 rounded-r-md sm:text-sm"
                value="lisamarie"
              />
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              About
            </label>
            <div class="mt-1">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
        </div>

        <div
          class="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0"
        >
          <p class="text-sm font-medium text-gray-700" aria-hidden="true">
            Photo
          </p>
          <div class="mt-1 lg:hidden">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <img
                  class="w-full h-full rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80h"
                  alt=""
                />
              </div>
              <div class="ml-5 rounded-md shadow-sm">
                <div
                  class="relative flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md group hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500"
                >
                  <label
                    for="user_photo"
                    class="relative text-sm font-medium leading-4 text-gray-700 pointer-events-none"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                  </label>
                  <input
                    id="user_photo"
                    name="user_photo"
                    type="file"
                    class="absolute w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="relative hidden overflow-hidden rounded-full lg:block">
            <img
              class="relative w-40 h-40 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
              alt=""
            />
            <label
              for="user-photo"
              class="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
            >
              <span>Change</span>
              <span class="sr-only"> user photo</span>
              <input
                type="file"
                id="user-photo"
                name="user-photo"
                class="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-6">
        <div class="col-span-12 sm:col-span-6">
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First name</label
          >
          <input
            type="text"
            name="first_name"
            id="first_name"
            autocomplete="given-name"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <label for="last_name" class="block text-sm font-medium text-gray-700"
            >Last name</label
          >
          <input
            type="text"
            name="last_name"
            id="last_name"
            autocomplete="family-name"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-12">
          <label for="url" class="block text-sm font-medium text-gray-700"
            >URL</label
          >
          <input
            type="text"
            name="url"
            id="url"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <label for="company" class="block text-sm font-medium text-gray-700"
            >Company</label
          >
          <input
            type="text"
            name="company"
            id="company"
            autocomplete="organization"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Privacy section -->
    <div class="pt-6 divide-y divide-gray-200">
      <div class="px-4 sm:px-6">
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
          <p class="mt-1 text-sm text-gray-500">
            Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
          </p>
        </div>
        <ul class="mt-2 divide-y divide-gray-200">
          <li class="flex items-center justify-between py-4">
            <div class="flex flex-col">
              <p
                id="privacy-option-label-1"
                class="text-sm font-medium text-gray-900"
              >
                Available to hire
              </p>
              <p
                id="privacy-option-description-1"
                class="text-sm text-gray-500"
              >
                Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
              </p>
            </div>
            <!-- On: "bg-teal-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="true"
              aria-labelledby="privacy-option-label-1"
              aria-describedby="privacy-option-description-1"
              class="relative inline-flex flex-shrink-0 h-6 ml-4 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              ></span>
            </button>
          </li>
          <li class="flex items-center justify-between py-4">
            <div class="flex flex-col">
              <p
                id="privacy-option-label-2"
                class="text-sm font-medium text-gray-900"
              >
                Make account private
              </p>
              <p
                id="privacy-option-description-2"
                class="text-sm text-gray-500"
              >
                Pharetra morbi dui mi mattis tellus sollicitudin cursus
                pharetra.
              </p>
            </div>
            <!-- On: "bg-teal-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="false"
              aria-labelledby="privacy-option-label-2"
              aria-describedby="privacy-option-description-2"
              class="relative inline-flex flex-shrink-0 h-6 ml-4 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              ></span>
            </button>
          </li>
          <li class="flex items-center justify-between py-4">
            <div class="flex flex-col">
              <p
                id="privacy-option-label-3"
                class="text-sm font-medium text-gray-900"
              >
                Allow commenting
              </p>
              <p
                id="privacy-option-description-3"
                class="text-sm text-gray-500"
              >
                Integer amet, nunc hendrerit adipiscing nam. Elementum ame
              </p>
            </div>
            <!-- On: "bg-teal-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="true"
              aria-labelledby="privacy-option-label-3"
              aria-describedby="privacy-option-description-3"
              class="relative inline-flex flex-shrink-0 h-6 ml-4 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              ></span>
            </button>
          </li>
          <li class="flex items-center justify-between py-4">
            <div class="flex flex-col">
              <p
                id="privacy-option-label-4"
                class="text-sm font-medium text-gray-900"
              >
                Allow mentions
              </p>
              <p
                id="privacy-option-description-4"
                class="text-sm text-gray-500"
              >
                Adipiscing est venenatis enim molestie commodo eu gravid
              </p>
            </div>
            <!-- On: "bg-teal-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="true"
              aria-labelledby="privacy-option-label-4"
              aria-describedby="privacy-option-description-4"
              class="relative inline-flex flex-shrink-0 h-6 ml-4 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              ></span>
            </button>
          </li>
        </ul>
      </div>
      <div class="flex justify-end px-4 py-4 mt-4 sm:px-6">
        <button
          type="button"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-light-blue-700 hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {}
</script>

<style>
</style>
