'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// var NAMES = ['Морриган', 'Алистер', 'Лелиана', 'Стэн', 'Шейла', 'Зевран'];
var names = [];
var avatars = [];
var AVATAR_URL_TEMPLATE = 'img/avatar-{{случайное число от 1 до 6}}.svg';
var COMMENTS_COUNT = 6;

for (var i = 0; i < COMMENTS_COUNT; i++) {
  avatars[i] = AVATAR_URL_TEMPLATE.replace('{{случайное число от 1 до 6}}', (i + 1));
  names[i] = 'User ' + (i + 1); // Зато унисекс
}

var getRandomCount = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getUniqueRandomItem = function (collection) {
  var randomCount = getRandomCount(0, collection.length - 1);
  return collection.splice(randomCount, 1)[0];
};

var makeComments = function () {
  var messagesCloned = MESSAGES.slice();
  var namesCloned = names.slice();
  var avatarsCloned = avatars.slice();
  var comments = [];

  for (var j = 0; j < COMMENTS_COUNT; j++) {
    comments[j] = {
      avatar: getUniqueRandomItem(avatarsCloned),
      message: getUniqueRandomItem(messagesCloned),
      name: getUniqueRandomItem(namesCloned)
    };
  }

  return comments;
};

var PHOTO_URL_TEMPLATE = 'photos/{{i}}.jpg';
var photosCount = 25;

var makePhotoTemplates = function () {
  var comments = makeComments();
  var commentsAmount = getRandomCount(1, COMMENTS_COUNT);
  var photos = [];

  for (i = 0; i < photosCount; i++) {
    photos[i] = {
      url: PHOTO_URL_TEMPLATE.replace('{{i}}', (i + 1)),
      description: 'Описание фотографии', // Не реализовано
      likes: getRandomCount(15, 200),
      comments: comments.slice(0, commentsAmount)
    };
    comments = makeComments(); // Обновляет случайные комментарии
    commentsAmount = getRandomCount(1, COMMENTS_COUNT); // Обновляет случайное количество случайных комментариев
  }

  return photos;
};

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (photoTemplate) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photoTemplate.url;
  picture.querySelector('.picture__likes').textContent = photoTemplate.likes;
  picture.querySelector('.picture__comments').textContent = photoTemplate.comments.length;

  return picture;
};

var makePictures = function () {
  var fragment = document.createDocumentFragment();
  var photos = makePhotoTemplates();
  for (i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }

  return fragment;
};

pictures.appendChild(makePictures());
