<?php include 'database.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="dist/css/output.min.css" rel="stylesheet">
    <link rel="stylesheet" href="dist/css/bs-icons.min.css">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <title>Просмотр данных</title>
    <style>
        .patient {
            background-color: #ecf0f1;
            border-radius: 6px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Введенные данные</h1>
    <div id="list">
        <?php
        foreach (getPatients()['data'] as $patient) {
            echo "<div class='card patient border-0 mt-2'>
                <div class='card-body'>
                    <h5 class='card-title'>{$patient['identifier']}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                    <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the
                        card's content.</p>
                    <div class='sign d-flex align-items-center'>
                        <i class='status-label fs-4 bi text-success bi-check-lg' id='good'></i>
                        Патологические изменения панкреато-билиарной зоны в анамнезе или при объективном обследовании
                    </div>
                </div>
            </div>";
        }
        ?>
    </div>
</div>

</body>

</html>
