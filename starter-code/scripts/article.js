'use strict';

var articles = [];

function Article (rawDataObj) {
  // TODOne: Use the JS object passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title,
  this.category = rawDataObj.category,
  this.author = rawDataObj.author,
  this.authorUrl = rawDataObj.Url,
  this.publishedOn = rawDataObj.publishedOn,
  this.body = rawDataObj.body
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
    $newArticle.removeClass('template');
  /* TODOne: This cloned article still has a class of template.
  However, in our modules.css stylesheet, we gave all elements
  with a class of template a display of none. Let's make
  sure we're not accidentally hiding our cloned article! */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('a').text(this.author).attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').text(this.publishedOn);

    /* TODOne: Now use jQuery traversal and setter methods to fill in the rest
  of the current template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */
  
  

  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
