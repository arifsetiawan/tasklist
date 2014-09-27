
{% extends "layout.swig" %}

{% block site-title %}TaskList Error{% endblock %}

{% block body %}
  <div>
    <h1>{{ code }}</h1>
    <h3>{{ message }}</h3>
    <p>{{ error|json }}</p>
  </div>
{% endblock %}

<!--
extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}
-->
