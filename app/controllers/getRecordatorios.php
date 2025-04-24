<?php
session_start();
header("Content-Type: application/json");
require '../../config/database.php'; 

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([]);
    exit;
}

$idPaciente = $_SESSION["usuario_id"];

$sql = "SELECT 
            c.FECHA, 
            c.HORA, 
            u.nombre AS nombre_terapeuta, 
            u.apellidos AS apellidos_terapeuta 
        FROM CITA c
        JOIN usuarios_tb u ON c.ID_TERAPEUTA = u.id
        WHERE c.ID_PACIENTE = ? 
        ORDER BY c.FECHA, c.HORA";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idPaciente);
$stmt->execute();
$result = $stmt->get_result();

$recordatorios = [];
while ($row = $result->fetch_assoc()) {
    $recordatorios[] = [
        "nombre" => $row["nombre_terapeuta"] . " " . $row["apellidos_terapeuta"],
        "fecha" => $row["FECHA"],
        "hora" => $row["HORA"]
    ];
}

echo json_encode($recordatorios);