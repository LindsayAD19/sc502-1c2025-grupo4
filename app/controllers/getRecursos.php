<?php
require_once '../../config/database.php';

$sql = "SELECT * FROM RECURSO ORDER BY FECHA DESC";
$result = $conn->query($sql);

$recursos = [];

while ($row = $result->fetch_assoc()) {
    $recursos[] = [
        "id" => $row["ID_RECURSO"],
        "nombre" => $row["NOMBRE"],
        "fecha" => date("l j \d\e F, Y", strtotime($row["FECHA"])), // ejemplo: Lunes 5 de marzo, 2025
        "imagen" => $row["IMAGEN"],
        "link" => $row["LINK"]
    ];
}

echo json_encode($recursos);

$conn->close();
?>