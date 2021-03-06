'use strict';

(function () {
  var HASH_TAG_MAX_LENGTH = 20;
  var COMMENT_MAX_LENGTH = 140;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadText = uploadOverlay.querySelector('.img-upload__text');
  var hashTagInput = uploadText.querySelector('.text__hashtags');
  var descriptionInput = uploadText.querySelector('.text__description');

  var setInvalidBorder = function (input) {
    input.style.borderColor = 'red';
    input.style.outlineColor = 'red';
  };

  var removeInvalidBorder = function (input) {
    input.style.borderColor = '';
    input.style.outlineColor = '';
  };

  var checkHashTagsValidity = function () {
    var hashTagsLimit = 5;
    var isHashTagValid = true;
    var isSimilarityFinded = false;
    var hashTags = [];
    var customValidityConstructor = '';
    hashTags = hashTagInput.value.split(window.util.Regular.EMPTY_SPACE);
    if (hashTags[0] === '') {
      hashTagsLimit++;
    }
    if (hashTags[hashTags.length - 1] === '') {
      hashTagsLimit++;
    }
    if (hashTags.length > hashTagsLimit) {
      customValidityConstructor += 'Максимальное число хэш-тегов - 5. Хэш-тэги разделяются пробелами. ';
    }
    hashTags.forEach(function (hashTag, i) {
      isHashTagValid = !hashTag.replace(window.util.Regular.VALID_HASH_TAG, '');
      if (!isHashTagValid) {
        customValidityConstructor += 'Хэш-тег начинается с решётки (#) и состоит из цифр и букв, в т.ч. заглавных. ';
      }
      if (hashTag.length > HASH_TAG_MAX_LENGTH) {
        customValidityConstructor += 'Максимальное количество символов в хэш-теге - 20. ';
      }
      if (!isSimilarityFinded) {
        for (var j = i + 1; j < hashTags.length; j++) {
          if (hashTags[j] === hashTags[i] && hashTags[j] !== '') {
            isSimilarityFinded = true;
            customValidityConstructor += 'Один и тот же хэш-тег нельзя использовать дважды. ';
            break;
          }
        }
      }
    });

    hashTagInput.setCustomValidity(customValidityConstructor);
    if (!customValidityConstructor) {
      removeInvalidBorder(hashTagInput);
    }
  };

  hashTagInput.addEventListener('input', function () {
    checkHashTagsValidity();
  });

  hashTagInput.addEventListener('invalid', function () {
    setInvalidBorder(hashTagInput);
  });

  var checkDescriptionValidity = function () {
    descriptionInput.setCustomValidity('');
    if (descriptionInput.value.length > COMMENT_MAX_LENGTH) {
      descriptionInput.setCustomValidity('Максимальная длина комментария - 140 символов.');
    } else {
      removeInvalidBorder(descriptionInput);
    }
  };

  descriptionInput.addEventListener('input', function () {
    checkDescriptionValidity();
  });

  descriptionInput.addEventListener('invalid', function () {
    descriptionInput.setCustomValidity('Максимальная длина комментария - 140 символов.');
    setInvalidBorder(descriptionInput);
  });

  uploadText.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Key.ESC) {
      evt.stopPropagation();
      evt.target.blur();
    }
  });

  window.validation = {
    removeInvalidBorder: removeInvalidBorder
  };
})();
