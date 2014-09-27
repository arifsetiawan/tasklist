{% extends "layout.swig" %}

{% block site-title %}TaskList{% endblock %}

{% block body %}
  <div>
    <h1>TaskList API</h1>
    <div> 

      <h4>Create task</h4>
      <p>
      <code>POST http://azurecamp.cloudapp.net:3000/api/task</code>
      <br>
      <br>
      Body. With Content-Type: application/json
      <br>
      <code>
      {
        "category": "A category",
        "name": "A name"
      }
      </code>
      <br>
      <br>
      Body. With Content-Type: application/x-www-form-urlencoded
      <br>
      <code>
      category=A+category&name=A+name
      </code>
      </p>

      <h4>Get task</h4>
      <p>
      <code>GET http://azurecamp.cloudapp.net:3000/api/task</code>
      <br>
      <br>
      Query parameters :
      <br>
      <code>completed=true</code> or <code>completed=false</code>. Default to false
      </p>

      <h4>Complete task</h4>
      <code>POST http://azurecamp.cloudapp.net:3000/api/task/complete</code>
      <br>
      <br>
      Body. With Content-Type: application/json
      <br>
      <code>
      [
        {
          "RowKey": "d83281a8-7a90-4ae4-8dae-50f9db5920f5"
        }
      ]
      </code>

      <h4>Delete task</h4>
      <code>DELETE http://azurecamp.cloudapp.net:3000/api/task?RowKeys=ROWKEY1;ROWKEY2;ROWKEY3</code>
      <br>
      <p>Use ; to separate multiple keys</p>
    </div>
  </div>
{% endblock %}

