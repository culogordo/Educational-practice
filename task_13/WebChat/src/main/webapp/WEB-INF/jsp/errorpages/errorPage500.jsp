<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Tower of Hanoi</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js"></script>
    <script>
        <%@include file='/hanoier/js/jquery.ui.touch-punch.min.js' %>
    </script>
    <link type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
    <script>
        <%@include file='/hanoier/js/tower.js' %>
    </script>
    <script>
        <%@include file='/hanoier/js/disk.js' %>
    </script>
    <script>
        <%@include file='/hanoier/js/game.js' %>
    </script>
    <style>
        <%@include file='/hanoier/css/styles.css' %>
    </style>
</head>
<body>
<p>Internal Server Error</p>
<h1 id="title">Tower of Hanoi</h1>
<div id="images"></div>
<div id="background">
    <div id="fill"></div>
    <div id="game"></div>
</div>
<p/>
<table id="footer">
    <tr>
        <td align="center">
            <form id="control">
                Disks: <select id="numDisks" size="1">
                <option value="3" selected="true">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>&nbsp;&nbsp;
                Moves: <span id="moves">0</span>&nbsp;&nbsp;
                <input type="button" id="startOver" value="Start Over" />&nbsp;&nbsp;
                <a href="http://en.wikipedia.org/wiki/Tower_of_Hanoi" target="_blank">How to Play</a>
            </form>
        </td>
    </tr>
</table>
</body>
</html>
