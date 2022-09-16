<?php
include 'database.php';

echo json_encode(getPatients(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);


