<template>
  <div class="h-full bg-white">
    <div v-if="isLoggedIn && canLoad">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit" class="overflow-hidden md:container md:mx-auto md:w-3/4 sm:rounded-md">
        <ul>
          <li data-aos="fade-up" data-aos-once="true" v-for="video in feed" v-bind:key="video.id">
            <feedEntry :showUser="true" :userUuid="video.user.uuid" :userName="video.user.name" :videoUuid="video.uuid" :thumbnail="video.thumbnail" :title="video.title" :date="video.date" :views="video.views" :description="video.description" />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isLoggedIn && !canLoad">
      Loading the feed...
    </div>
    <div v-if="!isLoggedIn" class="flex flex-col items-center justify-center h-screen text-center">
      <span class="w-1/4 pb-4">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1177 494.3">
          <defs>
            <linearGradient id="a" x1="313.8" y1="660.7" x2="313.8" y2="660.4" gradientTransform="matrix(-1 0 0 1 651 0)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="gray" stop-opacity=".3"/>
              <stop offset=".5" stop-color="gray" stop-opacity=".1"/>
              <stop offset="1" stop-color="gray" stop-opacity=".1"/>
            </linearGradient>
          </defs>
          <ellipse cx="588.5" cy="473.3" rx="588.5" ry="21" fill="#3f3d56"/>
          <path d="M1048 356a25 25 0 003-13c0-11-7-20-16-20s-16 9-16 20a25 25 0 004 13 26 26 0 000 25 26 26 0 000 25 26 26 0 000 25 25 25 0 00-4 13c0 11 7 20 16 20s16-9 16-20a25 25 0 00-4-13 26 26 0 001-25 26 26 0 000-25 26 26 0 000-25z" fill="#3f3d56"/>
          <ellipse cx="1035" cy="318.2" rx="15.7" ry="20.5" fill="#3f3d56"/>
          <ellipse cx="1035" cy="293.1" rx="15.7" ry="20.5" fill="#3f3d56"/>
          <path d="M976 122a75 75 0 01-5-9l41-7h-45a75 75 0 01-1-59l60 31-56-41a75 75 0 11124 84 74 74 0 019 14l-53 28 57-19a75 75 0 01-13 70 75 75 0 11-118 0 75 75 0 010-93z" fill="#57b894"/>
          <path d="M1111 168a75 75 0 01-17 46 75 75 0 11-118 0c-10-12 135-54 135-46z" opacity=".1"/>
          <rect x="171.5" y="7" width="834" height="456" rx="20.4" fill="#f2f2f2"/>
          <path d="M172 30h268v434H192a20 20 0 01-20-21V30z" fill="#6c63ff"/>
          <path d="M1006 27v12H172V27a20 20 0 0120-20h793a20 20 0 0121 20z" fill="#3f3d56"/>
          <circle cx="193" cy="23.5" r="6" fill="#6c63ff"/>
          <circle cx="208" cy="23.5" r="6" fill="#6c63ff"/>
          <circle cx="223" cy="23.5" r="6" fill="#6c63ff"/>
          <rect x="610.5" y="93.1" width="347" height="11" rx="1.2" fill="#6c63ff" opacity=".3"/>
          <rect x="879.5" y="114.1" width="73" height="25" rx="1.2" fill="#6c63ff"/>
          <rect x="610.5" y="226.9" width="347" height="11" rx="1.2" fill="#6c63ff" opacity=".3"/>
          <rect x="879.5" y="247.9" width="73" height="25" rx="1.2" fill="#6c63ff"/>
          <rect x="610.5" y="362.9" width="347" height="11" rx="1.2" fill="#6c63ff" opacity=".3"/>
          <rect x="879.5" y="383.9" width="73" height="25" rx="1.2" fill="#6c63ff"/>
          <circle cx="535.2" cy="249.9" r="49.5" fill="#3f3d56"/>
          <path d="M579 276a31 31 0 01-2 3 49 49 0 01-22 17l-2 1a18 18 0 01-3-2 17 17 0 01-4-9 21 21 0 01-4 1c-10 0-19-8-23-19a37 37 0 01-1-22v-1c3-11 12-20 23-20h2c14 0 25 13 25 29a17 17 0 018 17 18 18 0 013 5z" fill="#192534"/>
          <path d="M579 276a31 31 0 01-2 3 16 16 0 00-3-4 19 19 0 000-2 17 17 0 00-7-15c-1-16-12-29-26-29-10 0-18 6-23 16v1l-1 3a37 37 0 011-6h1c3-10 12-18 22-18h2c14 0 24 13 25 29a17 17 0 017 17 17 17 0 014 5z" opacity=".1"/>
          <path d="M527 262a7 7 0 01-1 3c0 1-2 3-1 4a3 3 0 002 2l13 1a44 44 0 005 0 7 7 0 004-2 36 36 0 01-7-4 8 8 0 01-1-1 8 8 0 01-1-5v-4l-10-1-4 1v3a28 28 0 011 3z" fill="#a0616a"/>
          <path d="M527 262a7 7 0 01-1 3c0 1-2 3-1 4a3 3 0 002 2l13 1a44 44 0 005 0 7 7 0 004-2 36 36 0 01-7-4 8 8 0 01-1-1 8 8 0 01-1-5v-4l-10-1-4 1v3a28 28 0 011 3z" opacity=".1"/>
          <circle cx="533.2" cy="249.2" r="11.5" fill="#a0616a"/>
          <path d="M555 283v1a30 30 0 01-2 5 26 26 0 01-1 3l-2 3v1a15 15 0 00-1 2 42 42 0 01-6 1 49 49 0 01-6 0c-11 0-22-2-30-8l1-1v-1a10 10 0 011-4 7 7 0 011-3l4-2a10 10 0 003-5v-2a12 12 0 011-4 4 4 0 011-1 12 12 0 013-2h4a14 14 0 010 2l4 1a117 117 0 0015-1l2-1c2 0 3 2 4 3 2 4 4 8 4 13z" fill="#6c63ff"/>
          <path d="M520 283l-2 3a9 9 0 00-1 5 8 8 0 000 2 3 3 0 001 2" fill="none" stroke="#000" stroke-miterlimit="10" opacity=".1"/>
          <ellipse cx="547.6" cy="443.8" rx="6.3" ry="12.8" transform="rotate(-76 411 350)" fill="#192534"/>
          <path d="M535 245c-6-2-10-5-11-8a3 3 0 000 1c-1 3 4 7 10 9s14 0 14-3a3 3 0 001-1c-2 2-8 3-14 2z" opacity=".1"/>
          <path d="M555 291v5l-2 1a37 37 0 01-4 1 42 42 0 01-6 1l-1-12a20 20 0 013-9 8 8 0 013-3 4 4 0 014 0 5 5 0 011 3 42 42 0 012 6 40 40 0 010 7z" fill="#a0616a"/>
          <path d="M585 386a49 49 0 01-6 24l-2 2a31 31 0 01-2 3 49 49 0 01-14 13 51 51 0 01-6 3l-1 1h-2l-1 1h-2v1h-2a42 42 0 01-6 1 48 48 0 01-6 0 45 45 0 01-8 0h-1l-1-1h-1a29 29 0 01-3-1 47 47 0 01-6-2 49 49 0 01-8-4 5 5 0 010-1 50 50 0 1178-40z" fill="#3f3d56"/>
          <path d="M547 374a11 11 0 01-21 0v-1a11 11 0 0121 0v1z" fill="#192534"/>
          <path d="M547 374a11 11 0 01-21 0v-1a17 17 0 0121 0v1z" opacity=".1"/>
          <circle cx="536.7" cy="387.2" r="16.6" fill="#192534"/>
          <path d="M527 372a11 11 0 019-11 11 11 0 100 21 11 11 0 01-9-10zM518 394a11 11 0 01-2-14 12 12 0 00-1 1 11 11 0 1016 14 11 11 0 001-1 11 11 0 01-14 0z" fill="#192534"/>
          <path d="M528 408a9 9 0 00-2 1c-2 1-2 3-1 5 1 3 3 7 6 9a17 17 0 007 1c3 0 6-1 7-3a9 9 0 001-3l2-9-5-1c-2-1-1-3-2-4a1 1 0 000-1 1 1 0 00-1 0 28 28 0 01-5 0c-1-1-3-2-4-1v4a5 5 0 01-3 2z" fill="#ffc1c7"/>
          <path d="M528 408a9 9 0 00-2 1c-2 1-2 3-1 5 1 3 3 7 6 9a17 17 0 007 1c3 0 6-1 7-3a9 9 0 001-3l2-9-5-1c-2-1-1-3-2-4a1 1 0 000-1 1 1 0 00-1 0 28 28 0 01-5 0c-1-1-3-2-4-1v4a5 5 0 01-3 2z" opacity=".1"/>
          <circle cx="536.4" cy="395.2" r="11.6" fill="#ffc1c7"/>
          <path d="M562 420v1h-1a38 38 0 00-6 10l-1 1h-2l-1 1h-2v1h-2a42 42 0 01-6 1 48 48 0 01-6 0 45 45 0 01-8 0h-1l-1-1h-1a29 29 0 01-3-1 9 9 0 012-4l-8-7a8 8 0 01-1 0 3 3 0 010-1 5 5 0 010-2c-1-2 0-6 2-7a10 10 0 013-2 44 44 0 007-3 5 5 0 010 2l1 3a9 9 0 003 5 14 14 0 006 2c2 1 4 0 6-1a7 7 0 002-1 5 5 0 001-4v-4a2 2 0 012-2 2 2 0 011 0l3 2a26 26 0 015 2 13 13 0 016 9z" fill="#6c63ff"/>
          <path d="M527 435h-1l-1-1h-1a29 29 0 01-3-1 47 47 0 01-6-2 25 25 0 01-1-9 17 17 0 011-4c2 2 6 1 8 2a5 5 0 012 2 13 13 0 011 4v5l1 4z" opacity=".1"/>
          <path d="M526 435l-1-1h-1a29 29 0 01-3-1 47 47 0 01-6-2 26 26 0 01-1-10 19 19 0 010-4c3 2 6 1 8 2a6 6 0 012 3 18 18 0 011 3l1 4v6z" fill="#6c63ff"/>
          <path d="M561 428a51 51 0 01-6 3l-1 1h-2l-1 1h-2v-2-2-1-2a13 13 0 012-4 5 5 0 011-2c3-1 6 0 8-2a18 18 0 011 3 23 23 0 010 7z" opacity=".1"/>
          <path d="M561 428a51 51 0 01-6 3l-1 1h-2l-1 1h-2v-3-1-1l1-3a18 18 0 011-3 6 6 0 012-3c2-1 6 0 8-2a17 17 0 011 4 23 23 0 01-1 7z" fill="#6c63ff"/>
          <ellipse cx="536.2" cy="384.3" rx="13.9" ry="9.3" fill="#192534"/>
          <path d="M525 433v1c0 1 0 0 0 0h-1a6 6 0 012-5 1 1 0 010-1 6 6 0 012-1 5 5 0 012 0 4 4 0 011 0h-1a6 6 0 00-4 2 6 6 0 00-1 4z" opacity=".1"/>
          <path d="M535 434a8 8 0 010 1 45 45 0 01-8 0h-1l-1-1v-1a7 7 0 011-4 5 5 0 012-2 4 4 0 012 0c3 0 5 3 5 7z" fill="#6c63ff"/>
          <path d="M552 432l-1 1a6 6 0 00-2-4 7 7 0 00-4-2 1 1 0 011 0 6 6 0 012 0 6 6 0 011 1 6 6 0 013 4z" opacity=".1"/>
          <path d="M551 433h-2v1h-2a42 42 0 01-6 1 8 8 0 010-2c0-3 2-6 4-6a3 3 0 011 0 4 4 0 012 0 5 5 0 011 1 2 2 0 010 1 7 7 0 012 4z" fill="#6c63ff"/>
          <path d="M536 393c-7 0-13-4-14-9 0 5 7 10 14 10s14-5 14-10c0 5-6 9-14 9z" opacity=".1"/>
          <path d="M486 116a49 49 0 006 24l1 2a1 1 0 000 1 29 29 0 002 2 47 47 0 007 8 19 19 0 002 1 44 44 0 005 4h1a54 54 0 005 3l2 1 1 1h2l1 1h3l2 1h3a48 48 0 006 1h1a46 46 0 008-1l2-1h1l3-1h1l4-1a4 4 0 000-1h1l4-2 3-2a4 4 0 001-1 50 50 0 10-78-40z" fill="#3f3d56"/>
          <path d="M546 136a5 5 0 012 2c-2 1-3 0-5-1a54 54 0 00-13-4 2 2 0 01-1 0 2 2 0 010-2l2-1a19 19 0 0115 6z" fill="#6c63ff"/>
          <path d="M532 132a6 6 0 01-4 3l-2 1a3 3 0 00-2 1 3 3 0 000 1c0 4-1 7 1 10l5 7 9 6h6a9 9 0 001-2 23 23 0 003-5l1-11a1 1 0 00-1-1 4 4 0 01-5-2 6 6 0 010-2v-5a4 4 0 000-1 3 3 0 00-2-2 44 44 0 00-7-2h-2l-1 4z" fill="#fbbebe"/>
          <path d="M532 132a6 6 0 01-4 3l-2 1a3 3 0 00-2 1 3 3 0 000 1c0 4-1 7 1 10l5 7 9 6h6a9 9 0 001-2 23 23 0 003-5l1-11a1 1 0 00-1-1 4 4 0 01-5-2 6 6 0 010-2v-5a4 4 0 000-1 3 3 0 00-2-2 44 44 0 00-7-2h-2l-1 4z" opacity=".1"/>
          <circle cx="543.1" cy="122.2" r="13.1" fill="#fbbebe"/>
          <path d="M526 165h3a48 48 0 006 1h1a46 46 0 008-1h2l1-1h3l1-1 4-1a25 25 0 01-1-3 30 30 0 010-6v-5a12 12 0 00-1-4 5 5 0 00-2-2l-6-1a4 4 0 000 1 2 2 0 00-1 1l-1 3a11 11 0 01-1 3 6 6 0 01-7 2c-2-1-4-3-6-2a4 4 0 00-3 2 10 10 0 00-1 3 44 44 0 001 11z" fill="#f2f2f2"/>
          <path d="M502 153a19 19 0 002 1 44 44 0 005 4h1a54 54 0 005 3l2 1 1 1h2l1 1h3l2 1h3a48 48 0 006 1h1a46 46 0 008-1l2-1h1l3-1h1l4-1a4 4 0 000-1h1l4-2a75 75 0 002-8l-4-9a6 6 0 00-5-3 13 13 0 00-4-1 13 13 0 01-2 0h-3a3 3 0 000 2l1 2a27 27 0 010 4l-2 5v2a26 26 0 01-1 5 4 4 0 01-1 1l-3 1-1-4a18 18 0 00-2-5l-1-1-3-6c-1-3-2-6-1-9l1-2a3 3 0 000-1 2 2 0 000-2 2 2 0 00-3 0 9 9 0 00-1 0 55 55 0 00-5 4 3 3 0 00-2 2 10 10 0 010 1l-2 1a23 23 0 00-14 10 12 12 0 00-1 3 11 11 0 00-1 2z" fill="#6c63ff"/>
          <path d="M549 115c-2 2-5 2-7 2v-1l-4 1a9 9 0 003-3 2 2 0 00-2 0 4 4 0 00-1 2 12 12 0 00-2 10 2 2 0 01-2 0 4 4 0 01-1-2l-1-1a1 1 0 00-2 0 2 2 0 000 2l1 3c0 1 2 1 1 2a11 11 0 01-3 1 1 1 0 01-1-1l-1-6a14 14 0 00-2-4 6 6 0 000-1 3 3 0 01-1-1v-1a16 16 0 00-2-1l2-3 1-1a1 1 0 00-1 0l-1-2 1-1a1 1 0 000-1v-2l2 1a2 2 0 001 1l1-2a4 4 0 010-2h4a2 2 0 00-1-1l8-1a11 11 0 014 1 3 3 0 001 0l1-1a14 14 0 013 2 3 3 0 001 1 1 1 0 001 0l1-1v1a8 8 0 012 2 7 7 0 001-1 2 2 0 000 2l1 2a8 8 0 011 2l-1 3a2 2 0 01-2-1c-2-1-3-1-4 1z" fill="#192534"/>
          <path d="M504 154a44 44 0 005 4h1a54 54 0 005 3l2 1 1 1h1l-1-3a17 17 0 00-4-7c-2-2-4-4-7-3a8 8 0 00-2 2 9 9 0 00-1 2zM551 163l4-1a4 4 0 000-1h1l4-2 3-2a21 21 0 010-4 3 3 0 000-1 5 5 0 01-1-1c-1-1-2-3-4-2l-4 3a3 3 0 000 1 39 39 0 00-2 5v4l-1 1z" fill="#6c63ff"/>
          <path d="M337 660v1z" transform="translate(-11 -203)" fill="url(#a)"/>
          <path d="M265 404c-4 11 0 29 2 37a112 112 0 013 17 37 37 0 0014 0l-3-16c2-10 0-37 0-37s5-10 6-25c0-15 4-20 4-20 8 4 18 47 18 47-1 10 0 26 3 35a44 44 0 012 17 5 5 0 005 1l10-5-3-48v-12l-2-17s0-28-3-32c-3-5-3-12-3-14l-5-6s-45-3-48 0l-2 5a115 115 0 003 37 39 39 0 010 17 49 49 0 01-1 19z" fill="#575a89"/>
          <path d="M267 474c2 3 14 2 16 1l1-5-1-4 1-9s-2 3-3 0a3 3 0 00-2-2 6 6 0 00-4 0c-3 1-6 3-5 5 0 4-3 9-3 9a4 4 0 000 5z" fill="#cbceda"/>
          <path d="M267 474c2 3 14 2 16 1l1-5h-7a21 21 0 00-3 0 58 58 0 01-7 0 4 4 0 000 4zM309 407c-1 10 0 26 3 35a44 44 0 012 17 5 5 0 005 1l-8-59a97 97 0 00-17-45l-3 4c8 4 18 47 18 47z" opacity=".1"/>
          <path d="M272 237l2 10 10 16 12-5s16-17 6-19a9 9 0 01-4-2 7 7 0 01-2-5 18 18 0 011-7l-20-7a34 34 0 011 9c0 5-2 8-4 9a6 6 0 01-2 1z" fill="#fbbebe"/>
          <path d="M277 218a34 34 0 011 9 13 13 0 001 1 16 16 0 0012 4 16 16 0 005 0 18 18 0 011-7z" opacity=".1"/>
          <path d="M274 215a16 16 0 1017-16 16 16 0 00-17 16z" fill="#fbbebe"/>
          <path d="M272 237l2 10 10 16 12-5s16-17 6-19a9 9 0 01-4-2c2 5-5 16-5 16h-3c-5 0-14-14-16-17a6 6 0 01-2 1zM263 331c3 1 19 4 25 3l19-1 11-1-5-6s-45-3-49 0l-1 5z" opacity=".1"/>
          <path d="M293 253s8-11 5-16l14 6s9-1 12 12a23 23 0 010 6 19 19 0 003 10c3 7 3 23-5 25s-10 1-10 1 1 29 6 33-11 2-11 2l-19 2c-6 1-26-3-26-3l4-21 3-24-16-23s-3-13 7-19l14-8s10 17 16 18c0 0 2 1 3-1z" fill="#3f3d56"/>
          <path d="M311 258v7l-5 14h8s-4-4-4-7l1-14z" opacity=".1"/>
          <path d="M288 298s17-4 19-8l6-12-2-2-8 6s-11 9-15 9 0 7 0 7z" fill="#fbbebe"/>
          <path d="M288 298s17-4 19-8l6-12-2-2-8 6s-11 9-15 9 0 7 0 7z" opacity=".1"/>
          <path d="M272 277v10h2a45 45 0 0122 6l2 1 1 1 5-12-4-4h-9c-2-1-4-3-10-1-3 0-6 4-8 3z" fill="#fbbebe"/>
          <path d="M257 260l-4 3v9s3 28 12 31 24-2 24-2 4-11 2-11l-16-5s0-16-3-21c0 0 2-15-6-15s-9 11-9 11z" opacity=".1"/>
          <path d="M256 260l-3 3v9s3 28 11 31 25-2 25-2 4-11 2-11l-17-5s0-16-3-21c0 0 2-15-5-15s-10 11-10 11z" fill="#3f3d56"/>
          <path d="M279 222a6 6 0 010-3 2 2 0 013-1l3 2a3 3 0 003-1 8 8 0 000-4v-4l1-4 6-2a5 5 0 013 1 4 4 0 003 2 3 3 0 003-2 16 16 0 10-25 21 42 42 0 010-5z" opacity=".1"/>
          <path d="M301 207a3 3 0 003-2v-1c0-2 2-2 2-3 2-2 2-5 1-8-1-2-3-3-5-3l-4 1a8 8 0 01-4-1 14 14 0 00-9-1 5 5 0 00-2 2 20 20 0 00-1 2l-7 2c-3 0-5 2-6 4l1 5a1 1 0 01-1 1h-2l-1 4v4a5 5 0 001 4l5 7c3 3 5 6 5 10l3-2a7 7 0 00-1-4 44 44 0 010-6 6 6 0 010-3 2 2 0 013-2l3 3a3 3 0 003-2 8 8 0 000-3v-4l1-4c1-2 4-2 6-2a5 5 0 013 1 4 4 0 003 1z" fill="#3f3d56"/>
          <path d="M298 258l-5 20s-4 0 5-20zM280 254s7 11 4 22h-1s2-5-3-22zM276 315s-8-2-9 4c0 0 2-4 9-4zM300 280s1 11-2 15a35 35 0 0015 2l1-17z" opacity=".1"/>
          <path d="M299 294v1l5-12-4-4h-1c0 1 2 10 0 15z" opacity=".1"/>
          <path d="M300 279s1 11-2 16a35 35 0 0015 2l5-18z" fill="#3f3d56"/>
          <path d="M314 467a4 4 0 003 4l17 3c4 2 17 1 18-1a3 3 0 00-1-2 5 5 0 00-2-2 7 7 0 00-1-1c-2-1-7-2-8-4l-8-8a4 4 0 00-3-2c-1 0-3 1-4 4 0 0-7 4-10 0l-1 8a2 2 0 000 1z" fill="#cbceda"/>
          <path d="M314 467a4 4 0 003 4l17 3c4 2 17 1 18-1a3 3 0 00-1-2 5 5 0 00-2-2c-2 1-7 3-17 1l-18-4a2 2 0 000 1z" opacity=".1"/>
          <g opacity=".1">
            <path d="M270 204a15 15 0 01-1-4 23 23 0 001 3 2 2 0 010 1zM279 219a5 5 0 000 2 6 6 0 010-3 2 2 0 013-1l3 2a3 3 0 003-1 8 8 0 000-4v-4l1-4 6-2a5 5 0 013 1 4 4 0 003 2 3 3 0 003-2v-2l2-3a5 5 0 002-3 5 5 0 01-2 4c0 1-2 1-2 3v1a3 3 0 01-3 2 4 4 0 01-3-1 5 5 0 00-3-1c-2 0-5 0-6 2l-1 4v4a8 8 0 010 4 3 3 0 01-3 1c-2 0-2-2-3-3a2 2 0 00-3 2zM266 215a6 6 0 001 2l5 6c3 3 5 6 5 9 0-3-3-6-5-8l-5-7a5 5 0 01-1-4 4 4 0 000 2zM280 231a4 4 0 000-1 4 4 0 010 2l-3 2a5 5 0 000-1 2 2 0 003-2z"/>
          </g>
          <path d="M333 457s-2 3-8 1M282 458s-6 6-12 2M266 385l4 3-2-1zM265 403a8 8 0 004 1c3 0 3 4 1 3a46 46 0 01-5-4zM264 405s2 9 3 7" opacity=".1"/>
          <path d="M83 460c3-6 0-13-4-17s-9-10-9-17c1-9 10-14 18-19a84 84 0 0015-12 23 23 0 005-7c2-3 2-7 2-11l-2-39" fill="none" stroke="#3f3d56" stroke-miterlimit="10" stroke-width="4"/>
          <path d="M122 338a14 14 0 00-7-12l-3 6v-7a14 14 0 1010 13zM97 433a14 14 0 111-12l-9 8 10-3a14 14 0 01-2 7zM90 405a14 14 0 01-4-27v6l3-7a14 14 0 0115 14 14 14 0 01-1 5 14 14 0 01-13 9zM124 383a14 14 0 117-26l-3 6 5-5a14 14 0 015 10 14 14 0 01-1 4 14 14 0 01-13 11z" fill="#57b894"/>
          <path d="M120 341l-9 2c-3 0-7-1-9-3l-3-5a10 10 0 00-3-3 14 14 0 1026 9h-2zM124 383a14 14 0 01-13-20 10 10 0 013 3l3 4c2 3 5 4 9 4l10-2h1a14 14 0 01-13 11zM90 405a14 14 0 01-13-19 11 11 0 013 3l3 4c2 3 6 4 10 4l10-1a14 14 0 01-13 9zM97 433a14 14 0 01-25-12 14 14 0 013 3l3 5c3 3 8 4 12 4a60 60 0 007 0z" opacity=".1"/>
          <path d="M62 453s11 0 15-2 17-6 17-2 17 19 4 19-29-2-32-4-4-11-4-11z" fill="#656380"/>
          <path d="M99 467c-13 0-29-2-33-4-2-2-3-7-4-10s1 9 4 11 20 4 33 4c3 0 4-1 4-3 0 1-1 2-4 2z" opacity=".2"/>
        </svg>
      </span>
      <span class="w-1/2 pb-4 text-3xl font-bold text-gray-900">
        Inspire and get Inspired
      </span>
      <span class="pb-4">
        Login to see videos of your favorite creators!
      </span>
      <div class="w-32">
        <button @click="login" class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
          <span class="absolute left-0 pl-3 inset-y">
            <svg class="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Login
        </button>
      </div>
      <!-- <div class="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5a67d8" fill-opacity="1" d="M0,288L48,277.3C96,267,192,245,288,229.3C384,213,480,203,576,202.7C672,203,768,213,864,202.7C960,192,1056,160,1152,133.3C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  data: function () {
    return {
      canLoad: false,
      limit: 5,
      busy: false
    }
  },
  components: {
    feedEntry: () => ({
      component: '../components/feedEntry.vue'
    })
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    },
    feed () {
      return this.$store.state.feed.currentTimeline
    },
    hasReachedEndOfTimeline () {
      return this.$store.state.feed.reachedEndOfTimeline
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.commit('feed/clearFeed')
    if (this.$currentUser !== null && this.$currentUser.userInfo !== null) {
      this.canLoad = true
      this.loadOnStartUp()
    }
  },
  beforeDestroy () {
    this.$store.commit('feed/clearFeed')
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    loadMore () {
      if (!this.hasReachedEndOfTimeline && this.canLoad) {
        this.busy = true
        this.$store.dispatch('feed/fetchFeed', this.$currentUser.userInfo.uuid).then((result) => {
          this.busy = false
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    loadOnStartUp () {
      this.busy = true
      this.$store.dispatch('feed/fetchFeed', this.$currentUser.userInfo.uuid).then((result) => {
        this.busy = false
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    $currentUser (newValue) {
      if (newValue.userInfo !== null) {
        this.canLoad = true
        this.loadOnStartUp()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-entry {
  @apply .bg-gray-700 .rounded-lg .px-2 .py-2 .my-2;
}

.avatar {
  @apply .h-16 .w-auto .mr-2 .rounded-full;
}
.smallAvatar {
  @apply .h-10 .w-auto .mr-2 .rounded-full;
}

.thumbnail {
  @apply .relative .inline-block .text-center .bg-cover .w-40 .h-24 .flex-shrink-0;
}

@screen md {
  .thumbnail {
    @apply .w-64 .h-40;
  }
}
</style>
