<?php
    include "../connect.php";
    $budget = 5000000;
    $expanse = mysqli_query($connect, "SELECT SUM(total) as purchase FROM purchaselog");
    $expanse = mysqli_fetch_assoc($expanse);
    $expanse = $expanse['purchase'];
    $remain = $budget - $expanse;

    if(isset($_POST['submit'])){
        $username = $_POST['username'];
        $items = $_POST['items'];
        $total = $_POST['total'];

        $sql = mysqli_query($connect, "INSERT INTO purchaselog VALUES(DEFAULT, '$username', '$items', DEFAULT, '$total')");
        if($sql){
            if ($total > $remain){
                ?>
                <script>
                    alert("Your spending is over budget!!!" )
                    window.location.href = "../index.php";
                </script>
                <?php
            }else {
                ?>
                <script>
                    alert("Data Added Successfully");
                    window.location.href = "../index.php";
                </script>   
                <?php
            }
        }

    }
?>