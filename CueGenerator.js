<!DOCTYPE html>



<html>
    <head>
        <title></title>


    </head>
	    <style>
        .secondary{
            text-align: center;
            font-family: arial;
			  
        }
		.content {
  max-width: 900px;
  margin: auto;
}
    </style>
    <body>

        <script>

            function store(target) {
                var existing = localStorage.getItem('user_choice');
                existing = existing ? existing.split(',') : [];
                existing.push(target);
                //table.push(target);
                localStorage.setItem('user_choice', existing.toString());
                window.location.href='questionnaire.html';
            }

        </script>



<div class="content">
        <table>
            <tr>
                <td class="secondary" align="center"><b>Which car would you prefer ?<br><br><br></b></td><br>
            </tr>
            <tr>
                <td><img id="img_A" src="" width="300" /></td>
                <td><img id="img_B" src="" width="300" /></td>
            </tr>
            <tr>
                <td class="secondary"><input type="button" value="Car A" onclick="store('Car A')" /></td>
                <td class="secondary"><input type="button" value="Car B" onclick="store('Car B')" /></td>
            </tr>
        </table>
 </div>
        <script>
            document.getElementById("img_A").src = localStorage.getItem("path_carA");
            document.getElementById("img_B").src = localStorage.getItem("path_carB");
        </script>

    </body>
</html>
