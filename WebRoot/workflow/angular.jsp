<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<html xmlns:ng="http://angularjs.org">
 <script src="http://code.angularjs.org/angular-0.9.19.min.js" ng:autobind></script>
 <body>
  <script>
    function FormController(){
      this.user = {
        name: 'John Smith',
        address:{line1: '123 Main St.', city:'Anytown', state:'AA', zip:'12345'},
        contacts:[{type:'phone', value:'1(234) 555-1212'}]
      };
      this.state = /^\w\w$/;
      this.zip = /^\d\d\d\d\d$/;
    }
  </script>
  <div ng:controller="FormController" class="example">
   
    <label>Name:</label><br/>
    <input type="text" name="user.name" ng:required/> <br/><br/>
   
    <label>Address:</label><br/>
    <input type="text" name="user.address.line1" size="33" ng:required/> <br/>
    <input type="text" name="user.address.city" size="12" ng:required/>,
    <input type="text" name="user.address.state" size="2" ng:required ng:validate="regexp:state"/>
    <input type="text" name="user.address.zip" size="5" ng:required ng:validate="regexp:zip"/><br/><br/>
   
    <label>Phone:</label>
    [ <a href="" ng:click="user.contacts.$add()">add</a> ]
    <div ng:repeat="contact in user.contacts">
      <select name="contact.type">
        <option>email</option>
        <option>phone</option>
        <option>pager</option>
        <option>IM</option>
      </select>
      <input type="text" name="contact.value" ng:required/>
       [ <a href="" ng:click="user.contacts.$remove(contact)">X</a> ]
    </div>
    <hr/>
    Debug View:
    <pre>user={{user}}</pre>
  </div>
 </body>
</html>