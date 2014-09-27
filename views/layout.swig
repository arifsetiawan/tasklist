<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{% block site-title %}{{ title }}{% endblock %}</title>

    <link href='http://fonts.googleapis.com/css?family=Lato|Roboto:400,300' rel='stylesheet' type='text/css'>
    <!--STYLES-->
    <link rel="stylesheet" href="/stylesheets/normalize.css">
    <link rel="stylesheet" href="/stylesheets/app.css">
    <!--STYLES END-->
  </head>
  <body>
    <a href="/">Tasklist</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/api">API</a>

    {% block body %}{% endblock %}

    <!--SCRIPTS-->
    <!--SCRIPTS END-->
  </body>
</html>

<!--
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
-->